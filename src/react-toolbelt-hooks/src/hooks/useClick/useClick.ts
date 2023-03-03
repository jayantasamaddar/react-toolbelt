import { useEffect, useCallback, MouseEvent } from 'react';
import type { DOMElement } from '../../types';
import { isServer } from '@react-toolbelt/utils';

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `void`
 * @returns `HTMLElement`
 */
export const useClick = (
  element?: DOMElement,
  cb?: (target: HTMLElement) => void
) => {
  if (typeof element === 'undefined') {
    element = isServer() ? undefined : document;
  }

  const handler = useCallback(
    ({ target: t }: MouseEvent<HTMLElement> | Event) => {
      if (t instanceof HTMLElement) {
        cb && cb(t);
      }
      return;
    },
    [cb]
  );

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener('click', handler);
      return () => element && element.removeEventListener('click', handler);
    }
  }, [element, handler]);

  return;
};
