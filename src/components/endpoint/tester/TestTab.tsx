import { TestTabForm, TestTabFormInput } from '@/components/theme/endpoint/TestTabForm';
import { UserInputParser } from '@/lib/workflows/UserInputParser';
import { VariableDefinitions } from 'sequential-workflow-editor-model';
import { TestTabState } from './TestTabState';
import { useMemo } from 'react';

export interface TestTabProps {
  description: string;
  url: string;
  inputDefinitions: VariableDefinitions;
  state: TestTabState;
  onStateChanged: (state: TestTabState) => void;
}

export function TestTab(props: TestTabProps) {
  const inputs: TestTabFormInput[] = useMemo(() => {
    return props.inputDefinitions.variables.map(input => {
      return {
        name: input.name,
        value: props.state.userInput[input.name],
        error: props.state.parserResult.errors ? props.state.parserResult.errors[input.name] ?? null : null
      };
    });
  }, [props.state.parserResult.errors, props.inputDefinitions.variables, props.state.userInput]);

  function onInputChanged(index: number, value: string) {
    const name = props.inputDefinitions.variables[index].name;
    const userInput = {
      ...props.state.userInput,
      [name]: value
    };

    props.onStateChanged({
      ...props.state,
      userInput,
      parserResult: UserInputParser.parse(userInput, props.inputDefinitions)
    });
  }

  return <TestTabForm description={props.description} logs={props.state.logs} inputs={inputs} onInputChanged={onInputChanged} />;
}
