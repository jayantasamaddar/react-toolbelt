// 'use client';

import { ReactElement, ReactNode, useEffect } from 'react';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const handler = () => window.scrollTo(0, 0);
  //     window.addEventListener('unload', handler);
  //     return () => window.removeEventListener('unload', handler);
  //   }
  // }, []);

  return (
    <main
      role="region"
      className="col-span-full m-0 flex h-full min-h-screen w-full flex-col p-0 pt-[var(--header-min-h)]"
    >
      {children}
    </main>
  );
};

Main.displayName = 'Main';
export { Main };
