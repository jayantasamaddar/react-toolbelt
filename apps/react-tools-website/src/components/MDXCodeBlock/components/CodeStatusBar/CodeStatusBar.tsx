'use client';

import { Button } from '@/components';
import { FaCheck } from '@react-icons//all-files/fa/FaCheck';
import { FaClipboard } from '@react-icons//all-files/fa/FaClipboard';
import { useState } from 'react';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <div
      className={`sticky top-0 flex h-10 items-center justify-between bg-slate-700 px-4 py-2 text-xs text-white ${
        className ?? ''
      }`}
    >
      <p className="text-sm" role="presentation">
        {title ?? ''}
      </p>
      <Button
        icon={!copy ? <FaClipboard size="1.1rem" /> : <FaCheck size="1.1rem" />}
        onClick={handleCopy}
      >
        {!copy ? 'Copy' : 'Copied!'}
      </Button>
    </div>
  );
};
