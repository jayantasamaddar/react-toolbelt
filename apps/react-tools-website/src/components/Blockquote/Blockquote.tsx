interface BlockQuoteProps {
  className?: string;
  children?: React.ReactNode;
}

export const Blockquote = ({ children, className }: BlockQuoteProps) => {
  return (
    <blockquote
      className={`Blockquote my-2 border-l-slate-100 bg-theme-primary-2 py-2 text-slate-300 ${
        className ?? ''
      }`}
    >
      {children}
    </blockquote>
  );
};
