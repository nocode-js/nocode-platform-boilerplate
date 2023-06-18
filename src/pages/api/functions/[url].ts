import { ExecuteEndpointRequest } from '@/lib/apiClient/ExecuteEndpointRequest';
import { ExecuteEndpointResponse } from '@/lib/apiClient/ExecuteEndpointResponse';
import { EndpointWorkflowMachine } from '@/lib/workflows/endpoint/machine/EndpointWorkflowMachine';
import { storage } from '@/lib/repositories/storage';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json('Method not allowed');
    return;
  }

  const url = String(req.query.url);
  const inputs = req.body as ExecuteEndpointRequest;
  if (!inputs) {
    res.status(400).json('Invalid request body');
    return;
  }

  const endpoint = await storage.endpoint.tryGetByUrl(url);
  if (!endpoint) {
    res.status(404).json('Endpoint not found');
    return;
  }

  const machine = EndpointWorkflowMachine.create(endpoint.definition, inputs);
  machine.start();

  try {
    await machine.wait();

    const response: ExecuteEndpointResponse = {
      __logs: machine.readLogs(),
      ...machine.readOutputs()
    };
    res.status(200).json(response);
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Internal error';
    res.status(500).json({ error });
  }
}
