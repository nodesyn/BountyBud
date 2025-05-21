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

      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-primary">Contents</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li><a href="#introduction" className="text-primary hover:underline">Introduction to OWASP Top 10</a></li>
          <li><a href="#a01" className="text-primary hover:underline">A01:2021 - Broken Access Control</a></li>
          <li><a href="#a02" className="text-primary hover:underline">A02:2021 - Cryptographic Failures</a></li>
          <li><a href="#a03" className="text-primary hover:underline">A03:2021 - Injection</a></li>
          <li><a href="#a04" className="text-primary hover:underline">A04:2021 - Insecure Design</a></li>
          <li><a href="#a05" className="text-primary hover:underline">A05:2021 - Security Misconfiguration</a></li>
          <li><a href="#a06" className="text-primary hover:underline">A06:2021 - Vulnerable and Outdated Components</a></li>
          <li><a href="#a07" className="text-primary hover:underline">A07:2021 - Identification and Authentication Failures</a></li>
          <li><a href="#a08" className="text-primary hover:underline">A08:2021 - Software and Data Integrity Failures</a></li>
          <li><a href="#a09" className="text-primary hover:underline">A09:2021 - Security Logging and Monitoring Failures</a></li>
          <li><a href="#a10" className="text-primary hover:underline">A10:2021 - Server-Side Request Forgery</a></li>
        </ul>
      </div>

      {/* Introduction */}
      <section id="introduction" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction to OWASP Top 10</h2>
        <p className="mb-4 text-gray-300">
          The OWASP Top 10 is a standard awareness document representing a broad consensus about the most critical security risks to web applications. Organizations should adopt this document and start the process of ensuring that their web applications minimize these risks.
        </p>
        <p className="mb-4 text-gray-300">
          The OWASP Top 10 2021 is based on considerable data and contributions from security experts worldwide. It represents the most significant risks that web applications face today, providing guidance on how to identify, mitigate, and prevent them.
        </p>
      </section>

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

      {/* Additional entries would follow the same pattern */}
      {/* Continue with A04 through A10 */}

      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 