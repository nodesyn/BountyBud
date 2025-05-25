# OWASP Top 10 In-depth Guide

## Overview
A comprehensive analysis of the OWASP Top 10 Web Application Security Risks, with detailed explanations, examples, detection methods, and prevention strategies.

The OWASP Top 10 is a standard awareness document representing a broad consensus about the most critical security risks to web applications. Organizations should adopt this document and start the process of ensuring that their web applications minimize these risks.

The OWASP Top 10 2021 is based on considerable data and contributions from security experts worldwide. It represents the most significant risks that web applications face today, providing guidance on how to identify, mitigate, and prevent them.

## A01:2021 - Broken Access Control

### Description
Access control enforces policy such that users cannot act outside of their intended permissions. Failures in this area typically lead to unauthorized information disclosure, modification, or destruction of data, or performing unauthorized business functions.

### Common Vulnerabilities
- Bypassing access control checks by modifying the URL, internal application state, or HTML page
- Allowing primary key to be changed to another user's record, permitting viewing or editing of another account
- Elevation of privilege, acting as a user without being logged in, or acting as an admin when logged in as a user
- Metadata manipulation, such as replaying or tampering with a JWT token, or a cookie or hidden field to elevate privileges
- CORS misconfiguration allowing unauthorized API access
- Force browsing to authenticated pages as an unauthenticated user or to privileged pages as a standard user

### Example Attack Scenarios
**Scenario 1:** The application uses unverified data in an SQL call that accesses account information:

```javascript
// Vulnerable code
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  // No verification that the logged-in user has permission to access this user
  db.query('SELECT * FROM users WHERE id = ' + userId, (err, results) => {
    res.json(results[0]);
  });
});
```

An attacker simply modifies the 'id' parameter value in the browser to any user ID. This flaw allows the attacker to access any user's account.

### Prevention Strategies
- Implement proper access control mechanisms that are enforced server-side
- Deny all access by default, requiring explicit grants for specific roles
- Implement access control mechanisms once and re-use them throughout the application
- Enforce record ownership; users should only be able to view/modify their data
- Disable directory listing and implement proper error handling to avoid information leakage
- Log access control failures and alert administrators for repeated failures
- Rate limit API and controller access to minimize harm from automated tools
- Invalidate JWT tokens on the server after logout

