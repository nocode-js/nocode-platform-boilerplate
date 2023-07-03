import { FullscreenLayout } from '@/components/layout/FullscreenLayout';
import { Error } from '@/components/theme/error/Error';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found'
};

export default function NotFound() {
  return (
    <FullscreenLayout>
      <Error message="Page not found" />
    </FullscreenLayout>
  );
}
