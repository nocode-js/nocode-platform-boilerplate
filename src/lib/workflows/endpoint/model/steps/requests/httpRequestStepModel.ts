import {
  NullableAnyVariable,
  createChoiceValueModel,
  createStepModel,
  createGeneratedStringValueModel,
  createNullableAnyVariableValueModel,
  createStringValueModel
} from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';
import { StepNameFormatter } from '../../StepNameFormatter';

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
  step.label('HttpRequest');
  step.category('Requests');

  step
    .name()
    .dependentProperty('method')
    .dependentProperty('response')
    .dependentProperty('url')
    .value(
      createGeneratedStringValueModel({
        generator(context) {
          const method = context.getPropertyValue('method');
          const urlRaw = context.getPropertyValue('url');
          let url = '?';
          try {
            const parsed = new URL(urlRaw);
            url = `${parsed.protocol}//${parsed.host}`;
          } catch (e) {}
          const response = context.formatPropertyValue('response', StepNameFormatter.formatVariable);
          return `${response} = ${method} ${url}`;
        }
      })
    );

  step.property('method').value(
    createChoiceValueModel({
      choices: ['GET', 'POST'],
      defaultValue: 'GET'
    })
  );

  step.property('url').value(
    createStringValueModel({
      minLength: 1
    })
  );

  step
    .property('response')
    .value(
      createNullableAnyVariableValueModel({
        valueTypes: ['string', 'json'],
        isRequired: true
      })
    )
    .label('Response variable');
});
