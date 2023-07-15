import { createAtomActivity } from 'sequential-workflow-machine';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { RandomStep } from '../../../model/steps/primitives/randomStepModel';

export const randomActivity = createAtomActivity<RandomStep, EndpointWorkflowGlobalState>('random', {
  init: () => ({}),
  handler: async (step: RandomStep, { $variables, $dynamics }: EndpointWorkflowGlobalState) => {
    if (!step.properties.result) {
      throw new Error('Result variable is not defined');
    }

    const from = $dynamics.readAny<number>(step.properties.from);
    const to = $dynamics.readAny<number>(step.properties.to);

    const value = Math.floor(Math.random() * (to - from + 1) + from);

    $variables.set(step.properties.result.name, value);
  }
});
