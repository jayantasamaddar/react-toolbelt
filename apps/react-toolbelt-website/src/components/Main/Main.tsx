import { useApp } from '@/context';
import { ReactElement, ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  const {
    settings: {
      scroll: { direction }
    }
  } = useApp();

  return (
    <main
      role="region"
      className={`${
        direction.y === 'up' ? 'h-full' : 'h-body-full'
      } col-span-full m-0 flex min-h-body-screen w-full flex-col p-0 pt-[var(--header-min-h)] transition-height`}
    >
      {children}
    </main>
  );
};

Main.displayName = 'Main';
export { Main };
