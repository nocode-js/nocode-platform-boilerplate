import { CreateEndpointRequest } from './CreateEndpointRequest';
import { ExecuteEndpointRequest } from './ExecuteEndpointRequest';
import { ExecuteEndpointResponse } from './ExecuteEndpointResponse';
import { UpdateEndpointRequest } from './UpdateEndpointRequest';

export class ApiClient {
  public static async createEndpoint(request: CreateEndpointRequest): Promise<string> {
    const result = await httpRequest('/api/endpoints', {
      method: 'POST',
      body: JSON.stringify(request)
    });
    return result['id'];
  }

  public static async updateEndpoint(id: string, request: UpdateEndpointRequest): Promise<void> {
    await httpRequest(`/api/endpoints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request)
    });
  }

  public static async executeEndpoint(url: string, request: ExecuteEndpointRequest): Promise<ExecuteEndpointResponse> {
    return await httpRequest(`/api/functions/${url}`, {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }
}

async function httpRequest(url: string, options: RequestInit): Promise<any> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status !== 200) {
    let error: string | null = null;
    try {
      const json = await response.json();
      if (json['error']) {
        error = json['error'];
      }
    } catch (e) {}
    throw new Error(error || 'Unknown error');
  }

  return await response.json();
}
