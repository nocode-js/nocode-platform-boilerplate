import { UpdateEndpointRequest } from '@/lib/apiClient/UpdateEndpointRequest';
import { storage } from '@/lib/repositories/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      await put(req, res);
      return;
    case 'DELETE':
      await delete_(req, res);
      return;
    default:
      res.status(405).json('Method not allowed');
      return;
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
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

async function delete_(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);

  const success = await storage.endpoint.tryDeleteById(id);
  if (success) {
    res.status(200).json({});
  } else {
    res.status(404).json('Endpoint not found');
  }
}
