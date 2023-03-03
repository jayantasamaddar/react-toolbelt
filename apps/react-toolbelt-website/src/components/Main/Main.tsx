import { ReactElement, ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <main
      role="region"
      className="col-span-full m-0 mt-[var(--header-min-h)] flex h-body-full min-h-screen w-full flex-col p-0"
    >
      {children}
    </main>
  );
};

Main.displayName = 'Main';
export { Main };
