'use client';

import {
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  ReactElement,
  useCallback,
  ChangeEvent
} from 'react';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import type { BaseButton, IconSource, UploadButtonProps } from '@/types';
import { isIconSource } from '@/utilities';
import { Invisible } from '../Invisible';

interface ButtonProps extends BaseButton {
  primary?: boolean;
  outline?: boolean;
  alert?: boolean;
  unstyled?: boolean;
  upload?: boolean;
  uploadOptions?: UploadButtonProps;
  icon?: ReactElement | IconSource;
  iconOnly?: boolean;
}

const BUTTON_TYPES = ['button', 'submit'];

const Button = forwardRef<HTMLButtonElement | HTMLInputElement, ButtonProps>(
  (
    {
      id,
      className,
      name,
      type = 'button',
      primary,
      outline,
      alert,
      url,
      external,
      role,
      disabled,
      children,
      onClick,
      onFocus,
      onBlur,
      onKeyUp,
      onKeyDown,
      onPointerDown,
      onMouseEnter,
      onTouchStart,
      unstyled,
      loading,
      ariaLabel,
      ariaControls,
      ariaChecked,
      ariaExpanded,
      ariaDescribedBy,
      upload,
      uploadOptions,
      icon,
      iconOnly
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null); // For File Upload Button (input type: file)
    const buttonRef = useRef<HTMLButtonElement>(null); // For other Buttons

    useImperativeHandle(ref, () =>
      upload
        ? (inputRef.current as HTMLInputElement)
        : (buttonRef.current as HTMLButtonElement)
    );

    /***************************************************************************************/
    /** Handle Events */
    /***************************************************************************************/

    const handleUploadButton = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        uploadOptions?.onChange?.(event);
      },
      [uploadOptions]
    );

    /***************************************************************************************/
    /** Categorize Props */
    /***************************************************************************************/
    const coreProps = {
      id,
      className: unstyled
        ? 'btn-unstyled'
        : 'btn inline-flex items-center justify-center',
      'aria-label': ariaLabel
    };

    coreProps.className += primary
      ? ' btn-primary py-3 px-6 md:px-3 lg:px-6 text-sm font-bold text-theme-accent-2 rounded-3xl border border-theme-accent-2 hover:bg-theme-accent-2 hover:text-white transition-colors'
      : '';
    coreProps.className += outline ? ' btn-outline' : '';
    coreProps.className += alert ? ' btn-alert' : '';
    coreProps.className += disabled ? ' btn-disabled' : '';
    coreProps.className += ` ${className ?? ''}`;

    const interactiveProps = {
      ...coreProps,
      role: role ? role + ' button' : 'button',
      onClick: upload ? () => inputRef.current?.click() : onClick,
      onFocus,
      onBlur,
      onMouseEnter,
      onTouchStart
    };

    const linkProps = {
      rel: Boolean(external) ? 'noreferrer' : undefined,
      target: Boolean(external) ? '_blank' : undefined
    };

    const accessibilityProps = {
      'aria-disabled': disabled ? true : undefined,
      'aria-busy': loading ? true : undefined,
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded
    };

    /***************************************************************************************/
    /** Content Markup */
    /***************************************************************************************/

    const childMarkup =
      typeof children === 'string' ? (
        <span className="RHD-ButtonText">{children}</span>
      ) : (
        children
      );

    const iconSource = isIconSource(icon) ? (
      <Icon src={loading ? 'placeholder' : icon} />
    ) : (
      icon
    );

    let iconMarkup: ReactNode;
    if (iconSource) {
      iconMarkup = iconOnly ? (
        iconSource
      ) : (
        <span className="ReactTools-ButtonIcon inline-flex items-center justify-center gap-1">
          {iconSource} {childMarkup}
        </span>
      );
    }

    const buttonContent = loading ? (
      <Spinner />
    ) : icon ? (
      iconMarkup
    ) : (
      childMarkup
    );

    /** Enable Button as a Link */
    let buttonMarkup: ReactElement;
    if (url) {
      buttonMarkup = (
        <a
          {...Object.assign(
            linkProps,
            disabled ? coreProps : { ...interactiveProps, href: url }
          )}
        >
          {buttonContent}
        </a>
      );
    } else {
      /** Generate Button without a Link */
      buttonMarkup = (
        <button
          {...interactiveProps}
          name={name}
          type={BUTTON_TYPES.includes(type) ? type : 'button'}
          ref={buttonRef}
          tabIndex={0}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPointerDown={onPointerDown}
          {...accessibilityProps}
        >
          {buttonContent}
        </button>
      );
    }

    const uploadMarkup = upload ? (
      <Invisible>
        <input
          type="file"
          hidden
          aria-hidden="true"
          tabIndex={-1}
          ref={inputRef}
          name={name}
          onChange={handleUploadButton}
          multiple={uploadOptions?.allowMultiple}
          accept={uploadOptions?.accept}
        />
      </Invisible>
    ) : undefined;

    /***************************************************************************************/
    /** Render the Button */
    /***************************************************************************************/

    return (
      <div className="RHD-ButtonContainer inline-flex items-center justify-center">
        {buttonMarkup}
        {uploadMarkup}
      </div>
    );
  }
);

Button.displayName = 'Button';
export { Button };
