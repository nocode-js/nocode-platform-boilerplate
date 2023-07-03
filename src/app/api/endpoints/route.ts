import { CreateEndpointRequest } from '@/lib/apiClient/CreateEndpointRequest';
import { Endpoint } from '@/lib/repositories/endpoint/Endpoint';
import { storage } from '@/lib/repositories/storage';
import { NextResponse } from 'next/server';

export async function GET() {
  const endpoints = await storage.endpoint.getAll();

  return NextResponse.json({ endpoints });
}

export async function POST(req: Request) {
  const request = (await req.json()) as CreateEndpointRequest;

  const newEndpoint = Endpoint.create(request.name, request.url, request.description, request.definition);
  await storage.endpoint.insert(newEndpoint);

  return NextResponse.json({ id: newEndpoint.id });
}
