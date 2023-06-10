import { EndpointTester } from '@/components/endpoint/tester/EndpointTester';
import { NotFound } from '@/components/notFound/NotFound';
import { storage } from '@/lib/repositories/storage';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function Test(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  function onModeChanged(modeId: string) {
    if (modeId === 'edit') {
      router.push(`/endpoints/${props.id}/edit`);
    }
  }

  return props.endpoint ? <EndpointTester id={props.id} endpoint={props.endpoint} onModeChanged={onModeChanged} /> : <NotFound />;
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
