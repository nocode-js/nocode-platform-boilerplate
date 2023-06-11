import { Fragment } from 'react';

export function InputError(props: { error: string | null | undefined }) {
  if (!props.error) {
    return <Fragment />;
  }
  return <div className="mt-1 text-sm text-red-600">{props.error}</div>;
}
