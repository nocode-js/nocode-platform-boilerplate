export interface InputProps {
  value: string;
  isInvalid?: boolean;
  onChanged: (value: string) => void;
}

export function Input(props: InputProps) {
  let cls = 'text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5';
  if (props.isInvalid) {
    cls += ' bg-red-50 border border-red-500';
  } else {
    cls += ' bg-gray-50 border border-gray-300';
  }

  return (
    <input type="text" className={cls} value={props.value} onChange={e => props.onChanged((e.target as HTMLInputElement).value)} required />
  );
}
