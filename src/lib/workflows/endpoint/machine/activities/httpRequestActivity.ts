import { createAtomActivity } from 'sequential-workflow-machine';
import { HttpRequestStep } from '../../model/httpRequestModel';
import { EndpointWorkflowGlobalState } from '../EndpointWorkflowGlobalState';

export const httpRequestActivity = createAtomActivity<HttpRequestStep, EndpointWorkflowGlobalState>({
  stepType: 'httpRequest',
  init: () => ({}),
  handler: async (step: HttpRequestStep, { $logger, $variables }: EndpointWorkflowGlobalState) => {
    if (!step.properties.result) {
      throw new Error('Result variable is not set');
    }

    const response = await fetch(step.properties.url);
    const html = await response.text();

    $logger.log(`downloaded ${html.length} characters`);

    $variables.set(step.properties.result.name, html);
  }
});
