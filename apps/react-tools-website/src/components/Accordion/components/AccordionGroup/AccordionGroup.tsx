import { ReactNode } from 'react';
import { AccordionHeader, AccordionPanel } from '../../components';
import { isValidChildren } from '@react-tools/utils';
import type { AccordionItem } from '@/types';

interface AccordionGroupItem extends AccordionItem {
  onClick?(): void;
}

interface AccordionGroup {
  id?: string;
  className?: string;
  item?: AccordionGroupItem;
  children?: ReactNode;
}

export const AccordionGroup = ({
  id,
  item,
  className,
  children
}: AccordionGroup) => {
  const isValidAccordionGroup = isValidChildren(children, {
    count: 2,
    instanceEnums: [
      { component: AccordionHeader, min: 1, max: 1 },
      { component: AccordionPanel, min: 1, max: 1 }
    ]
  });
  const itemMarkup = isValidAccordionGroup ? (
    children
  ) : item && Object.keys(item).length > 0 ? (
    <>
      <AccordionHeader
        id={item.id}
        title={item.title}
        active={item.active}
        onClick={item.onClick}
        ariaControls={`RT-AccordionPanel-${item.id}`}
      />
      <AccordionPanel
        id={`RT-AccordionPanel-${item.id}`}
        ariaLabelledBy={item.id}
        active={item.active}
      >
        {item.content}
      </AccordionPanel>
    </>
  ) : null;

  return (
    <article id={id} className={`RT-AccordionGroup ${className ?? ''}`}>
      {itemMarkup}
    </article>
  );
};
