'use client';

import React from 'react';
import Link from 'next/link';

export default function OWASPJuiceShopGuideDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">OWASP Juice Shop - Systematic Attack Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          OWASP Juice Shop is a deliberately insecure web application designed for security training, awareness demonstrations, and Capture The Flag (CTF) events. It encompasses vulnerabilities from the OWASP Top 10 and other real-world security flaws, making it an ideal platform for learning web application security testing techniques.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is OWASP Juice Shop?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            OWASP Juice Shop is a modern web application containing various security vulnerabilities. It's built with Angular, Express.js, and Node.js, providing a realistic environment for practicing web application security testing. The application features a gamified Score Board that tracks your progress through over 100 challenges ranging from easy to expert level.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OWASP Top 10 Coverage</strong>: Covers all OWASP Top 10 vulnerabilities and more</li>
            <li><strong>Gamified Learning</strong>: Score Board with challenges ranging from Level 1 to Level 6</li>
            <li><strong>Multiple Vulnerability Types</strong>: SQL Injection, XSS, Broken Authentication, and more</li>
            <li><strong>Realistic Application</strong>: Modern web application with genuine business logic</li>
            <li><strong>Companion Guide</strong>: Detailed documentation with hints and solutions</li>
            <li><strong>Multiple Deployment Options</strong>: Docker, Node.js, cloud platforms</li>
            <li><strong>Self-Contained Environment</strong>: Complete learning platform without external dependencies</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Docker Installation (Recommended)</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Quick Start</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>docker pull bkimminich/juice-shop
docker run -d -p 3000:3000 bkimminich/juice-shop</code>
                </pre>
                <p className="mt-2 text-sm">Access the application at <code>http://localhost:3000</code></p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Alternative Setup Methods</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Node.js Installation</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop
npm install
npm start</code>
                </pre>
                <p className="mt-2 text-sm">Requires Node.js 20.x or higher</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Vagrant Setup</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop
vagrant up</code>
                </pre>
                <p className="mt-2 text-sm">Creates a VirtualBox VM with Juice Shop pre-installed</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">System Requirements</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 p-2 text-left">Requirement</th>
                    <th className="border border-gray-600 p-2 text-left">Minimum</th>
                    <th className="border border-gray-600 p-2 text-left">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-600 p-2">RAM</td>
                    <td className="border border-gray-600 p-2">256 MB</td>
                    <td className="border border-gray-600 p-2">384 MB</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-2">CPU</td>
                    <td className="border border-gray-600 p-2">200 millicpu</td>
                    <td className="border border-gray-600 p-2">400 millicpu</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-2">Disk Space</td>
                    <td className="border border-gray-600 p-2">300 MB</td>
                    <td className="border border-gray-600 p-2">800 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Initial Exploration Strategy</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Find the Score Board</h3>
            <p className="mb-3">Your first objective is discovering the hidden Score Board that lists all challenges:</p>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Directory Enumeration</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>dirsearch -u http://localhost:3000 -e html,php,js</code>
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Manual Discovery</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>http://localhost:3000/score-board
http://localhost:3000/scoreboard
http://localhost:3000/administration</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Browser-Based Discovery</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>View Page Source</strong>: Press <code>Ctrl+U</code> to find hidden endpoints</li>
              <li><strong>JavaScript Console</strong>: Use F12 to analyze scripts and discover elements</li>
              <li><strong>Network Tab</strong>: Monitor API calls and backend communications</li>
              <li><strong>Look for Comments</strong>: HTML comments often contain hints or URLs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Challenge Categories & Progression</h2>

        <div className="card mb-6">
          <h3 className="text-xl font-bold mb-3 text-primary">Vulnerability Categories</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Injection</strong>: SQL Injection, XXE, etc.</li>
            <li><strong>Broken Authentication</strong>: Login bypasses, session management</li>
            <li><strong>Sensitive Data Exposure</strong>: Information disclosure</li>
            <li><strong>XML External Entities (XXE)</strong></li>
            <li><strong>Broken Access Control</strong>: Authorization bypasses</li>
            <li><strong>Security Misconfiguration</strong></li>
            <li><strong>Cross-Site Scripting (XSS)</strong>: Reflected, Stored, DOM-based</li>
            <li><strong>Insecure Deserialization</strong></li>
            <li><strong>Vulnerable Components</strong></li>
            <li><strong>Security Through Obscurity</strong></li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-3 text-primary">Level Progression</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 p-2 text-left">Level</th>
                  <th className="border border-gray-600 p-2 text-left">Difficulty</th>
                  <th className="border border-gray-600 p-2 text-left">Example Challenges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 p-2">1</td>
                  <td className="border border-gray-600 p-2">Beginner</td>
                  <td className="border border-gray-600 p-2">Score Board discovery, Basic XSS</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2">2</td>
                  <td className="border border-gray-600 p-2">Easy</td>
                  <td className="border border-gray-600 p-2">SQL Injection login bypass</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2">3</td>
                  <td className="border border-gray-600 p-2">Medium</td>
                  <td className="border border-gray-600 p-2">API-based attacks, File uploads</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2">4</td>
                  <td className="border border-gray-600 p-2">Hard</td>
                  <td className="border border-gray-600 p-2">Advanced injection techniques</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2">5</td>
                  <td className="border border-gray-600 p-2">Expert</td>
                  <td className="border border-gray-600 p-2">Complex multi-step attacks</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2">6</td>
                  <td className="border border-gray-600 p-2">Master</td>
                  <td className="border border-gray-600 p-2">Sophisticated exploitation chains</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sample Attack Techniques</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Level 1 Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Score Board Discovery</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code># Using dirb
