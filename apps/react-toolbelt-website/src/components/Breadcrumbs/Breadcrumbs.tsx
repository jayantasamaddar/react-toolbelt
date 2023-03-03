'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import sidebar from '../../settings/sidebar.json';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { Button } from '../Button';

const getTitle = (
  stub: string,
  items: typeof sidebar = sidebar
): string | undefined => {
  for (const navitem of items) {
    if (navitem.name === stub) return navitem.title;
    else if (Array.isArray(navitem.items)) {
      const title = getTitle(stub, navitem.items);
      if (!title) continue;
      else return title;
    } else continue;
  }
};

export const Breadcrumbs = () => {
  const path = usePathname();

  const pathArray = path?.split('/') ?? [];

  return (
    <section>
      <ul role="navigation" className="inline-flex items-center gap-2 text-sm">
        <li className="inline-flex items-center text-theme-accent-3 transition-colors hover:text-slate-300">
          <Button url="/" icon={<FaHome />} />
        </li>

        {pathArray.map((path, index) => {
          const linkTo = `${pathArray.slice(0, index + 1).join('/')}`;
          const isLastSegment = index === pathArray.length - 1;

          return (
            <li
              key={path}
              className={`${
                !isLastSegment
                  ? 'breadcrumb inline-flex items-center gap-2'
                  : ''
              }  text-theme-accent-3 transition-colors hover:text-slate-300`}
            >
              <Link href={linkTo}>{getTitle(path)}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
