'use client';

import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
    <div className="max-w-6xl mx-auto">
      <div className="space-y-8 px-4">
        <div>
          <h1 className="text-3xl font-bold">Command Generation Tool</h1>

          {domainFromUrl && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md text-blue-200">
              <p>Domain <strong>{domainFromUrl}</strong> has been automatically entered from the homepage.</p>
            </div>
          )}

          <p className="mt-4 text-gray-300">
            Generate commands for various security testing tools. Simply enter a domain and select
            the tool category you want to use.
          </p>
        </div>

        {/* Documentation Resources Box */}
        <div className="p-4 bg-blue-900/30 border border-blue-800 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Documentation Resources</h2>
          <p className="mb-3">Check out our in-depth guides to enhance your security testing:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link href="/docs/directory-scanning" className="text-primary hover:underline">
                Directory Scanning Wordlist Guide
              </Link>
              <span className="text-gray-300 ml-2">- Learn how to choose the right wordlists from SecLists</span>
            </li>
            <li>
              <Link href="/docs" className="text-primary hover:underline">
                Browse All Documentation
              </Link>
            </li>
          </ul>
        </div>

        <ErrorBoundary fallback={<CommandGeneratorFallback />}>
          <CommandGenerator />
        </ErrorBoundary>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Important Disclaimer & Ethical Scanning</h2>
          <div className="space-y-3">
            <p className="text-gray-300">
              These commands are provided for educational purposes only. Always ensure you have proper authorization before testing any domain.
              Unauthorized security testing may be illegal and unethical.
            </p>
            <div className="p-3 bg-green-900/30 border border-green-800 rounded-md">
              <h3 className="text-green-400 font-semibold mb-2">🌱 Polite Scanning Approach</h3>
              <p className="text-green-200 text-sm">
                All commands have been optimized for "polite" scanning with reduced thread counts, rate limiting, 
                and stealth options to minimize impact on target systems. This approach helps avoid:
              </p>
              <ul className="list-disc list-inside text-green-200 text-sm mt-2 space-y-1">
                <li>Overwhelming target servers with excessive requests</li>
                <li>Triggering security alerts or WAF blocks</li>
                <li>Causing service disruption or downtime</li>
                <li>Being detected as malicious activity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}