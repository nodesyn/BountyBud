'use client';

import React from 'react';
import Link from 'next/link';

export default function BurpSuiteCheatsheetPage() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Burp Suite Cheatsheet</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Your go-to Burp Suite reference for proxy setup, intruder attacks, useful extensions, and workflow tips.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Navigation & Setup</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Proxy Tab</strong>: Main area for intercepting and modifying HTTP/S traffic.
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Intercept is ON/OFF</strong>: Toggle to capture or pass through requests.</li>
                <li><strong>HTTP history</strong>: Log of all requests made through the proxy.</li>
                <li><strong>WebSockets history</strong>: Log of WebSocket messages.</li>
                <li><strong>Options</strong>: Configure listener ports (default: <code>127.0.0.1:8080</code>), SSL passthrough, client/server SSL certificates.</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Target Tab</strong>: Site map and scope definition.
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Site map</strong>: Tree structure of discovered application content.</li>
                <li><strong>Scope</strong>: Define what hosts and paths are in scope for testing.
                  <ul className="list-disc pl-6 mt-1">
                    <li>Right-click on a request/host -{'>'} "Add to scope".</li>
                    <li>Configure scope settings to include/exclude specific items.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Intruder Tab</strong>: Automated custom attacks.
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Positions</strong>: Define payload positions in a request template.</li>
                <li><strong>Payloads</strong>: Configure payload sets (simple lists, custom iterators, etc.).</li>
                <li><strong>Options</strong>: Request engine settings, grep match, extract, and payload type settings.</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Repeater Tab</strong>: Manually modify and resend individual requests.
              <ul className="list-disc pl-6 mt-2">
                <li>Send requests from Proxy or Target to Repeater (Ctrl+R or Cmd+R).</li>
                <li>Modify request, click "Send", view response.</li>
              </ul>
            </li>
            <li className="mt-3"><strong>Sequencer Tab</strong>: Analyze randomness of session tokens or other unpredictable data.</li>
            <li className="mt-3"><strong>Decoder Tab</strong>: Transform data (URL decode, Base64, Hex, etc.).</li>
            <li className="mt-3"><strong>Comparer Tab</strong>: Visually compare two pieces of data (e.g., two responses).</li>
            <li className="mt-3">
              <strong>Extender Tab</strong>: Manage Burp extensions (BApps).
              <ul className="list-disc pl-6 mt-2">
                <li><strong>BApp Store</strong>: Install community-contributed extensions.</li>
                <li><strong>APIs</strong>: For developing custom extensions.</li>
              </ul>
            </li>
            <li className="mt-3"><strong>Project Options Tab</strong>: Settings for the current project (connections, SSL, display, etc.).</li>
            <li className="mt-3"><strong>User Options Tab</strong>: Global settings for Burp Suite (display, hotkeys, upstream proxy, etc.).</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Hotkeys</h2>
        <div className="card mb-6">
          <p className="mb-2 text-sm text-gray-400">Default - Check User Options {'>'}  Misc {'>'}  Hotkeys</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Ctrl+R / Cmd+R</strong>: Send request to Repeater.</li>
            <li><strong>Ctrl+I / Cmd+I</strong>: Send request to Intruder.</li>
            <li><strong>Ctrl+F / Cmd+F</strong>: Forward intercepted proxy message.</li>
            <li><strong>Ctrl+Shift+D / Cmd+Shift+D</strong>: Open Decoder tab.</li>
            <li><strong>Ctrl+Shift+C / Cmd+Shift+C</strong>: Open Comparer tab.</li>
            <li><strong>Ctrl+Shift+P / Cmd+Shift+P</strong>: Open Project options.</li>
            <li><strong>Ctrl+Shift+U / Cmd+Shift+U</strong>: Open User options.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Proxy Workflow Tips</h2>
        <div className="card mb-6">
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Configure Browser</strong>: Set browser to use Burp proxy (e.g., via FoxyProxy).</li>
            <li>
              <strong>Install Burp CA Certificate</strong>: In your browser, to avoid SSL warnings for HTTPS sites.
              <ul className="list-disc pl-6 mt-1">
                <li>Visit <code>http://burp</code> or <code>http://127.0.0.1:8080</code> and download the CA certificate.</li>
              </ul>
            </li>
            <li><strong>Define Scope</strong>: Early on, define your target scope to filter noise.</li>
            <li><strong>Intercept & Analyze</strong>: Browse the application with intercept on (or view history).</li>
            <li>
              <strong>Action Requests</strong>:
              <ul className="list-disc pl-6 mt-1">
                <li><strong>Send to Repeater</strong>: For manual manipulation and re-sending.</li>
                <li><strong>Send to Intruder</strong>: For automated attacks (fuzzing, brute-force).</li>
                <li><strong>Send to Sequencer</strong>: For analyzing tokens.</li>
                <li><strong>Do intercept / Do not intercept</strong>: For specific request types or domains.</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intruder Attack Types</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Sniper</strong>: Single payload set, iterates through positions one by one.</li>
            <li><strong>Battering ram</strong>: Single payload set, places the same payload in all defined positions simultaneously.</li>
            <li><strong>Pitchfork</strong>: Multiple payload sets, one payload set per position. Iterates through payload sets simultaneously.</li>
            <li><strong>Cluster bomb</strong>: Multiple payload sets, tries every combination of payloads from each set.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Useful Burp Extensions (BApp Store)</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Logger++</strong>: Enhanced logging and filtering of requests/responses.</li>
            <li><strong>Autorize</strong>: Helps detect authorization bypasses.</li>
            <li><strong>Flow</strong>: Provides a proxy history graph and better search/filtering.</li>
            <li><strong>Active Scan++</strong>: Enhances active scanning capabilities.</li>
            <li><strong>Param Miner</strong>: Discovers hidden, unlinked parameters.</li>
            <li><strong>Reflected Parameters</strong>: Highlights reflected input in responses.</li>
            <li><strong>JSON Web Tokens (JWT4B)</strong>: Decode and manipulate JWTs.</li>
            <li><strong>Software Version Reporter</strong>: Passively reports versions of scanned software.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Tasks & Where to Find Them</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Searching HTTP History</strong>: Proxy {'>'}  HTTP history. Use the filter bar.</li>
            <li><strong>Saving/Loading Project</strong>: Project menu {'>'}  Save copy / Open project.</li>
            <li><strong>Spidering (Discovering Content)</strong>: Target {'>'}  Site map. Right-click host/folder {'>'}  "Spider this host/branch". (Use with caution, can be noisy).</li>
            <li><strong>Active Scanning (Pro Version)</strong>: Target {'>'}  Site map. Right-click host/folder {'>'}  "Actively scan this host/branch".</li>
            <li><strong>Passive Scanning</strong>: Occurs automatically as you browse.</li>
            <li><strong>Engagements Tools</strong>: Useful for documenting findings (Pro version).</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tips for Effective Use</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Filter, Filter, Filter</strong>: Use display filters in Proxy history and Target sitemap extensively.</li>
            <li><strong>Scope is Your Friend</strong>: Define it tightly to focus your testing.</li>
            <li><strong>Understand Your Target</strong>: Don't just blindly run automated tools. Know what the application does.</li>
            <li><strong>Use Multiple Tabs</strong>: Repeater and Intruder can have multiple tabs for different requests.</li>
            <li><strong>Check Extender Regularly</strong>: New BApps are frequently added.</li>
            <li><strong>Read the Docs</strong>: PortSwigger has excellent documentation on their website.</li>
          </ul>
        </div>
      </section>

      <div className="mt-6 card bg-gray-800 text-amber-300 p-4">
        <p className="font-semibold">
          <strong>Disclaimer:</strong> Burp Suite is a powerful tool. Always ensure you have explicit, written permission before testing any application or system that you do not own. Unauthorized testing can lead to legal consequences.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <Link href="/docs" className="text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
} 