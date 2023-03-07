'use client';

import { Breadcrumbs, Sidebar } from '@/components';
import { useApp } from '@/context';
import PageContent from './content.mdx';
import headings from './headings.json';

export default function Template() {
  const {
    settings: {
      scroll: { direction }
    }
  } = useApp();
  return (
    <>
      <section className="col-span-12 h-full w-full md:col-span-8">
        <article className="h-full p-5">
          <Breadcrumbs />
          <PageContent />
        </article>
      </section>

      <Sidebar
        className={`hidden overflow-y-auto transition-height md:fixed md:right-0 md:block md:w-[calc(100vw/12*2)] ${
          direction.y === 'up' ? 'h-full' : 'h-body-full md:top-5'
        } p-5 md:border-l md:border-l-theme-primary-2`}
        items={headings}
        stagger
        fontSize="sm"
      />
    </>
  );
}
