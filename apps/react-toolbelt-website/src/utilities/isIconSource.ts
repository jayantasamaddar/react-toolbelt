import { IconSource } from '../types';

/** Check whether Type is IconSource */
export const isIconSource = (x: any): x is IconSource => {
  return (
    typeof x === 'string' || x === 'placeholder' || typeof x === 'function'
  );
};
