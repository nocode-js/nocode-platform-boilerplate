import { FullscreenLayout } from '../layout/FullscreenLayout';
import { ErrorPage } from '../theme/error/ErrorPage';

export function NotFound() {
  return (
    <FullscreenLayout title="Page not found">
      <ErrorPage message="Page not found" />
    </FullscreenLayout>
  );
}
