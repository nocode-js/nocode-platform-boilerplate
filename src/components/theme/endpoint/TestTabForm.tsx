import { Input } from '../primitives/Input';
import { InputError } from '../primitives/InputError';

export interface TestTabFormInput {
  name: string;
  value: string;
  error: string | null;
}

export interface TestTabFormProps {
  description: string;
  inputs: TestTabFormInput[];
  logs: string[];
  onInputChanged: (index: number, value: string) => void;
}

export function TestTabForm(props: TestTabFormProps) {
  return (
    <div className="md:flex md:h-full md:flex-row">
      <div className="bg-gray-100 md:w-[300px] md:order-2">
        <h4 className="text-xl font-bold p-2.5 pt-4">Inputs</h4>

        {props.inputs.length > 0 &&
          props.inputs.map((input, index) => (
            <div key={input.name} className="px-2.5 pb-2">
              <label className="block mb-1.5 text-sm">{input.name}</label>
              <Input value={input.value} isInvalid={!!input.error} onChanged={value => props.onInputChanged(index, value)} />
              <InputError error={input.error} />
            </div>
          ))}

        {props.inputs.length === 0 && <div className="text-center text-sm text-gray-500 px-2 py-5 ">No inputs</div>}
      </div>
      <div className="md:flex-1 md:order-1 md:relative">
        <div className="md:absolute md:top-0 md:bottom-0 md:left-0 md:right-0 md:overflow-auto">
          {props.logs.length > 0 && (
            <ul className="p-4 font-mono text-sm">
              {props.logs.map((log, index) => (
                <li key={index} className="block border border-gray-200 px-2 py-1 text-xs rounded-md mb-1 overflow-x-hidden">
                  {log}
                </li>
              ))}
            </ul>
          )}
          {props.logs.length === 0 && (
            <div className="p-4">
              <div className="border p-2 rounded-md mb-2">{props.description}</div>

              <div className="text-gray-500">
                To run test you need to press {'"'}Run{'"'} button.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
