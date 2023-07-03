'use client';

import { EndpointTester } from '@/components/endpoint/tester/EndpointTester';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { useRouter } from 'next/navigation';

export interface TestEndpointPageProps {
  id: string;
  endpoint: EndpointJSON;
}

export function TestEndpointPage(props: TestEndpointPageProps) {
  const router = useRouter();

  function onModeChanged(modeId: string) {
    if (modeId === 'edit') {
      router.push(`/endpoints/${props.id}/edit`);
    }
  }

  return <EndpointTester id={props.id} endpoint={props.endpoint} onModeChanged={onModeChanged} />;
}
