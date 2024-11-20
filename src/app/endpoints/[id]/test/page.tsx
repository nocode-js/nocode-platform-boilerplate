import { storage } from '@/lib/repositories/storage';
import { TestEndpointPage } from './TestEndpointPage';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import NotFound from '@/app/not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test endpoint'
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;
  const data = await getData(id);

  if (!data.endpoint) {
    return <NotFound />;
  }
  return (
    <DefaultLayout>
      <TestEndpointPage id={id} endpoint={data.endpoint} />
    </DefaultLayout>
  );
}

async function getData(id: string) {
  const endpoint = await storage.endpoint.tryGetById(id);
  return {
    endpoint: endpoint ? endpoint.toJSON() : null
  };
}
