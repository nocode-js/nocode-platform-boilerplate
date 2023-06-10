import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import { EndpointPage, EndpointPageTab } from '../../theme/endpoint/EndpointPage';
import { OverviewTab } from './OverviewTab';
import { DesignTabState, createDesignTabState } from './DesignTabState';
import { StartDefinitionActivator } from '../StartDefinitionActivator';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { OverviewTabState, createOverviewTabState } from './OverviewTabState';
import { createEndpointModes } from '../EndpointModes';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';

const DesignTab = dynamic(() => import('./DesignTab'), { ssr: false });

export interface EndpointEditorProps {
  endpoint?: EndpointJSON;
  onSave: (name: string, url: string, description: string, definition: EndpointDefinition) => Promise<void>;
  onModeChanged?: (modeId: string) => void;
}

interface EndpointEditorState {
  overview: OverviewTabState;
  design: DesignTabState;
}

export function EndpointEditor(props: EndpointEditorProps) {
  const isSaving = useRef(false);
  const [state, setState] = useState<EndpointEditorState>(() => ({
    overview: createOverviewTabState(props.endpoint),
    design: createDesignTabState(
      props.endpoint?.definition ? JSON.parse(props.endpoint.definition) : StartDefinitionActivator.createDefault()
    )
  }));

  const isNewMode = !props.endpoint;
  const isDirty = state.design.isDirty || state.overview.isDirty;
  const isValid = (state.design.definition.isValid ?? true) && !state.overview.errors;
  const canSave = isDirty && isValid;

  const modes = useMemo(() => createEndpointModes('edit', isNewMode), [isNewMode]);
  const [currentTab, setCurrentTab] = useState<string>(isNewMode ? 'overview' : 'design');
  const tabs = useMemo<EndpointPageTab[]>(
    () => [
      {
        label: 'Overview',
        isDirty: state.overview.isDirty,
        isValid: !state.overview.errors,
        isSelected: currentTab === 'overview'
      },
      {
        label: 'Design',
        isDirty: state.design.isDirty,
        isValid: state.design.definition.isValid ?? true,
        isSelected: currentTab === 'design'
      }
    ],
    [currentTab, state.design.isDirty, state.design.definition.isValid, state.overview.errors, state.overview.isDirty]
  );

  function onModeChanged(index: number) {
    if (props.onModeChanged) {
      props.onModeChanged(modes[index].id);
    }
  }

  function onTabClicked(index: number) {
    setCurrentTab(index === 0 ? 'overview' : 'design');
  }

  function onOverviewStateChanged(overview: OverviewTabState) {
    setState({ ...state, overview });
  }

  function onDesignStateChange(design: DesignTabState) {
    setState({ ...state, design });
  }

  async function onSaveClicked() {
    if (isSaving.current || !canSave) {
      return;
    }
    isSaving.current = true;

    try {
      await props.onSave(state.overview.name, state.overview.url, state.overview.description, state.design.definition.value);
      setState({
        design: {
          ...state.design,
          isDirty: false
        },
        overview: {
          ...state.overview,
          isDirty: false
        }
      });
    } finally {
      isSaving.current = false;
    }
  }

  return (
    <DefaultLayout title="Edit endpoint">
      <EndpointPage
        modes={modes}
        onModeChanged={onModeChanged}
        tabs={tabs}
        onTabClicked={onTabClicked}
        primaryButtonLabel="Save"
        isPrimaryButtonDisabled={!canSave}
        onPrimaryButtonClicked={onSaveClicked}
      >
        {currentTab === 'overview' && <OverviewTab state={state.overview} onStateChanged={onOverviewStateChanged} />}
        {currentTab === 'design' && <DesignTab state={state.design} onStateChanged={onDesignStateChange} />}
      </EndpointPage>
    </DefaultLayout>
  );
}
