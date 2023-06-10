import { CreateEndpointRequest } from './CreateEndpointRequest';
import { ExecuteEndpointRequest } from './ExecuteEndpointRequest';
import { ExecuteEndpointResponse } from './ExecuteEndpointResponse';
import { UpdateEndpointRequest } from './UpdateEndpointRequest';

const headers = {
  'Content-Type': 'application/json'
};

export class ApiClient {
  public static async createEndpoint(request: CreateEndpointRequest): Promise<string> {
    const result = await fetch('/api/endpoints', {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    });
    const json = await result.json();
    return json['id'];
  }

  public static async updateEndpoint(id: string, request: UpdateEndpointRequest): Promise<void> {
    await fetch(`/api/endpoints/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(request)
    });
  }

  public static async executeEndpoint(url: string, request: ExecuteEndpointRequest): Promise<ExecuteEndpointResponse> {
    const result = await fetch(`/api/functions/${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    });
    return await result.json();
  }
}
