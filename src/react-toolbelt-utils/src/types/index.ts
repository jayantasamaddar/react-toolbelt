export type Element = HTMLElement | (Window & typeof globalThis) | Document;
export type DOMElement = Document | HTMLElement;
export type Falsy = string | number | boolean | null | typeof NaN | undefined;
