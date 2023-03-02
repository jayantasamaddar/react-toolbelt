import { useState, useEffect, useCallback, MouseEvent } from 'react';
import type { DOMElement } from '../../types';
import { isServer } from '@react-tools/utils';

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `void`
 * @returns `HTMLElement`
 */
export const useHover = (
  element?: DOMElement,
  cb?: (hoverState?: boolean) => void
) => {
  const [hoverState, setHoverState] = useState(false);

  if (typeof element === 'undefined') {
    element = isServer() ? undefined : document;
  }

  const handler = useCallback(
    ({ target: t }: MouseEvent<HTMLElement> | Event, state: boolean) => {
      if (t instanceof HTMLElement) {
        setHoverState(state);
        cb && cb(state);
      }
      return;
    },
    [cb]
  );

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener('mouseenter', (e) => handler(e, true));
      return () =>
        element &&
        element.removeEventListener('mouseenter', (e) => handler(e, true));
    }
  }, [element, handler]);

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener('mouseleave', (e) => handler(e, false));
      return () =>
        element &&
        element.removeEventListener('mouseleave', (e) => handler(e, false));
    }
  }, [element, handler]);

  return hoverState;
};
