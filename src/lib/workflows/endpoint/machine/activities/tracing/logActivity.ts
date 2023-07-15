import { createAtomActivity } from 'sequential-workflow-machine';
import { EndpointWorkflowGlobalState } from '../../EndpointWorkflowGlobalState';
import { LogStep } from '../../../model/steps/tracing/logStepModel';
import { formatVariableName } from 'sequential-workflow-editor';

export const logActivity = createAtomActivity<LogStep, EndpointWorkflowGlobalState>('log', {
  init: () => ({}),
  handler: async (step: LogStep, { $variables, $dynamics, $logger }: EndpointWorkflowGlobalState) => {
    let message = $dynamics.readAny(step.properties.message);

    for (const variable of step.properties.variables.variables) {
      let value = $variables.isSet(variable.name) ? $variables.read(variable.name) ?? '<empty>' : '<not set>';
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      const name = formatVariableName(variable.name);
      message += `, ${name}=${value} (${variable.type})`;
    }

    $logger.log(message);
  }
});
