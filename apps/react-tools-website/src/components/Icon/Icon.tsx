import { FC, SVGProps, AriaRole, MouseEvent, ReactElement } from 'react';
import Image from 'next/image';

export type IconSource = FC<SVGProps<SVGSVGElement>> | 'placeholder' | string;

interface IconProps {
  src: IconSource;
  role?: AriaRole;
  title?: string;
  className?: string;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
}

export const Icon = ({
  src: Element,
  className,
  role,
  title
}: IconProps): ReactElement => {
  /*****************************************************************/
  // Find the typeof source as sourceType
  /*****************************************************************/
  const sourceType =
    typeof Element === 'function'
      ? 'function'
      : Element === 'placeholder'
      ? 'placeholder'
      : 'external';

  const iconMarkup = {
    function: (
      <Element className="RHD-IconSVG" focusable="false" aria-hidden="true" />
    ),
    placeholder: <div className="RHD-IconPlaceholder" />,
    external: (
      <Image
        className="RHD-IconSVG"
        src={`data:image/svg+xml;utf8,${Element}`}
        alt=""
        aria-hidden="true"
      />
    )
  };

  return (
    <div
      className={`RT-Icon ${className ?? ''}`}
      aria-label={title}
      role={role ?? 'presentation'}
    >
      {iconMarkup[sourceType]}
    </div>
  );
};
