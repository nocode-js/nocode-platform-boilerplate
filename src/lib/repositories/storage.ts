import { EndpointRepository } from './endpoint/EndpointRepository';
import { MemoryEndpointRepository } from './endpoint/MemoryEndpointRepository';

export interface Storage {
  endpoint: EndpointRepository;
}

export const storage: Storage = {
  endpoint: new MemoryEndpointRepository()
};
