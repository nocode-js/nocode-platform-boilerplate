import { UpdateEndpointRequest } from '@/lib/apiClient/UpdateEndpointRequest';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, props: { params: { id: string } }) {
  const request = (await req.json()) as UpdateEndpointRequest;

  const endpoint = await storage.endpoint.tryGetById(props.params.id);
  if (!endpoint) {
    return NextResponse.json('Endpoint not found', {
      status: 404
    });
  }

  endpoint.setName(request.name);
  endpoint.setUrl(request.url);
  endpoint.setDescription(request.description);
  endpoint.setDefinition(request.definition);

  await storage.endpoint.update(endpoint);

  return NextResponse.json({});
}

export async function DELETE(_: Request, props: { params: { id: string } }) {
  const success = await storage.endpoint.tryDeleteById(props.params.id);
  if (success) {
    return NextResponse.json({});
  } else {
    return NextResponse.json('Endpoint not found', {
      status: 404
    });
  }
}
