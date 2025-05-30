
"use client";

import Link from "next/link";

export default function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/tools" className="card hover:bg-gray-800 transition-colors cursor-pointer group">
        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-light">
          Command Generation
        </h3>
        <p className="text-gray-300 mb-4">
          Generate tool commands for various security tests with a simple
          interface. Save time by quickly configuring command parameters.
        </p>
        <div className="text-primary group-hover:text-primary-light">
          Try it now →
        </div>
      </Link>

      <Link href="/xss-payloads" className="card hover:bg-gray-800 transition-colors cursor-pointer group">
        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-light">
          XSS Payload Generator
        </h3>
        <p className="text-gray-300 mb-4">
          Generate context-aware XSS payloads with encoding options and bypass techniques. Perfect for security testing and learning.
        </p>
        <div className="text-primary group-hover:text-primary-light">
          Generate payloads →
        </div>
      </Link>

      <Link href="/security-tools" className="card hover:bg-gray-800 transition-colors cursor-pointer group">
        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-light">
          Security Tools
        </h3>
        <p className="text-gray-300 mb-4">
          Discover and learn about the best security tools for bug bounty
          hunting. Find installation instructions and documentation links.
        </p>
        <div className="text-primary group-hover:text-primary-light">
          Explore tools →
        </div>
      </Link>

      <Link href="/docs" className="card hover:bg-gray-800 transition-colors cursor-pointer group">
        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-light">
          Documentation & Guides
        </h3>
        <p className="text-gray-300 mb-4">
          Access comprehensive guides and documentation to help you make
          the most of security tools and optimize your testing workflow.
        </p>
        <div className="text-primary group-hover:text-primary-light">
          View guides →
        </div>
      </Link>
    </div>
  );
}
