import { createAtomActivity } from 'sequential-workflow-machine';
import { ReadHtmlTagStep } from '../../model/readHtmlTagStepModel';
import { EndpointWorkflowGlobalState } from '../EndpointWorkflowGlobalState';

export const readHtmlTagActivity = createAtomActivity<ReadHtmlTagStep, EndpointWorkflowGlobalState>({
  stepType: 'readHtmlTag',
  init: () => ({}),
  handler: async () => {
    //
  }
});
