import { EndpointRepository } from './endpoint/EndpointRepository';
import { MemoryEndpointRepository } from './endpoint/MemoryEndpointRepository';
import { MongoEndpointRepository } from './endpoint/MongoEndpointRepository';
import { MongoProvider } from './MongoProvider';

export interface Storage {
  endpoint: EndpointRepository;
}

function getStorage(): Storage {
  const type = process.env.STORAGE_TYPE || 'memory';
  switch (type) {
    case 'memory':
      return {
        endpoint: new MemoryEndpointRepository()
      };
    case 'mongodb': {
      const provider = MongoProvider.create();
      return {
        endpoint: new MongoEndpointRepository(provider)
      };
    }
    default:
      throw new Error(`Unknown storage type: ${type}`);
  }
}

export const storage = getStorage();
