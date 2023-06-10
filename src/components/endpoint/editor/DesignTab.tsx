import { EndpointDefinition, endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { useMemo, useRef } from 'react';
import { Uid } from 'sequential-workflow-designer';
import { SequentialWorkflowDesigner, WrappedDefinition } from 'sequential-workflow-designer-react';
import { EditorProvider } from 'sequential-workflow-editor';
import { DesignTabState } from './DesignTabState';

// IMPORTANT: This component must be imported via dynamic import to avoid SSR issues.

export interface DesignTabProps {
  state: DesignTabState;
  onStateChanged: (state: DesignTabState) => void;
}

export default function DesignTab(props: DesignTabProps) {
  const isFirstChange = useRef(true);

  const editorProvider = useMemo(() => {
    return EditorProvider.create<EndpointDefinition>(endpointDefinitionModel, {
      uidGenerator: Uid.next
    });
  }, []);

  function onChange(definition: WrappedDefinition<EndpointDefinition>) {
    const isDirty = isFirstChange.current ? props.state.isDirty : true;
    isFirstChange.current = false;
    props.onStateChanged({
      definition,
      isDirty
    });
  }

  return (
    <SequentialWorkflowDesigner
      definition={props.state.definition}
      globalEditor={editorProvider.createRootEditorProvider()}
      stepEditor={editorProvider.createStepEditorProvider(() => props.state.definition.value)}
      validatorConfiguration={{
        root: editorProvider.createRootValidator(),
        step: editorProvider.createStepValidator()
      }}
      controlBar={true}
      stepsConfiguration={{}}
      onDefinitionChange={onChange}
      toolboxConfiguration={{
        groups: [
          {
            name: 'Steps',
            steps: Object.keys(endpointDefinitionModel.steps).map(type => editorProvider.activateStep(type))
          }
        ]
      }}
    />
  );
}
