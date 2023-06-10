import { useMemo, useRef, useState } from 'react';
import { createEndpointModes } from '../EndpointModes';
import { EndpointPage, EndpointPageTab } from '@/components/theme/endpoint/EndpointPage';
import { TestTab } from './TestTab';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { createTestTabState } from './TestTabState';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { EndpointExecutor } from './EndpointExecutor';

export interface EndpointTesterProps {
  id: string;
  endpoint: EndpointJSON;
  onModeChanged: (modeId: string) => void;
}

export function EndpointTester(props: EndpointTesterProps) {
  const isTesting = useRef(false);
  const definition = useMemo<EndpointDefinition>(() => JSON.parse(props.endpoint.definition), [props.endpoint.definition]);
  const [state, setState] = useState(() => createTestTabState(definition.properties.inputs));
  const isValid = !state.parserResult.errors;

  const modes = useMemo(() => createEndpointModes('test', false), []);
  const tabs: EndpointPageTab[] = useMemo(
    () => [
      {
        label: 'Test',
        isSelected: true,
        isDirty: false,
        isValid
      }
    ],
    [isValid]
  );

  function onModeChanged(index: number) {
    props.onModeChanged(modes[index].id);
  }

  async function onRunClicked() {
    if (!isValid || isTesting.current) {
      return;
    }
    isTesting.current = true;

    let logs: string[] = [];
    const executor = new EndpointExecutor(message => {
      logs = [...logs, message];
      setState({
        ...state,
        logs
      });
    });
    await executor.execute(props.endpoint.url, state.parserResult.values);

    isTesting.current = false;
  }

  return (
    <DefaultLayout title="Test endpoint">
      <EndpointPage
        modes={modes}
        onModeChanged={onModeChanged}
        tabs={tabs}
        onTabClicked={() => {}}
        primaryButtonLabel="Run"
        isPrimaryButtonDisabled={!isValid}
        onPrimaryButtonClicked={onRunClicked}
      >
        <TestTab url={props.endpoint.url} inputDefinitions={definition.properties.inputs} state={state} onStateChanged={setState} />
      </EndpointPage>
    </DefaultLayout>
  );
}
