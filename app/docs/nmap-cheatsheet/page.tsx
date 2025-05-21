import React from 'react';
import Link from 'next/link';
import { readFile } from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

async function getMarkdownContent(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const content = await readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return 'Error loading content.';
  }
}

export default async function NmapCheatsheetPage() {
  const markdownContent = await getMarkdownContent('docs/nmap-cheatsheet.md');

  return (
    <div className="prose prose-invert max-w-none mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
      <div className="mt-8 pt-6 border-t border-gray-700">
        <Link href="/docs" className="text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
} 