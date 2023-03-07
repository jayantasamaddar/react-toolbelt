/**
 * Checks whether the url string provided is an External Link.
 * By default checks against `http` and `https` but can optionally take an additional argument
 * of additional protocols to treat as external.
 *
 * @param {string} url The Url string
 * @param {string[]} [protocols=[]] A list of protocols to test against.
 * @returns {boolean}
 */
export const isExternalLink = (url: string, protocols: string[] = []) => {
  const protocolRegExp = new RegExp(
    `^(${protocols.concat(['http', 'https']).join('|')}):`,
    'i'
  );
  return protocolRegExp.test(url);
};
