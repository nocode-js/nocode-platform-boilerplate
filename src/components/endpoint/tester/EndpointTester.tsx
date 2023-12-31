'use client';

import { useMemo, useState } from 'react';
import { createEndpointModes } from '../EndpointModes';
import { EndpointTab, EndpointTabHost } from '@/components/theme/endpoint/EndpointTabHost';
import { TestTab } from './TestTab';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { createTestTabState } from './TestTabState';
import { EndpointExecutor } from './EndpointExecutor';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/EndpointDefinition';

export interface EndpointTesterProps {
  id: string;
  endpoint: EndpointJSON;
  onModeChanged: (modeId: string) => void;
}

export function EndpointTester(props: EndpointTesterProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const definition = useMemo<EndpointDefinition>(() => JSON.parse(props.endpoint.definition), [props.endpoint.definition]);
  const [state, setState] = useState(() => createTestTabState(definition.properties.inputs));
  const isValid = !state.parserResult.errors;

  const modes = useMemo(() => createEndpointModes('test', false), []);
  const tabs: EndpointTab[] = useMemo(
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
    if (!isValid || isExecuting) {
      return;
    }
    setIsExecuting(true);

    let logs: string[] = [];
    const executor = new EndpointExecutor(message => {
      logs = [...logs, message];
      setState({
        ...state,
        logs
      });
    });
    await executor.execute(props.endpoint.url, state.parserResult.values);

    setIsExecuting(false);
  }

  return (
    <EndpointTabHost
      name={props.endpoint.name}
      modes={modes}
      onModeChanged={onModeChanged}
      tabs={tabs}
      onTabClicked={() => {}}
      primaryButtonLabel="Run"
      isPrimaryButtonDisabled={!isValid || isExecuting}
      onPrimaryButtonClicked={onRunClicked}
    >
      <TestTab
        description={props.endpoint.description}
        url={props.endpoint.url}
        inputDefinitions={definition.properties.inputs}
        state={state}
        onStateChanged={setState}
      />
    </EndpointTabHost>
  );
}
