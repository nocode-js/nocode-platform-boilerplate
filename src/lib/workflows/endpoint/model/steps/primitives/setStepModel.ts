import {
  Dynamic,
  NullableAnyVariable,
  booleanValueModel,
  createStepModel,
  dynamicValueModel,
  generatedStringValueModel,
  nullableAnyVariableValueModel,
  numberValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

export interface SetStep extends Step {
  type: 'set';
  componentType: 'task';
  properties: {
    result: NullableAnyVariable;
    value: Dynamic<NullableAnyVariable | string | number | boolean>;
  };
}

export const setStepModel = createStepModel<SetStep>('set', 'task', step => {
  step.label('Set');
  step.category('Primitives');
  step.description('Sets value to variable.\nResult = Value');

  step
    .name()
    .dependentProperty('result')
    .dependentProperty('value')
    .value(
      generatedStringValueModel({
        generator(context) {
          const result = context.formatPropertyValue('result', StepNameFormatter.formatVariable);
          const value = context.formatPropertyValue('value', StepNameFormatter.formatDynamic);
          return `${result} = ${value}`;
        }
      })
    );

  step.property('result').value(
    nullableAnyVariableValueModel({
      isRequired: true
    })
  );

  step.property('value').value(
    dynamicValueModel({
      models: [
        nullableAnyVariableValueModel({
          isRequired: true
        }),
        stringValueModel({}),
        numberValueModel({}),
        booleanValueModel({})
      ]
    })
  );
});
