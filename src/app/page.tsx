import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { Home } from '@/components/theme/home/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoCode API Builder Template'
};

export default function Page() {
  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  );
}
