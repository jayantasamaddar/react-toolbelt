import { IconType } from '@react-icons/all-files/lib';
import { IconSource } from './IconSource';

export interface IconListItem {
  id: string | number;
  title?: string;
  name?: string;
  url?: string;
  icon: IconSource | IconType;
}

export interface IconList {
  className?: string;
  icons?: IconListItem[];
}
