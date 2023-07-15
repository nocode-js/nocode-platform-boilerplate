import {
  Dynamic,
  NullableAnyVariable,
  createBooleanValueModel,
  createBranchesValueModel,
  createChoiceValueModel,
  createBranchedStepModel,
  createDynamicValueModel,
  createGeneratedStringValueModel,
  createNullableAnyVariableValueModel,
  createNumberValueModel,
  createStringValueModel
} from 'sequential-workflow-editor-model';
import { BranchedStep } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

export interface IfStep extends BranchedStep {
  componentType: 'switch';
  type: 'if';
  properties: {
    a: Dynamic<NullableAnyVariable | string | number | boolean>;
    comparison: string;
    b: Dynamic<NullableAnyVariable | string | number | boolean>;
  };
}

export const ifStepModel = createBranchedStepModel<IfStep>('if', 'switch', step => {
  step.label('If');
  step.category('Flow');

  step
    .name()
    .dependentProperty('a')
    .dependentProperty('comparison')
    .dependentProperty('b')
    .value(
      createGeneratedStringValueModel({
        generator(context) {
          const a = context.formatPropertyValue('a', StepNameFormatter.formatDynamic);
          const comparison = context.getPropertyValue('comparison');
          const b = context.formatPropertyValue('b', StepNameFormatter.formatDynamic);
          return `${a} ${comparison} ${b}`;
        }
      })
    );

  const ab = createDynamicValueModel({
    models: [
      createNullableAnyVariableValueModel({
        isRequired: true,
        valueTypes: ['string', 'number', 'boolean']
      }),
      createStringValueModel({}),
      createNumberValueModel({}),
      createBooleanValueModel({})
    ]
  });
  step.property('a').value(ab);
  step.property('comparison').value(
    createChoiceValueModel({
      choices: ['==', '===', '!=', '!==', '>', '<', '>=', '<='],
      defaultValue: '=='
    })
  );
  step.property('b').value(ab);
  step.branches().value(
    createBranchesValueModel({
      branches: {
        true: [],
        false: []
      }
    })
  );
});
