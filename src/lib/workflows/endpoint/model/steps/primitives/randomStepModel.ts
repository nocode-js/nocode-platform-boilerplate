import {
  Dynamic,
  NullableVariable,
  ValueKnownType,
  createStepModel,
  dynamicValueModel,
  nullableVariableValueModel,
  numberValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface RandomStep extends Step {
  type: 'random';
  componentType: 'task';
  properties: {
    from: Dynamic<number | NullableVariable>;
    to: Dynamic<number | NullableVariable>;
    result: NullableVariable;
  };
}

export const randomStepModel = createStepModel<RandomStep>('random', 'task', step => {
  step.category('Primitives');
  step.description('Random number between two numbers');

  const val = dynamicValueModel({
    models: [
      numberValueModel({}),
      nullableVariableValueModel({
        isRequired: true,
        valueType: ValueKnownType.number
      })
    ]
  });

  step.property('result').value(
    nullableVariableValueModel({
      valueType: ValueKnownType.number,
      isRequired: true
    })
  );

  step.property('from').value(val).label('From');
  step.property('to').value(val).label('To');
});
