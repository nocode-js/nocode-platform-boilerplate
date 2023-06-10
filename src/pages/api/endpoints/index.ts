import { CreateEndpointRequest } from '@/lib/apiClient/CreateEndpointRequest';
import { Endpoint } from '@/lib/repositories/endpoint/Endpoint';
import { storage } from '@/lib/repositories/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json('Method not allowed');
    return;
  }

  const request = req.body as CreateEndpointRequest;

  const newEndpoint = Endpoint.create(request.name, request.url, request.description, request.definition);
  await storage.endpoint.insert(newEndpoint);

  res.status(200).json({ id: newEndpoint.id });
}
