import { FullscreenLayout } from '../layout/FullscreenLayout';
import { ErrorPage } from '../theme/error/ErrorPage';

export function NotFound() {
  return (
    <FullscreenLayout title="Not found">
      <ErrorPage message="Not found" />
    </FullscreenLayout>
  );
}