### Detection Methods
Manual testing is crucial for verifying access control functionality:
- Test for vertical access control issues (privilege escalation)
- Test for horizontal access control issues (accessing other users' data)
- Test if unauthorized functions can be accessed when not logged in
- Verify that API endpoints enforce the same access controls as the UI
- Check if metadata (e.g., JWT tokens) can be manipulated to bypass controls

## A02:2021 - Cryptographic Failures

### Description
Cryptographic failures refer to vulnerabilities that occur when sensitive data is not properly protected. This includes failures related to cryptography (or its absence), which often leads to exposure of sensitive data.

### Common Vulnerabilities
- Transmitting sensitive data in clear text (e.g., HTTP instead of HTTPS)
- Using deprecated or weak cryptographic algorithms or protocols
- Using default, weak, or hard-coded cryptographic keys
- Lack of proper key management (creation, storage, rotation)
- Not enforcing encryption through security directives/headers
- Insufficient randomness in cryptographic functions
- Using deprecated hash functions (MD5, SHA1) or improper password hashing

### Example Attack Scenarios
**Scenario 1:** An application encrypts credit card numbers in a database using automatic database encryption. However, this data is decrypted automatically when retrieved, allowing an SQL injection flaw to retrieve credit card numbers in clear text.

**Scenario 2:** A website doesn't use or enforce TLS for all pages or supports weak encryption. An attacker monitors network traffic, downgrades connections from HTTPS to HTTP, intercepts requests, and steals the user's session cookie. The attacker then replays this cookie and hijacks the user's authenticated session.

### Prevention Strategies
- Classify data processed, stored, or transmitted by an application and identify which data is sensitive according to privacy laws or regulations
- Don't store sensitive data unnecessarily; discard it as soon as possible
- Ensure up-to-date and strong standard algorithms, protocols, and keys are in place
- Encrypt all sensitive data at rest and in transit with secure protocols such as TLS with forward secrecy (FS) ciphers, cipher prioritization by the server, and secure parameters
- Store passwords using strong adaptive and salted hashing functions with a work factor (delay factor), such as Argon2, scrypt, bcrypt, or PBKDF2
- Use proper key management, such as never hardcoding keys and verifying the effectiveness of implementation
- Disable caching for responses that contain sensitive data

### Detection Methods
To identify cryptographic failures:
- Inventory all sensitive data the application processes
- Verify that sensitive data isn't transmitted in clear text (check network traffic)
- Verify the strength of used cryptographic algorithms and proper implementation
- Check for proper certificate validation and verification
- Ensure security headers that enforce encryption are in place
- Test for padding oracle vulnerabilities in CBC mode encryption

## A03:2021 - Injection

### Description
Injection flaws, such as SQL, NoSQL, OS command, LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

### Common Vulnerabilities
- User-supplied data is not validated, filtered, or sanitized by the application
- Dynamic queries or non-parameterized calls without context-aware escaping are used directly in the interpreter
- Hostile data is used within ORM search parameters to extract additional, sensitive records
- Hostile data is directly used or concatenated in SQL or command queries
- Lack of proper input validation allowing for multiple types of injection (SQL, NoSQL, command, LDAP)

### Example Attack Scenarios
**Scenario 1: SQL Injection**

```javascript
// Vulnerable code
const query = "SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'";
```

An attacker might provide the following input for the username field:
```
' OR '1'='1
```

This changes the query to SELECT * FROM accounts WHERE username = '' OR '1'='1' AND password = '...', which returns all rows in the accounts table, bypassing authentication.

### Prevention Strategies
- Use a safe API that avoids using the interpreter entirely or provides a parameterized interface
- Use positive or "allowlist" server-side input validation
- For any residual dynamic queries, escape special characters using the specific escape syntax for that interpreter
- Use LIMIT and other SQL controls within queries to prevent mass disclosure of records in case of SQL injection
- Prefer using Object Relational Mapping (ORM) tools or prepared statements
- Implement proper output encoding and escaping to prevent XSS attacks

### Detection Methods
To detect injection vulnerabilities:
- Review source code for direct use of interpreters without proper sanitization
- Use automated tools like SAST, DAST, and SCA tools
- Perform penetration testing with tools like SQLmap, NoSQLmap, etc.
- Test all input vectors with special characters to trigger errors
- Review database stored procedures and functions for potential injection points

## A04:2021 - Insecure Design

### Description
Insecure design is a broad category representing different weaknesses, expressed as "missing or ineffective control design." Insecure design is not the source for all other Top 10 risk categories. There is a difference between insecure design and insecure implementation.

### Common Vulnerabilities
- Missing or inadequate threat modeling during the design phase
- Lack of security controls to defend against specific attacks
- Business logic flaws that allow unauthorized actions
- Insufficient rate limiting allowing for abuse
- Missing authentication for critical functions
- Inadequate segregation of tenants in multi-tenant architectures

### Example Attack Scenarios
**Scenario 1:** A cinema chain allows group booking discounts and has a maximum of fifteen attendees before requiring a deposit. Attackers could threat model this flow and test if they could book six hundred seats and all cinemas at once in a few requests, causing a massive loss of income.

**Scenario 2:** A retail chain's e-commerce website does not have protection against bots run by scalpers buying high-end video cards to resell auction websites. This creates terrible publicity for the video card makers and retail chain owners and enduring bad blood with enthusiasts who cannot obtain these cards at any price.

### Prevention Strategies
- Establish and use a secure development lifecycle with AppSec professionals to help evaluate and design security and privacy-related controls
- Establish and use a library of secure design patterns or paved road ready to use components
- Use threat modeling for critical authentication, access control, business logic, and key flows
- Integrate security language and controls into user stories
- Integrate plausibility checks at each tier of your application (from frontend to backend)
- Write unit and integration tests to validate that all critical flows are resistant to the threat model
- Segregate tier layers on the system and network layers depending on the exposure and protection needs

### Detection Methods
To identify insecure design issues:
- Review the application architecture and design documents
- Perform threat modeling exercises
- Test business logic flows for abuse cases
- Verify that security controls are designed into the application, not bolted on
- Check for proper rate limiting and abuse prevention mechanisms

## A05:2021 - Security Misconfiguration

### Description
Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information.

### Common Vulnerabilities
- Missing appropriate security hardening across any part of the application stack
- Improperly configured permissions on cloud services
- Unnecessary features are enabled or installed (e.g., unnecessary ports, services, pages, accounts, or privileges)
- Default accounts and their passwords are still enabled and unchanged
- Error handling reveals stack traces or other overly informative error messages to users
- Latest security features are disabled or not configured securely
- Security settings in application servers, frameworks, libraries, databases, etc., are not set to secure values

### Example Attack Scenarios
**Scenario 1:** The application server comes with sample applications not removed from the production server. These sample applications have known security flaws attackers use to compromise the server. Suppose one of these applications is the admin console, and default accounts weren't changed. In that case, the attacker logs in with default passwords and takes over.

**Scenario 2:** Directory listing is not disabled on the server. An attacker discovers they can simply list directories. The attacker finds and downloads the compiled Java classes, which they decompile and reverse engineer to view the code. The attacker then finds a serious access control flaw in the application.

### Prevention Strategies
- A repeatable hardening process makes it fast and easy to deploy another environment that is appropriately locked down
- A minimal platform without any unnecessary features, components, documentation, and samples
- A task to review and update the configurations appropriate to all security notes, updates, and patches as part of the patch management process
- A segmented application architecture provides effective and secure separation between components or tenants
- Sending security directives to clients, e.g., Security Headers
- An automated process to verify the effectiveness of the configurations and settings in all environments

### Detection Methods
To identify security misconfigurations:
- Perform regular security configuration reviews
- Use automated scanning tools to check for misconfigurations
- Review default configurations and ensure they are changed
- Check for unnecessary services, features, or accounts
- Verify that security headers are properly configured
- Test error handling to ensure sensitive information isn't leaked

## A06:2021 - Vulnerable and Outdated Components

### Description
Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.

### Common Vulnerabilities
- If you do not know the versions of all components you use (both client-side and server-side)
- If the software is vulnerable, unsupported, or out of date
- If you do not scan for vulnerabilities regularly and subscribe to security bulletins related to the components you use
- If you do not fix or upgrade the underlying platform, frameworks, and dependencies in a risk-based, timely fashion
- If software developers do not test the compatibility of updated, upgraded, or patched libraries
- If you do not secure the components' configurations

### Example Attack Scenarios
**Scenario 1:** Components typically run with the same privileges as the application itself, so flaws in any component can result in serious impact. Such flaws can be accidental (e.g., coding error) or intentional (e.g., a backdoor in a component). Some example exploitable component vulnerabilities discovered are:
- CVE-2017-5638, a Struts 2 remote code execution vulnerability that enables execution of arbitrary code on the server
- While internet of things (IoT) is frequently difficult or impossible to patch, the importance of patching them can be great

### Prevention Strategies
- Remove unused dependencies, unnecessary features, components, files, and documentation
- Continuously inventory the versions of both client-side and server-side components and their dependencies using tools like versions, OWASP Dependency Check, retire.js, etc.
- Continuously monitor sources like Common Vulnerability and Exposures (CVE) and National Vulnerability Database (NVD) for vulnerabilities in the components
- Use software composition analysis tools to automate the process
- Subscribe to email alerts for security vulnerabilities related to components you use
- Only obtain components from official sources over secure links
- Prefer signed packages to reduce the chance of including a modified, malicious component
- Monitor for libraries and components that are unmaintained or do not create security patches for older versions

### Detection Methods
To identify vulnerable components:
- Use dependency scanning tools like OWASP Dependency Check, Snyk, or WhiteSource
- Regularly audit your software bill of materials (SBOM)
- Monitor security advisories for components you use
- Use automated tools to check for known vulnerabilities in dependencies
- Implement continuous monitoring of component vulnerabilities

## A07:2021 - Identification and Authentication Failures

### Description
Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. There may be authentication weaknesses if the application permits automated attacks such as credential stuffing, permits brute force or other automated attacks, permits default, weak, or well-known passwords, uses weak or ineffective credential recovery and forgot-password processes, uses plain text, encrypted, or weakly hashed passwords, has missing or ineffective multi-factor authentication, exposes session identifier in the URL, reuses session identifier after successful login, and does not properly invalidate session IDs.

### Common Vulnerabilities
- Permits automated attacks such as credential stuffing, where the attacker has a list of valid usernames and passwords
- Permits brute force or other automated attacks
- Permits default, weak, or well-known passwords, such as "Password1" or "admin/admin"
- Uses weak or ineffective credential recovery and forgot-password processes, such as "knowledge-based answers," which cannot be made safe
- Uses plain text, encrypted, or weakly hashed passwords data stores
- Has missing or ineffective multi-factor authentication
- Exposes session identifier in the URL
- Reuses session identifier after successful login
- Does not properly invalidate session IDs during logout or a period of inactivity

### Example Attack Scenarios
**Scenario 1:** Credential stuffing, the use of lists of known passwords, is a common attack. Suppose an application does not implement automated threat or credential stuffing protection. In that case, the application can be used as a password oracle to determine if the credentials are valid.

**Scenario 2:** Most authentication attacks occur due to the continued use of passwords as a sole factor. Once considered best practices, password rotation and complexity requirements encourage users to use and reuse weak passwords. Organizations are recommended to stop these practices per NIST 800-63 and use multi-factor authentication.

### Prevention Strategies
- Where possible, implement multi-factor authentication to prevent automated credential stuffing, brute force, and stolen credential reuse attacks
- Do not ship or deploy with any default credentials, particularly for admin users
- Implement weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list
- Align password length, complexity, and rotation policies with National Institute of Standards and Technology (NIST) 800-63b's guidelines in section 5.1.1 for Memorized Secrets or other modern, evidence-based password policies
- Ensure registration, credential recovery, and API pathways are hardened against account enumeration attacks by using the same messages for all outcomes
- Limit or increasingly delay failed login attempts, but be careful not to create a denial of service scenario
- Log all failures and alert administrators when credential stuffing, brute force, or other attacks are detected
- Use a server-side, secure, built-in session manager that generates a new random session ID with high entropy after login

### Detection Methods
To identify authentication failures:
- Test for weak password policies and common passwords
- Verify that multi-factor authentication is properly implemented
- Check for proper session management and invalidation
- Test for account enumeration vulnerabilities
- Verify that credential recovery processes are secure
- Test for brute force protection mechanisms

## A08:2021 - Software and Data Integrity Failures

### Description
Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. An example of this is where an application relies upon plugins, libraries, or modules from untrusted sources, repositories, and content delivery networks (CDNs). An insecure CI/CD pipeline can introduce the potential for unauthorized access, malicious code, or system compromise.

### Common Vulnerabilities
- Applications that rely upon plugins, libraries, or modules from untrusted sources, repositories, and CDNs
- An insecure CI/CD pipeline can introduce the potential for unauthorized access, malicious code, or system compromise
- Many applications now include auto-update functionality, where updates are downloaded without sufficient integrity verification and applied to the previously trusted application
- Attackers could potentially upload their own updates to be distributed and run on all installations
- Another example is where objects or data are encoded or serialized into a structure that an attacker can see and modify is vulnerable to insecure deserialization

### Example Attack Scenarios
**Scenario 1:** Update without signing: Many home routers, set-top boxes, device firmware, and others do not verify updates via signed firmware. Unsigned firmware is a growing target for attackers and is expected to only get worse. This is a major concern as many times there is no mechanism to remediate other than to fix in a future version and wait for previous vulnerable versions to age out.

**Scenario 2:** SolarWinds malicious update: Nation-states have been known to attack update mechanisms, with a recent notable attack being the SolarWinds Orion attack. The company that develops the software had secure build and update integrity processes. Still, these were able to be subverted, and for several months, the firm distributed a highly targeted malicious update to more than 18,000 organizations.

### Prevention Strategies
- Use digital signatures or similar mechanisms to verify the software or data is from the expected source and has not been altered
- Ensure libraries and dependencies, such as npm or Maven, are consuming trusted repositories
- Use a software supply chain security tool, such as OWASP Dependency Check or OWASP CycloneDX, to verify that components do not contain known vulnerabilities
- Ensure that there is a review process for code and configuration changes to minimize the chance that malicious code or configuration could be introduced into your software pipeline
- Ensure that your CI/CD pipeline has proper segregation, configuration, and access control to ensure the integrity of the code flowing through the build and deploy processes
- Ensure that unsigned or unencrypted serialized data is not sent to untrusted clients without some form of integrity check or digital signature to detect tampering or replay of the serialized data

### Detection Methods
To identify software and data integrity failures:
- Review the software supply chain and verify integrity checks
- Audit CI/CD pipeline security and access controls
- Check for proper digital signature verification
- Verify that dependencies come from trusted sources
- Test for insecure deserialization vulnerabilities
- Review update mechanisms for proper integrity verification

## A09:2021 - Security Logging and Monitoring Failures

### Description
Security logging and monitoring failures are critical for detecting, escalating, and responding to active breaches. Without logging and monitoring, breaches cannot be detected. Insufficient logging, detection, monitoring, and active response occurs any time when logging and alerting events, such as logins, failed logins, and high-value transactions are not logged, warnings and errors generate no, inadequate, or unclear log messages, logs of applications and APIs are not monitored for suspicious activity, logs are only stored locally, appropriate alerting thresholds and response escalation processes are not in place or effective, penetration testing and scans by dynamic application security testing (DAST) tools (such as OWASP ZAP) do not trigger alerts, and the application cannot detect, escalate, or alert for active attacks in real-time or near real-time.

### Common Vulnerabilities
- Auditable events, such as logins, failed logins, and high-value transactions, are not logged
- Warnings and errors generate no, inadequate, or unclear log messages
- Logs of applications and APIs are not monitored for suspicious activity
- Logs are only stored locally
- Appropriate alerting thresholds and response escalation processes are not in place or effective
- Penetration testing and scans by DAST tools do not trigger alerts
- The application cannot detect, escalate, or alert for active attacks in real-time or near real-time

### Example Attack Scenarios
**Scenario 1:** A children's health plan provider's website operator couldn't detect a breach due to a lack of monitoring and logging. An external party informed the health plan provider that an attacker had accessed and modified thousands of sensitive health records of more than 3.5 million children. A post-incident review found that the website developers had not addressed significant vulnerabilities. As there was no logging or monitoring of the system, the data breach could have been in progress since 2013, a period of more than seven years.

**Scenario 2:** A major Indian airline had a data breach involving more than ten years' worth of personal data of millions of passengers, including passport and credit card data. The data breach occurred at a third-party cloud hosting provider, who notified the airline of the breach after some time.

### Prevention Strategies
- Ensure all login, access control, and server-side input validation failures can be logged with sufficient user context to identify suspicious or malicious accounts and held for enough time to allow delayed forensic analysis
- Ensure that logs are generated in a format that log management solutions can easily consume
- Ensure log data is encoded correctly to prevent injections or attacks on the logging or monitoring systems
- Ensure high-value transactions have an audit trail with integrity controls to prevent tampering or deletion, such as append-only database tables or similar
- DevSecOps teams should establish effective monitoring and alerting such that suspicious activities are detected and responded to quickly
- Establish or adopt an incident response and recovery plan, such as National Institute of Standards and Technology (NIST) 800-61r2 or later

### Detection Methods
To identify logging and monitoring failures:
- Review logging configuration and ensure critical events are logged
- Test monitoring and alerting systems for effectiveness
- Verify that logs are properly protected and stored securely
- Check that log analysis and correlation tools are in place
- Test incident response procedures and escalation processes
- Verify that logs contain sufficient detail for forensic analysis

## A10:2021 - Server-Side Request Forgery (SSRF)

### Description
SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL).

