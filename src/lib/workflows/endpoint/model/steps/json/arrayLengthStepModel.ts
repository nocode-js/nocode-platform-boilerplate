import {
  NullableAnyVariable,
  NullableVariable,
  createStepModel,
  nullableAnyVariableValueModel,
  nullableVariableValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface ArrayLengthStep extends Step {
  componentType: 'task';
  type: 'arrayLength';
  properties: {
    json: NullableAnyVariable;
    path: string;
    output: NullableVariable;
  };
}

export const arrayLengthStepModel = createStepModel<ArrayLengthStep>('arrayLength', 'task', step => {
  step.category('JSON');

  step.property('json').value(
    nullableAnyVariableValueModel({
      valueTypes: ['json'],
      isRequired: true
    })
  );

  step
    .property('path')
    .value(
      stringValueModel({
        minLength: 1
      })
    )
    .hint('Path to the JSON node. It may contain variables. For example: alfa/$index/beta');

  step.property('output').value(
    nullableVariableValueModel({
      valueType: 'number',
      isRequired: true
    })
  );
});
