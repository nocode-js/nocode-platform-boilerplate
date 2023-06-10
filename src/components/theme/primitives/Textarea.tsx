export interface TextareaProps {
  value: string;
  onChanged: (value: string) => void;
  rows?: number;
}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5"
      rows={5}
      value={props.value}
      onChange={e => props.onChanged((e.target as HTMLTextAreaElement).value)}
    />
  );
}
