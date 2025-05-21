'use client';

import React from 'react';
import Link from 'next/link';

export default function DroopescanGuideDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Droopescan - CMS Vulnerability Scanner Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Droopescan is a plugin-based scanner that aids security researchers in identifying issues with several content management systems (CMS), including Drupal, Silverstripe, Joomla!, WordPress and Moodle. It is designed to be a versatile tool for initial reconnaissance of CMS-based websites.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Droopescan?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            Droopescan is a specialized security tool built to scan various content management systems for vulnerabilities, misconfigurations, and outdated components. It follows a plugin-based architecture that makes it extensible and capable of handling multiple CMS platforms within a single framework.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Multi-CMS Support</strong>: Scans Drupal, WordPress, Joomla!, Silverstripe, and Moodle</li>
            <li><strong>Version Identification</strong>: Accurately fingerprints CMS versions</li>
            <li><strong>Plugin Detection</strong>: Discovers installed themes, plugins, and modules</li>
            <li><strong>Sensitive Files</strong>: Checks for exposed configuration files and directories</li>
            <li><strong>Auto-Detection</strong>: Can automatically detect which CMS is running</li>
            <li><strong>Extensible Framework</strong>: Plugin-based architecture allows for new CMS support</li>
            <li><strong>Multiple Output Formats</strong>: Supports various output formats (JSON, standard out)</li>
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
                <h4 className="text-lg font-semibold mb-1">Auto-Detect and Scan</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan -u target_site_url</code>
                </pre>
                <p className="mt-2 text-sm">Automatically detects the CMS type and performs a comprehensive scan.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Scan Specific CMS</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url</code>
                </pre>
                <p className="mt-2 text-sm">Explicitly scans for Drupal CMS. Replace 'drupal' with 'wordpress', 'joomla', 'silverstripe', or 'moodle' as needed.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Specific Scans</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate Plugins</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url -e p</code>
                </pre>
                <p className="mt-2 text-sm">Enumerates plugins/modules only. The '-e p' flag specifies plugin enumeration.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Enumerate Themes</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url -e t</code>
                </pre>
                <p className="mt-2 text-sm">Enumerates themes only. The '-e t' flag specifies theme enumeration.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Version Detection</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url -e v</code>
                </pre>
                <p className="mt-2 text-sm">Focuses on version detection. The '-e v' flag specifies version enumeration.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Advanced Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Output to JSON</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url --output=json</code>
                </pre>
                <p className="mt-2 text-sm">Outputs the results in JSON format for easier parsing and integration.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Host Simulation</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url --host-header="example.com"</code>
                </pre>
                <p className="mt-2 text-sm">Sets a custom Host header, useful for testing virtual hosts.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Authentication</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>droopescan scan drupal -u target_site_url --auth-type=basic --auth=username:password</code>
                </pre>
                <p className="mt-2 text-sm">Uses HTTP Basic Authentication during scanning.</p>
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
              <h4 className="text-lg font-semibold mb-1">Via Pip (Recommended):</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>pip install droopescan</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">From GitHub:</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>git clone https://github.com/droope/droopescan.git
cd droopescan
pip install -r requirements.txt
python setup.py install</code>
              </pre>
              <p className="mt-2 text-sm">Alternatively, you can run directly with: <code>python droopescan.py</code></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BountyBud Integration</h2>
        <div className="card mb-6">
          <p className="mb-3">BountyBud offers integrated support for Droopescan:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>CMS Auto-detection</strong>: Automatic identification of CMS platforms</li>
            <li><strong>Structured Results</strong>: Organized display of scan findings</li>
            <li><strong>Workflow Integration</strong>: Incorporate Droopescan in complete bug bounty workflows</li>
            <li><strong>Multi-CMS Testing</strong>: Seamlessly test different CMS installations</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Target Verification</strong>: Always ensure you have permission to scan the target</li>
            <li><strong>Rate Limiting</strong>: Use the <code>--delay</code> parameter to avoid overwhelming the server</li>
            <li><strong>Thoroughness</strong>: For complete scans, don't limit enumeration types</li>
            <li><strong>Authentication</strong>: For internal assessments, use authentication for more thorough results</li>
            <li><strong>Follow-up</strong>: Use findings from Droopescan to guide further manual testing</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Official Documentation & Resources</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/droope/droopescan" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://github.com/droope/droopescan</a></li>
            <li><strong>PyPI Package:</strong> <a href="https://pypi.org/project/droopescan/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://pypi.org/project/droopescan/</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
} 