import { UidGenerator } from '@/lib/core/UidGenerator';
import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';
import { EndpointValidator } from '@/lib/repositories/endpoint/EndpointValidator';

export interface OverviewTabState {
  name: string;
  url: string;
  description: string;
  isDirty: boolean;
  errors: OverviewTabErrors | undefined;
}

export interface OverviewTabErrors {
  nameError: string | undefined;
  urlError: string | undefined;
}

export function createOverviewTabState(endpoint: EndpointJSON | undefined): OverviewTabState {
  const value = {
    name: endpoint?.name ?? '',
    url: endpoint?.url ?? createDefaultUrl(),
    description: endpoint?.description ?? ''
  };
  return {
    ...value,
    isDirty: false,
    errors: validateOverviewTabState(value)
  };
}

function createDefaultUrl(): string {
  return UidGenerator.next().substring(0, 8);
}

export function validateOverviewTabState(state: Omit<OverviewTabState, 'isDirty' | 'errors'>): OverviewTabErrors | undefined {
  let nameError: string | undefined = undefined;
  try {
    EndpointValidator.validName(state.name);
  } catch (e) {
    nameError = (e as Error).message;
  }

  let urlError: string | undefined = undefined;
  try {
    EndpointValidator.validUrl(state.url);
  } catch (e) {
    urlError = (e as Error).message;
  }

  if (nameError || urlError) {
    return { nameError, urlError };
  }
  return undefined;
}
