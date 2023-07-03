'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CenteredBox } from './CenteredBox';
import { useState } from 'react';
import Image from 'next/image';

export interface NavItem {
  label: string;
  href: string;
  children?: string[];
}

export interface NavbarProps {
  items: NavItem[];
}

export function Navbar(props: NavbarProps) {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState(false);

  function toggleMenu() {
    setIsOpened(!isOpened);
  }

  return (
    <nav className="bg-gray-800">
      <CenteredBox className="px-4">
        <div className="flex py-3 items-center justify-between">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <Image src="/logo.png" width={32} height={32} alt="Your Company" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {props.items.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={
                      pathname === item.href || item.children?.some(c => pathname.startsWith(c))
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </CenteredBox>
      <div className="md:hidden" id="mobile-menu">
        {isOpened && (
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {props.items.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  pathname === item.href
                    ? 'bg-gray-900 text-white block rounded-md px-2.5 py-2'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-2.5 py-2'
                }
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