dirb http://localhost:3000 /usr/share/dirb/wordlists/common.txt

# Manual navigation
# Try: /score-board, /admin, /administration</code>
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Basic XSS (Reflected)</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>{`<!-- In search field -->
<iframe src="javascript:alert('xss')">
<script>alert('XSS')</script>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Level 2 Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">SQL Injection Login Bypass</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>{`-- Username field
admin'--
' OR 1=1 --
1=1 --

-- Email field for admin login
admin@juice-sh.op'--`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Level 3+ Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">API-based XSS</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# POST request to products API
curl -X POST http://localhost:3000/api/Products \\
  -H "Content-Type: application/json" \\
  -d '{"name": "XSS Product", "description": "<iframe src=\\"javascript:alert('xss')\\">", "price": 47.11}'`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Systematic Approach</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Phase 1: Reconnaissance</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Access the application at <code>http://localhost:3000</code></li>
              <li>Explore all visible features and pages</li>
              <li>View source code and JavaScript files</li>
              <li>Find the Score Board to see all available challenges</li>
            </ol>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Phase 2: Easy Wins (Level 1-2)</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Start with basic challenges to build confidence</li>
              <li>Focus on obvious vulnerabilities (simple XSS, directory traversal)</li>
              <li>Use browser developer tools extensively</li>
              <li>Document successful techniques for reuse</li>
            </ol>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Phase 3: Intermediate Challenges (Level 3-4)</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Leverage proxy tools (Burp Suite, OWASP ZAP)</li>
              <li>Intercept and modify API requests</li>
              <li>Explore file upload and download functionalities</li>
              <li>Test for advanced injection techniques</li>
            </ol>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Phase 4: Advanced Exploitation (Level 5-6)</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Chain multiple vulnerabilities together</li>
              <li>Exploit complex business logic flaws</li>
              <li>Use advanced payloads and encoding techniques</li>
              <li>Focus on sophisticated attack vectors</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tools Integration</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Web Proxies</h3>
            <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              <code># Configure Burp Suite proxy
# Browser proxy: 127.0.0.1:8080
# Intercept requests to analyze application behavior</code>
            </pre>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Directory Enumeration</h3>
            <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              <code># Gobuster
gobuster dir -u http://localhost:3000 -w /usr/share/seclists/Discovery/Web-Content/common.txt

# Dirb
dirb http://localhost:3000 /usr/share/dirb/wordlists/common.txt</code>
            </pre>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">SQL Injection Testing</h3>
            <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              <code># SQLMap (use with caution)
sqlmap -u "http://localhost:3000/rest/user/login" --data="email=test&password=test" --batch</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Official Documentation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Companion Guide</strong>: <a href="https://leanpub.com/juice-shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pwning OWASP Juice Shop</a></li>
              <li><strong>Project Homepage</strong>: <a href="https://owasp.org/www-project-juice-shop/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OWASP Juice Shop Official</a></li>
              <li><strong>GitHub Repository</strong>: <a href="https://github.com/juice-shop/juice-shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Source Code and Issues</a></li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Community Resources</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Beginner's Guide</strong>: <a href="https://null-byte.wonderhowto.com/how-to/beginners-guide-owasp-juice-shop-your-practice-hacking-grounds-for-10-most-common-web-app-vulnerabilities-0185103/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Null Byte Tutorial</a></li>
              <li><strong>Detailed Writeups</strong>: Various security blogs and CTF writeups</li>
              <li><strong>Video Tutorials</strong>: YouTube channels covering specific challenges</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Learning Approach</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Independent First</strong>: Attempt challenges before consulting hints</li>
              <li><strong>Understand Mechanics</strong>: Focus on vulnerability mechanics, not just solutions</li>
              <li><strong>Document Techniques</strong>: Take detailed notes on successful exploitations</li>
              <li><strong>Practice Reporting</strong>: Explain findings as if reporting to a client</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Tool Usage</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Manual First</strong>: Start with manual testing before automation</li>
              <li><strong>Browser Tools</strong>: Use developer tools extensively</li>
              <li><strong>Proxy Tools</strong>: Leverage proxies for request modification</li>
              <li><strong>Tool Combination</strong>: Combine multiple tools for comprehensive testing</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Common Pitfalls to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Don't rely solely on automated tools</li>
              <li>Avoid jumping straight to high-level challenges</li>
              <li>Don't ignore the hints system when genuinely stuck</li>
              <li>Resist the urge to look up solutions immediately</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">CTF Events</h3>
            <p className="mb-3">The application can be configured for competitive events with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Team-based scoring</li>
              <li>Time-limited challenges</li>
              <li>Custom branding and themes</li>
              <li>Integration with CTF platforms</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Training Programs</h3>
            <p className="mb-3">Use for structured security training with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Progressive difficulty curves</li>
              <li>Specific vulnerability focus areas</li>
              <li>Assessment and certification tracking</li>
              <li>Instructor-led workshops</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="card bg-yellow-900/20 border-yellow-600">
          <h3 className="text-xl font-bold mb-3 text-yellow-400">Important Disclaimer</h3>
          <p className="text-yellow-100">
            OWASP Juice Shop is designed for educational purposes. Always ensure you have explicit permission before applying learned techniques to any systems you do not own. Unauthorized testing is illegal and unethical.
          </p>
        </div>
      </section>
    </div>
  );
} 