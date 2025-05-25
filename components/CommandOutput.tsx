import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register languages
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('javascript', javascript);

interface CommandOutputProps {
  output: string;
  language?: string;
  highlightLines?: number[];
  theme?: 'dark' | 'light' | 'system';
}

const CommandOutput: React.FC<CommandOutputProps> = ({ 
  output, 
  language = 'bash', 
  highlightLines = [],
  theme = 'dark'
}) => {
  // Determine actual theme
  const actualTheme = theme === 'system' 
    ? window.matchMedia?.('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
    : theme;
  
  return (
    <div className="relative group">
      <SyntaxHighlighter 
        language={language} 
        style={actualTheme === 'dark' ? vscDarkPlus : vs}
        wrapLongLines
        showLineNumbers={false}
        lineProps={lineNumber => ({
          style: { 
            display: 'block', 
            backgroundColor: highlightLines.includes(lineNumber) 
              ? actualTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
              : 'transparent' 
          }
        })}
        customStyle={{
          backgroundColor: actualTheme === 'dark' ? '#1e1e2e' : '#f8f8f8',
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.9rem',
          margin: 0
        }}
      >
        {output}
      </SyntaxHighlighter>
      <button 
        className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => navigator.clipboard.writeText(output)}
        aria-label="Copy to clipboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>
  );
};

export default CommandOutput; 