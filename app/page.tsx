"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// Lightweight loading placeholder for features section
function FeaturesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-3"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

// Lazy load features section
const FeaturesSection = dynamic(() => import('./FeaturesSection'), {
  loading: () => <FeaturesLoading />,
  ssr: false
});

function QuickStartForm() {
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer heavy operations to after initial render
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-16">
        {/* Hero Section - Critical above-the-fold content */}
        <section className="flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BountyBud</h1>
          <div className="w-full max-w-xs mb-4">
            <img
              src="/bb.png"
              alt="Bounty Bud"
              className="w-full h-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for bug bounty hunters and security
            researchers to generate commands, discover security tools, and
            optimize their workflow.
          </p>
        </section>

        {/* Features Section - Lazy loaded */}
        <section className="w-full px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
          <Suspense fallback={<FeaturesLoading />}>
            {isLoaded && <FeaturesSection />}
          </Suspense>
        </section>

        {/* Quick Start Section - Lazy loaded */}
        <div className="px-4">
          <Suspense fallback={<div className="bg-surface-dark p-8 rounded-lg animate-pulse h-48"></div>}>
            {isLoaded && <QuickStartForm />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}