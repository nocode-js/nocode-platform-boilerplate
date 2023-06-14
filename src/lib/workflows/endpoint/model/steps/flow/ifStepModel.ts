import {
  Dynamic,
  NullableAnyVariable,
  booleanValueModel,
  branchesValueModel,
  choiceValueModel,
  createBranchedStepModel,
  dynamicValueModel,
  nullableAnyVariableValueModel,
  numberValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { BranchedStep } from 'sequential-workflow-model';

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
  step.category('Flow');

  const ab = dynamicValueModel({
    models: [
      nullableAnyVariableValueModel({
        isRequired: true,
        valueTypes: ['string', 'number', 'boolean']
      }),
      stringValueModel({}),
      numberValueModel({}),
      booleanValueModel({})
    ]
  });
  step.property('a').value(ab);
  step.property('comparison').value(
    choiceValueModel({
      choices: ['==', '===', '!=', '!==', '>', '<', '>=', '<='],
      defaultValue: '=='
    })
  );
  step.property('b').value(ab);
  step.branches().value(
    branchesValueModel({
      branches: {
        true: [],
        false: []
      }
    })
  );
});
