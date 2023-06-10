export function Root(props: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full">{props.children}</div>;
}
