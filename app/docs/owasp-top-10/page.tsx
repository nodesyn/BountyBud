'use client';

import React from 'react';
import Link from 'next/link';

export default function OWASPTop10Guide() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">OWASP Top 10 In-depth Guide</h1>
      
      <p className="mb-8 text-gray-300">
        A comprehensive analysis of the OWASP Top 10 Web Application Security Risks, with detailed explanations, examples, detection methods, and prevention strategies.
      </p>

      <div className="mb-8 text-gray-300">
        <p className="mb-4">
          The OWASP Top 10 is a standard awareness document representing a broad consensus about the most critical security risks to web applications. Organizations should adopt this document and start the process of ensuring that their web applications minimize these risks.
        </p>
        <p className="mb-4">
          The OWASP Top 10 2021 is based on considerable data and contributions from security experts worldwide. It represents the most significant risks that web applications face today, providing guidance on how to identify, mitigate, and prevent them.
        </p>
      </div>

      {/* A01:2021 - Broken Access Control */}
      <section id="a01" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A01:2021 - Broken Access Control</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Access control enforces policy such that users cannot act outside of their intended permissions. Failures in this area typically lead to unauthorized information disclosure, modification, or destruction of data, or performing unauthorized business functions.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Bypassing access control checks by modifying the URL, internal application state, or HTML page</li>
            <li>Allowing primary key to be changed to another user's record, permitting viewing or editing of another account</li>
            <li>Elevation of privilege, acting as a user without being logged in, or acting as an admin when logged in as a user</li>
            <li>Metadata manipulation, such as replaying or tampering with a JWT token, or a cookie or hidden field to elevate privileges</li>
            <li>CORS misconfiguration allowing unauthorized API access</li>
            <li>Force browsing to authenticated pages as an unauthenticated user or to privileged pages as a standard user</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> The application uses unverified data in an SQL call that accesses account information:
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300">
{`// Vulnerable code
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  // No verification that the logged-in user has permission to access this user
  db.query('SELECT * FROM users WHERE id = ' + userId, (err, results) => {
    res.json(results[0]);
  });
});`}
            </pre>
            <p className="text-gray-300 mt-2">
              An attacker simply modifies the 'id' parameter value in the browser to any user ID. This flaw allows the attacker to access any user's account.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Implement proper access control mechanisms that are enforced server-side</li>
            <li>Deny all access by default, requiring explicit grants for specific roles</li>
            <li>Implement access control mechanisms once and re-use them throughout the application</li>
            <li>Enforce record ownership; users should only be able to view/modify their data</li>
            <li>Disable directory listing and implement proper error handling to avoid information leakage</li>
            <li>Log access control failures and alert administrators for repeated failures</li>
            <li>Rate limit API and controller access to minimize harm from automated tools</li>
            <li>Invalidate JWT tokens on the server after logout</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            Manual testing is crucial for verifying access control functionality:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Test for vertical access control issues (privilege escalation)</li>
            <li>Test for horizontal access control issues (accessing other users' data)</li>
            <li>Test if unauthorized functions can be accessed when not logged in</li>
            <li>Verify that API endpoints enforce the same access controls as the UI</li>
            <li>Check if metadata (e.g., JWT tokens) can be manipulated to bypass controls</li>
          </ul>
        </div>
      </section>

      {/* A02:2021 - Cryptographic Failures */}
      <section id="a02" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A02:2021 - Cryptographic Failures</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Cryptographic failures refer to vulnerabilities that occur when sensitive data is not properly protected. This includes failures related to cryptography (or its absence), which often leads to exposure of sensitive data.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Transmitting sensitive data in clear text (e.g., HTTP instead of HTTPS)</li>
            <li>Using deprecated or weak cryptographic algorithms or protocols</li>
            <li>Using default, weak, or hard-coded cryptographic keys</li>
            <li>Lack of proper key management (creation, storage, rotation)</li>
            <li>Not enforcing encryption through security directives/headers</li>
            <li>Insufficient randomness in cryptographic functions</li>
            <li>Using deprecated hash functions (MD5, SHA1) or improper password hashing</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> An application encrypts credit card numbers in a database using automatic database encryption. However, this data is decrypted automatically when retrieved, allowing an SQL injection flaw to retrieve credit card numbers in clear text.
            </p>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Scenario 2:</span> A website doesn't use or enforce TLS for all pages or supports weak encryption. An attacker monitors network traffic, downgrades connections from HTTPS to HTTP, intercepts requests, and steals the user's session cookie. The attacker then replays this cookie and hijacks the user's authenticated session.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Classify data processed, stored, or transmitted by an application and identify which data is sensitive according to privacy laws or regulations</li>
            <li>Don't store sensitive data unnecessarily; discard it as soon as possible</li>
            <li>Ensure up-to-date and strong standard algorithms, protocols, and keys are in place</li>
            <li>Encrypt all sensitive data at rest and in transit with secure protocols such as TLS with forward secrecy (FS) ciphers, cipher prioritization by the server, and secure parameters</li>
            <li>Store passwords using strong adaptive and salted hashing functions with a work factor (delay factor), such as Argon2, scrypt, bcrypt, or PBKDF2</li>
            <li>Use proper key management, such as never hardcoding keys and verifying the effectiveness of implementation</li>
            <li>Disable caching for responses that contain sensitive data</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify cryptographic failures:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Inventory all sensitive data the application processes</li>
            <li>Verify that sensitive data isn't transmitted in clear text (check network traffic)</li>
            <li>Verify the strength of used cryptographic algorithms and proper implementation</li>
            <li>Check for proper certificate validation and verification</li>
            <li>Ensure security headers that enforce encryption are in place</li>
            <li>Test for padding oracle vulnerabilities in CBC mode encryption</li>
          </ul>
        </div>
      </section>

      {/* A03:2021 - Injection */}
      <section id="a03" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A03:2021 - Injection</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Injection flaws, such as SQL, NoSQL, OS command, LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>User-supplied data is not validated, filtered, or sanitized by the application</li>
            <li>Dynamic queries or non-parameterized calls without context-aware escaping are used directly in the interpreter</li>
            <li>Hostile data is used within ORM search parameters to extract additional, sensitive records</li>
            <li>Hostile data is directly used or concatenated in SQL or command queries</li>
            <li>Lack of proper input validation allowing for multiple types of injection (SQL, NoSQL, command, LDAP)</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1: SQL Injection</span>
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300">
{`// Vulnerable code
const query = "SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'";`}
            </pre>
            <p className="text-gray-300 mt-2 mb-2">
              An attacker might provide the following input for the username field:
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300">
{`' OR '1'='1`}
            </pre>
            <p className="text-gray-300 mt-2">
              This changes the query to SELECT * FROM accounts WHERE username = '' OR '1'='1' AND password = '...', which returns all rows in the accounts table, bypassing authentication.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Use a safe API that avoids using the interpreter entirely or provides a parameterized interface</li>
            <li>Use positive or "allowlist" server-side input validation</li>
            <li>For any residual dynamic queries, escape special characters using the specific escape syntax for that interpreter</li>
            <li>Use LIMIT and other SQL controls within queries to prevent mass disclosure of records in case of SQL injection</li>
            <li>Prefer using Object Relational Mapping (ORM) tools or prepared statements</li>
            <li>Implement proper output encoding and escaping to prevent XSS attacks</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To detect injection vulnerabilities:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Review source code for direct use of interpreters without proper sanitization</li>
            <li>Use automated tools like SAST, DAST, and SCA tools</li>
            <li>Perform penetration testing with tools like SQLmap, NoSQLmap, etc.</li>
            <li>Test all input vectors with special characters to trigger errors</li>
            <li>Review database stored procedures and functions for potential injection points</li>
          </ul>
        </div>
      </section>

      {/* A04:2021 - Insecure Design */}
      <section id="a04" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A04:2021 - Insecure Design</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Insecure design is a broad category representing different weaknesses, expressed as "missing or ineffective control design." Insecure design is not the source for all other Top 10 risk categories. There is a difference between insecure design and insecure implementation. We differentiate between design flaws and implementation defects for a reason, they have different root causes and remediation.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Missing or ineffective control design to prevent business logic attacks</li>
            <li>Lack of threat modeling during the design phase</li>
            <li>Insufficient security controls for the application's risk profile</li>
            <li>Missing rate limiting or anti-automation controls</li>
            <li>Inadequate segregation of tenants in multi-tenant architectures</li>
            <li>Missing or weak authentication for critical business functions</li>
            <li>Lack of integrity checks on critical business logic</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> A cinema chain allows group booking discounts and has a maximum of fifteen attendees before requiring a deposit. Attackers could threat model this flow and test if they could book six hundred seats and all cinemas at once in a few requests, causing a massive loss of income.
            </p>
            <p className="text-gray-300 mt-4 mb-2">
              <span className="font-semibold">Scenario 2:</span> A retail chain's e-commerce website does not have protection against bots run by scalpers buying high-end video cards to resell auction websites. This creates terrible publicity for the video card makers and retail chain owners and enduring bad blood with enthusiasts who cannot obtain these cards at any price.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Establish and use a secure development lifecycle with AppSec professionals to help evaluate and design security and privacy-related controls</li>
            <li>Establish and use a library of secure design patterns or paved road ready to use components</li>
            <li>Use threat modeling for critical authentication, access control, business logic, and key flows</li>
            <li>Integrate security language and controls into user stories</li>
            <li>Integrate plausibility checks at each tier of your application (from frontend to backend)</li>
            <li>Write unit and integration tests to validate that all critical flows are resistant to the threat model</li>
            <li>Segregate tier layers on the system and network layers depending on the exposure and protection needs</li>
            <li>Segregate tenants robustly by design throughout all tiers</li>
            <li>Limit resource consumption by user or service</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify insecure design issues:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Review the application architecture and design documents for security considerations</li>
            <li>Perform threat modeling exercises to identify potential attack vectors</li>
            <li>Conduct security design reviews with security professionals</li>
            <li>Test business logic flows for abuse cases and edge conditions</li>
            <li>Verify that security controls are designed into the application, not bolted on</li>
            <li>Check for proper segregation and isolation mechanisms</li>
          </ul>
        </div>
      </section>

      {/* A05:2021 - Security Misconfiguration */}
      <section id="a05" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A05:2021 - Security Misconfiguration</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched and upgraded in a timely fashion.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Missing appropriate security hardening across any part of the application stack</li>
            <li>Improperly configured permissions on cloud services</li>
            <li>Unnecessary features enabled or installed (e.g., unnecessary ports, services, pages, accounts, or privileges)</li>
            <li>Default accounts and their passwords still enabled and unchanged</li>
            <li>Error handling reveals stack traces or other overly informative error messages to users</li>
            <li>Latest security features are disabled or not configured securely</li>
            <li>Security settings in application servers, frameworks, libraries, databases, etc., are not set to secure values</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> The application server comes with sample applications not removed from the production server. These sample applications have known security flaws attackers use to compromise the server. Suppose one of these applications is the admin console, and default accounts weren't changed. In that case, the attacker logs in with default passwords and takes over.
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Example of exposed debug information
app.get('/api/users', (req, res) => {
  try {
    // Database query
    const users = db.getAllUsers();
    res.json(users);
  } catch (error) {
    // Exposing sensitive error information
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      query: "SELECT * FROM users WHERE active = 1"
    });
  }
});`}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>A repeatable hardening process makes it fast and easy to deploy another environment that is appropriately locked down</li>
            <li>A minimal platform without any unnecessary features, components, documentation, and samples</li>
            <li>A task to review and update the configurations appropriate to all security notes, updates, and patches</li>
            <li>A segmented application architecture provides effective and secure separation between components or tenants</li>
            <li>Sending security directives to clients, e.g., Security Headers</li>
            <li>An automated process to verify the effectiveness of the configurations and settings in all environments</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify security misconfigurations:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Regularly scan and audit configurations across all environments</li>
            <li>Use automated tools to check for default credentials and configurations</li>
            <li>Review security headers and server responses for information disclosure</li>
            <li>Check for unnecessary services, features, and sample applications</li>
            <li>Verify that error messages don't reveal sensitive information</li>
            <li>Ensure all software components are up to date and properly configured</li>
          </ul>
        </div>
      </section>

      {/* A06:2021 - Vulnerable and Outdated Components */}
      <section id="a06" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A06:2021 - Vulnerable and Outdated Components</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>You do not know the versions of all components you use (both client-side and server-side)</li>
            <li>Software is vulnerable, unsupported, or out of date</li>
            <li>You do not scan for vulnerabilities regularly and subscribe to security bulletins related to the components you use</li>
            <li>You do not fix or upgrade the underlying platform, frameworks, and dependencies in a risk-based, timely fashion</li>
            <li>Software developers do not test the compatibility of updated, upgraded, or patched libraries</li>
            <li>You do not secure the components' configurations</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> Components typically run with the same privileges as the application itself, so flaws in any component can result in serious impact. Such flaws can be accidental (e.g., coding error) or intentional (e.g., a backdoor in a component). Some example exploitable component vulnerabilities discovered are:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-1">
              <li>CVE-2017-5638, a Struts 2 remote code execution vulnerability that enables execution of arbitrary code on the server</li>
              <li>While internet of things (IoT) are frequently difficult or impossible to patch, the importance of patching them can be great</li>
            </ul>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Example of vulnerable dependency usage
{
  "dependencies": {
    "lodash": "4.17.4",  // Vulnerable version
    "express": "4.16.0", // Outdated version
    "moment": "2.18.1"   // Has known vulnerabilities
  }
}`}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Remove unused dependencies, unnecessary features, components, files, and documentation</li>
            <li>Continuously inventory the versions of both client-side and server-side components and their dependencies using tools like versions, OWASP Dependency Check, retire.js, etc.</li>
            <li>Continuously monitor sources like Common Vulnerability and Exposures (CVE) and National Vulnerability Database (NVD) for vulnerabilities in the components</li>
            <li>Use software composition analysis tools to automate the process</li>
            <li>Subscribe to email alerts for security vulnerabilities related to components you use</li>
            <li>Only obtain components from official sources over secure links</li>
            <li>Prefer signed packages to reduce the chance of including a modified, malicious component</li>
            <li>Monitor for libraries and components that are unmaintained or do not create security patches for older versions</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify vulnerable and outdated components:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Use dependency scanning tools like npm audit, Snyk, or OWASP Dependency Check</li>
            <li>Regularly audit and inventory all components and their versions</li>
            <li>Monitor security advisories for components you use</li>
            <li>Implement automated vulnerability scanning in your CI/CD pipeline</li>
            <li>Check for components that are no longer maintained or supported</li>
            <li>Verify the integrity and authenticity of downloaded components</li>
          </ul>
        </div>
      </section>

      {/* A07:2021 - Identification and Authentication Failures */}
      <section id="a07" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A07:2021 - Identification and Authentication Failures</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. There may be authentication weaknesses if the application permits automated attacks such as credential stuffing, permits brute force or other automated attacks, permits default, weak, or well-known passwords, uses weak or ineffective credential recovery and forgot-password processes, uses plain text, encrypted, or weakly hashed passwords, has missing or ineffective multi-factor authentication, exposes session identifier in the URL, reuses session identifier after successful login, and does not properly invalidate session IDs.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Permits automated attacks such as credential stuffing, where the attacker has a list of valid usernames and passwords</li>
            <li>Permits brute force or other automated attacks</li>
            <li>Permits default, weak, or well-known passwords, such as "Password1" or "admin/admin"</li>
            <li>Uses weak or ineffective credential recovery and forgot-password processes</li>
            <li>Uses plain text, encrypted, or weakly hashed passwords data stores</li>
            <li>Has missing or ineffective multi-factor authentication</li>
            <li>Exposes session identifier in the URL</li>
            <li>Reuses session identifier after successful login</li>
            <li>Does not properly invalidate session IDs during logout or a period of inactivity</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1: Credential Stuffing</span>
            </p>
            <p className="text-gray-300 mb-2">
              The use of known passwords could allow credential stuffing, a common attack. Suppose an application does not implement automated threat or credential stuffing protection. In that case, the application can be used as a password oracle to determine if the credentials are valid.
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Vulnerable login endpoint without rate limiting
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // No rate limiting or account lockout
  const user = await User.findOne({ username });
  if (user && user.password === password) { // Plain text comparison
    req.session.userId = user.id;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});`}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Where possible, implement multi-factor authentication to prevent automated credential stuffing, brute force, and stolen credential reuse attacks</li>
            <li>Do not ship or deploy with any default credentials, particularly for admin users</li>
            <li>Implement weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list</li>
            <li>Align password length, complexity, and rotation policies with National Institute of Standards and Technology (NIST) 800-63b's guidelines in section 5.1.1 for Memorized Secrets or other modern, evidence-based password policies</li>
            <li>Ensure registration, credential recovery, and API pathways are hardened against account enumeration attacks by using the same messages for all outcomes</li>
            <li>Limit or increasingly delay failed login attempts, but be careful not to create a denial of service scenario</li>
            <li>Log all failures and alert administrators when credential stuffing, brute force, or other attacks are detected</li>
            <li>Use a server-side, secure, built-in session manager that generates a new random session ID with high entropy after login</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify authentication and identification failures:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Test for default credentials and weak passwords</li>
            <li>Verify that multi-factor authentication is properly implemented</li>
            <li>Check for proper session management and invalidation</li>
            <li>Test for account enumeration vulnerabilities</li>
            <li>Verify that password recovery mechanisms are secure</li>
            <li>Check for proper rate limiting and account lockout mechanisms</li>
            <li>Test for session fixation and session hijacking vulnerabilities</li>
          </ul>
        </div>
      </section>

      {/* A08:2021 - Software and Data Integrity Failures */}
      <section id="a08" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A08:2021 - Software and Data Integrity Failures</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. An example of this is where an application relies upon plugins, libraries, or modules from untrusted sources, repositories, and content delivery networks (CDNs). An insecure CI/CD pipeline can introduce the potential for unauthorized access, malicious code, or system compromise. Many applications now include auto-update functionality, where updates are downloaded without sufficient integrity verification and applied to the previously trusted application.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Use of unsigned or unverified software or data</li>
            <li>Insecure deserialization where untrusted data is deserialized without proper validation</li>
            <li>Applications that rely upon plugins, libraries, or modules from untrusted sources</li>
            <li>Insecure CI/CD pipelines that can introduce unauthorized access or malicious code</li>
            <li>Auto-update functionality that downloads updates without sufficient integrity verification</li>
            <li>Objects or data are encoded or serialized into a structure that an attacker can see and modify</li>
            <li>Critical data changes without integrity checks</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1: Insecure Deserialization</span>
            </p>
            <p className="text-gray-300 mb-2">
              A React application calls a set of Spring Boot microservices. Being functional programmers, they tried to ensure that their code is immutable. The solution they came up with is serializing the user state and passing it back and forth with each request. An attacker notices the "rO0" Java object signature and uses the Java Serial Killer tool to gain remote code execution on the application server.
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Vulnerable deserialization
app.post('/api/user/update', (req, res) => {
  // Dangerous: deserializing untrusted data
  const userData = JSON.parse(req.body.serializedUser);
  
  // This could execute malicious code if the serialized data is crafted
  const user = deserialize(userData);
  user.save();
  
  res.json({ success: true });
});`}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Use digital signatures or similar mechanisms to verify the software or data is from the expected source and has not been altered</li>
            <li>Ensure libraries and dependencies, such as npm or Maven, are consuming trusted repositories</li>
            <li>Use a software supply chain security tool, such as OWASP Dependency Check or OWASP CycloneDX, to verify that components do not contain known vulnerabilities</li>
            <li>Ensure that there is a review process for code and configuration changes to minimize the chance that malicious code or configuration could be introduced into your software pipeline</li>
            <li>Ensure that your CI/CD pipeline has proper segregation, configuration, and access control to ensure the integrity of the code flowing through the build and deploy processes</li>
            <li>Ensure that unsigned or unencrypted serialized data is not sent to untrusted clients without some form of integrity check or digital signature to detect tampering or replay of the serialized data</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify software and data integrity failures:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Review the software supply chain for unsigned or unverified components</li>
            <li>Check for insecure deserialization patterns in the codebase</li>
            <li>Audit CI/CD pipelines for security controls and access restrictions</li>
            <li>Verify that auto-update mechanisms include integrity checks</li>
            <li>Test for tampering of serialized data and objects</li>
            <li>Review code signing and verification processes</li>
            <li>Check for proper validation of data integrity in critical operations</li>
          </ul>
        </div>
      </section>

      {/* A09:2021 - Security Logging and Monitoring Failures */}
      <section id="a09" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A09:2021 - Security Logging and Monitoring Failures</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            Security logging and monitoring failures are critical for detecting, escalating, and responding to active breaches. Without logging and monitoring, breaches cannot be detected. Insufficient logging, detection, monitoring, and active response occurs any time when logging and alerting events, such as logins, failed logins, and high-value transactions are not logged, warnings and errors generate no, inadequate, or unclear log messages, logs of applications and APIs are not monitored for suspicious activity, logs are only stored locally, appropriate alerting thresholds and response escalation processes are not in place or effective, and penetration testing and scans by dynamic application security testing (DAST) tools do not trigger alerts.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Auditable events, such as logins, failed logins, and high-value transactions, are not logged</li>
            <li>Warnings and errors generate no, inadequate, or unclear log messages</li>
            <li>Logs of applications and APIs are not monitored for suspicious activity</li>
            <li>Logs are only stored locally</li>
            <li>Appropriate alerting thresholds and response escalation processes are not in place or effective</li>
            <li>Penetration testing and scans by DAST tools do not trigger alerts</li>
            <li>The application cannot detect, escalate, or alert for active attacks in real-time or near real-time</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> A children's health plan provider's website operator couldn't detect a breach due to a lack of monitoring and logging. An external party informed the health plan provider that an attacker had accessed and modified thousands of sensitive health records of more than 3.5 million children. A post-incident review found that the website developers had not addressed significant vulnerabilities. As there was no logging or monitoring of the system, the data breach could have been in progress since 2013, a period of more than seven years.
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Poor logging example
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (authenticate(username, password)) {
    // No logging of successful login
    res.json({ success: true });
  } else {
    // Minimal logging, no details about failed attempt
    console.log('Login failed');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Better logging approach
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const clientIP = req.ip;
  const userAgent = req.get('User-Agent');
  
  if (authenticate(username, password)) {
    logger.info('Successful login', {
      username,
      clientIP,
      userAgent,
      timestamp: new Date().toISOString()
    });
    res.json({ success: true });
  } else {
    logger.warn('Failed login attempt', {
      username,
      clientIP,
      userAgent,
      timestamp: new Date().toISOString()
    });
    res.status(401).json({ error: 'Invalid credentials' });
  }
});`}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Ensure all login, access control, and server-side input validation failures can be logged with sufficient user context to identify suspicious or malicious accounts and held for enough time to allow delayed forensic analysis</li>
            <li>Ensure that logs are generated in a format that log management solutions can easily consume</li>
            <li>Ensure log data is encoded correctly to prevent injections or attacks on the logging or monitoring systems</li>
            <li>Ensure high-value transactions have an audit trail with integrity controls to prevent tampering or deletion</li>
            <li>DevSecOps teams should establish effective monitoring and alerting such that suspicious activities are detected and responded to quickly</li>
            <li>Establish or adopt an incident response and recovery plan, such as National Institute of Standards and Technology (NIST) 800-61r2 or later</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify logging and monitoring failures:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Review what events are being logged and ensure critical security events are captured</li>
            <li>Test that logs are being generated for authentication attempts, access control failures, and input validation errors</li>
            <li>Verify that logs contain sufficient detail for forensic analysis</li>
            <li>Check that monitoring and alerting systems are in place and functioning</li>
            <li>Test incident response procedures and escalation processes</li>
            <li>Verify that logs are stored securely and cannot be tampered with</li>
            <li>Ensure that log retention policies meet compliance and forensic requirements</li>
          </ul>
        </div>
      </section>

      {/* A10:2021 - Server-Side Request Forgery (SSRF) */}
      <section id="a10" className="mb-12 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A10:2021 - Server-Side Request Forgery (SSRF)</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
          <p className="text-gray-300">
            SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL). As modern web applications provide end-users with convenient features, fetching a URL becomes a common scenario. As a result, the incidence of SSRF is increasing.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Common Vulnerabilities</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>The application fetches remote resources without validating the user-supplied URL</li>
            <li>Lack of proper input validation and sanitization for URLs</li>
            <li>Applications that allow users to specify URLs for fetching external content</li>
            <li>Insufficient network segmentation allowing access to internal services</li>
            <li>Missing or inadequate allowlist/denylist for permitted destinations</li>
            <li>Applications that follow redirects without proper validation</li>
            <li>Lack of proper authentication and authorization for internal service access</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Example Attack Scenarios</h3>
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Scenario 1:</span> Port scan internal servers – If the network architecture is unsegmented, attackers can map out internal networks and determine if ports are open or closed on internal servers from connection results or elapsed time to connect or reject SSRF payload connections.
            </p>
            <pre className="bg-gray-900 p-2 rounded-lg overflow-x-auto text-xs text-gray-300 mt-2">
{`// Vulnerable SSRF endpoint
app.get('/fetch-url', async (req, res) => {
  const { url } = req.query;
  
  try {
    // No validation - attacker can access internal services
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

// Attack examples:
// /fetch-url?url=http://localhost:22 (SSH port scan)
// /fetch-url?url=http://169.254.169.254/latest/meta-data/ (AWS metadata)
// /fetch-url?url=file:///etc/passwd (local file access)`}
            </pre>
            <p className="text-gray-300 mt-2">
              <span className="font-semibold">Scenario 2:</span> Sensitive data exposure – Attackers can access local files or internal services such as http://localhost:6379/ or http://169.254.169.254/ (AWS metadata service) that may contain sensitive information.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Prevention Strategies</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Segment remote resource access functionality in separate networks to reduce the impact of SSRF</li>
            <li>Enforce "deny by default" firewall policies or network access control rules to block all but essential intranet traffic</li>
            <li>Sanitize and validate all client-supplied input data</li>
            <li>Enforce the URL schema, port, and destination with a positive allowlist</li>
            <li>Do not send raw responses to clients</li>
            <li>Disable HTTP redirections</li>
            <li>Be aware of the URL consistency to avoid attacks such as DNS rebinding and "time of check, time of use" (TOCTOU) race conditions</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Detection Methods</h3>
          <p className="text-gray-300 mb-3">
            To identify SSRF vulnerabilities:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Review all functionality that fetches remote resources and accepts user input</li>
            <li>Test with various URL schemes (http, https, file, ftp, etc.)</li>
            <li>Attempt to access internal services and localhost addresses</li>
            <li>Test for cloud metadata service access (AWS, Azure, GCP)</li>
            <li>Check for URL validation bypass techniques</li>
            <li>Monitor network traffic for unexpected internal requests</li>
            <li>Test for redirect following and DNS rebinding attacks</li>
          </ul>
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