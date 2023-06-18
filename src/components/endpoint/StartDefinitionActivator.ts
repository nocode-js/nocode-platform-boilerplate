import { UidGenerator } from '@/lib/core/UidGenerator';
import { EndpointDefinition, endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { ModelActivator } from 'sequential-workflow-editor-model';

export class StartDefinitionActivator {
  public static createDefault(): EndpointDefinition {
    const activator = ModelActivator.create(endpointDefinitionModel, UidGenerator.next);
    return activator.activateDefinition();
  }
}
