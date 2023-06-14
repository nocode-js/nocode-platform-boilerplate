import { createAtomActivity } from 'sequential-workflow-machine';
import { JsonValueStep } from '../../../model/steps/json/jsonValueStepModel';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { Path } from 'sequential-workflow-editor-model';

export const jsonValueActivity = createAtomActivity<JsonValueStep, EndpointWorkflowGlobalState>({
  stepType: 'jsonValue',
  init: () => ({}),
  handler: async (step: JsonValueStep, { $variables, $richText }: EndpointWorkflowGlobalState) => {
    if (!step.properties.json || !step.properties.output) {
      throw new Error('Invalid model');
    }

    const json = $variables.read<object>(step.properties.json.name);

    const path = Path.create(step.properties.path);
    $richText.updateArray(path.parts);
    const value = path.read(json);

    const targetValue = castToType(value, step.properties.output.type);
    $variables.set(step.properties.output.name, targetValue);
  }
});

function castToType(value: unknown, type: string): unknown {
  switch (type) {
    case 'string':
      return String(value);
    case 'number':
      return Number(value);
    default:
      throw new Error('Not supported target variable type');
  }
}
