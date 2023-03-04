import { useState, useEffect, useCallback, UIEvent } from 'react';
import type { Element } from '../../types';
import { isServer } from '@react-toolbelt/utils';

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * useResize tracks the `resize` event listener.
 * > Note: On server-side frameworks like Next.js leave the element field `undefined` for the `window` or `document` element.
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `({ width: number, height: number }) => void`
 * @returns `{ width: number, height: number }`
 */
export const useResize = (
  element?: Element,
  cb?: (size: ElementSize) => void
) => {
  const [size, setSize] = useState<ElementSize>({
    width: 0,
    height: 0
  });

  if (typeof element === 'undefined') {
    element = isServer() ? undefined : window;
  }

  const handler = useCallback(
    ({ target }: UIEvent<Element>) => {
      if (!isServer()) {
        const elementSize: ElementSize = { width: 0, height: 0 };
        if (target === window) {
          elementSize.width = (target as typeof window).innerWidth;
          elementSize.height = (target as typeof window).innerHeight;
          setSize(elementSize);
          return cb && cb(elementSize);
        } else if (target instanceof HTMLElement) {
          elementSize.width = target.clientWidth;
          elementSize.height = target.clientHeight;
          setSize(elementSize);
          return cb && cb(elementSize);
        }
      }
    },
    [cb]
  );

  /** Load Default */
  useEffect(() => {
    if (!isServer()) {
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
  }, [element]);

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
