import { Fragment, memo, ReactNode } from 'react';
import { isExternalLink } from '@react-toolbelt/utils';
import { Link } from '../Link';
import { NavigationItem } from '@/types';
import { Accordion, AccordionProps } from '../Accordion';

const ELEMENTS = ['aside', 'nav', 'section', 'div'] as const;

interface SideBarItemOptions {
  stagger?: boolean;
  highlight?: boolean;
  border?: boolean;
  headings?: boolean;
  fontSize?: 'sm' | 'base' | 'l';
}

interface SidebarProps extends SideBarItemOptions {
  /** className attribute of the Sidebar Component */
  className?: string;
  /** Allows polymorphism - Generate the Sidebar component as a different HTML element */
  as?: 'nav' | 'aside' | 'div' | 'section';
  /** A list of Navigation items */
  items?: NavigationItem[];
  /** Whether to render the items as a default navigation list or an accordion */
  preset?: 'default' | 'accordion';
}

const Sidebar = memo<SidebarProps>(
  ({
    className,
    items,
    preset = 'default',
    as = 'aside',
    ...navigationOptions
  }) => {
    const Element = ELEMENTS.includes(as) ? as : 'aside';

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
        renderNavigationItems(items, navigationOptions)
      ) : (
        <Accordion id="menu" className="text-md" items={accordionItems} />
      );

    return (
      <Element
        role="navigation"
        className={`RT-Sidebar py-5 ${
          navigationOptions.stagger && preset === 'default' ? 'pr-5' : 'px-5'
        } ${className ?? ''}`}
      >
        {itemsMarkup}
      </Element>
    );
  }
);

/** Helper Functions */
function isNavigationItem(item: NavigationItem): item is NavigationItem {
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
const renderNavigationItems = (
  items: NavigationItem[] = [],
  options: SideBarItemOptions = {}
) => {
  return (
    Array.isArray(items) &&
    items.length > 0 && (
      <ul className={`RT-SidebarItems flex flex-col gap-1.5`} role="menu group">
        {items.map(({ id, name, title, items, url }) => {
          const titleMarkup =
            options.headings && !url ? (
              <h6
                className={`RT-NavigationTitle py-4 font-body text-base leading-snug`}
              >
                {title}
              </h6>
            ) : (
              <span
                className={`RT-NavigationTitle inline-flex w-full items-center ${
                  options.fontSize ? `text-${options.fontSize}` : 'text-base'
                } ${
                  options.highlight
                    ? 'pl-4 hover:bg-theme-primary-2 dark:hover:bg-theme-primary-2'
                    : ''
                }`}
              >
                {title}
              </span>
            );

          return (
            <li
              id={id || name}
              key={id || name}
              role="menuitem"
              className={`flex flex-col gap-1.5 ${
                options.stagger ? 'pl-4' : ''
              }`}
            >
              {url ? (
                <Link
                  className={`-ml-px block text-theme-accent-3 transition-colors hover:text-slate-300  ${
                    options.border
                      ? 'border-l border-transparent hover:border-slate-400 dark:hover:border-slate-500'
                      : ''
                  }`}
                  href={url}
                  title={title}
                  scroll={false}
                >
                  {titleMarkup}
                </Link>
              ) : (
                titleMarkup
              )}
              {renderNavigationItems(items, options)}
            </li>
          );
        })}
      </ul>
    )
  );
};

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
function generateAccordionPreset(items?: NavigationItem[]) {
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
          content: generateAccordionContent((items[i] as NavigationItem).items)
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

Sidebar.displayName = 'Sidebar';
export { Sidebar };
