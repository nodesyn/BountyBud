'use client';

import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for CommandGenerator
const CommandGenerator = dynamic(() => import('./commandGenerator'), {
  ssr: false,
});

const CommandGeneratorFallback = () => (
  <div className="p-4 bg-red-900 text-white rounded-md border border-red-700">
    <h2 className="text-xl font-bold mb-2">Command Generator Error</h2>
    <p className="mb-4">
      There was an error loading the command generator. This could be due to invalid command parameters or a temporary issue.
    </p>
    <button
      className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded"
      onClick={() => window.location.reload()}
    >
      Reload page
    </button>
  </div>
);

export default function CommandGeneratorPage() {
  const [domainFromUrl, setDomainFromUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const domain = urlParams.get('domain');
      setDomainFromUrl(domain);
    }
  }, []);

  return (
    <div className="space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold">Command Generation Tool</h1>

      {domainFromUrl && (
        <div className="p-3 bg-blue-900/30 border border-blue-800 rounded-md text-blue-200">
          <p>Domain <strong>{domainFromUrl}</strong> has been automatically entered from the homepage.</p>
        </div>
      )}

      <p className="text-gray-300">
        Generate commands for various security testing tools. Simply enter a domain and select
        the tool category you want to use.
      </p>

      <ErrorBoundary fallback={<CommandGeneratorFallback />}>
        <CommandGenerator />
      </ErrorBoundary>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Important Disclaimer</h2>
        <p className="text-gray-300">
          These commands are provided for educational purposes only. Always ensure you have proper authorization before testing any domain.
          Unauthorized security testing may be illegal and unethical.
        </p>
      </div>
    </div>
  );
}