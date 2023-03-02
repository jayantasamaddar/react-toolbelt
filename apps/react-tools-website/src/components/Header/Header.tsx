'use client';

import {
  useState,
  useEffect,
  useRef,
  createElement,
  ReactElement
} from 'react';
import Link from 'next/link';

import { Logo } from '@/components';
import { BurgerMenu, HeaderIcons } from './components';
import { useClick, useKey, useResize, useScroll } from '@react-tools/hooks';
import type { AriaOrientation } from '@/types';

import navigation from '../../settings/navigation.json';

export const Header = (): ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  /**********************************************************************************/
  /** Handle SideEffects */
  /**********************************************************************************/
  const { width: windowWidth } = useResize();
  const { scrollDirection: direction } = useScroll();

  /** Show Hide Menu based on windowWidth */
  useEffect(() => {
    if (windowWidth > 768) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [windowWidth]);

  /** Add classes based on Burger Menu open/close state */
  useEffect(() => {
    if (showMenu) {
      menuRef.current?.classList.add('open');
      menuRef.current?.classList.remove('close');
    } else {
      menuRef.current?.classList.add('close');
      menuRef.current?.classList.remove('open');
    }
  }, [showMenu]);

  useClick(undefined, (target) => {
    if (
      (target.closest('nav#RT-HeaderMenu') === menuRef.current &&
        target.tagName !== 'A') ||
      target.closest('button#RT-BurgerMenu') === burgerRef.current
    )
      return;
    else setShowMenu(false);
  });

  /**********************************************************************************/
  /** Accessibility */
  /**********************************************************************************/

  const menuOrientation: AriaOrientation = {
    'aria-orientation': windowWidth > 768 ? 'horizontal' : 'vertical',
    'aria-hidden': windowWidth < 768 && !showMenu ? 'true' : 'false'
  };

  /** Enable Key Accessibility */
  useKey(burgerRef?.current ?? undefined, 'up', ({ key }) => {
    switch (key) {
      // Close expanded mobile menu
      case 'Escape':
        if (showMenu) setShowMenu(false);
        break;
      default:
        break;
    }
  });

  /**********************************************************************************/
  /** Render JSX */
  /**********************************************************************************/

  return (
    <header
      className="header-gradient-dark fixed z-1000 col-span-full m-0 flex h-[var(--header-min-h)] w-full items-center justify-between px-5 shadow transition-transform duration-300"
      role="region"
      aria-label="Header Region"
      data-scroll={direction.y}
    >
      {windowWidth < 768 && (
        <BurgerMenu
          ref={burgerRef}
          onClick={() => setShowMenu((prev) => !prev)}
          active={showMenu}
          // onKeyUp={handleKeys}
          ariaControls="RT-HeaderMenu"
        />
      )}
      <div className="RT-HeaderLogo relative flex h-full w-full items-center justify-center md:static md:w-auto">
        <Logo className="absolute left-[calc(50%-var(--header-logo-h)/2)] top-[calc(50%-var(--header-logo-h)/2)] h-header md:static" />
      </div>

      {showMenu && (
        <section className="relative mt-[calc(var(--header-min-h)*2)] flex h-full md:mt-0">
          <nav
            id="RT-HeaderMenu"
            role="menubar"
            className="RT-Navigation max-h-auto fixed left-0 top-[--header-min-h] flex h-screen w-1/2 flex-col overflow-y-auto bg-theme-primary-2 md:static md:h-full md:w-auto md:flex-row md:bg-transparent"
            ref={menuRef}
            {...menuOrientation}
          >
            <ul
              className="RT-NavigationMenuList md:max-h-auto flex max-h-screen flex-col gap-5 p-5 md:flex-row"
              role="menu group"
              {...menuOrientation}
            >
              {navigation.map(({ id, name, title, link, url }) => {
                const Element = link === 'internal' ? Link : 'a';
                const linkProps =
                  Element === 'a'
                    ? { href: url }
                    : { passHref: true, href: url };
                return createElement(
                  'li',
                  {
                    key: id,
                    name,
                    role: 'menuitem',
                    className:
                      'border-b py-4 font-bold text-gray-400 hover:text-white md:text-theme-accent md:hover:text-theme-accent-2 md:py-0 md:border-0 transition-colors animate-fade-in'
                  },
                  <Element title={title} {...linkProps}>
                    {title}
                  </Element>
                );
              })}
            </ul>
            <HeaderIcons />
          </nav>
          {/* <nav role="menubar" className="flex items-center">
            
          </nav> */}
        </section>
      )}
    </header>
  );
};
