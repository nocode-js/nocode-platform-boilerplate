import {
  Dynamic,
  NullableAnyVariable,
  booleanValueModel,
  createStepModel,
  dynamicValueModel,
  nullableAnyVariableValueModel,
  numberValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface SetStep extends Step {
  type: 'set';
  componentType: 'task';
  properties: {
    result: NullableAnyVariable;
    value: Dynamic<NullableAnyVariable | string | number | boolean>;
  };
}

export const setStepModel = createStepModel<SetStep>('set', 'task', step => {
  step.category('Primitives');
  step.description('Sets value to variable.\nResult = Value');

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
