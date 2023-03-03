import { ReactNode } from 'react';
import { Prefix } from '@/types';

const ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const SIZE_OPTIONS = [
  'xs',
  'sm',
  'standard',
  'base',
  'm',
  'lg',
  'xl',
  '2xl',
  '3xl'
] as const;
const ALIGNMENT = ['left', 'right', 'center'] as const;

export interface Heading {
  id?: string;
  className?: string;
  tag?: (typeof ELEMENTS)[number];
  size?: (typeof SIZE_OPTIONS)[number];
  align?: (typeof ALIGNMENT)[number];
  children: ReactNode;
}

export const Heading = ({
  className,
  tag = 'h2',
  size,
  align = 'left',
  children
}: Heading) => {
  let computedSize: Prefix<Heading['size'], 'text-'>;
  const computedAlign = ['left', 'right', 'center'].includes(align)
    ? `text-${align}`
    : 'text-left';
  const Element = ELEMENTS.includes(tag) ? tag : 'h2';

  if (size && SIZE_OPTIONS.includes(size)) computedSize = `text-${size}`;
  else {
    switch (Element) {
      case 'h1':
        computedSize += '3xl';
        break;
      case 'h2':
        computedSize += '2xl';
        break;
      case 'h3':
        computedSize += 'xl';
        break;
      case 'h4':
        computedSize += 'lg';
        break;
      case 'h5':
        computedSize += 'base';
        break;
      case 'h6':
        computedSize += 'standard';
        break;
      default:
        break;
    }
  }

  const classList = `${computedSize} ${computedAlign} ${className ?? ''}`;

  return <Element className={classList}>{children}</Element>;
};
