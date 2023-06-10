import { Input } from '../primitives/Input';

export interface TestTabFormInput {
  name: string;
  value: string;
  error: string | null;
}

export interface TestTabFormProps {
  inputs: TestTabFormInput[];
  logs: string[];
  onInputChanged: (index: number, value: string) => void;
}

export function TestTabForm(props: TestTabFormProps) {
  return (
    <div className="flex flex-col h-full md:flex-row">
      <div className="bg-gray-100 md:w-[300px] md:order-2">
        <h4 className="text-xl font-bold m-2.5 mt-4">Inputs</h4>

        {props.inputs.length > 0 &&
          props.inputs.map((input, index) => (
            <div key={input.name} className="px-2.5 pb-2">
              <label className="block mb-1.5 text-sm">{input.name}</label>
              <Input value={input.value} isInvalid={!!input.error} onChanged={value => props.onInputChanged(index, value)} />
              {input.error && <div className="text-sm text-red-500">{input.error}</div>}
            </div>
          ))}

        {props.inputs.length === 0 && <div className="text-center text-sm text-gray-500 px-2 py-5 ">No inputs</div>}
      </div>
      <div className="flex-1 md:order-1">
        {props.logs.length > 0 && (
          <ul className="p-4 font-mono text-sm">
            {props.logs.map((log, index) => (
              <li key={index} className="block border border-gray-200 p-2 rounded-md mb-1">
                {log}
              </li>
            ))}
          </ul>
        )}
        {props.logs.length === 0 && (
          <div className="p-4 text-gray-500">
            To run test you need to press {'"'}Run{'"'} button.
          </div>
        )}
      </div>
    </div>
  );
}
