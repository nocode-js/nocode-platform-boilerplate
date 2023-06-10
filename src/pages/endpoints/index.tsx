import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { EndpointListPage } from '@/components/theme/endpointList/EndpointListPage';
import { storage } from '@/lib/repositories/storage';
import { InferGetServerSidePropsType } from 'next';

export default function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const endpoints = props.endpoints.map(e => ({
    id: e.id,
    name: e.name,
    method: 'POST',
    url: `/api/functions/${e.url}`,
    editUrl: `/endpoints/${e.id}/edit`,
    testUrl: `/endpoints/${e.id}/test`
  }));

  return (
    <DefaultLayout title="Endpoints">
      <EndpointListPage endpoints={endpoints} createUrl="/endpoints/create" />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      endpoints: (await storage.endpoint.getAll()).map(e => e.toJSON())
    }
  };
}
