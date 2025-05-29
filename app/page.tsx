"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function QuickStart() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic domain validation
    const domainPattern =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    if (!domain) {
      setError("Please enter a domain");
      return;
    }

    if (!domainPattern.test(domain)) {
      setError("Please enter a valid domain (e.g., example.com)");
      return;
    }

    // Save the domain to localStorage for the tools page to use
    localStorage.setItem("quickStartDomain", domain);

    // Navigate to the tools page
    router.push(`/tools?domain=${encodeURIComponent(domain)}`);
  };

  return (
    <section className="bg-surface-dark p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
      <p className="mb-4">
        Enter a domain below to generate basic reconnaissance commands:
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            value={domain}
            onChange={handleDomainChange}
            placeholder="example.com"
            className={`w-full px-4 py-2 bg-gray-800 border ${error ? "border-red-500" : "border-gray-700"} rounded focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary whitespace-nowrap">
          Generate Commands
        </button>
      </form>
    </section>
  );
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BountyBud</h1>
          <div className="w-full max-w-xs mb-4">
            <img
              src="/bb.png"
              alt="Bounty Bud"
              className="w-full h-auto"
            />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for bug bounty hunters and security
            researchers to generate commands, discover security tools, and
            optimize their workflow.
          </p>
        </section>

        {/* Features Section */}
        <section className="w-full px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
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
        </section>

        {/* Quick Start Section */}
        <div className="px-4">
          <QuickStart />
        </div>
      </div>
    </div>
  );
}
