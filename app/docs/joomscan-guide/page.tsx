'use client';

import React from 'react';
import Link from 'next/link';

export default function JoomScanGuideDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">JoomScan - Joomla Vulnerability Scanner Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          JoomScan is an open-source project developed in Perl that allows security professionals to detect Joomla CMS vulnerabilities. It helps identify misconfigurations and known vulnerabilities in Joomla installations, their components, modules, and plugins.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is JoomScan?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            JoomScan is a specialized security tool designed to audit Joomla CMS installations for security vulnerabilities. It comprehensively examines Joomla websites, identifying version information, potential security misconfigurations, and known vulnerabilities in the core system and its extensions.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Version Detection</strong>: Accurately identifies Joomla version</li>
            <li><strong>Core Vulnerability Scanning</strong>: Detects known vulnerabilities in Joomla core</li>
            <li><strong>Extension Analysis</strong>: Scans components, modules, and plugins for vulnerabilities</li>
            <li><strong>Configuration Checks</strong>: Identifies security misconfigurations (e.g., debug mode, error reporting)</li>
            <li><strong>Sensitive File Detection</strong>: Locates exposed configuration files, logs, and backups</li>
            <li><strong>Directory Listing Checks</strong>: Finds directories with browsing enabled</li>
            <li><strong>Database Updates</strong>: Regular vulnerability database updates</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Commands</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Basic Usage</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Basic Scan</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site</code>
                </pre>
                <p className="mt-2 text-sm">Performs a comprehensive scan of a Joomla website.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Update Database</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --update</code>
                </pre>
                <p className="mt-2 text-sm">Updates the JoomScan vulnerability database.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Advanced Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Scan with Component Enumeration</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site --enumerate-components</code>
                </pre>
                <p className="mt-2 text-sm">Specifically focuses on enumerating and scanning Joomla components.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Cookie-based Scan</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site --cookie "name=value"</code>
                </pre>
                <p className="mt-2 text-sm">Performs scanning using a specific cookie (useful for authenticated scans).</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Custom User-Agent</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site --user-agent "Custom-User-Agent"</code>
                </pre>
                <p className="mt-2 text-sm">Uses a custom User-Agent string during scanning.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Output Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Save Results to File</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site --output results.txt</code>
                </pre>
                <p className="mt-2 text-sm">Saves scan results to a text file.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Verbose Output</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>joomscan --url target_joomla_site --verbose</code>
                </pre>
                <p className="mt-2 text-sm">Displays detailed information during the scan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <div className="card mb-6">
          <div className="space-y-3">
            <div>
              <h4 className="text-lg font-semibold mb-1">Kali Linux:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>sudo apt install joomscan</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">From GitHub:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>git clone https://github.com/OWASP/joomscan.git
cd joomscan
perl joomscan.pl --help</code>
              </pre>
              <p className="mt-2 text-sm">May require additional Perl modules: <code>cpan install URI::URL LWP::UserAgent</code></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BountyBud Integration</h2>
        <div className="card mb-6">
          <p className="mb-3">BountyBud offers integrated support for JoomScan:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>User-Friendly Interface</strong>: Easy-to-use interface for JoomScan operations</li>
            <li><strong>Automated Scanning</strong>: One-click scanning of Joomla sites</li>
            <li><strong>Result Interpretation</strong>: Clear presentation of vulnerabilities found</li>
            <li><strong>Workflow Integration</strong>: Incorporate JoomScan in broader CMS testing workflows</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Regular Updates</strong>: Always update JoomScan before use to ensure access to the latest vulnerability data</li>
            <li><strong>Ethical Use</strong>: Only scan websites you own or have explicit permission to test</li>
            <li><strong>Verify Results</strong>: Manually confirm vulnerabilities before reporting to avoid false positives</li>
            <li><strong>Combine Tools</strong>: Use JoomScan alongside other web application security tools for comprehensive testing</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Official Documentation & Resources</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OWASP JoomScan Page:</strong> <a href="https://owasp.org/www-project-joomscan/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://owasp.org/www-project-joomscan/</a></li>
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/OWASP/joomscan" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://github.com/OWASP/joomscan</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
} 