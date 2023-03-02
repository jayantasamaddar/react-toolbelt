'use client';

import { useHover } from '@react-tools/hooks';
import { useEffect, useRef, useState } from 'react';

export interface WordShuffle {
  className?: string;
  words: string[];
  interval?: number;
  pauseOnHover?: boolean;
}

export const WordShuffle = ({
  className,
  words,
  interval = 2000
}: WordShuffle) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }, interval);
  }, [words, interval]);

  return (
    <span className={`RT-WordShuffle inline-block ${className ?? ''}`}>
      {words[index]}
    </span>
  );
};
