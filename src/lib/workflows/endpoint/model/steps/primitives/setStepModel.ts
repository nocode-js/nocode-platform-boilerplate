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
    source: Dynamic<NullableAnyVariable | string | number | boolean>;
    target: NullableAnyVariable;
  };
}

export const setStepModel = createStepModel<SetStep>('set', 'task', step => {
  step.category('Primitives');

  step.property('source').value(
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

  step.property('target').value(
    nullableAnyVariableValueModel({
      isRequired: true
    })
  );
});
