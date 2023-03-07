import type { MDXComponents } from 'mdx/types';
import { ReactNode } from 'react';
import { MDXCodeBlock, Blockquote } from '@/components';
import { Heading } from '@/components/Heading';

function HorizontalRule() {
  return <hr className="mt-6 border-t border-t-theme-primary-2" />;
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-6">{children}</p>;
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="ml-12 list-disc">{children}</li>;
}

function H1({ children }: { children: ReactNode }) {
  return (
    <Heading tag="h1" hashLink={typeof children === 'string'}>
      {children}
    </Heading>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <Heading tag="h2" hashLink={typeof children === 'string'}>
      {children}
    </Heading>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <Heading tag="h3" hashLink={typeof children === 'string'}>
      {children}
    </Heading>
  );
}

export function useMDXComponents(components: MDXComponents) {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    code: MDXCodeBlock,
    p: Paragraph,
    hr: HorizontalRule,
    li: ListItem,
    blockquote: Blockquote,
    ...components
  };
}
