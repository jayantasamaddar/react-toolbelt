'use client';

import {
  memo,
  NamedExoticComponent,
  ReactNode,
  useCallback,
  useState
} from 'react';
import { AccordionHeader, AccordionPanel, AccordionGroup } from './components';
import { isValidChildren, isInterface } from '@react-toolbelt/utils';
import type { AccordionItem } from '@/types';

export interface AccordionProps {
  /** Unique `id` attribute of the Accordion. */
  id?: string;
  /** `className` attribute of the Accordion. */
  className?: string;
  /** Items that each represent an `AccordionGroup` component. */
  items?: AccordionItem[];
  /** `Children` attribute of the Accordion. Children can only be an `AccordionGroup` component. */
  children?: ReactNode;
  /** If both `items` and `children` are present, position the children `before` or `after` items. */
  childrenPosition?: 'before' | 'after';
}

const Accordion = memo(
  ({ id, className, children, childrenPosition = 'after', items }) => {
    const [data, setData] = useState(
      items?.map((item) => ({ ...item, active: item.active ?? false })) ?? []
    );

    const isValidAccordion = isValidChildren(children, {
      instanceEnums: [{ component: AccordionGroup }]
    });

    const toggleActive = useCallback((index: number) => {
      setData((prev) =>
        prev.map((item, i) => ({
          ...item,
          active: index === i ? !item.active : item.active
        }))
      );
    }, []);

    const itemsMarkup =
      isInterface(items) && Array.isArray(items)
        ? data.map((item, indx) => (
            <AccordionGroup
              key={item.id}
              id={item.id}
              item={{ ...item, onClick: () => toggleActive(indx) }}
            />
          ))
        : null;

    return (
      <section id={id} className={`RT-Accordion ${className ?? ''}`}>
        {isValidAccordion && childrenPosition === 'before' && children}
        {itemsMarkup}
        {isValidAccordion && childrenPosition === 'after' && children}
      </section>
    );
  }
) as NamedExoticComponent<AccordionProps> & {
  Group: typeof AccordionGroup;
  Header: typeof AccordionHeader;
  Panel: typeof AccordionPanel;
};

Accordion.Group = AccordionGroup;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
Accordion.displayName = 'Accordion';

export { Accordion };
