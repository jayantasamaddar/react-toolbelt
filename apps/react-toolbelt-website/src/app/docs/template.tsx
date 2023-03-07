import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <section className="col-span-12 grid h-full w-full grid-cols-12 items-stretch md:col-span-8 md:col-start-3 md:grid-cols-8">
      {children}
    </section>
  );
}
