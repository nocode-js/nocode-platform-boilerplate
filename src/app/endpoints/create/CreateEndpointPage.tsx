'use client';

import { EndpointEditor } from '@/components/endpoint/editor/EndpointEditor';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/EndpointDefinition';
import { useRouter } from 'next/navigation';

export function CreateEndpointPage() {
  const router = useRouter();

  function onModeChanged(modeId: string) {
    if (modeId === 'test') {
      alert('To test an endpoint you must first save it');
    }
  }

  async function onSave(name: string, url: string, description: string, definition: EndpointDefinition) {
    const id = await ApiClient.createEndpoint({
      name,
      url,
      description,
      definition
    });

    router.push(`/endpoints/${id}/edit`);
  }

  return <EndpointEditor onModeChanged={onModeChanged} onSave={onSave} />;
}
