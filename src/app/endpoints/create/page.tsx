import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { CreateEndpointPage } from './CreateEndpointPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create endpoint'
};

export default function Page() {
  return (
    <DefaultLayout>
      <CreateEndpointPage />
    </DefaultLayout>
  );
}
