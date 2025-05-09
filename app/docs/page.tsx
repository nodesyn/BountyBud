'use client';

import React from 'react';
import Link from 'next/link';

export default function DocsIndex() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Documentation & Guides</h1>
      
      <p className="mb-8 text-gray-300">
        Access comprehensive guides and documentation to help you make the most of security tools and techniques.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/docs/directory-scanning" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Directory Scanning Guide</h2>
          <p className="text-gray-300 mb-4">
            Learn how to choose the right wordlists from SecLists for tools like DirBuster and Feroxbuster.
            Understand the trade-offs between speed and thoroughness in directory scanning.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>
        
        <Link href="/docs/subdomain-enumeration" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Subdomain Enumeration Guide</h2>
          <p className="text-gray-300 mb-4">
            Discover techniques for finding subdomains to expand your attack surface. 
            Includes passive and active enumeration methods, filtering, and advanced strategies.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
} 