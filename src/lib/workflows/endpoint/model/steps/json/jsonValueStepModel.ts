import { NullableAnyVariable, createStepModel, nullableAnyVariableValueModel, stringValueModel } from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface JsonValueStep extends Step {
  componentType: 'task';
  type: 'jsonValue';
  properties: {
    json: NullableAnyVariable;
    path: string;
    output: NullableAnyVariable;
  };
}

export const jsonValueStepModel = createStepModel<JsonValueStep>('jsonValue', 'task', step => {
  step.category('JSON');

  step
    .property('json')
    .value(
      nullableAnyVariableValueModel({
        valueTypes: ['json'],
        isRequired: true
      })
    )
    .label('JSON');

  step
    .property('path')
    .value(
      stringValueModel({
        minLength: 1
      })
    )
    .hint('Path to the JSON node. It may contain variables. For example: alfa/$index/beta');

  step
    .property('output')
    .value(
      nullableAnyVariableValueModel({
        valueTypes: ['string', 'number'],
        isRequired: true
      })
    )
    .label('Output');
});
