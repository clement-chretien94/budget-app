'use client';

import { Home, PiggyBank, Goal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: Home },
  {
    name: 'Budgets',
    href: '/dashboard/budgets',
    icon: PiggyBank,
  },
  { name: 'Goals', href: '/dashboard/goals', icon: Goal },
];

export default function NavLinks() {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const LinkIcon = links[0].icon;

  return (
    <>
      <Link
        key={links[0].name}
        href={links[0].href}
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-sky-100 text-blue-600': pathname === links[0].href,
          },
        )}
      >
        <LinkIcon className="w-6" />
        <p className="hidden md:block">{links[0].name}</p>
      </Link>
      {links.slice(1).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600':
                  `/${pathParts[1]}/${pathParts[2]}` === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
