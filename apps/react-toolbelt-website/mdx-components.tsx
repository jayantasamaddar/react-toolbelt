import type { MDXComponents } from 'mdx/types';
import { ReactNode } from 'react';
import { MDXCodeBlock, Blockquote } from '@/components';

function HorizontalRule() {
  return <hr className="mt-6 border-t border-t-theme-primary-2" />;
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-sm">{children}</p>;
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="ml-5 list-disc">{children}</li>;
}

export function useMDXComponents(components: MDXComponents) {
  return {
    code: MDXCodeBlock,
    p: Paragraph,
    hr: HorizontalRule,
    li: ListItem,
    blockquote: Blockquote,
    ...components
  };
}
