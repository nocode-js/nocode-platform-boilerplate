import { createAtomActivity } from 'sequential-workflow-machine';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { SetStep } from '../../../model/steps/primitives/setStepModel';

export const setActivity = createAtomActivity<SetStep, EndpointWorkflowGlobalState>('set', {
  init: () => ({}),
  handler: async ({ properties }: SetStep, { $dynamics, $variables }: EndpointWorkflowGlobalState) => {
    if (!properties.result) {
      throw new Error('Target variable is required');
    }

    const source = $dynamics.readAny(properties.value);
    const value = convertValue(source, properties.result.type);
    $variables.set(properties.result.name, value);
  }
});

function convertValue(source: unknown, type: string): unknown {
  switch (type) {
    case 'string':
      {
        if (typeof source === 'string') {
          return source;
        }
        if (typeof source === 'number') {
          return source.toString();
        }
        if (typeof source === 'boolean') {
          return source.toString();
        }
      }
      break;
    case 'number':
      {
        if (typeof source === 'string') {
          return Number(source);
        }
        if (typeof source === 'number') {
          return source;
        }
        if (typeof source === 'boolean') {
          return source ? 1 : 0;
        }
      }
      break;
    case 'boolean':
      {
        if (typeof source === 'string') {
          return source === 'true';
        }
        if (typeof source === 'number') {
          return source === 1;
        }
        if (typeof source === 'boolean') {
          return source;
        }
      }
      break;
    case 'json': {
      if (typeof source === 'string') {
        return JSON.parse(source);
      }
    }
  }
  throw new Error(`Cannot convert value to type ${type}`);
}
