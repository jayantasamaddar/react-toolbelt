import { useEffect, useCallback, FocusEvent } from 'react';
import type { DOMElement } from '../../types';
import { isServer } from '@react-toolbelt/utils';

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `void`
 * @returns `HTMLElement`
 */
export const useFocus = (
  element?: DOMElement,
  options?: { bubble?: boolean },
  cb?: (target: HTMLElement) => void
) => {
  if (typeof element === 'undefined') {
    element = isServer() ? undefined : document;
  }

  const handler = useCallback(
    ({ target: t }: FocusEvent<HTMLElement> | Event) => {
      if (t instanceof HTMLElement) {
        cb && cb(t);
      }
      return;
    },
    [cb]
  );

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener(
        `${options?.bubble ? 'focusin' : 'focus'}`,
        handler
      );
      return () =>
        element &&
        element.removeEventListener(
          `${options?.bubble ? 'focusin' : 'focus'}`,
          handler
        );
    }
  }, [element, options?.bubble, handler]);

  return;
};
