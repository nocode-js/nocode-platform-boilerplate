import {
  Dynamic,
  NullableAnyVariable,
  NullableVariable,
  nullableAnyVariableValueModelId,
  nullableVariableValueModelId,
  numberValueModelId,
  stringValueModelId
} from 'sequential-workflow-editor-model';
import { VariablesService } from './VariablesService';

export class DynamicsService {
  public constructor(private readonly $variables: VariablesService) {}

  public readAny<TValue>(dynamic: Dynamic<TValue | NullableVariable>): TValue {
    switch (dynamic.modelId) {
      case stringValueModelId:
      case numberValueModelId:
        return dynamic.value as TValue;

      case nullableVariableValueModelId:
      case nullableAnyVariableValueModelId: {
        const variable = dynamic.value as NullableVariable | NullableAnyVariable;
        if (!variable || !variable.name) {
          throw new Error('Variable is not set');
        }
        return this.$variables.read<TValue>(variable.name);
      }
    }
    throw new Error(`Model is not supported: ${dynamic.modelId}`);
  }
}
