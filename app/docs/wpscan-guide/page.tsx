'use client';

import React from 'react';
import Link from 'next/link';

export default function WPScanGuideDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">WPScan - WordPress Vulnerability Scanner Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          WPScan is a free, for non-commercial use, black box WordPress security scanner written for security professionals and blog maintainers to test the security of their sites. It can identify known vulnerabilities in WordPress core, plugins, and themes.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is WPScan?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            WPScan is a powerful WordPress security scanner that helps security professionals and site administrators identify potential security issues in WordPress sites. It scans for vulnerabilities in the WordPress core, plugins, and themes using a comprehensive vulnerability database.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>WordPress Detection</strong>: Detects WordPress version, themes, and plugins</li>
            <li><strong>User Enumeration</strong>: Discovers WordPress users</li>
            <li><strong>Vulnerability Scanning</strong>: Checks for known vulnerabilities using a database</li>
            <li><strong>Password Attacks</strong>: Supports brute-force password attacks (use responsibly)</li>
            <li><strong>File Detection</strong>: Detects publicly accessible sensitive files</li>
            <li><strong>API Integration</strong>: Access to the WPScan Vulnerability Database API</li>
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
                  <code>wpscan --url target_wordpress_site</code>
                </pre>
                <p className="mt-2 text-sm">Performs a basic scan of a WordPress site.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Update WPScan Database</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --update</code>
                </pre>
                <p className="mt-2 text-sm">Updates the local WPScan vulnerability database.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Enumeration Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate Vulnerable Plugins</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --enumerate vp</code>
                </pre>
                <p className="mt-2 text-sm">Scans for vulnerable plugins.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate Users</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --enumerate u</code>
                </pre>
                <p className="mt-2 text-sm">Enumerates WordPress users.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate All Plugins</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --enumerate ap</code>
                </pre>
                <p className="mt-2 text-sm">Enumerates all plugins, including non-vulnerable ones.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate All Themes</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --enumerate at</code>
                </pre>
                <p className="mt-2 text-sm">Enumerates all themes.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Advanced Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Using API Token (Recommended)</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --api-token YOUR_TOKEN</code>
                </pre>
                <p className="mt-2 text-sm">Uses an API token to access the WPScan Vulnerability Database.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Password Brute-forcing</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --passwords path/to/wordlist.txt --usernames admin</code>
                </pre>
                <p className="mt-2 text-sm">Attempts to brute-force passwords for the specified username(s). Use responsibly.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Output to File</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>wpscan --url target_wordpress_site --output file.txt --format cli</code>
                </pre>
                <p className="mt-2 text-sm">Saves scan results to a file. Formats include cli, json, and xml.</p>
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
                <code>sudo apt install wpscan</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Ruby Gem:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>gem install wpscan</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Docker:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>docker pull wpscanteam/wpscan</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BountyBud Integration</h2>
        <div className="card mb-6">
          <p className="mb-3">BountyBud offers integrated support for WPScan:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Simplified Interface</strong>: Easy-to-use interface for WPScan operations</li>
            <li><strong>Results Management</strong>: View and analyze WPScan results directly in BountyBud</li>
            <li><strong>Integration with Workflows</strong>: Include WPScan in automated bug bounty workflows</li>
            <li><strong>Vulnerability Tracking</strong>: Keep track of discovered WordPress vulnerabilities</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Official Documentation & Resources</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Homepage:</strong> <a href="https://wpscan.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://wpscan.com/</a></li>
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/wpscanteam/wpscan" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://github.com/wpscanteam/wpscan</a></li>
            <li><strong>Documentation:</strong> <a href="https://github.com/wpscanteam/wpscan/wiki" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://github.com/wpscanteam/wpscan/wiki</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
} 