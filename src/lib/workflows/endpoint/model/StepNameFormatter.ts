import { formatVariableName } from 'sequential-workflow-editor';
import {
  AnyVariable,
  Dynamic,
  NullableAnyVariable,
  NullableVariable,
  anyVariablesValueModelId,
  booleanValueModelId,
  nullableAnyVariableValueModelId,
  nullableVariableValueModelId,
  numberValueModelId,
  stringValueModelId
} from 'sequential-workflow-editor-model';

export class StepNameFormatter {
  public static formatVariable = (value: AnyVariable | NullableVariable | NullableAnyVariable): string => {
    if (value) {
      return formatVariableName(value.name);
    }
    return '?';
  };

  public static formatDynamic = (value: Dynamic<unknown>): string => {
    switch (value.modelId) {
      case nullableVariableValueModelId:
      case nullableAnyVariableValueModelId:
      case anyVariablesValueModelId:
        return this.formatVariable(value.value as AnyVariable | NullableVariable);
      case numberValueModelId:
        return String(value.value);
      case stringValueModelId:
        return trim(String(value.value), 9);
      case booleanValueModelId:
        return value.value ? 'True' : 'False';
    }
    return '?';
  };

  public static createStringFormatter(limit: number) {
    return (value: string): string => trim(value, limit);
  }
}

function trim(value: string, limit: number): string {
  return value.length > limit ? `${value.substring(0, limit - 3)}…` : value;
}
