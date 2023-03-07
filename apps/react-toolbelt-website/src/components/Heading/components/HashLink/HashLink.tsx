'use client';

import { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HashLinkProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
  ariaControls?: string;
  ariaLabel?: string;
  clickToCopy?: boolean;
}

export const HashLink = ({
  className,
  style,
  title,
  ariaLabel,
  clickToCopy,
  ariaControls
}: HashLinkProps) => {
  const path = usePathname();
  const displayText = title ? `Direct link to ${title}` : undefined;
  const url = `${path}/#${ariaControls || ''}`;

  return (
    <Link
      className={`RT-HeadingHashLink text-theme-accent-2 opacity-0 transition-opacity after:content-['#'] hover:text-theme-accent-3 hover:underline hover:decoration-2 hover:opacity-100 ${
        className ?? ''
      }`}
      style={style}
      tabIndex={0}
      onClick={
        clickToCopy ? () => navigator.clipboard.writeText(url) : undefined
      }
      aria-label={ariaLabel ?? displayText}
      aria-controls={ariaControls}
      title={displayText}
      href={url}
      scroll={false}
    ></Link>
  );
};
