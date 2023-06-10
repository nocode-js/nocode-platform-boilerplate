import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { WrappedDefinition } from 'sequential-workflow-designer-react';

export interface DesignTabState {
  definition: WrappedDefinition<EndpointDefinition>;
  isDirty: boolean;
}

export function createDesignTabState(definition: EndpointDefinition): DesignTabState {
  return {
    definition: { value: definition } as WrappedDefinition<EndpointDefinition>,
    isDirty: false
  };
}
