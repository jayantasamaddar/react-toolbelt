'use client';

import './globals.css';
import { Main, Header } from '@/components';
import { AppProvider } from '@/context';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AppProvider>
          <div className="RT-Container min-h-body bg-gradient-dark relative grid grid-cols-12 justify-items-stretch">
            <Header />
            <Main>{children}</Main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
