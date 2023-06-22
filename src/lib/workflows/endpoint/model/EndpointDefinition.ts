import { VariableDefinitions } from 'sequential-workflow-editor-model';
import { Definition } from 'sequential-workflow-model';

export interface EndpointDefinition extends Definition {
  properties: {
    inputs: VariableDefinitions;
    internals: VariableDefinitions;
    outputs: VariableDefinitions;
  };
}
