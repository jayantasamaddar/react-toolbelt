import { useState, useEffect, useCallback, UIEvent } from 'react';
import type { Element } from '../../types';
import { isServer } from '@react-toolbelt/utils';

interface ElementSize {
  width: number;
  height: number;
}

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `({ width: number, height: number }) => void`
 * @returns `{ width: number, height: number }`
 */
export const useResize = (element?: Element) => {
  const [size, setSize] = useState<ElementSize>({
    width: 0,
    height: 0
  });

  if (typeof element === 'undefined') {
    element = isServer() ? undefined : window;
  }

  const handler = useCallback(({ target }: UIEvent<Element>) => {
    if (!isServer()) {
      if (target === window) {
        setSize({
          width: (target as typeof window).innerWidth,
          height: (target as typeof window).innerHeight
        });
      } else if (target instanceof HTMLElement) {
        setSize({ width: target.clientWidth, height: target.clientHeight });
      } else return;
    }
  }, []);

  /** Load Default */
  useEffect(() => {
    if (size.width === 0 && size.height === 0 && !isServer()) {
      if (element === window) {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      } else {
        setSize({
          width: (element as HTMLElement).clientWidth,
          height: (element as HTMLElement).clientHeight
        });
      }
    }
  }, [element, size.width, size.height]);

  /** Modify on Resize */
  useEffect(() => {
    if (!isServer()) {
      (element as Element).addEventListener('resize', handler as never);
      return () =>
        (element as Element).removeEventListener('resize', handler as never);
    }
  }, [element, handler]);

  return size;
};
