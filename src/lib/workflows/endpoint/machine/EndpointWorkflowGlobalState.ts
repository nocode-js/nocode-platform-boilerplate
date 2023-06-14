import { DynamicsService } from './services/DynamicsService';
import { LoggerService } from './services/LoggerService';
import { RichTextService } from './services/RichTextService';
import { VariableState, VariablesService } from './services/VariablesService';

export interface EndpointWorkflowGlobalState {
  readonly variablesState: VariableState;

  // Services should have $ prefix.
  readonly $logger: LoggerService;
  readonly $variables: VariablesService;
  readonly $dynamics: DynamicsService;
  readonly $richText: RichTextService;
}
