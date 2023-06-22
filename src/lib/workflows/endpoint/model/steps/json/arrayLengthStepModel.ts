import {
  NullableAnyVariable,
  NullableVariable,
  createStepModel,
  generatedStringValueModel,
  nullableAnyVariableValueModel,
  nullableVariableValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

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
  step.label('ArrayLength');
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
          return `${output} = ${json}[${path}].count`;
        }
      })
    );

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
