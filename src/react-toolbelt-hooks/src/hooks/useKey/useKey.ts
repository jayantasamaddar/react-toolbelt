import { useEffect, KeyboardEvent, useCallback } from 'react';
import type { DOMElement, KeyboardEventArgs } from '../../types';
import { isServer } from '@react-toolbelt/utils';

/**
 *
 * @param element `Document | HTMLElement`
 * @param key `'up' | 'down' | 'press'`
 * @param cb `void`
 * @returns `undefined`
 */
export const useKey = (
  element?: DOMElement,
  event: 'up' | 'down' | 'press' = 'down',
  cb?: (args: KeyboardEventArgs) => void
) => {
  if (typeof element === 'undefined') {
    element = isServer() ? undefined : document;
  }

  const handler = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      cb &&
        cb({
          code: e.code,
          key: e.key,
          locale: e.locale,
          location: e.location,
          metaKey: e.metaKey,
          repeat: e.repeat,
          shiftKey: e.shiftKey,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey
        });
    },
    [cb]
  );

  useEffect(() => {
    if (!isServer() && element) {
      element.addEventListener(`key${event}`, handler as never);
      return () =>
        element && element.removeEventListener(`key${event}`, handler as never);
    }
  }, [element, event, handler]);

  return;
};
