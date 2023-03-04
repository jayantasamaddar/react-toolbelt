export const isWindow = (
  element:
    | (Window & typeof globalThis)
    | Document
    | HTMLElement
    | EventTarget
    | undefined
    | null
) => {
  return element === window || element instanceof Window;
};
