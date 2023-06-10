import { WorkflowMachineInterpreter, createWorkflowMachineBuilder } from 'sequential-workflow-machine';
import { activitySet } from './activitySet';
import { EndpointDefinition } from '../model/endpointDefinitionModel';
import { EndpointWorkflowGlobalState } from './EndpointWorkflowGlobalState';
import { LoggerService } from './services/LoggerService';
import { VariablesService, createVariableState } from './services/VariablesService';

const builder = createWorkflowMachineBuilder(activitySet);

export class EndpointWorkflowMachine {
  public static create(definition: EndpointDefinition, inputs: Record<string, unknown>): EndpointWorkflowMachine {
    const machine = builder.build(definition);
    const logger = new LoggerService();
    const variablesState = createVariableState();
    const variables = new VariablesService(variablesState);

    const interpreter = machine.create({
      init: () => {
        return {
          variablesState,
          $logger: logger,
          $variables: variables
        };
      }
    });
    return new EndpointWorkflowMachine(definition, interpreter, logger);
  }

  private constructor(
    private readonly definition: EndpointDefinition,
    private readonly interpreter: WorkflowMachineInterpreter<EndpointWorkflowGlobalState>,
    private readonly logger: LoggerService
  ) {}

  public start() {
    this.interpreter.start();
  }

  public async wait(): Promise<void> {
    return new Promise(resolve => {
      this.interpreter.onDone(() => {
        const snapshot = this.interpreter.getSnapshot();
        this.logger.log(`Workflow finished with status: ${snapshot.statePath.join()}`);
        if (snapshot.unhandledError) {
          this.logger.log(`Workflow finished with error: ${snapshot.unhandledError}`);
        }
        resolve();
      });
    });
  }

  public readLogs(): string[] {
    return this.logger.popAll();
  }

  public readOutputs(): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    const snapshot = this.interpreter.getSnapshot();
    this.definition.properties.outputs.variables.forEach(variable => {
      if (snapshot.globalState.$variables.isSet(variable.name)) {
        const value = snapshot.globalState.$variables.read(variable.name);
        values[variable.name] = value;
      }
    });
    return values;
  }
}
