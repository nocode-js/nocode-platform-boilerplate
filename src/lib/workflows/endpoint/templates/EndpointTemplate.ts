import { EndpointJSON } from '@/lib/repositories/endpoint/EndpointJSON';

export type EndpointTemplate = () => Omit<EndpointJSON, 'id'>;
