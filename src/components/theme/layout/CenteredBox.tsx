export interface CenteredBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function CenteredBox(props: CenteredBoxProps) {
  let cls = 'mx-auto max-w-7xl';
  if (props.className) {
    cls += ` ${props.className}`;
  }
  return <div className={cls}>{props.children}</div>;
}
