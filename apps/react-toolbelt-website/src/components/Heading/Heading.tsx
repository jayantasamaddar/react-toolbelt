import { toKebabCase } from '@react-toolbelt/utils';
import {
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useId
} from 'react';
import { HashLink } from './components';

const ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export interface HeadingProps {
  /** Unique id for the Heading */
  id?: string;
  /** className attribute of the Heading component */
  className?: string;
  /** A prefix component that appears in-line before the main Heading content */
  prefix?: ReactElement | JSX.Element;
  /** Whether the Heading component is a `h1`, `h2`, `h3`, `h4`, `h5` or `h6`.
   *
   * Default: `h2`
   */
  tag?: (typeof ELEMENTS)[number];
  children: ReactNode;
  /** A suffix component that appears in-line after the main Heading content */
  suffix?: ReactElement | JSX.Element;
  /** Toggles Hashlink on or off */
  hashLink?: boolean;
  hashLinkOptions?: {
    /** The title for the hashlink */
    title?: string;
    /** CSS Properties for the Hashlink */
    style?: CSSProperties;
    className?: string;
    /** Allows hashlink to be copied on click. */
    clickToCopy?: boolean;
  };
}

export const Heading = ({
  id,
  className,
  tag = 'h2',
  prefix,
  children,
  suffix,
  hashLink,
  hashLinkOptions
}: HeadingProps) => {
  const generated_id = useId();
  const heading_id =
    id ?? typeof children !== 'string'
      ? generated_id
      : toKebabCase(children)?.toLowerCase().replaceAll(' ', '-');

  const Element = ELEMENTS.includes(tag) ? tag : 'h2';

  const prefixMarkup = isValidElement(prefix) ? (
    <span className="RT-HeadingSuffix">{prefix}</span>
  ) : null;

  const suffixMarkup = isValidElement(suffix) ? (
    <span className="RT-HeadingSuffix">{suffix}</span>
  ) : null;

  return (
    <Element
      id={heading_id}
      className={`RT-Heading flex gap-2 ${className ?? ''}`}
    >
      {prefixMarkup}
      <span className="RT-HeadingText">{children}</span>
      {suffixMarkup}
      {hashLink ? (
        <HashLink ariaControls={heading_id} {...hashLinkOptions} />
      ) : null}
    </Element>
  );
};
