import { ReactElement, ReactNode } from 'react';

export interface InvisibleProps {
  /** The content to be hidden visually */
  children?: ReactNode;
}

export const Invisible = ({ children }: InvisibleProps): ReactElement => {
  return (
    <span className="RHD-Invisible invisible absolute inset-0 m-0 h-0 w-0 overflow-hidden whitespace-nowrap border-0 p-0 outline-0">
      {children}
    </span>
  );
};
