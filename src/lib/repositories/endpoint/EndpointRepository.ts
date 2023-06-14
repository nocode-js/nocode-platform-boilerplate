import { Endpoint } from './Endpoint';

export interface EndpointRepository {
  insert(endpoint: Endpoint): Promise<void>;
  update(endpoint: Endpoint): Promise<void>;
  /**
   * @returns true if the endpoint was found and deleted, false if the endpoint was not found.
   */
  tryDeleteById(endpoint: string): Promise<boolean>;
  getAll(): Promise<Endpoint[]>;
  tryGetById(id: string): Promise<Endpoint | null>;
  tryGetByUrl(url: string): Promise<Endpoint | null>;
}
