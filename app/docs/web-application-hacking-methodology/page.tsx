'use client';

import React from 'react';
import Link from 'next/link';

export default function WebApplicationHackingMethodologyGuide() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Web Application Hacking Methodology Guide</h1>
      
      <p className="mb-8 text-gray-300">
        A comprehensive, step-by-step approach to testing web applications for security vulnerabilities, from reconnaissance to exploitation and reporting.
      </p>

      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-primary">Contents</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li><a href="#introduction" className="text-primary hover:underline">Introduction</a></li>
          <li><a href="#phase1" className="text-primary hover:underline">Phase 1: Reconnaissance and Information Gathering</a></li>
          <li><a href="#phase2" className="text-primary hover:underline">Phase 2: Mapping the Application</a></li>
          <li><a href="#phase3" className="text-primary hover:underline">Phase 3: Vulnerability Discovery</a></li>
          <li><a href="#phase4" className="text-primary hover:underline">Phase 4: Exploitation</a></li>
          <li><a href="#phase5" className="text-primary hover:underline">Phase 5: Reporting</a></li>
          <li><a href="#tools" className="text-primary hover:underline">Essential Tools</a></li>
        </ul>
      </div>

      {/* Introduction */}
      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
        <p className="mb-4 text-gray-300">
          Web application security testing is a systematic process of identifying security vulnerabilities in web applications. This methodology provides a structured approach to discovering and exploiting vulnerabilities, helping security professionals thoroughly assess web applications.
        </p>
        <p className="mb-4 text-gray-300">
          This guide combines elements from industry standards like the OWASP Testing Guide, various penetration testing frameworks, and real-world experience from security professionals. It's designed to be comprehensive yet practical for both beginners and experienced testers.
        </p>
      </section>

      {/* Phase 1 */}
      <section id="phase1" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Phase 1: Reconnaissance and Information Gathering</h2>
        <p className="mb-4 text-gray-300">
          The first phase involves collecting as much information as possible about the target application without actively engaging with it.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Passive Information Gathering</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>WHOIS and DNS reconnaissance</li>
            <li>Search engine discovery (Google dorking)</li>
            <li>Archive.org and WaybackMachine searching</li>
            <li>Public code repositories (GitHub, GitLab, etc.)</li>
            <li>Social media reconnaissance</li>
            <li>Document metadata analysis</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Footprinting the Target</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Subdomain enumeration</li>
            <li>IP range identification</li>
            <li>Technology stack identification</li>
            <li>Third-party service discovery</li>
            <li>SSL/TLS certificate analysis</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Active Information Gathering</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Port scanning and service identification</li>
            <li>Web server fingerprinting</li>
            <li>CMS and framework detection</li>
            <li>Web application firewall (WAF) detection</li>
            <li>Virtual host discovery</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg mb-4">
          <h4 className="text-lg font-semibold text-primary mb-2">Key Tools for Reconnaissance</h4>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Amass, Subfinder, Sublist3r (for subdomain enumeration)</li>
            <li>Shodan, Censys (for exposed services)</li>
            <li>Nmap (for port scanning)</li>
            <li>Wappalyzer, BuiltWith (for technology stack identification)</li>
            <li>TheHarvester (for email and subdomain harvesting)</li>
          </ul>
        </div>
      </section>

      {/* Phase 2 */}
      <section id="phase2" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Phase 2: Mapping the Application</h2>
        <p className="mb-4 text-gray-300">
          After gathering information, the next step is to understand the application's structure, functionality, and behavior.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Crawling and Directory Discovery</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Automated crawling of all accessible pages</li>
            <li>Directory and file brute forcing</li>
            <li>Hidden parameter discovery</li>
            <li>API endpoint enumeration</li>
            <li>Analyzing robots.txt and sitemap.xml</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Analyzing User Flow</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>User registration process</li>
            <li>Authentication mechanisms</li>
            <li>Session management</li>
            <li>Password reset functionality</li>
            <li>Multi-factor authentication flow</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Identifying Entry Points</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Input fields and forms</li>
            <li>File upload functionality</li>
            <li>URL parameters and query strings</li>
            <li>Hidden fields and cookies</li>
            <li>HTTP headers processed by the application</li>
            <li>API endpoints and their parameters</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg mb-4">
          <h4 className="text-lg font-semibold text-primary mb-2">Key Tools for Mapping</h4>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Burp Suite Spider/Crawler</li>
            <li>OWASP ZAP Spider</li>
            <li>Dirsearch, Gobuster, Feroxbuster (for directory brute forcing)</li>
            <li>Arjun, Parameth (for parameter discovery)</li>
            <li>Kiterunner (for API endpoint discovery)</li>
          </ul>
        </div>
      </section>

      {/* Phase 3 */}
      <section id="phase3" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Phase 3: Vulnerability Discovery</h2>
        <p className="mb-4 text-gray-300">
          This phase involves systematic testing for common vulnerabilities based on the OWASP Top 10 and beyond.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Authentication Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Default or weak credentials</li>
            <li>Brute force protection</li>
            <li>Credential stuffing vulnerabilities</li>
            <li>Authentication bypass techniques</li>
            <li>Multi-factor authentication flaws</li>
            <li>Session fixation/hijacking</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Authorization Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Insecure direct object references (IDOR)</li>
            <li>Horizontal privilege escalation</li>
            <li>Vertical privilege escalation</li>
            <li>JWT token vulnerabilities</li>
            <li>Role-based access control issues</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Input Validation Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>SQL injection (SQLi)</li>
            <li>Cross-site scripting (XSS)</li>
            <li>Command injection</li>
            <li>XML external entity (XXE) injection</li>
            <li>Server-side request forgery (SSRF)</li>
            <li>Local/remote file inclusion (LFI/RFI)</li>
            <li>Server-side template injection (SSTI)</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Client-Side Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>DOM-based XSS</li>
            <li>Cross-site request forgery (CSRF)</li>
            <li>Clickjacking vulnerabilities</li>
            <li>Client-side storage issues</li>
            <li>Cross-origin resource sharing (CORS) misconfigurations</li>
            <li>WebSockets vulnerabilities</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Configuration Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Security misconfigurations</li>
            <li>Default installations</li>
            <li>Outdated software</li>
            <li>Insecure HTTP methods</li>
            <li>Directory listing vulnerabilities</li>
            <li>Information disclosure</li>
            <li>Error handling issues</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Business Logic Testing</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Workflow bypass</li>
            <li>Input validation manipulation</li>
            <li>Rate limiting issues</li>
            <li>Feature misuse</li>
            <li>Race conditions</li>
            <li>Time-of-check to time-of-use (TOCTOU) vulnerabilities</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg mb-4">
          <h4 className="text-lg font-semibold text-primary mb-2">Key Tools for Vulnerability Discovery</h4>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Burp Suite Professional/Community (for overall testing)</li>
            <li>OWASP ZAP (for automated scanning)</li>
            <li>SQLmap (for SQL injection)</li>
            <li>XSStrike (for XSS testing)</li>
            <li>Nikto (for web server vulnerabilities)</li>
            <li>JWT_Tool (for JWT testing)</li>
          </ul>
        </div>
      </section>

      {/* Phase 4 */}
      <section id="phase4" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Phase 4: Exploitation</h2>
        <p className="mb-4 text-gray-300">
          After discovering vulnerabilities, the next step is to confirm them through controlled exploitation to determine their impact.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Exploitation Process</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Creating proof-of-concept exploits</li>
            <li>Developing custom payloads</li>
            <li>Chaining vulnerabilities for greater impact</li>
            <li>Documenting exploitation steps</li>
            <li>Capturing evidence (screenshots, request/response data)</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Post-Exploitation</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Assessing the impact of vulnerabilities</li>
            <li>Evaluating potential business risks</li>
            <li>Identifying data exposure</li>
            <li>Determining attack vectors and scenarios</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg mb-4">
          <h4 className="text-lg font-semibold text-primary mb-2">Responsible Exploitation Guidelines</h4>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Never exploit vulnerabilities that could cause damage to the application or its data</li>
            <li>Only access or exfiltrate the minimum amount of data needed to demonstrate the vulnerability</li>
            <li>Document all actions taken during exploitation</li>
            <li>Stay within the defined scope of testing</li>
            <li>Report critical vulnerabilities immediately</li>
          </ul>
        </div>
      </section>

      {/* Phase 5 */}
      <section id="phase5" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Phase 5: Reporting</h2>
        <p className="mb-4 text-gray-300">
          The final phase involves documenting findings in a clear, actionable report for stakeholders.
        </p>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Report Structure</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Executive summary for non-technical stakeholders</li>
            <li>Methodology overview</li>
            <li>Detailed findings with severity ratings</li>
            <li>Steps to reproduce</li>
            <li>Evidence (screenshots, HTTP requests/responses)</li>
            <li>Remediation recommendations</li>
            <li>Technical appendices</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Vulnerability Scoring</h3>
          <p className="mb-2 text-gray-300">
            Use standardized scoring systems to rate vulnerabilities:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Common Vulnerability Scoring System (CVSS)</li>
            <li>OWASP Risk Rating Methodology</li>
            <li>Custom risk matrices based on client requirements</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">Remediation Guidance</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Provide clear, practical remediation steps</li>
            <li>Include code examples where appropriate</li>
            <li>Reference industry best practices and standards</li>
            <li>Suggest both short-term fixes and long-term improvements</li>
            <li>Prioritize vulnerabilities based on risk</li>
          </ul>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Essential Tools</h2>
        <p className="mb-4 text-gray-300">
          A comprehensive collection of tools for web application security testing:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary">All-in-One Platforms</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Burp Suite Professional</li>
              <li>OWASP ZAP</li>
              <li>Metasploit Framework</li>
              <li>Acunetix</li>
              <li>Nessus</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary">Reconnaissance Tools</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Amass, Subfinder, Sublist3r</li>
              <li>Nmap, Masscan</li>
              <li>Shodan, Censys</li>
              <li>TheHarvester</li>
              <li>Wappalyzer, Whatweb</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary">Mapping Tools</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Dirsearch, Gobuster, Feroxbuster</li>
              <li>Arjun, Parameth</li>
              <li>Kiterunner</li>
              <li>EyeWitness</li>
              <li>LinkFinder</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary">Vulnerability-Specific Tools</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>SQLmap (SQL injection)</li>
              <li>XSStrike, XSSHunter (XSS)</li>
              <li>JWT_Tool (JWT testing)</li>
              <li>XXEinjector (XXE)</li>
              <li>CORStest (CORS)</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="p-4 bg-gray-800 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary">Continuous Improvement</h2>
        <p className="text-gray-300">
          Web application security testing is an evolving field. Stay current with emerging threats, new testing techniques, and security research. Regularly update your methodology and toolset to address the evolving threat landscape.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 