import {
  Dynamic,
  NullableVariable,
  NullableVariableDefinition,
  VariableDefinition,
  createSequentialStepModel,
  dynamicValueModel,
  nullableVariableDefinitionValueModel,
  nullableVariableValueModel,
  numberValueModel
} from 'sequential-workflow-editor-model';
import { SequentialStep } from 'sequential-workflow-model';

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

export const forStepModel = createSequentialStepModel('for', 'container', step => {
  step.category('Flow');

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
