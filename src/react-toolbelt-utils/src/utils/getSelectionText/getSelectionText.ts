import { isServer } from '../isServer';

/**
 * Check whether the element is selectable
 */
export const isSelectable = (
  element: HTMLInputElement | HTMLTextAreaElement
) => {
  const tag = element ? element.tagName.toLowerCase() : null;
  if (
    tag === 'textarea' ||
    (tag === 'input' &&
      /^(?:text|email|search|number|password|url|tel|url|date|datetime-local|time|month|week|currency)$/i.test(
        element.type
      ))
  ) {
    return true;
  }
  return false;
};

/**
 * Get the current selected text
 */
export const getSelectionText = (start = 0, end?: number) => {
  let text: string | undefined;
  const activeEl = document.activeElement as
    | HTMLInputElement
    | HTMLTextAreaElement;

  if (isSelectable(activeEl)) {
    text = activeEl.value.slice(
      Number(start) ?? activeEl.selectionStart,
      Number(end) ?? activeEl.selectionEnd
    );
  } else if (isServer() && global.window.getSelection) {
    text = global.window.getSelection()?.toString();
  }
  return text;
};
