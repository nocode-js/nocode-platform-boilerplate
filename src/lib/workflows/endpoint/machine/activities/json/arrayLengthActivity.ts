import { createAtomActivity } from 'sequential-workflow-machine';
import { JsonValueStep } from '../../../model/steps/json/jsonValueStepModel';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { Path } from 'sequential-workflow-editor-model';
import { ArrayLengthStep } from '../../../model/steps/json/arrayLengthStepModel';

export const arrayLengthActivity = createAtomActivity<ArrayLengthStep, EndpointWorkflowGlobalState>({
  stepType: 'arrayLength',
  init: () => ({}),
  handler: async (step: ArrayLengthStep, { $variables, $richText }: EndpointWorkflowGlobalState) => {
    if (!step.properties.json || !step.properties.output) {
      throw new Error('Invalid model');
    }

    const json = $variables.read<object>(step.properties.json.name);

    const path = Path.create(step.properties.path);
    $richText.updateArray(path.parts);
    const value = path.read(json);

    if (!Array.isArray(value)) {
      throw new Error('Expected array');
    }

    $variables.set(step.properties.output.name, value.length);
  }
});
