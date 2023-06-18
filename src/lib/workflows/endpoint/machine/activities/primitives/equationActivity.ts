import { createAtomActivity } from 'sequential-workflow-machine';
import { EquationStep } from '../../../model/steps/primitives/equationStepModel';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';

export const equationActivity = createAtomActivity<EquationStep, EndpointWorkflowGlobalState>({
  init: () => ({}),
  stepType: 'equation',
  handler: async (step: EquationStep, { $variables, $dynamics }: EndpointWorkflowGlobalState) => {
    if (!step.properties.result) {
      throw new Error('Result variable is not defined');
    }

    const a = $dynamics.readAny<number>(step.properties.a);
    const b = $dynamics.readAny<number>(step.properties.b);

    const result = calculate(a, b, step.properties.operator);
    $variables.set(step.properties.result.name, result);
  }
});

function calculate(a: number, b: number, operator: string): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    case '%':
      return a % b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
