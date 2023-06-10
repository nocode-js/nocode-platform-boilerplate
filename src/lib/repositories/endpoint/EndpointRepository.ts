import { Endpoint } from './Endpoint';

export interface EndpointRepository {
  insert(endpoint: Endpoint): Promise<void>;
  update(endpoint: Endpoint): Promise<void>;
  getAll(): Promise<Endpoint[]>;
  tryGetById(id: string): Promise<Endpoint | null>;
  tryGetByUrl(url: string): Promise<Endpoint | null>;
}
