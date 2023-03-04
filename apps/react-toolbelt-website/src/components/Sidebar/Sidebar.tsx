import type { IconSource } from '@/types';
import { isExternalLink } from '@/utilities';
import Link from 'next/link';
import { Fragment, ReactNode, memo } from 'react';
import { Accordion, AccordionProps } from '../Accordion';

interface NavigationItem {
  /** Unique ID of the NavigationItem */
  id?: string;
  /** `name` attribute is a unique handle usually in kebab-case for the NavigationItem */
  name?: string;
  /** Visible Text in the UI */
  title: string;
  /** Icon */
  icon?: IconSource;
  /** Link to go to */
  url?: string;
  /** Whether link is external or not */
  external?: boolean;
}

interface NavigationItemHeader extends NavigationItem {
  items: NavigationItem[];
}

interface SidebarProps {
  className?: string;
  items?: NavigationItemHeader[] | NavigationItem[];
  preset?: 'default' | 'accordion';
}

const Sidebar = memo<SidebarProps>(
  ({ className, items, preset = 'default' }) => {
    const accordionItems: AccordionProps['items'] = [
      {
        id: 'menu',
        title: 'Menu',
        active: false,
        content: generateAccordionPreset(items)
      }
    ];

    const itemsMarkup =
      preset === 'default' ? (
        generateNavigationItems(items)
      ) : (
        <Accordion id="menu" className="text-md" items={accordionItems} />
      );

    return (
      <aside className={`RT-Sidebar p-5 ${className ?? ''}`}>
        {itemsMarkup}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

/** Helper Functions */
function isNavigationItem(
  item: NavigationItemHeader | NavigationItem
): item is NavigationItem {
  return 'items' in item === false;
}

/**
 * Generate a link markup based on whether it's an internal or external link.
 * @param item
 * @param props
 * @returns `JSX.Element` | `undefined`
 */
function generateLinkMarkup(
  item: NavigationItem,
  props?: { [k: string]: number | string | boolean }
) {
  const Element = !isExternalLink(item?.url ?? '') ? Link : 'a';

  const linkProps =
    Element === 'a'
      ? Object.assign({}, { href: item.url ?? '' }, props)
      : Object.assign({}, { passHref: true, href: item.url ?? '' }, props);

  return item.url ? <Element {...linkProps}>{item.title}</Element> : undefined;
}

/**
 * Generate Sidebar Items as list components
 * @param item
 * @param props
 * @param children
 * @returns `JSX.Element`
 */
function generateNavigationItem(
  item: NavigationItem,
  props: { [k: string]: any },
  children?: ReactNode
) {
  const linkMarkup = generateLinkMarkup(item, {
    className:
      'block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-theme-accent-3 hover:text-slate-300 hover:bg-theme-primary-2 dark:hover:bg-theme-primary-2 transition-colors'
  });

  return (
    <li key={item.id} id={item.id} {...props}>
      {!item.url ? (
        <p className="RT-NavigationTitle py-2.5 font-bold">{item.title}</p>
      ) : (
        linkMarkup
      )}
      {children}
    </li>
  );
}

/**
 * Generate Default Navigation Items for the Sidebar
 * @param items
 * @returns `JSX.Element` | `undefined`
 */
function generateNavigationItems(
  items?: NavigationItemHeader[] | NavigationItem[]
) {
  return Array.isArray(items) && items.length > 0 ? (
    <ul className="RT-SidebarItems flex flex-col gap-2">
      {items.map((item) => {
        const isSingleItem = isNavigationItem(item);

        const itemsMarkup = !isSingleItem ? (
          <ul
            className={`RT-Sidebar-${
              (item as NavigationItemHeader).name
            }Items flex flex-col gap-1`}
          >
            {(item as NavigationItemHeader)?.items?.map((itemInner) => {
              const isValidItem = isNavigationItem(itemInner);
              return isValidItem
                ? generateNavigationItem(itemInner, {
                    className: ''
                  })
                : null;
            })}
          </ul>
        ) : null;

        return generateNavigationItem(item, {}, itemsMarkup);
      })}
    </ul>
  ) : undefined;
}

/**
 * Generate Content for the Accordion when Sidebar preset is `accordion`
 * @param items
 * @returns `JSX.Element` | `undefined`
 */
function generateAccordionContent(items?: NavigationItem[]) {
  if (!items) return undefined;
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <Fragment key={item.id}>{generateNavigationItem(item, {})}</Fragment>
      ))}
    </ul>
  );
}

/**
 * Generate Sidebar when preset is set to `accordion`
 * @param items
 * @returns `JSX.Element`
 */
function generateAccordionPreset(
  items?: NavigationItemHeader[] | NavigationItem[]
) {
  let itemsMarkup: ReactNode;
  if (Array.isArray(items) && items.length > 0) {
    const nonAccordionItems: NavigationItem[] = [];
    const accordionItems: NonNullable<AccordionProps['items']> = [];

    for (let i = 0; i < items.length; i++) {
      if (isNavigationItem(items[i])) {
        nonAccordionItems[i] = items[i];
      } else {
        accordionItems[i] = {
          id: items[i].id as string,
          title: items[i].title,
          active: false,
          content: generateAccordionContent(
            (items[i] as NavigationItemHeader).items
          )
        };
      }
    }
    itemsMarkup = items.map((item, index) => {
      if (isNavigationItem(item)) {
        const currentItem = nonAccordionItems[index];
        const linkMarkup = generateLinkMarkup(nonAccordionItems[index]);
        return (
          <li key={currentItem.id} className="RT-SidebarHeaderItem">
            <h3 className="RT-SidebarHeader leading-none">
              <span className="RT-AccordionHeaderText text-sm">
                {linkMarkup}
              </span>
            </h3>
          </li>
        );
      }
      const currentItem = accordionItems[index];
      return (
        <li id={currentItem.id} key={currentItem.id}>
          <Accordion items={[accordionItems[index]]} />
        </li>
      );
    });
  }

  return <ul className="RT-SidebarAccordion">{itemsMarkup}</ul>;
}

export { Sidebar };
