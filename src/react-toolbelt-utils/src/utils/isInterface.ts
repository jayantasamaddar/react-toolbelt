import { isValidElement, ReactNode } from 'react';

/**
 * Used to determine if passed argument is an interface and not a React Element or any HTMLElement
 * Can be used to check if the value passed is an Array or a string rather than a ReactElement
 */
export function isInterface<T>(x: T | ReactNode): x is T {
  return !isValidElement(x) && x !== undefined;
}
