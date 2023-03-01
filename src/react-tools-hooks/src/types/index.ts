export type Element = HTMLElement | typeof window | typeof document;
export type DOMElement = Document | HTMLElement;

export interface KeyboardEventArgs {
  code?: string;
  key?: string;
  keyCode?: number;
  locale?: string;
  location?: number;
  metaKey?: boolean;
  repeat?: boolean;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}
