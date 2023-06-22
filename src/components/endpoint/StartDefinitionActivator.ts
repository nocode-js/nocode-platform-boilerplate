import { UidGenerator } from '@/lib/core/UidGenerator';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/EndpointDefinition';
import { endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { ModelActivator } from 'sequential-workflow-editor-model';

export class StartDefinitionActivator {
  public static createDefault(): EndpointDefinition {
    const activator = ModelActivator.create(endpointDefinitionModel, UidGenerator.next);
    return activator.activateDefinition();
  }
}
