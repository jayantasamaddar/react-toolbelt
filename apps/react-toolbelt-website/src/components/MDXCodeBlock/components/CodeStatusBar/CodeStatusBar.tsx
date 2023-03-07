'use client';

import { Button } from '@/components';
import { FaCheck } from '@react-icons//all-files/fa/FaCheck';
import { FaClipboard } from '@react-icons//all-files/fa/FaClipboard';
import { useCallback, useState } from 'react';

interface CodeStatusBarProps {
  className?: string;
  title?: string;
  code: string;
}

export const CodeStatusBar = ({
  className,
  title,
  code
}: CodeStatusBarProps) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  }, [code]);

  return (
    <div
      className={`sticky top-0 flex h-10 items-center justify-between bg-theme-primary-2 px-4 py-2 text-xs text-white ${
        className ?? ''
      }`}
    >
      <p className="text-sm" role="presentation">
        {title ?? ''}
      </p>
      <Button
        icon={!copy ? <FaClipboard size="1.1rem" /> : <FaCheck size="1.1rem" />}
        onClick={handleCopy}
        className={`transition-colors hover:text-theme-ds-complementary ${
          !copy ? 'text-theme-accent-3' : 'text-theme-ds-complementary'
        }`}
      >
        {!copy ? 'Copy' : 'Copied!'}
      </Button>
    </div>
  );
};
