import {
  AnyVariables,
  Dynamic,
  NullableVariable,
  createAnyVariablesValueModel,
  createStepModel,
  createDynamicValueModel,
  createNullableVariableValueModel,
  createStringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface LogStep extends Step {
  type: 'log';
  componentType: 'task';
  properties: {
    message: Dynamic<string | NullableVariable>;
    variables: AnyVariables;
  };
}

export const logStepModel = createStepModel<LogStep>('log', 'task', step => {
  step.category('Tracing');

  step
    .property('message')
    .value(
      createDynamicValueModel({
        models: [
          createStringValueModel({}),
          createNullableVariableValueModel({
            isRequired: true,
            valueType: 'string'
          })
        ]
      })
    )
    .label('Text');

  step.property('variables').value(createAnyVariablesValueModel({})).label('Log variables');
});
