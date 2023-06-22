import {
  Dynamic,
  NullableVariable,
  NullableVariableDefinition,
  VariableDefinition,
  createSequentialStepModel,
  dynamicValueModel,
  generatedStringValueModel,
  nullableVariableDefinitionValueModel,
  nullableVariableValueModel,
  numberValueModel
} from 'sequential-workflow-editor-model';
import { SequentialStep } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

export interface ForStep extends SequentialStep {
  componentType: 'container';
  type: 'for';
  properties: {
    from: Dynamic<NullableVariable | number>;
    to: Dynamic<NullableVariable | number>;
    delta: Dynamic<NullableVariable | number>;
    indexVariable: NullableVariableDefinition;
  };
}

export const forStepModel = createSequentialStepModel<ForStep>('for', 'container', step => {
  step.label('For');
  step.category('Flow');

  step
    .name()
    .dependentProperty('from')
    .dependentProperty('to')
    .dependentProperty('delta')
    .value(
      generatedStringValueModel({
        generator(context) {
          const from = context.formatPropertyValue('from', StepNameFormatter.formatDynamic);
          const to = context.formatPropertyValue('to', StepNameFormatter.formatDynamic);
          const delta = context.formatPropertyValue('delta', StepNameFormatter.formatDynamic);
          return `${from} < ${to}, Δ${delta}`;
        }
      })
    );

  const val = dynamicValueModel({
    models: [
      nullableVariableValueModel({
        isRequired: true,
        valueType: 'number'
      }),
      numberValueModel({})
    ]
  });

  step.property('from').value(val);
  step.property('to').value(val);
  step.property('delta').value(val);

  step.property('indexVariable').value(
    nullableVariableDefinitionValueModel({
      valueType: 'number',
      defaultValue: {
        name: 'index',
        type: 'number'
      },
      isRequired: true
    })
  );
});
