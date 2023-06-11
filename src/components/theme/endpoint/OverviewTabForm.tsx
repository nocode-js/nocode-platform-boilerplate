import { Input } from '../primitives/Input';
import { InputError } from '../primitives/InputError';
import { Textarea } from '../primitives/Textarea';

export interface OverviewTabFormProps {
  name: string;
  nameError: string | undefined;
  onNameChanged: (name: string) => void;
  url: string;
  urlError: string | undefined;
  onUrlChanged: (url: string) => void;
  description: string;
  onDescriptionChanged: (description: string) => void;
}

export function OverviewTabForm(props: OverviewTabFormProps) {
  return (
    <div className="py-5 px-2.5">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">Name *</label>
        <Input value={props.name} isInvalid={!!props.nameError} onChanged={props.onNameChanged} />
        <InputError error={props.nameError} />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">URL *</label>
        <Input value={props.url} isInvalid={!!props.urlError} onChanged={props.onUrlChanged} />
        <InputError error={props.urlError} />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <Textarea value={props.description} rows={5} onChanged={props.onDescriptionChanged} />
      </div>
    </div>
  );
}
