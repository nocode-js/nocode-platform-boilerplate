import { endpointTemplates } from '../workflows/endpoint/templates/endpointTemplates';
import { Endpoint } from './endpoint/Endpoint';
import { Storage } from './storage';

export async function setup(storage: Storage): Promise<void> {
  // Delete the bellow code to remove the auto installation of the endpoint templates.

  await Promise.all(
    endpointTemplates.map(template => {
      const t = template();
      const endpoint = Endpoint.create(t.name, t.url, t.description, JSON.parse(t.definition));
      return storage.endpoint.insert(endpoint);
    })
  );
}
