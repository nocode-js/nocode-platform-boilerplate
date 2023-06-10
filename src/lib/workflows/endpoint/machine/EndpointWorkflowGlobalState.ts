import { LoggerService } from './services/LoggerService';
import { VariableState, VariablesService } from './services/VariablesService';

export interface EndpointWorkflowGlobalState {
  readonly variablesState: VariableState;

  // Services should have $ prefix.
  readonly $logger: LoggerService;
  readonly $variables: VariablesService;
}
