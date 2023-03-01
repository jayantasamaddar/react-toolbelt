import { Element } from '../types';
import { isServer } from './isServer';

export const generateScrollValues = (
  element: Element | undefined
): { x: number; y: number } => {
  if (isServer() || element === undefined) return { x: 0, y: 0 };
  if (element === window) {
    return {
      x: element.scrollX,
      y: element.scrollY
    };
  } else if (element instanceof Element) {
    return { x: element.scrollLeft, y: element.scrollTop };
  } else return { x: 0, y: 0 };
};
