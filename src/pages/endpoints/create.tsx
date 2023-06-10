import { EndpointEditor } from '@/components/endpoint/editor/EndpointEditor';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();

  async function onSave(name: string, url: string, description: string, definition: EndpointDefinition) {
    const id = await ApiClient.createEndpoint({
      name,
      url,
      description,
      definition
    });

    await router.push(`/endpoints/${id}/edit`);
  }

  return <EndpointEditor onSave={onSave} />;
}
