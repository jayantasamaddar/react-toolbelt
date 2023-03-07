import { useEffect, useCallback, FocusEvent } from 'react';
import type { DOMElement } from '../../types';
import { isServer } from '@react-toolbelt/utils';

/**
 * Handle blur effects
 *
 * @param {?DOMElement} [element]
 * @param {?(target: HTMLElement) => void} [cb]
 * @returns {void}`void`
 */
export const useBlur = (
  element?: DOMElement,
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
      element.addEventListener('focusout', handler);
      return () => element && element.removeEventListener('focusout', handler);
    }
  }, [element, handler]);

  return;
};
