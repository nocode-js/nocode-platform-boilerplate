import {
  Dynamic,
  NullableVariable,
  WellKnownValueType,
  createChoiceValueModel,
  createStepModel,
  createDynamicValueModel,
  createGeneratedStringValueModel,
  createNullableVariableValueModel,
  createNumberValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

export interface EquationStep extends Step {
  type: 'equation';
  componentType: 'task';
  properties: {
    a: Dynamic<number | NullableVariable>;
    operator: string;
    b: Dynamic<number | NullableVariable>;
    result: NullableVariable;
  };
}

export const equationStepModel = createStepModel<EquationStep>('equation', 'task', step => {
  step.label('Equation');
  step.category('Primitives');
  step.description('Calculate value from two numbers. Result is stored in variable.\nResult = A Operator B');

  step
    .name()
    .dependentProperty('a')
    .dependentProperty('b')
    .dependentProperty('operator')
    .dependentProperty('result')
    .value(
      createGeneratedStringValueModel({
        generator(context) {
          const a = context.formatPropertyValue('a', StepNameFormatter.formatDynamic);
          const b = context.formatPropertyValue('b', StepNameFormatter.formatDynamic);
          const result = context.formatPropertyValue('result', StepNameFormatter.formatVariable);
          const operator = context.getPropertyValue('operator');
          return `${result} = ${a} ${operator} ${b}`;
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

  step.property('a').value(val).label('A');

  step.property('operator').value(
    createChoiceValueModel({
      choices: ['+', '-', '*', '/', '%']
    })
  );

  step.property('b').value(val).label('B');
});
