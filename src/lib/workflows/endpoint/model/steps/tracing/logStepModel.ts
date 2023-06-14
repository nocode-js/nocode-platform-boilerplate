import {
  AnyVariables,
  Dynamic,
  NullableVariable,
  anyVariablesValueModel,
  createStepModel,
  dynamicValueModel,
  nullableVariableValueModel,
  stringValueModel
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
      dynamicValueModel({
        models: [
          stringValueModel({}),
          nullableVariableValueModel({
            isRequired: true,
            valueType: 'string'
          })
        ]
      })
    )
    .label('Text');

  step.property('variables').value(anyVariablesValueModel({})).label('Log variables');
});
