import { EndpointEditor } from '@/components/endpoint/editor/EndpointEditor';
import { NotFound } from '@/components/notFound/NotFound';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { storage } from '@/lib/repositories/storage';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function Edit(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  async function onSave(name: string, url: string, description: string, definition: EndpointDefinition) {
    await ApiClient.updateEndpoint(props.id, {
      name,
      url,
      description,
      definition
    });
  }

  function onModeChanged(modeId: string) {
    if (modeId === 'test') {
      router.push(`/endpoints/${props.id}/test`);
    }
  }

  return props.endpoint ? <EndpointEditor endpoint={props.endpoint} onSave={onSave} onModeChanged={onModeChanged} /> : <NotFound />;
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const id = String(context.query.id);
  const endpoint = await storage.endpoint.tryGetById(id);
  return {
    props: {
      id,
      endpoint: endpoint ? endpoint.toJSON() : null
    }
  };
}
