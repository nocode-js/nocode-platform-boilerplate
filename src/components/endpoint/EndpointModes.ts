import { EndpointTabHostMode } from '../theme/endpoint/EndpointTabHost';

export type EndpointMode = 'edit' | 'test';

export function createEndpointModes(current: EndpointMode, isNewMode: boolean): EndpointTabHostMode[] {
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
