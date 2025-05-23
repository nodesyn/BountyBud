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
        <Link href="/docs/bug-bounty-workflow" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Bug Bounty Workflow Guide</h2>
          <p className="text-gray-300 mb-4">
            A comprehensive guide to building an effective bug bounty hunting methodology, from choosing programs to reporting findings.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>
        
        <Link href="/docs/web-application-hacking-methodology" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Web App Hacking Methodology</h2>
          <p className="text-gray-300 mb-4">
            A step-by-step approach to testing web applications for security vulnerabilities, from reconnaissance to exploitation.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/owasp-top-10" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">OWASP Top 10 In-depth Guide</h2>
          <p className="text-gray-300 mb-4">
            Detailed analysis of the OWASP Top 10 vulnerabilities with examples, detection methods, and prevention strategies.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/security-tools-cheatsheet" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Security Tools Cheatsheet</h2>
          <p className="text-gray-300 mb-4">
            Quick reference guides for popular cybersecurity tools, with command syntax, common options, and usage examples.
          </p>
          <span className="text-primary">View Cheatsheet →</span>
        </Link>
        
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
            Discover techniques and tools for effective subdomain enumeration, a critical first step in reconnaissance.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/owasp-wstg-summary" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">OWASP WSTG Summary</h2>
          <p className="text-gray-300 mb-4">
            A summary of the OWASP Web Security Testing Guide, providing a framework for web app pentesting.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/nikto-guide" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Nikto Guide</h2>
          <p className="text-gray-300 mb-4">
            Learn to use Nikto for comprehensive web server scanning, finding dangerous files and outdated software.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/joomscan-guide" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">JoomScan Guide</h2>
          <p className="text-gray-300 mb-4">
            Understand how to use JoomScan to find vulnerabilities in Joomla CMS installations.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/wpscan-guide" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">WPScan Guide</h2>
          <p className="text-gray-300 mb-4">
            A guide to WPScan for identifying security issues in WordPress sites, including themes and plugins.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/droopescan-guide" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Droopescan Guide</h2>
          <p className="text-gray-300 mb-4">
            Explore Droopescan for scanning various CMS like Drupal, Joomla, WordPress, and Moodle.
          </p>
          <span className="text-primary">Read the guide →</span>
        </Link>

        <Link href="/docs/nmap-cheatsheet" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Nmap Cheatsheet</h2>
          <p className="text-gray-300 mb-4">
            Quick reference for Nmap commands, from basic scans to advanced NSE scripts and evasion techniques.
          </p>
          <span className="text-primary">View Cheatsheet →</span>
        </Link>

        <Link href="/docs/sqlmap-cheatsheet" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">SQLmap Cheatsheet</h2>
          <p className="text-gray-300 mb-4">
            A handy cheatsheet for SQLmap, covering enumeration, injection techniques, file system access, and more.
          </p>
          <span className="text-primary">View Cheatsheet →</span>
        </Link>

        <Link href="/docs/burp-suite-cheatsheet" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Burp Suite Cheatsheet</h2>
          <p className="text-gray-300 mb-4">
            Your go-to Burp Suite reference for proxy setup, intruder attacks, useful extensions, and workflow tips.
          </p>
          <span className="text-primary">View Cheatsheet →</span>
        </Link>

        <Link href="/docs/tool-comparisons" className="card hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-3 text-primary">Tool Comparisons & Alternatives</h2>
          <p className="text-gray-300 mb-4">
            Compare popular tools like Nikto vs. ZAP, DirBuster vs. Gobuster, and find free alternatives to commercial software.
          </p>
          <span className="text-primary">Read Comparisons →</span>
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