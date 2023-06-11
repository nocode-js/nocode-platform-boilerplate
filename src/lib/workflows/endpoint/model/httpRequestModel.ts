import {
  NullableVariable,
  choiceValueModel,
  createStepModel,
  nullableVariableValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface HttpRequestStep extends Step {
  componentType: 'task';
  type: 'httpRequest';
  properties: {
    method: string;
    url: string;
    result: NullableVariable;
  };
}

export const httpRequestStepModel = createStepModel<HttpRequestStep>('httpRequest', 'task', step => {
  step.property('method').value(
    choiceValueModel({
      choices: ['GET', 'POST'],
      defaultValue: 'GET'
    })
  );

  step.property('url').value(
    stringValueModel({
      minLength: 1
    })
  );

  step.property('result').value(
    nullableVariableValueModel({
      variableType: 'string',
      isRequired: true
    })
  );
});
