import { createAtomActivity } from 'sequential-workflow-machine';
import { HttpRequestStep } from '../../../model/steps/requests/httpRequestStepModel';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';

export const httpRequestActivity = createAtomActivity<HttpRequestStep, EndpointWorkflowGlobalState>('httpRequest', {
  init: () => ({}),
  handler: async (step: HttpRequestStep, { $logger, $variables, $evaluator: $richText }: EndpointWorkflowGlobalState) => {
    if (!step.properties.response) {
      throw new Error('Result variable is not set');
    }

    const url = $richText.evaluateUrl(step.properties.url);
    const text = await httpRequest(step.properties.method, url);

    $logger.log(`Downloaded ${text.length} bytes from ${url}`);

    let value: unknown;
    switch (step.properties.response.type) {
      case 'string':
        value = text;
        break;
      case 'json':
        value = JSON.parse(text);
        break;
      default:
        throw new Error('Not supported response variable type');
    }

    $variables.set(step.properties.response.name, value);
  }
});

async function httpRequest(method: string, url: string) {
  const response = await fetch(url, {
    method,
    cache: 'no-cache'
  });
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.text();
}
