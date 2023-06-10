import { UpdateEndpointRequest } from '@/lib/apiClient/UpdateEndpointRequest';
import { storage } from '@/lib/repositories/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(405).json('Method not allowed');
    return;
  }

  const id = String(req.query.id);
  const request = req.body as UpdateEndpointRequest;

  const endpoint = await storage.endpoint.tryGetById(id);
  if (!endpoint) {
    res.status(404).json('Endpoint not found');
    return;
  }

  endpoint.setName(request.name);
  endpoint.setUrl(request.url);
  endpoint.setDescription(request.description);
  endpoint.setDefinition(request.definition);
  await storage.endpoint.update(endpoint);

  res.status(200).json({});
}
