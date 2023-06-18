import { EndpointRepository } from './endpoint/EndpointRepository';
import { MemoryEndpointRepository } from './endpoint/MemoryEndpointRepository';

const storageType = process.env.STORAGE_TYPE || 'memory';

export interface Storage {
  endpoint: EndpointRepository;
}

function getStorage(type: string): Storage {
  switch (type) {
    case 'memory':
      return {
        endpoint: new MemoryEndpointRepository()
      };
    default:
      throw new Error(`Unknown storage type: ${storageType}`);
  }
}

export const storage = getStorage(storageType);
