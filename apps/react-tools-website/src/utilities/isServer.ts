export const isServer = (
  window: Window & typeof globalThis = global.window,
  document: Document = global.document
) => window === undefined && document === undefined;
