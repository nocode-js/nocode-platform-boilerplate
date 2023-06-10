import { UserInputParser, UserInputParserResult } from '@/lib/workflows/UserInputParser';
import { VariableDefinitions } from 'sequential-workflow-editor-model';

export interface TestTabState {
  userInput: Record<string, string>;
  parserResult: UserInputParserResult;
  logs: string[];
}

export function createTestTabState(inputDefinitions: VariableDefinitions): TestTabState {
  const userInput = inputDefinitions.variables.reduce<Record<string, string>>((value, input) => {
    value[input.name] = '';
    return value;
  }, {});

  return {
    userInput,
    parserResult: UserInputParser.parse(userInput, inputDefinitions),
    logs: []
  };
}
