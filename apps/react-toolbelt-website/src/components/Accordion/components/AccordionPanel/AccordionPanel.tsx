import { ReactNode } from 'react';

interface AccordionPanel {
  id?: string;
  className?: string;
  ariaLabelledBy?: string;
  active?: boolean;
  children?: ReactNode;
}

export const AccordionPanel = ({
  id,
  className,
  ariaLabelledBy,
  active,
  children
}: AccordionPanel) => {
  return (
    <div
      id={id}
      className={`RT-AccordionPanel ${
        !active && 'hidden'
      } animate-smooth-slide-in-top px-4 py-2
       ${className ?? ''}`}
      role="region"
      aria-hidden={!active}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </div>
  );
};
