import { VariableDefinitions } from 'sequential-workflow-editor-model';

export interface UserInputParserResult {
  values: Record<string, unknown>;
  errors: Record<string, string> | null;
}

export class UserInputParser {
  public static parse(inputs: Record<string, string>, definitions: VariableDefinitions): UserInputParserResult {
    const values: Record<string, unknown> = {};
    const errors: Record<string, string> = {};

    for (const definition of definitions.variables) {
      const input = inputs[definition.name];
      const parsed = parse(input, definition.type);
      values[definition.name] = parsed.value;
      if (parsed.error) {
        errors[definition.name] = parsed.error;
      }
    }

    if (Object.values(errors).length > 0) {
      return { values, errors };
    }
    return { values, errors: null };
  }
}

function parse(value: string | undefined, type: string): { value: unknown; error: string | null } {
  if (value === undefined) {
    return { value, error: 'Value is not set' };
  }

  if (type === 'string') {
    return { value, error: null };
  }
  if (type === 'number') {
    if (value === '') {
      return { value: null, error: 'Number is not set' };
    }
    const number = Number(value);
    if (isNaN(number)) {
      return { value: number, error: 'Value is not a number' };
    }
    return { value: number, error: null };
  }

  return { value, error: 'Unknown type' };
}
