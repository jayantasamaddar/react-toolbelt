export const colors = {
  background: '#06001a',
  primaryText: '#f8f8f2',
  tertiaryText: '#8292a2'
};

/** Theme */
export const theme = {
  'code[class*="language-"]': {
    color: colors.primaryText,
    background: 'none',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none'
  },
  'pre[class*="language-"]': {
    color: colors.primaryText,
    background: colors.background,
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em'
  },
  ':not(pre) > code[class*="language-"]': {
    background: colors.background,
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal'
  },
  comment: {
    color: colors.tertiaryText
  },
  prolog: {
    color: colors.tertiaryText
  },
  doctype: {
    color: colors.tertiaryText
  },
  cdata: {
    color: colors.tertiaryText
  },
  punctuation: {
    color: colors.primaryText
  },
  namespace: {
    Opacity: '.7'
  },
  property: {
    color: '#f92672'
  },
  tag: {
    color: '#f92672'
  },
  constant: {
    color: '#f92672'
  },
  symbol: {
    color: '#f92672'
  },
  deleted: {
    color: '#f92672'
  },
  boolean: {
    color: '#ae81ff'
  },
  number: {
    color: '#ae81ff'
  },
  selector: {
    color: '#a6e22e'
  },
  'attr-name': {
    color: '#a6e22e'
  },
  string: {
    color: '#a6e22e'
  },
  char: {
    color: '#a6e22e'
  },
  builtin: {
    color: '#a6e22e'
  },
  inserted: {
    color: '#a6e22e'
  },
  operator: {
    color: colors.primaryText
  },
  entity: {
    color: colors.primaryText,
    cursor: 'help'
  },
  url: {
    color: colors.primaryText
  },
  '.language-css .token.string': {
    color: colors.primaryText
  },
  '.style .token.string': {
    color: colors.primaryText
  },
  variable: {
    color: colors.primaryText
  },
  atrule: {
    color: '#e6db74'
  },
  'attr-value': {
    color: '#e6db74'
  },
  function: {
    color: '#e6db74'
  },
  'class-name': {
    color: '#e6db74'
  },
  keyword: {
    color: '#66d9ef'
  },
  regex: {
    color: '#fd971f'
  },
  important: {
    color: '#fd971f',
    fontWeight: 'bold'
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  }
};
