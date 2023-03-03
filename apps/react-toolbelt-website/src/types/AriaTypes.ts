import { AriaRole, AriaAttributes } from 'react';

export interface AriaButton {
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: AriaRole;
  /** Visually hidden text for screen readers */
  ariaLabel?: AriaAttributes['aria-label'];
  /** Id of the element the button controls */
  ariaControls?: AriaAttributes['aria-controls'];
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: AriaAttributes['aria-expanded'];
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: AriaAttributes['aria-describedby'];
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: AriaAttributes['aria-checked'];
  /** Identifies button as a toggle button and indicates whether pressed or not pressed */
  ariaPressed?: AriaAttributes['aria-pressed'];
}

export interface AriaOrientation {
  /** Identifies the orientation of the element */
  'aria-orientation'?: AriaAttributes['aria-orientation'];
  /** Whether the element is visually hidden */
  'aria-hidden'?: AriaAttributes['aria-hidden'];
}
