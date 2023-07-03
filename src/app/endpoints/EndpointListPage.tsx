'use client';

import { EndpointList } from '@/components/theme/endpointList/EndpointList';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { useRouter } from 'next/navigation';

export interface EndpointListPageProps {
  endpoints: EndpointJSON[];
}

export async function EndpointListPage(props: EndpointListPageProps) {
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
    router.refresh();
  }

  return <EndpointList endpoints={endpoints} createUrl="/endpoints/create" onDeleteClicked={onDeleteClicked} />;
}
