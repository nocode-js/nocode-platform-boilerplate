export function Main(props: { children: React.ReactNode }) {
  return <main className="flex-1 overflow-x-hidden overflow-y-auto">{props.children}</main>;
}
