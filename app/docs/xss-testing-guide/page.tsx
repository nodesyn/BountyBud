'use client';

import React from 'react';
import Link from 'next/link';

export default function XSSTestingGuide() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Comprehensive Guide to XSS Testing</h1>
      
      <p className="mb-8 text-gray-300">
        A comprehensive guide to finding and testing Cross-Site Scripting (XSS) vulnerabilities. Learn where to look for XSS, how to identify different types, and detailed procedural steps for effective testing.
      </p>

      <div className="mb-8 text-gray-300">
        <p className="mb-4">
          Cross-Site Scripting (XSS) is a security flaw where attackers inject client-side scripts into web pages viewed by other users. These scripts execute in the victim's browser, potentially stealing sensitive data, hijacking sessions, or altering page content.
        </p>
        <p className="mb-4">
          XSS is listed in the OWASP Top 10 and affects approximately one in three websites. Understanding how to effectively test for XSS vulnerabilities is crucial for bug bounty hunters and penetration testers.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">What is XSS?</h2>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Cross-Site Scripting (XSS) is a security flaw where attackers inject client-side scripts, typically JavaScript, into web pages viewed by other users. These scripts execute in the victim's browser, potentially stealing sensitive data, hijacking sessions, or altering page content.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Why is XSS Important?</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><strong>Prevalence:</strong> XSS is one of the most common vulnerabilities, with significant real-world impacts, such as the 2018 British Airways breach affecting 380,000 customers</li>
            <li><strong>Impact:</strong> It can lead to session hijacking, data theft, website defacement, or malware distribution</li>
            <li><strong>Ease of Exploitation:</strong> XSS is relatively easy to exploit, making it a favorite for attackers</li>
          </ul>
        </div>
      </section>

      {/* Types of XSS */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Types of XSS Vulnerabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Reflected XSS</h3>
            <p className="text-gray-300 text-sm mb-2">
              Malicious script in a URL or form input is reflected in the server's response.
            </p>
            <p className="text-gray-400 text-xs">
              Non-persistent; requires user interaction (e.g., clicking a link).
            </p>
            <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
              <code className="text-green-400">
                http://example.com/search?q=&lt;script&gt;alert('XSS')&lt;/script&gt;
              </code>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Stored XSS</h3>
            <p className="text-gray-300 text-sm mb-2">
              Malicious script is stored on the server and served to users.
            </p>
            <p className="text-gray-400 text-xs">
              Persistent; affects multiple users over time.
            </p>
            <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
              <code className="text-green-400">
                Comment: &lt;script&gt;alert('XSS')&lt;/script&gt;
              </code>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">DOM-based XSS</h3>
            <p className="text-gray-300 text-sm mb-2">
              Vulnerability in client-side JavaScript manipulates the DOM.
            </p>
            <p className="text-gray-400 text-xs">
              Client-side; does not involve the server.
            </p>
            <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
              <code className="text-green-400">
                #name=&lt;script&gt;alert('XSS')&lt;/script&gt;
              </code>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Blind XSS</h3>
            <p className="text-gray-300 text-sm mb-2">
              Stored XSS where payload is reflected via backend systems.
            </p>
            <p className="text-gray-400 text-xs">
              Persistent; harder to detect as it targets specific users.
            </p>
            <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
              <code className="text-green-400">
                Admin panel execution
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Look */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Where to Look for XSS Vulnerabilities</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Input Sources</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><strong>URL Parameters:</strong> Search queries, filters, or IDs (e.g., ?id=123)</li>
            <li><strong>Form Fields:</strong> Comments, user profiles, feedback forms, or message boards</li>
            <li><strong>Cookies:</strong> Input stored in cookies and reflected in pages</li>
            <li><strong>HTTP Headers:</strong> Rarely, headers like User-Agent may be reflected</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Output Locations</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><strong>HTML Content:</strong> User input directly inserted into the page body</li>
            <li><strong>JavaScript Code:</strong> Input used in scripts (e.g., var x = "$&#123;userInput&#125;";)</li>
            <li><strong>HTML Attributes:</strong> Input in attributes like href, src, or onmouseover</li>
            <li><strong>CSS Properties:</strong> Input in styles (e.g., style="color: $&#123;userInput&#125;;")</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">High-Risk Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Search Functionality</strong>
              <p className="text-gray-300 text-sm">Often reflects user input in results</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">User-Generated Content</strong>
              <p className="text-gray-300 text-sm">Forums, blogs, social media platforms</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Dynamic Pages</strong>
              <p className="text-gray-300 text-sm">Single-page apps using JavaScript frameworks</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Error Messages</strong>
              <p className="text-gray-300 text-sm">Input reflected in error pages or alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Methodology */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">XSS Testing Methodology</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">General Approach</h3>
          <ol className="list-decimal pl-6 text-gray-300 space-y-2">
            <li><strong>Map the Application:</strong> Use a web proxy like Burp Suite to identify all input points</li>
            <li><strong>Inject Test Payloads:</strong> Use scripts to check if they execute</li>
            <li><strong>Analyze Responses:</strong> Look for script execution or improper sanitization</li>
            <li><strong>Bypass Filters:</strong> Test encoded or obfuscated payloads to evade defenses</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Test Payloads</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-primary">Basic Script</span>
                <span className="text-xs text-gray-400">Tests direct script execution</span>
              </div>
              <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                &lt;script&gt;alert('XSS')&lt;/script&gt;
              </pre>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-primary">Attribute-based</span>
                <span className="text-xs text-gray-400">Tests event handlers in attributes</span>
              </div>
              <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                &lt;img src=x onerror=alert('XSS')&gt;
              </pre>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-primary">URL Encoded</span>
                <span className="text-xs text-gray-400">Bypasses basic input filters</span>
              </div>
              <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                %3Cscript%3Ealert('XSS')%3C/script%3E
              </pre>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-primary">Event-based</span>
                <span className="text-xs text-gray-400">Tests mouse or keyboard events</span>
              </div>
              <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                &lt;a href="#" onmouseover="alert('XSS')"&gt;Hover&lt;/a&gt;
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Testing Steps */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Detailed Testing Procedures</h2>
        
        <div className="space-y-8">
          {/* Reflected XSS Testing */}
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-primary">Testing Reflected XSS</h3>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
              <li><strong>Identify Parameters:</strong> Use Burp Suite to find URL parameters (e.g., ?q=)</li>
              <li><strong>Inject Payloads:</strong> Try &lt;script&gt;alert('XSS')&lt;/script&gt; or &lt;img src=x onerror=alert('XSS')&gt;</li>
              <li><strong>Check Response:</strong> Look for the payload in the HTML response and verify execution</li>
              <li><strong>Test Encodings:</strong> Use URL-encoded (%3Cscript%3E) or HTML-encoded (&amp;lt;script&amp;gt;) payloads</li>
              <li><strong>Example:</strong> If http://example.com/search?q=test reflects 'test', try with XSS payload</li>
            </ol>
          </div>

          {/* Stored XSS Testing */}
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-primary">Testing Stored XSS</h3>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
              <li><strong>Locate Input Fields:</strong> Find forms for comments, profiles, or messages</li>
              <li><strong>Submit Payloads:</strong> Enter &lt;script&gt;alert('XSS')&lt;/script&gt; or similar</li>
              <li><strong>Verify Persistence:</strong> Check if the payload appears on the page for other users or after a refresh</li>
              <li><strong>Test Scope:</strong> Log in as another user to confirm the payload executes</li>
              <li><strong>Example:</strong> Post XSS payload in a forum comment and check if it triggers for others</li>
            </ol>
          </div>

          {/* DOM-based XSS Testing */}
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-primary">Testing DOM-based XSS</h3>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
              <li><strong>Inspect JavaScript:</strong> Use browser developer tools to find DOM manipulation (e.g., document.write(input))</li>
              <li><strong>Identify Inputs:</strong> Look for URL parameters or form inputs used by JavaScript</li>
              <li><strong>Inject Payloads:</strong> Modify inputs like #name=&lt;script&gt;alert('XSS')&lt;/script&gt;</li>
              <li><strong>Verify Execution:</strong> Check the DOM or console for script execution</li>
              <li><strong>Example:</strong> If a page uses location.hash to update content, test with malicious fragment</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Filter Bypasses */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Bypassing XSS Filters</h2>
        
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Bypass Techniques</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Obfuscation</h4>
                <p className="text-gray-300 text-sm mb-2">Use nested tags to bypass simple filters:</p>
                <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                  &lt;scr&lt;script&gt;ipt&gt;alert('XSS')&lt;/scr&lt;/script&gt;ipt&gt;
                </pre>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Alternative Tags</h4>
                <p className="text-gray-300 text-sm mb-2">Try different HTML tags and event handlers:</p>
                <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                  &lt;svg onload=alert('XSS')&gt;<br/>
                  &lt;img src="javascript:alert('XSS')"&gt;<br/>
                  &lt;body onload=alert('XSS')&gt;
                </pre>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Encoding Variations</h4>
                <p className="text-gray-300 text-sm mb-2">Use different encoding methods:</p>
                <pre className="bg-gray-900 p-2 rounded text-xs text-green-400 overflow-x-auto">
                  \\u003Cscript\\u003E (Unicode)<br/>
                  &amp;#60;script&amp;#62; (HTML entities)<br/>
                  eval(atob('YWxlcnQoIlhTUyIp')) (Base64)
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Essential XSS Testing Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Burp Suite</h3>
            <p className="text-gray-300 text-sm mb-2">
              Industry-standard web proxy for intercepting requests and automated vulnerability scanning.
            </p>
            <div className="text-xs text-gray-400">
              • Request interception<br/>
              • Automated XSS detection<br/>
              • Custom payload testing
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">OWASP ZAP</h3>
            <p className="text-gray-300 text-sm mb-2">
              Open-source proxy for manual and automated XSS testing.
            </p>
            <div className="text-xs text-gray-400">
              • Free alternative to Burp<br/>
              • Active/passive scanning<br/>
              • Script execution detection
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">XSS Hunter</h3>
            <p className="text-gray-300 text-sm mb-2">
              Specialized tool for detecting blind XSS vulnerabilities.
            </p>
            <div className="text-xs text-gray-400">
              • Blind XSS detection<br/>
              • Payload callback system<br/>
              • Real-time notifications
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Browser DevTools</h3>
            <p className="text-gray-300 text-sm mb-2">
              Built-in browser tools for DOM analysis and JavaScript debugging.
            </p>
            <div className="text-xs text-gray-400">
              • DOM inspection<br/>
              • Console monitoring<br/>
              • JavaScript debugging
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Overview */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">XSS Prevention Overview</h2>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Understanding prevention methods helps in responsible disclosure and better testing:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Input Validation</strong>
              <p className="text-gray-300 text-sm">Ensure inputs match expected formats</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Output Encoding</strong>
              <p className="text-gray-300 text-sm">Escape characters like &lt; to &amp;lt; based on context</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Content Security Policy</strong>
              <p className="text-gray-300 text-sm">Restrict script sources with nonces or hashes</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <strong className="text-primary">Sanitization Libraries</strong>
              <p className="text-gray-300 text-sm">Use DOMPurify for HTML sanitization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Notable XSS Incidents</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">2005 MySpace Samy Worm</h3>
            <p className="text-gray-300 text-sm">
              A stored XSS in profile comments infected over a million users, demonstrating the viral potential of XSS attacks.
            </p>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">2018 British Airways Breach</h3>
            <p className="text-gray-300 text-sm">
              An XSS attack stole payment data from 380,000 customers, highlighting the financial impact of XSS vulnerabilities.
            </p>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">2011 Facebook Mobile API Worm</h3>
            <p className="text-gray-300 text-sm">
              Exploited XSS to spread malicious code through the social network, showing how XSS can propagate through APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Conclusion</h2>
        
        <div className="text-gray-300">
          <p className="mb-4">
            XSS remains a critical vulnerability due to its prevalence and impact. By systematically testing input points, using creative payloads, and leveraging the right tools, security professionals can effectively uncover XSS flaws.
          </p>
          <p className="mb-4">
            Remember to always conduct ethical testing within authorized bug bounty scopes and practice responsible disclosure to help improve web security for everyone.
          </p>
          <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>⚠️ Ethical Testing Reminder:</strong> Only test for XSS vulnerabilities on applications you own or have explicit written permission to test. Unauthorized testing is illegal and unethical.
            </p>
          </div>
        </div>
      </section>
      
      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 