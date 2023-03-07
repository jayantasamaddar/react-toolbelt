import { IconSource } from './IconSource';

export interface NavigationItem {
  /** Unique ID of the Navigation Item */
  id?: string;
  /** `name` attribute is a unique handle usually in kebab-case for the Navigation Item */
  name?: string;
  /** Visible Text to be displayed in the UI */
  title: string;
  /** Icon */
  icon?: IconSource;
  /** Link to go to */
  url?: string;
  /** Whether link is external or not */
  external?: boolean;
  /** A collection of Navigation Items */
  items?: NavigationItem[];
}

export interface NavigationItemHeader extends NavigationItem {
  /** A collection of Navigation Items */
  items: NavigationItem[];
}

export type Headings<K> = K & {
  level: number;
};
export type HeadingNavigationItem = Headings<NavigationItem>;
export type HeadingNavigationItemHeader = Headings<NavigationItemHeader>;
export type HeadingListItem =
  | HeadingNavigationItem
  | HeadingNavigationItemHeader;
