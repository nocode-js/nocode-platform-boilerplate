import { createAtomActivity } from 'sequential-workflow-machine';
import { ReadJsonNodeStep } from '../../model/readJsonNodeStepModel';
import { EndpointWorkflowGlobalState } from '../EndpointWorkflowGlobalState';
import { Path } from 'sequential-workflow-editor-model';

export const readJsonNodeActivity = createAtomActivity<ReadJsonNodeStep, EndpointWorkflowGlobalState>({
  stepType: 'readJsonNode',
  init: () => ({}),
  handler: async (step: ReadJsonNodeStep, { $variables }: EndpointWorkflowGlobalState) => {
    if (!step.properties.source) {
      throw new Error('Source variable is not set');
    }
    if (!step.properties.target) {
      throw new Error('Target variable is not set');
    }

    const jsonRaw = $variables.read<string>(step.properties.source.name);
    const json = JSON.parse(jsonRaw);

    const value = Path.create(step.properties.selector).read(json);
    const valueStr = String(value);

    $variables.set(step.properties.target.name, valueStr);
  }
});
