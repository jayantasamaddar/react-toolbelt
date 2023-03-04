import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { theme } from './theme';
import Normalize from './Normalizer';
import { CodeStatusBar } from './components';

interface CodeBlockProps {
  className?: string;
  title?: string;
  children: string;
}

const longCodeFormat = {
  tsx: 'tsx',
  ts: 'typescript',
  typescript: 'typescript',
  jsx: 'jsx',
  s: 'bash',
  bash: 'bash',
  shell: 'bash'
};

const nw = new Normalize({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  // 'break-lines': 80,
  // 'indent': 2,
  'remove-initial-line-feed': true
  // 'tabs-to-spaces': 4,
  // 'spaces-to-tabs': 4
});

export const MDXCodeBlock = ({
  className,
  children: codeString,
  title
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = className?.replace('language-', '');
  if (match && lang && lang in longCodeFormat) {
    SyntaxHighlighter.registerLanguage('tsx', tsx);
    SyntaxHighlighter.registerLanguage('typescript', ts);
    SyntaxHighlighter.registerLanguage('bash', bash);
  }
  const code = nw.normalize(codeString);

  return match ? (
    <div
      className={`relative my-5 max-h-[560px] overflow-auto rounded-2xl shadow-md`}
    >
      <CodeStatusBar title={title} code={code} />
      <SyntaxHighlighter
        language={match[1]}
        style={theme as never}
        customStyle={{
          padding: '1.25rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          margin: 0,
          fontSize: '0.875rem'
        }}
        // PreTag="div"
        showLineNumbers={codeString.includes('\n')}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="rounded-sm bg-theme-accent-3 px-1 text-sm font-bold text-[black]">
      {codeString}
    </code>
  );
};
