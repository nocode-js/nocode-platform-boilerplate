'use client';

import { OverviewTabForm } from '@/components/theme/endpoint/OverviewTabForm';
import { OverviewTabState, validateOverviewTabState } from './OverviewTabState';

export interface OverviewTabProps {
  state: OverviewTabState;
  onStateChanged: (state: OverviewTabState) => void;
}

export function OverviewTab(props: OverviewTabProps) {
  function onNameChanged(name: string) {
    const update = { ...props.state, name };
    props.onStateChanged({
      ...update,
      isDirty: true,
      errors: validateOverviewTabState(update)
    });
  }

  function onUrlChanged(url: string) {
    const update = { ...props.state, url };
    props.onStateChanged({
      ...update,
      isDirty: true,
      errors: validateOverviewTabState(update)
    });
  }

  function onDescriptionChanged(description: string) {
    const update = { ...props.state, description };
    props.onStateChanged({
      ...update,
      isDirty: true,
      errors: validateOverviewTabState(update)
    });
  }

  return (
    <OverviewTabForm
      name={props.state.name}
      nameError={props.state.errors?.nameError}
      onNameChanged={onNameChanged}
      url={props.state.url}
      urlError={props.state.errors?.urlError}
      onUrlChanged={onUrlChanged}
      description={props.state.description}
      onDescriptionChanged={onDescriptionChanged}
    />
  );
}
