import { EndpointPageMode } from '../theme/endpoint/EndpointPage';

export type EndpointMode = 'edit' | 'test';

export function createEndpointModes(current: EndpointMode, isNewMode: boolean): EndpointPageMode[] {
  return [
    {
      id: 'edit',
      label: isNewMode ? 'Create' : 'Edit',
      isSelected: current === 'edit'
    },
    {
      id: 'test',
      label: 'Test',
      isSelected: current === 'test'
    }
  ];
}
