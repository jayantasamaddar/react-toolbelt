import { ReactElement } from 'react';

type Size = 'small' | 'large';

export interface SpinnerProps {
  /**
   * Size of spinner
   * @default 'large'
   */
  size?: Size;
  /** Fill color of the spinner */
  color?: string;
  /** Accessible label for the spinner */
  accessibilityLabel?: string;
  /** Allows the component to apply the correct accessibility roles based on focus */
  hasFocusableParent?: boolean;
}

export const Spinner = ({
  size = 'large',
  color = 'currentColor'
}: SpinnerProps): ReactElement => {
  const spinnerSVGMarkup = (
    <svg
      className="animate-spin"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      data-icon="spinner"
      width={size === 'small' ? '16' : '32'}
      height={size === 'small' ? '16' : '32'}
      fill={color}
    >
      <path d="M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z" />
    </svg>
  );

  return <span className="Ursa-Spinner">{spinnerSVGMarkup}</span>;
};
