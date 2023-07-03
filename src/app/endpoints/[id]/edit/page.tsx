import { storage } from '@/lib/repositories/storage';
import { EditEndpointPage } from './EditEndpointPage';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import NotFound from '@/app/not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit endpoint'
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page(props: PageProps) {
  const data = await getData(props.params.id);

  if (!data.endpoint) {
    return <NotFound />;
  }
  return (
    <DefaultLayout>
      <EditEndpointPage id={props.params.id} endpoint={data.endpoint} />
    </DefaultLayout>
  );
}

async function getData(id: string) {
  const endpoint = await storage.endpoint.tryGetById(id);
  return {
    endpoint: endpoint ? endpoint.toJSON() : null
  };
}
