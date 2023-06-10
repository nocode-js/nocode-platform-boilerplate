import { useEffect, useState } from 'react';

export interface DropdownProps {
  options: string[];
  selectedIndex: number;
  onChanged: (index: number) => void;
}

export function Dropdown(props: DropdownProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setIsOpened(false);
      }
    }
    if (isOpened) {
      document.addEventListener('click', handleClickOutside, false);
      return () => document.removeEventListener('click', handleClickOutside, false);
    }
  }, [dropdownRef, isOpened]);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    setIsOpened(!isOpened);
  }

  function select(index: number) {
    setIsOpened(false);
    props.onChanged(index);
  }

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-500 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 inline-flex items-center"
        onClick={toggle}
      >
        <span className="inline flex-1 w-full text-left">{props.options[props.selectedIndex]}</span>
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={'absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44' + (isOpened ? '' : ' hidden')}
        ref={setDropdownRef}
      >
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
          {props.options.map((option, index) => (
            <li key={index}>
              <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => select(index)}>
                {option}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
