import { Endpoint } from './Endpoint';
import { EndpointJSON } from './EndpointJSON';
import { EndpointRepository } from './EndpointRepository';

declare global {
  var endpointCollection: EndpointJSON[] | undefined;
}

function getCollection(): EndpointJSON[] {
  return global.endpointCollection || (global.endpointCollection = []);
}

export class MemoryEndpointRepository implements EndpointRepository {
  public async insert(endpoint: Endpoint): Promise<void> {
    getCollection().push(endpoint.toJSON());
  }

  public async update(endpoint: Endpoint): Promise<void> {
    const collection = getCollection();
    const index = collection.findIndex(e => e.id === endpoint.id);
    if (index < 0) {
      throw new Error(`Cannot find endpoint id: ${endpoint.id}`);
    }
    collection.splice(index, 1);
    collection.push(endpoint.toJSON());
  }

  public async tryDeleteById(id: string): Promise<boolean> {
    const collection = getCollection();
    const index = collection.findIndex(e => e.id === id);
    if (index < 0) {
      return false;
    }
    collection.splice(index, 1);
    return true;
  }

  public async getAll(): Promise<Endpoint[]> {
    return getCollection().map(Endpoint.fromJSON);
  }

  public async tryGetById(id: string): Promise<Endpoint | null> {
    const item = getCollection().find(endpoint => endpoint.id === id);
    return item ? Endpoint.fromJSON(item) : null;
  }

  public async tryGetByUrl(url: string): Promise<Endpoint | null> {
    const item = getCollection().find(endpoint => endpoint.url === url);
    return item ? Endpoint.fromJSON(item) : null;
  }
}
