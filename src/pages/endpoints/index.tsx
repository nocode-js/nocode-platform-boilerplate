import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { EndpointListPage } from '@/components/theme/endpointList/EndpointListPage';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { setup } from '@/lib/repositories/storageInstaller';
import { storage } from '@/lib/repositories/storage';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const endpoints = props.endpoints.map(e => ({
    id: e.id,
    name: e.name,
    method: 'POST',
    url: `/api/functions/${e.url}`,
    editUrl: `/endpoints/${e.id}/edit`,
    testUrl: `/endpoints/${e.id}/test`
  }));

  async function onDeleteClicked(id: string) {
    if (!confirm('Are you sure?')) {
      return;
    }

    await ApiClient.deleteEndpoint(id);
    router.replace(router.asPath); // Refreshing the data
  }

  return (
    <DefaultLayout title="Endpoints">
      <EndpointListPage endpoints={endpoints} createUrl="/endpoints/create" onDeleteClicked={onDeleteClicked} />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  let endpoints = await storage.endpoint.getAll();
  if (endpoints.length === 0) {
    await setup(storage);
    endpoints = await storage.endpoint.getAll();
  }

  return {
    props: {
      endpoints: endpoints.map(e => e.toJSON())
    }
  };
}
