import Link from 'next/link';

export interface ButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
  style?: 'primary' | 'secondary' | 'white';
  isDisabled?: boolean;
  href?: string;
  className?: string;
  onClicked?: () => void;
}

export function Button(props: ButtonProps) {
  let cls: string;
  if (props.isDisabled) {
    cls = 'text-gray-500 bg-gray-200 cursor-not-allowed';
  } else if (props.style === 'secondary') {
    cls = 'text-gray-900 bg-white border border-gray-200 hover:text-gray-500 hover:border-gray-300';
  } else if (props.style === 'white') {
    cls = 'text-gray-900 bg-white hover:bg-gray-100';
  } else {
    cls = 'text-white bg-blue-700 hover:bg-blue-800';
  }

  cls += ' focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm box-border inline-block';
  if (props.size === 'sm') {
    cls += ' px-3 py-2';
  } else {
    cls += ' px-6 py-3';
  }
  if (props.className) {
    cls += ' ' + props.className;
  }

  if (props.href) {
    return (
      <Link href={props.href} className={cls}>
        {props.children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={props.onClicked}>
      {props.children}
    </button>
  );
}
