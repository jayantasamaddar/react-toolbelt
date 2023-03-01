export const isWindow = (
  element: (Window & typeof globalThis) | Document | HTMLElement | EventTarget
) => {
  return element instanceof Window;
};
