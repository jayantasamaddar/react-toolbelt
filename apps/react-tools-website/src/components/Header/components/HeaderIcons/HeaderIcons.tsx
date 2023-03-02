import { Button } from '@/components';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord';

const icons = [
  {
    id: '1',
    title: 'View on GitHub',
    url: 'https://www.github.com/jayantasamaddar/react-tools',
    icon: <FaGithub size="1.5rem" />
  },
  {
    id: '2',
    title: 'View on Discord',
    url: 'https://www.github.com/jayantasamaddar/react-tools',
    icon: <FaDiscord size="1.5rem" />
  }
];

export const HeaderIcons = () => {
  return (
    <ul
      className="IconList flex h-full items-center gap-5 p-5 md:gap-3"
      role="menu group"
    >
      {icons.map(({ id, title, url, icon }) => (
        <li role="menuitem" key={id} title={title}>
          <a
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            className="IconLink flex items-center"
          >
            <Button
              icon={icon}
              className="text-theme-accent-2 transition-colors hover:text-theme-accent-3"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
