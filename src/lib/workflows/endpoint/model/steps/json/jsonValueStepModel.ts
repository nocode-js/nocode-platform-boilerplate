import {
  NullableAnyVariable,
  createStepModel,
  createGeneratedStringValueModel,
  createNullableAnyVariableValueModel,
  createStringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

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
  step.label('JsonValue');
  step.category('JSON');

  step
    .name()
    .dependentProperty('json')
    .dependentProperty('path')
    .dependentProperty('output')
    .value(
      createGeneratedStringValueModel({
        generator(context) {
          const json = context.formatPropertyValue('json', StepNameFormatter.formatVariable);
          const path = context.formatPropertyValue('path', StepNameFormatter.createStringFormatter(8));
          const output = context.formatPropertyValue('output', StepNameFormatter.formatVariable);
          return `${output} = ${json}[${path}]`;
        }
      })
    );

  step
    .property('json')
    .value(
      createNullableAnyVariableValueModel({
        valueTypes: ['json'],
        isRequired: true
      })
    )
    .label('JSON');

  step
    .property('path')
    .value(
      createStringValueModel({
        minLength: 1
      })
    )
    .hint('Path to the JSON node. It may contain variables. For example: alfa/$index/beta');

  step
    .property('output')
    .value(
      createNullableAnyVariableValueModel({
        valueTypes: ['string', 'number'],
        isRequired: true
      })
    )
    .label('Output');
});
