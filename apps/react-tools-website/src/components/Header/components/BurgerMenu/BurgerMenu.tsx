import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { forwardRef, KeyboardEvent } from 'react';
import { Button } from '../../../Button';

interface BurgerMenuProps {
  onClick(): void;
  onKeyUp?(e: KeyboardEvent<HTMLButtonElement>): void;
  active?: boolean;
  ariaControls?: string;
}

const BurgerMenu = forwardRef<HTMLButtonElement, BurgerMenuProps>(
  ({ onClick, onKeyUp, active = false, ariaControls }, ref) => {
    return (
      <div className="absolute z-1000 flex h-full w-16 min-w-fit items-center px-1">
        <Button
          unstyled
          id="RT-BurgerMenu"
          className="inline-flex items-center text-theme-accent-2 transition-colors hover:text-gray-400"
          onClick={onClick}
          onKeyUp={onKeyUp}
          ref={ref}
          ariaLabel={!active ? 'Open the Menu' : 'Close the Menu'}
          ariaControls={ariaControls}
          ariaExpanded={active}
          ariaPressed={active}
          icon={
            !active ? (
              <GiHamburgerMenu size="1.25em" />
            ) : (
              <FaTimes size="1.25em" />
            )
          }
        />
      </div>
    );
  }
);

BurgerMenu.displayName = 'BurgerMenu';
export { BurgerMenu };
