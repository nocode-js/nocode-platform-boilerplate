import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { HomePage } from '@/components/theme/home/HomePage';

export default function Index() {
  return (
    <DefaultLayout title="Home">
      <HomePage />
    </DefaultLayout>
  );
}
