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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">BountyBud</h1>
        <div className="flex justify-center">
          <img
            src="/bb.png"
            alt="Bounty Bud"
            className="max-h-60 items-center"
          />
        </div>
        <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
          A comprehensive toolkit for bug bounty hunters and security
          researchers to generate commands, discover security tools, and
          optimize their workflow.
        </p>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Command Generation
            </h3>
            <p className="text-gray-300 mb-4">
              Generate tool commands for various security tests with a simple
              interface. Save time by quickly configuring command parameters.
            </p>
            <Link href="/tools" className="text-primary hover:underline">
              Try it now →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Security Tools
            </h3>
            <p className="text-gray-300 mb-4">
              Discover and learn about the best security tools for bug bounty
              hunting. Find installation instructions and documentation links.
            </p>
            <Link
              href="/security-tools"
              className="text-primary hover:underline"
            >
              Explore tools →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Browser Extensions
            </h3>
            <p className="text-gray-300 mb-4">
              Essential browser extensions to enhance your bug hunting workflow.
              Filter by category and browser compatibility.
            </p>
            <Link
              href="/browser-extensions"
              className="text-primary hover:underline"
            >
              View extensions →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <QuickStart />
    </div>
  );
}
