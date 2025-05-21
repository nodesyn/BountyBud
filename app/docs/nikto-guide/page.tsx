'use client';

import React from 'react';
import Link from 'next/link';

export default function NiktoGuideDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Nikto Web Server Scanner Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Nikto is an Open Source (GPL) web server scanner which performs comprehensive tests against web servers for multiple items, including over 6700 potentially dangerous files/CGIs, checks for outdated versions of over 1250 servers, and version specific problems on over 270 servers.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Nikto?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            Nikto is a web server scanner that examines web servers for dangerous files, outdated server software, and version-specific problems. It also checks server configuration items such as the presence of multiple index files, HTTP server options, and attempts to identify installed web servers and software.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dangerous Files Detection</strong>: Identifies dangerous files and CGIs</li>
            <li><strong>Outdated Software Detection</strong>: Checks for outdated server software</li>
            <li><strong>Configuration Analysis</strong>: Examines server configuration items (index files, HTTP options)</li>
            <li><strong>Software Identification</strong>: Attempts to identify installed web servers and software</li>
            <li><strong>SSL Support</strong>: Full SSL support with OpenSSL</li>
            <li><strong>Proxy Support</strong>: Full HTTP proxy support</li>
            <li><strong>Authorization Testing</strong>: Checks for the guessing portion of authorization realm</li>
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
                  <code>nikto -h target_host</code>
                </pre>
                <p className="mt-2 text-sm">Performs a basic scan against the specified host.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Scan a Specific Port</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -h target_host -p port</code>
                </pre>
                <p className="mt-2 text-sm">Scans a specific port on the target host.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Scan with SSL</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -h target_host -ssl</code>
                </pre>
                <p className="mt-2 text-sm">Performs a scan with SSL enabled.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Output Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Output to File</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -h target_host -o report.txt -Format txt</code>
                </pre>
                <p className="mt-2 text-sm">Saves scan results to a text file.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">HTML Output</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -h target_host -o report.html -Format html</code>
                </pre>
                <p className="mt-2 text-sm">Saves scan results to an HTML file.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Advanced Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Tuning Options</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -h target_host -Tuning x</code>
                </pre>
                <p className="mt-2 text-sm">Use specific scan tuning options (e.g., 0-9, a-z).</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Update Plugins and Databases</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>nikto -update</code>
                </pre>
                <p className="mt-2 text-sm">Updates Nikto's plugins and databases.</p>
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
              <h4 className="text-lg font-semibold mb-1">Kali Linux / Debian-based:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>sudo apt install nikto</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">From Source:</h4>
              <p>Download from <a href="https://cirt.net/Nikto2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://cirt.net/Nikto2</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BountyBud Integration</h2>
        <div className="card mb-6">
          <p className="mb-3">BountyBud offers integrated support for Nikto scanning:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Simple Interface</strong>: Easy-to-use interface for Nikto scanning</li>
            <li><strong>Results Integration</strong>: View and analyze results directly in BountyBud</li>
            <li><strong>Automated Workflows</strong>: Include Nikto scans in your automated bug bounty workflows</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Official Documentation & Resources</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Homepage:</strong> <a href="https://cirt.net/Nikto2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://cirt.net/Nikto2</a></li>
            <li><strong>GitHub (Unofficial Mirror):</strong> <a href="https://github.com/sullo/nikto" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://github.com/sullo/nikto</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
} 