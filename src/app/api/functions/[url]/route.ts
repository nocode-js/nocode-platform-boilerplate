import { ExecuteEndpointResponse } from '@/lib/apiClient/ExecuteEndpointResponse';
import { EndpointWorkflowMachine } from '@/lib/workflows/endpoint/machine/EndpointWorkflowMachine';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request, props: { params: { url: string } }) {
  const body = await req.text();
  const inputs = body ? JSON.parse(body) : Object.fromEntries(new URL(req.url).searchParams);

  const endpoint = await storage.endpoint.tryGetByUrl(props.params.url);
  if (!endpoint) {
    return NextResponse.json('Endpoint not found', {
      status: 404
    });
  }

  const machine = EndpointWorkflowMachine.create(endpoint.definition, inputs);
  machine.start();

  try {
    await machine.wait();

    const response: ExecuteEndpointResponse = {
      __logs: machine.readLogs(),
      ...machine.readOutputs()
    };
    return NextResponse.json(response);
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Internal error';
    return NextResponse.json(error, {
      status: 500
    });
  }
}