### Common Vulnerabilities
- The application accepts user-supplied URLs without proper validation
- Insufficient input validation allows attackers to access internal services
- Lack of network segmentation allows access to sensitive internal resources
- Applications that import data from URLs or publish data to URLs
- Webhook functionality that doesn't properly validate URLs
- File upload functionality that processes URLs

### Example Attack Scenarios
**Scenario 1:** Port scan internal servers - If the network architecture is unsegmented, attackers can map out internal networks and determine if ports are open or closed on internal servers from connection results or elapsed time to connect or reject SSRF payload connections.

**Scenario 2:** Sensitive data exposure - Attackers can access local files such as or internal services to gain sensitive information such as file:///etc/passwd and http://localhost:28017/.

```javascript
// Vulnerable code
app.post('/fetch-url', (req, res) => {
  const url = req.body.url;
  // No validation of the URL
  fetch(url)
    .then(response => response.text())
    .then(data => res.send(data));
});
```

### Prevention Strategies
- Segment remote resource access functionality in separate networks to reduce the impact of SSRF
- Enforce "deny by default" firewall policies or network access control rules to block all but essential intranet traffic
- Sanitize and validate all client-supplied input data
- Enforce the URL schema, port, and destination with a positive allow list
- Do not send raw responses to clients
- Disable HTTP redirections
- Be aware of the URL consistency to avoid attacks such as DNS rebinding and "time of check, time of use" (TOCTOU) race conditions

### Detection Methods
To identify SSRF vulnerabilities:
- Review all functionality that accepts URLs as input
- Test with various URL schemes (file://, http://, ftp://, etc.)
- Try to access internal services and localhost
- Test for URL validation bypass techniques
- Check for DNS rebinding vulnerabilities
- Monitor network traffic for unexpected internal requests

## Additional Resources

### OWASP Resources
- [OWASP Top 10 Official Document](https://owasp.org/Top10/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)

### Tools and Frameworks
- **Static Analysis**: SonarQube, Checkmarx, Veracode
- **Dynamic Analysis**: OWASP ZAP, Burp Suite, Nessus
- **Dependency Scanning**: OWASP Dependency Check, Snyk, WhiteSource
- **Container Security**: Clair, Twistlock, Aqua Security

### Best Practices
- Implement security throughout the SDLC
- Use threat modeling for critical applications
- Perform regular security assessments
- Maintain an inventory of all components
- Establish incident response procedures
- Provide security training for development teams 