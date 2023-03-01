import { useEffect, ChangeEvent, useCallback } from 'react';
import type { DOMElement } from '../../types';
import { isServer } from '@react-tools/utils';

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `void`
 * @returns `HTMLElement`
 */
export const useChange = (
  element?: DOMElement,
  cb?: (target: HTMLElement) => void
) => {
  if (typeof element === 'undefined') {
    element = isServer() ? undefined : document;
  }

  const handler = useCallback(
    ({ target }: ChangeEvent<HTMLElement> | Event) => {
      if (target instanceof HTMLElement) {
        cb && cb(target);
      }
      return;
    },
    [cb]
  );

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener('change', handler);
      return () => element && element.removeEventListener('change', handler);
    }
  }, [element, handler]);

  return;
};
