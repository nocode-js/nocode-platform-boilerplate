import { storage } from '@/lib/repositories/storage';
import { setup } from '@/lib/repositories/storageInstaller';
import { EndpointListPage } from './EndpointListPage';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Endpoints'
};

export default async function Page() {
  const data = await getData();

  return (
    <DefaultLayout>
      <EndpointListPage endpoints={data.endpoints} />
    </DefaultLayout>
  );
}

async function getData() {
  let endpoints = await storage.endpoint.getAll();
  if (endpoints.length === 0) {
    await setup(storage);
    endpoints = await storage.endpoint.getAll();
  }

  return {
    endpoints: endpoints.map(e => e.toJSON())
  };
}
