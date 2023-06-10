import { createAtomActivity } from 'sequential-workflow-machine';
import { DownloadHtmlStep } from '../../model/downloadHtmlStepModel';
import { EndpointWorkflowGlobalState } from '../EndpointWorkflowGlobalState';

export const downloadHtmlActivity = createAtomActivity<DownloadHtmlStep, EndpointWorkflowGlobalState>({
  stepType: 'downloadHtml',
  init: () => ({}),
  handler: async (step: DownloadHtmlStep, { $logger, $variables }: EndpointWorkflowGlobalState) => {
    if (!step.properties.variableName) {
      throw new Error('variableName is not set');
    }

    const response = await fetch(step.properties.url);
    const html = await response.text();

    $logger.log(`downloaded ${html.length} characters`);

    $variables.set(step.properties.variableName.name, html);
  }
});
