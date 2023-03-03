'use client';

import { Breadcrumbs, Sidebar } from '@/components';
import sidebar from '@/settings/sidebar.json';
import { useResize } from '@react-toolbelt/hooks';

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { width } = useResize();

  return (
    <div className="grid h-full w-full grid-cols-12 items-stretch bg-gradient-radial from-[#06001a] via-theme-primary to-theme-primary-2 p-5 text-white">
      <Sidebar
        className="col-span-12 h-full w-full border-b border-b-theme-primary-2 md:col-span-2 md:block md:border-r md:border-r-theme-primary-2"
        items={sidebar}
        preset={width < 768 ? 'accordion' : 'default'}
      />
      <section className="col-span-12 h-full w-full md:col-span-10">
        <article className="h-full p-5">
          <Breadcrumbs />
          {children}
        </article>
      </section>
    </div>
  );
}
