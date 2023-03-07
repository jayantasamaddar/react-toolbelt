'use client';

import { Sidebar } from '@/components';
import { DocumentProvider, useApp } from '@/context';
import sidebar from '@/settings/sidebar.json';

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    settings: {
      windowSize: { width },
      scroll: { direction }
    }
  } = useApp();

  return (
    <DocumentProvider>
      <div className="grid h-full w-full grid-cols-12 items-stretch bg-gradient-radial from-[#06001a] via-theme-primary to-theme-primary-2 px-5 text-white md:p-5">
        <Sidebar
          className={`col-span-12 w-full overflow-y-auto transition-height md:min-h-body-screen md:w-[calc(100vw/12*2-1.25rem)] ${
            direction.y === 'up' ? 'h-full' : 'h-body-full md:top-5'
          } border-b border-b-theme-primary-2 md:fixed md:border-b-0 md:border-r md:border-r-theme-primary-2`}
          items={sidebar}
          preset={width < 768 ? 'accordion' : 'default'}
          stagger
          highlight
          headings
        />
        {children}
      </div>
    </DocumentProvider>
  );
}
