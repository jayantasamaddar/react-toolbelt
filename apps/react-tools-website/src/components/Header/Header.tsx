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
  //   const { width: windowWidth } = useResize();

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

  /** Enable feature: Click outside to close (also closes if clicked on menu links) */
  //   useEffect(() => {
  //     const handler = ({ target }) => {
  //       if (
  //         (target.closest('nav#RHD-HeaderMenu') === menuRef.current &&
  //           target.tagName !== 'A') ||
  //         target.closest('button#RHD-BurgerMenu') === burgerRef.current
  //       )
  //         return;
  //       else setShowMenu(false);
  //     };

  //     window.addEventListener('click', handler);
  //     return () => window.removeEventListener('click', handler);
  //   }, []);

  useClick(undefined, (target) => {
    if (
      (target.closest('nav#RHD-HeaderMenu') === menuRef.current &&
        target.tagName !== 'A') ||
      target.closest('button#RHD-BurgerMenu') === burgerRef.current
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
  // const handleKeys = (e: KeyboardEvent<HTMLButtonElement>) => {
  //   switch (e.key) {
  //     // Close expanded mobile menu
  //     case 'Escape':
  //       if (showMenu) setShowMenu(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
          ariaControls="RHD-HeaderMenu"
        />
      )}
      <div className="RHD-HeaderLogo relative flex h-full w-full items-center justify-center md:static md:w-auto">
        <Logo className="absolute left-[calc(50%-25px)] top-[calc(50%-6.6416px)] md:static" />
      </div>

      {showMenu && (
        <section className="relative mt-[calc(var(--header-min-h)*2)] flex h-full md:mt-0">
          <nav
            id="RHD-HeaderMenu"
            role="menubar"
            className="RHD-Navigation fixed left-0 top-[--header-min-h] flex max-h-screen w-1/2 flex-col md:static md:max-h-full md:w-auto md:flex-row"
            ref={menuRef}
            {...menuOrientation}
          >
            <ul
              className="RHD-NavigationMenuList flex h-screen flex-col gap-5 bg-theme-primary-2 p-5 md:h-auto md:flex-row md:bg-transparent"
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
