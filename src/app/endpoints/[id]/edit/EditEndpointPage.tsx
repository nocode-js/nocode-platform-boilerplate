'use client';

import { EndpointEditor } from '@/components/endpoint/editor/EndpointEditor';
import { ApiClient } from '@/lib/apiClient/ApiClient';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { EndpointDefinition } from '@/lib/workflows/endpoint/model/EndpointDefinition';
import { useRouter } from 'next/navigation';

export interface EditEndpointPageProps {
  id: string;
  endpoint: EndpointJSON;
}

export function EditEndpointPage(props: EditEndpointPageProps) {
  const router = useRouter();

  async function onSave(name: string, url: string, description: string, definition: EndpointDefinition) {
    await ApiClient.updateEndpoint(props.id, {
      name,
      url,
      description,
      definition
    });
  }

  function onModeChanged(modeId: string, isDirty: boolean) {
    if (modeId === 'test') {
      if (isDirty && !confirm('You have unsaved changes. Are you sure you want to continue?')) {
        return;
      }
      router.push(`/endpoints/${props.id}/test`);
    }
  }

  return <EndpointEditor endpoint={props.endpoint} onSave={onSave} onModeChanged={onModeChanged} />;
}
