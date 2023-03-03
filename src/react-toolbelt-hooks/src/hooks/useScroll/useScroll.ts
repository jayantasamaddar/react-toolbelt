import { useState, useRef, useEffect, useCallback } from 'react';
import type { Element } from '../../types';
import { generateScrollValues, isServer } from '@react-toolbelt/utils';

interface ScrollDirection {
  x: 'left' | 'right';
  y: 'up' | 'down';
}
type CallbackAction = (
  direction: ScrollDirection,
  values: { x: number; y: number }
) => void;

/**
 *
 * @param element `(Window & typeof globalThis) | Document | HTMLElement`
 * @param cb `(ScrollDirection, typeof scrollValues) => void`
 * @returns `{ scrollDirection, scrollValues }`
 */
export const useScroll = (element?: Element, cb?: CallbackAction) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    x: 'left',
    y: 'up'
  });
  const scrollRef = useRef(generateScrollValues(element));

  if (typeof element === 'undefined') {
    element = isServer() ? undefined : window;
  }

  const handler = useCallback(() => {
    const { x, y } = generateScrollValues(element);
    const currentDirection: ScrollDirection = {
      x: x > scrollRef.current.x ? 'right' : 'left',
      y: y > scrollRef.current.y ? 'down' : 'up'
    };
    setScrollDirection(currentDirection);
    scrollRef.current.x = x;
    scrollRef.current.y = y;
    cb && cb(currentDirection, { x, y });
    return;
  }, [cb, element]);

  useEffect(() => {
    if (!isServer()) {
      window.addEventListener('scroll', handler);
      return () => window.removeEventListener('scroll', handler);
    }
  }, [handler]);

  return { scrollDirection, scrollValues: scrollRef.current };
};
