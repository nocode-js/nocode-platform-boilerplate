import {
  NullableAnyVariable,
  choiceValueModel,
  createStepModel,
  nullableAnyVariableValueModel,
  stringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface HttpRequestStep extends Step {
  componentType: 'task';
  type: 'httpRequest';
  properties: {
    method: string;
    url: string;
    response: NullableAnyVariable;
  };
}

export const httpRequestStepModel = createStepModel<HttpRequestStep>('httpRequest', 'task', step => {
  step.category('Requests');

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

  step
    .property('response')
    .value(
      nullableAnyVariableValueModel({
        valueTypes: ['string', 'json'],
        isRequired: true
      })
    )
    .label('Response variable');
});
