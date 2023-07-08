import {
  Dynamic,
  NullableVariable,
  WellKnownValueType,
  createStepModel,
  dynamicValueModel,
  generatedStringValueModel,
  nullableVariableValueModel,
  numberValueModel
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
      generatedStringValueModel({
        generator(context) {
          const from = context.formatPropertyValue('from', StepNameFormatter.formatDynamic);
          const to = context.formatPropertyValue('to', StepNameFormatter.formatDynamic);
          const result = context.formatPropertyValue('result', StepNameFormatter.formatVariable);
          return `${result} = Rand(${from}, ${to})`;
        }
      })
    );

  const val = dynamicValueModel({
    models: [
      numberValueModel({}),
      nullableVariableValueModel({
        isRequired: true,
        valueType: WellKnownValueType.number
      })
    ]
  });

  step.property('result').value(
    nullableVariableValueModel({
      valueType: WellKnownValueType.number,
      isRequired: true
    })
  );

  step.property('from').value(val).label('From');
  step.property('to').value(val).label('To');
});
