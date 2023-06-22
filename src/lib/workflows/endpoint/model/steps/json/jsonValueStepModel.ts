import {
  NullableAnyVariable,
  createStepModel,
  generatedStringValueModel,
  nullableAnyVariableValueModel,
  stringValueModel
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
      generatedStringValueModel({
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
