import { createAtomActivity } from 'sequential-workflow-machine';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { ArrayLengthStep } from '../../../model/steps/json/arrayLengthStepModel';

export const arrayLengthActivity = createAtomActivity<ArrayLengthStep, EndpointWorkflowGlobalState>({
  stepType: 'arrayLength',
  init: () => ({}),
  handler: async (step: ArrayLengthStep, { $variables, $evaluator: $richText }: EndpointWorkflowGlobalState) => {
    if (!step.properties.json || !step.properties.output) {
      throw new Error('Invalid model');
    }

    const json = $variables.read<object>(step.properties.json.name);

    const path = $richText.evaluatePath(step.properties.path);
    const value = path.read(json);

    if (!Array.isArray(value)) {
      throw new Error('Expected array');
    }

    $variables.set(step.properties.output.name, value.length);
  }
});
