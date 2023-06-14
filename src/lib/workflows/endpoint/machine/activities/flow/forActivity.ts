import { createLoopActivity } from 'sequential-workflow-machine';
import { ForStep } from '../../../model/steps/flow/forStepModel';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';

interface ForLoopActivityState {
  indexVariableName: string;
  isFirstEnter: boolean | null;
}

export const forActivity = createLoopActivity<ForStep, EndpointWorkflowGlobalState, ForLoopActivityState>({
  stepType: 'for',
  loopName: step => `FOR.${step.id}`,
  init: ({ properties }: ForStep) => {
    if (!properties.indexVariable) {
      throw new Error('Index variable is required');
    }
    return {
      indexVariableName: properties.indexVariable.name,
      isFirstEnter: null
    };
  },
  onEnter: ({ properties }: ForStep, { $dynamics, $variables }, activityState) => {
    const startValue = $dynamics.readAny<number>(properties.from);
    $variables.set(activityState.indexVariableName, startValue);
    activityState.isFirstEnter = true;
  },
  onLeave: (_, { $variables }, { indexVariableName }) => {
    $variables.delete(indexVariableName);
  },
  condition: async ({ properties }: ForStep, { $dynamics, $variables }, activityState) => {
    const to = $dynamics.readAny<number>(properties.to);
    let index = $variables.read<number>(activityState.indexVariableName);

    if (activityState.isFirstEnter) {
      activityState.isFirstEnter = false;
    } else {
      index++;
    }

    $variables.set(activityState.indexVariableName, index);
    return index < to;
  }
});
