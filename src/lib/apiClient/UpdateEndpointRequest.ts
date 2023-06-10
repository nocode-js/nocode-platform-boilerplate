import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';

export interface UpdateEndpointRequest {
  name: string;
  url: string;
  description: string;
  definition: EndpointDefinition;
}
