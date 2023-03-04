import type { MDXComponents } from 'mdx/types';
import { ReactNode } from 'react';
import { MDXCodeBlock, Blockquote } from '@/components';
import { Heading } from '@/components/Heading';

function HorizontalRule() {
  return <hr className="mt-6 border-t border-t-theme-primary-2" />;
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-sm">{children}</p>;
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="ml-5 list-disc">{children}</li>;
}

function H1({ children }: { children: ReactNode }) {
  return (
    <Heading tag="h1" hashLink>
      {children}
    </Heading>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <Heading tag="h2" hashLink>
      {children}
    </Heading>
  );
}

export function useMDXComponents(components: MDXComponents) {
  return {
    h1: H1,
    h2: H2,
    code: MDXCodeBlock,
    p: Paragraph,
    hr: HorizontalRule,
    li: ListItem,
    blockquote: Blockquote,
    ...components
  };
}
