import { EndpointDefinition } from '../workflows/endpoint/model/EndpointDefinition';

export interface UpdateEndpointRequest {
  name: string;
  url: string;
  description: string;
  definition: EndpointDefinition;
}
