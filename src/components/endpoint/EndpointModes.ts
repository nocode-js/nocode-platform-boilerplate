import { EndpointPageMode } from '../theme/endpoint/EndpointPage';

export type EndpointMode = 'edit' | 'test';

export function createEndpointModes(current: EndpointMode, isNewMode: boolean): EndpointPageMode[] {
  const modes = [
    {
      id: 'edit',
      label: isNewMode ? 'Create' : 'Edit',
      isSelected: current === 'edit'
    }
  ];
  if (!isNewMode) {
    modes.push({
      id: 'test',
      label: 'Test',
      isSelected: current === 'test'
    });
  }
  return modes;
}
