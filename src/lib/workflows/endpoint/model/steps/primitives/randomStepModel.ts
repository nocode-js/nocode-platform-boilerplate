import {
  Dynamic,
  NullableVariable,
  WellKnownValueType,
  createStepModel,
  createDynamicValueModel,
  createGeneratedStringValueModel,
  createNullableVariableValueModel,
  createNumberValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

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
  step.label('Rand');
  step.category('Primitives');
  step.description('Random number between two numbers');

  step
    .name()
    .dependentProperty('from')
    .dependentProperty('to')
    .dependentProperty('result')
    .value(
      createGeneratedStringValueModel({
        generator(context) {
          const from = context.formatPropertyValue('from', StepNameFormatter.formatDynamic);
          const to = context.formatPropertyValue('to', StepNameFormatter.formatDynamic);
          const result = context.formatPropertyValue('result', StepNameFormatter.formatVariable);
          return `${result} = Rand(${from}, ${to})`;
        }
      })
    );

  const val = createDynamicValueModel({
    models: [
      createNumberValueModel({}),
      createNullableVariableValueModel({
        isRequired: true,
        valueType: WellKnownValueType.number
      })
    ]
  });

  step.property('result').value(
    createNullableVariableValueModel({
      valueType: WellKnownValueType.number,
      isRequired: true
    })
  );

  step.property('from').value(val).label('From');
  step.property('to').value(val).label('To');
});
