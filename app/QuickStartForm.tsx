
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickStartForm() {
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
