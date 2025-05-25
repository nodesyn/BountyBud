'use client';

import React from 'react';
import Link from 'next/link';

export default function BugBountyWorkflowGuide() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Bug Bounty Workflow Guide</h1>
      
      <p className="mb-8 text-gray-300">
        A comprehensive guide to building an effective bug bounty hunting methodology, from choosing the right programs to reporting findings.
      </p>

      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-primary">Contents</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li><a href="#introduction" className="text-primary hover:underline">Introduction to Bug Bounty Hunting</a></li>
          <li><a href="#program-selection" className="text-primary hover:underline">Program Selection Strategy</a></li>
          <li><a href="#preparation" className="text-primary hover:underline">Preparation and Reconnaissance</a></li>
          <li><a href="#testing-methodology" className="text-primary hover:underline">Testing Methodology</a></li>
          <li><a href="#documentation" className="text-primary hover:underline">Documentation and Reporting</a></li>
          <li><a href="#continuous-learning" className="text-primary hover:underline">Continuous Learning</a></li>
        </ul>
      </div>

      {/* Introduction */}
      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction to Bug Bounty Hunting</h2>
        <p className="mb-4 text-gray-300">
          Bug bounty hunting is the practice of identifying and reporting security vulnerabilities in websites, applications, or other digital assets in exchange for recognition and rewards. It's a win-win relationship where companies improve their security posture, and security researchers are rewarded for their expertise.
        </p>
        <p className="mb-4 text-gray-300">
          This guide outlines a systematic approach to bug bounty hunting, built from the experiences of successful hunters and industry best practices. While tools and techniques may evolve, the fundamental methodology remains consistent.
        </p>
      </section>

      {/* Program Selection */}
      <section id="program-selection" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Program Selection Strategy</h2>
        <p className="mb-4 text-gray-300">
          Selecting the right bug bounty programs is crucial to your success. Consider these factors:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
          <li><span className="font-semibold text-gray-200">Scope and Eligibility:</span> Focus on programs with a broad scope and clear eligibility criteria.</li>
          <li><span className="font-semibold text-gray-200">Reward Structure:</span> Consider both monetary rewards and reputation/points systems.</li>
          <li><span className="font-semibold text-gray-200">Response History:</span> Research how responsive the program is to reports and how quickly they typically pay out.</li>
          <li><span className="font-semibold text-gray-200">Competition Level:</span> New or recently updated programs often have less competition.</li>
          <li><span className="font-semibold text-gray-200">Technology Stack:</span> Choose programs using technologies you're familiar with.</li>
        </ul>
        <p className="text-gray-300">
          Pro tip: Start with newer or less competitive programs to build experience, then gradually move to more competitive ones as your skills improve.
        </p>
      </section>

      {/* Preparation and Reconnaissance */}
      <section id="preparation" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Preparation and Reconnaissance</h2>
        <p className="mb-4 text-gray-300">
          Thorough reconnaissance is often the difference between success and failure in bug bounty hunting:
        </p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">1. Surface Mapping</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Identify all domains and subdomains (using tools like Subfinder, Amass, etc.)</li>
            <li>Map all accessible endpoints and APIs</li>
            <li>Discover hidden directories and files</li>
            <li>Identify web technologies in use</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">2. Information Gathering</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Search for exposed credentials or API keys</li>
            <li>Use Google dorking to find sensitive information</li>
            <li>Check public code repositories</li>
            <li>Review previous vulnerability disclosures</li>
            <li>Analyze JavaScript files for endpoints and potential vulnerabilities</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-200">3. Technology Analysis</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Identify frameworks and libraries in use</li>
            <li>Check for known vulnerabilities in the technology stack</li>
            <li>Understand the application's architecture</li>
            <li>Map out user roles and authentication mechanisms</li>
          </ul>
        </div>
      </section>

      {/* Testing Methodology */}
      <section id="testing-methodology" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Testing Methodology</h2>
        <p className="mb-4 text-gray-300">
          A structured approach to testing helps ensure thorough coverage:
        </p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">1. Vulnerability Assessment</h3>
          <p className="mb-2 text-gray-300">
            Begin with automated scanning to identify potential issues:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Use vulnerability scanners (e.g., Burp Suite, OWASP ZAP)</li>
            <li>Run specialized tools for specific vulnerability types</li>
            <li>Analyze results and prioritize potential issues</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">2. Manual Testing</h3>
          <p className="mb-2 text-gray-300">
            Focus on these common vulnerability categories:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Authentication and session management</li>
            <li>Access control and authorization</li>
            <li>Injection vulnerabilities (SQL, XSS, CSRF, etc.)</li>
            <li>Business logic flaws</li>
            <li>API vulnerabilities</li>
            <li>Server misconfigurations</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-200">3. Exploitation and Verification</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Verify findings with proof-of-concept exploits</li>
            <li>Test the impact and severity of each vulnerability</li>
            <li>Document steps to reproduce</li>
            <li>Capture evidence (screenshots, HTTP requests/responses, etc.)</li>
          </ul>
        </div>
      </section>

      {/* Documentation and Reporting */}
      <section id="documentation" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Documentation and Reporting</h2>
        <p className="mb-4 text-gray-300">
          The quality of your report significantly affects the response and reward:
        </p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Elements of an Effective Report</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Clear, descriptive title</li>
            <li>Summary of the vulnerability</li>
            <li>Detailed steps to reproduce</li>
            <li>Impact assessment</li>
            <li>Supporting evidence (screenshots, videos, etc.)</li>
            <li>Suggested remediation steps</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Best Practices</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Be professional and respectful</li>
            <li>Avoid using aggressive or alarming language</li>
            <li>Focus on facts, not speculation</li>
            <li>Prioritize quality over quantity</li>
            <li>Respond promptly to questions or requests for clarification</li>
            <li>Never disclose findings publicly without authorization</li>
          </ul>
        </div>
      </section>

      {/* Continuous Learning */}
      <section id="continuous-learning" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Continuous Learning</h2>
        <p className="mb-4 text-gray-300">
          The security landscape constantly evolves, requiring ongoing education:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
          <li><span className="font-semibold text-gray-200">Study Writeups:</span> Learn from disclosed vulnerabilities and bug bounty writeups.</li>
          <li><span className="font-semibold text-gray-200">Follow Security Researchers:</span> Connect with active researchers on social media and learn from their experiences.</li>
          <li><span className="font-semibold text-gray-200">Practice on CTF Platforms:</span> Regularly practice on platforms like HackTheBox, TryHackMe, and Vulnhub.</li>
          <li><span className="font-semibold text-gray-200">Attend Security Events:</span> Participate in conferences, webinars, and meetups.</li>
          <li><span className="font-semibold text-gray-200">Contribute to Open Source:</span> Contribute to security tools and projects.</li>
        </ul>
        <p className="text-gray-300">
          Remember that persistence is key. Bug bounty hunting requires patience, continuous learning, and resilience in the face of competition and rejection.
        </p>
      </section>

      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 