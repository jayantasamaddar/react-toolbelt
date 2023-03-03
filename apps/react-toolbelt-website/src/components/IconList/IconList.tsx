import { Button } from '@/components';
import type { IconList as IconListProps } from '@/types';

export const IconList = ({ className, icons }: IconListProps) => {
  return (
    <ul className={`RT-IconList ${className ?? ''}`} role="menu group">
      {icons?.map(({ id, title, url, icon: IconItem }) => (
        <li role="menuitem" key={id} title={title}>
          <a
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            className="RT-IconListItemLink flex items-center"
          >
            <Button
              icon={<IconItem size="1.5rem" />}
              className="text-theme-accent-2 transition-colors hover:text-theme-accent-3"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
