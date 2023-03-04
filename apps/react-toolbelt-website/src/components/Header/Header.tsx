'use client';

import {
  useState,
  useEffect,
  useRef,
  createElement,
  ReactElement
} from 'react';
import Link from 'next/link';

import { Logo, IconList } from '@/components';
import { BurgerMenu } from './components';
import { useClick, useKey } from '@react-toolbelt/hooks';
import type { AriaOrientation } from '@/types';

import navigation from '@/settings/navigation.json';
import icons from '@/settings/social-icons';
import { useApp } from '@/context';

export const Header = (): ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  /**********************************************************************************/
  /** Handle SideEffects */
  /**********************************************************************************/
  const {
    settings: {
      scroll: { direction },
      windowSize: { width: windowWidth }
    }
  } = useApp();

  /** Show Hide Menu based on windowWidth */
  useEffect(() => {
    if (windowWidth > 768) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [windowWidth]);

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
      className="header-gradient-dark fixed z-1000 col-span-full m-0 flex h-header w-full items-center justify-between px-5 shadow transition-transform duration-300"
      role="region"
      aria-label="Header Region"
      data-scroll={direction.y}
    >
      {windowWidth < 768 && (
        <BurgerMenu
          ref={burgerRef}
          onClick={() => setShowMenu((prev) => !prev)}
          active={showMenu}
          ariaControls="RT-HeaderMenu"
        />
      )}
      <div className="RT-HeaderLogo relative flex h-full w-full items-center justify-center md:static md:w-auto">
        <Logo className="absolute left-[calc(50%-var(--header-logo-h)/2)] top-[calc(50%-var(--header-logo-h)/2)] h-logo hover:animate-slow-spin md:static" />
      </div>

      {showMenu && (
        <section className="relative flex h-full">
          <nav
            id="RT-HeaderMenu"
            role="menubar"
            className={`RT-Navigation fixed left-0 top-[--header-min-h] mt-header flex h-body-full min-h-body-screen md:mt-0 ${
              direction.y === 'up' ? 'h-body-screen' : 'h-screen'
            } ${
              showMenu ? 'open animate-slide-in-left' : 'close'
            } w-1/2 flex-col overflow-y-auto bg-theme-primary-2 transition-height duration-300 md:static md:h-auto md:min-h-full md:w-auto md:flex-row md:bg-transparent`}
            ref={menuRef}
            {...menuOrientation}
          >
            <ul
              className="RT-NavigationMenuList md:max-h-auto flex flex-col gap-5 p-5 md:flex-row"
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
                      'border-b border-b-theme-accent-3 py-4 font-bold text-gray-400 hover:text-white md:text-theme-accent md:hover:text-theme-accent-2 md:py-0 md:border-0 transition-colors animate-fade-in'
                  },
                  <Element title={title} {...linkProps}>
                    {title}
                  </Element>
                );
              })}
            </ul>
            <IconList
              icons={icons}
              className="flex h-full items-end gap-5 p-5 md:h-auto md:items-center md:gap-4"
            />
          </nav>
        </section>
      )}
    </header>
  );
};
