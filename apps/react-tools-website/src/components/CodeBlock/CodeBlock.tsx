'use client';

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import shell from 'react-syntax-highlighter/dist/esm/languages/prism/shell-session';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/okaidia';

interface CodeBlockProps {
  children?: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({
  children: code = '(num) => num + 1',
  language = 'javascript',
  showLineNumbers = true
}: CodeBlockProps) => {
  SyntaxHighlighter.registerLanguage('tsx', tsx);
  SyntaxHighlighter.registerLanguage('shell-session', shell);
  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers={showLineNumbers}
      customStyle={{
        padding: '1.25rem',
        borderRadius: '0.5rem'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
