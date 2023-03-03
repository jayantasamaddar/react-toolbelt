import { ReactNode } from 'react';

export interface AccordionItem {
  /** The unique ID of the Accordion Item */
  id: string;
  /** The display text of the Accordion Item when not active */
  title?: string;
  /** The panel content to display for the Accordion Item when active */
  content?: ReactNode;
  /** Whether Accordion Item is active */
  active?: boolean;
}
