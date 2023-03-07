import { isExternalLink } from '@react-toolbelt/utils';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { UrlObject } from 'url';

type LinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    title?: string;
    children: ReactNode;
  };

/**
 * Standard Link Component that handles external and internal links in Next.js
 */
export const Link = ({ href, title, children, ...props }: LinkProps) => {
  const normalizeHref = (href?: string | UrlObject) =>
    typeof href === 'string'
      ? href
      : typeof href === 'object' && 'href' in href
      ? href.href ?? '#'
      : '#';

  const normalizedHref = normalizeHref(href);
  const isHashLink = normalizedHref.includes('#') ? true : false;

  const linkMarkup = isExternalLink(normalizedHref ?? '') ? (
    <a href={normalizedHref} title={title} {...props}>
      {children}
    </a>
  ) : (
    <NextLink href={normalizedHref} scroll={!isHashLink} {...props}>
      {children}
    </NextLink>
  );

  return linkMarkup;
};
