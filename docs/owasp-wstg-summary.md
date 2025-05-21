# OWASP Web Security Testing Guide (WSTG) Summary

## Overview
The OWASP Web Security Testing Guide (WSTG) is the premier cybersecurity testing resource for web application developers and security professionals. It provides a comprehensive framework of best practices used by penetration testers and organizations worldwide to test web applications for security vulnerabilities.

The WSTG is a collaborative effort, developed by the contributions of cybersecurity professionals from around the world. It covers the entire lifecycle of web application security testing, from initial reconnaissance to post-exploitation.

## Key Concepts and Methodology
The WSTG is structured around a comprehensive testing framework that includes the following key phases and areas:

1.  **Information Gathering (WSTG-INFO)**: Techniques to gather information about the target application, its infrastructure, and related systems. This includes understanding the application's footprint, identifying technologies used, and discovering potential entry points.
    *   Conduct Search Engine Discovery and Reconnaissance for Information Leakage (WSTG-INFO-001)
    *   Fingerprint Web Server (WSTG-INFO-002)
    *   Review Webserver Metafiles for Information Leakage (WSTG-INFO-003)
    *   Enumerate Applications on Webserver (WSTG-INFO-004)
    *   Review Webpage Comments and Metadata for Information Leakage (WSTG-INFO-005)
    *   Identify Application Entry Points (WSTG-INFO-006)
    *   Map Execution Paths Through Application (WSTG-INFO-007)
    *   Fingerprint Web Application Framework (WSTG-INFO-008)
    *   Fingerprint Web Application (WSTG-INFO-009)
    *   Map Application Architecture (WSTG-INFO-010)

2.  **Configuration and Deployment Management Testing (WSTG-CONF)**: Focuses on identifying misconfigurations in the web server, application server, and deployment processes.
    *   Test Network/Infrastructure Configuration (WSTG-CONF-001)
    *   Test Application Platform Configuration (WSTG-CONF-002)
    *   Test File Extensions Handling for Sensitive Information (WSTG-CONF-003)
    *   Review Old, Backup and Unreferenced Files for Sensitive Information (WSTG-CONF-004)
    *   Test HTTP Methods (WSTG-CONF-006)
    *   Test HTTP Strict Transport Security (WSTG-CONF-007)
    *   Test RIA Cross Domain Policy (WSTG-CONF-008)
    *   Test File Permission (WSTG-CONF-009)
    *   Test for Subdomain Takeover (WSTG-CONF-010)
    *   Test Cloud Storage (WSTG-CONF-011)

3.  **Identity Management Testing (WSTG-IDNT)**: Testing how the application manages user identities, including registration, authentication, and account management.
    *   Test Role Definitions (WSTG-IDNT-001)
    *   Test User Registration Process (WSTG-IDNT-002)
    *   Test Account Provisioning Process (WSTG-IDNT-003)
    *   Testing for Weak Lock Out Mechanism (WSTG-IDNT-004)
    *   Test AuthenticationSChemas (WSTG-IDNT-005)
    *   Testing for Weak password policy (WSTG-IDNT-006)
    *   Test for Brute Force (WSTG-IDNT-004) - *Note: This seems to be a duplicate or closely related to weak lockout.*
    *   Test for Credential Stuffing (WSTG-IDNT-00X) - *Specific ID may vary*
    *   Test for Forgotten Password (WSTG-IDNT-005) - *Seems to be a duplicate or closely related to authentication schemas.*

4.  **Authentication Testing (WSTG-ATHN)**: Deep dive into authentication mechanisms, looking for vulnerabilities like weak credentials, insecure password recovery, and session fixation.
    *   Testing for Default Credentials (WSTG-ATHN-001)
    *   Testing for Weak Lock Out Mechanism (WSTG-ATHN-002)
    *   Testing for Bypassing Authentication Schema (WSTG-ATHN-003)
    *   Testing for Vulnerable Remember Password (WSTG-ATHN-004)
    *   Testing for Browser Cache Weaknesses (WSTG-ATHN-005)
    *   Testing for Weak Password Policy (WSTG-ATHN-006)
    *   Testing for  Weak Security Question/Answer (WSTG-ATHN-007)
    *   Testing for Weak Password Change or Reset Functionalities (WSTG-ATHN-008)
    *   Testing for Weaker Authentication in Alternative Channel (WSTG-ATHN-009)

5.  **Authorization Testing (WSTG-AUTHZ)**: Verifying that the application correctly enforces access controls and prevents users from accessing unauthorized functionality or data.
    *   Testing Directory Traversal/Path Traversal (WSTG-AUTHZ-001)
    *   Testing for Bypassing Authorization Schema (WSTG-AUTHZ-002)
    *   Testing for Privilege Escalation (WSTG-AUTHZ-003)
    *   Testing for Insecure Direct Object References (IDOR) (WSTG-AUTHZ-004)

6.  **Session Management Testing (WSTG-SESS)**: Examining how the application manages user sessions, looking for flaws like weak session tokens, session hijacking, and CSRF.
    *   Testing for Bypassing Session Management Schema (WSTG-SESS-001)
    *   Testing for Cookies Attributes (WSTG-SESS-002)
    *   Testing for Session Fixation (WSTG-SESS-003)
    *   Testing for Exposed Session Variables (WSTG-SESS-004)
    *   Testing for Cross Site Request Forgery (CSRF) (WSTG-SESS-005)
    *   Testing for Logout Functionality (WSTG-SESS-006)
    *   Test Session Timeout (WSTG-SESS-007)
    *   Testing for Session Puzzling (WSTG-SESS-008) - *More advanced topic*

7.  **Input Validation Testing (WSTG-INPV)**: Assessing how the application handles user-supplied input to prevent common vulnerabilities like XSS, SQL Injection, and Command Injection.
    *   Testing for Reflected Cross Site Scripting (WSTG-INPV-001)
    *   Testing for Stored Cross Site Scripting (WSTG-INPV-002)
    *   Testing for DOM Based Cross Site Scripting (WSTG-INPV-003)
    *   Testing for Cross Site Flashing (WSTG-INPV-004)
    *   Testing for SQL Injection (WSTG-INPV-005)
    *   Testing for LDAP Injection (WSTG-INPV-006)
    *   Testing for ORM Injection (WSTG-INPV-007)
    *   Testing for XML Injection (WSTG-INPV-008)
    *   Testing for SSI Injection (WSTG-INPV-009)
    *   Testing for XPath Injection (WSTG-INPV-010)
    *   Testing for IMAP/SMTP Injection (WSTG-INPV-011)
    *   Testing for Code Injection (WSTG-INPV-012)
    *   Testing for OS Command Injection (WSTG-INPV-013)
    *   Testing for Buffer overflow (WSTG-INPV-014)
    *   Testing for Heap overflow (WSTG-INPV-015)
    *   Testing for Format string (WSTG-INPV-016)
    *   Testing for HTTP Splitting/Smuggling (WSTG-INPV-017)
    *   Testing for HTTP Verb Tampering (WSTG-INPV-018)
    *   Testing for Server-Side Request Forgery (SSRF) (WSTG-INPV-019)

8.  **Error Handling (WSTG-ERRH)**: Analyzing how the application handles errors to prevent information leakage.
    *   Analysis of Error Codes (WSTG-ERRH-001)
    *   Analysis of Stack Traces (WSTG-ERRH-002)

9.  **Cryptography (WSTG-CRYP)**: Testing for weak or improperly implemented cryptography.
    *   Testing for Weak Transport Layer Security (WSTG-CRYP-001)
    *   Testing for Padding Oracle (WSTG-CRYP-002)
    *   Testing for Sensitive Information Sent via Unencrypted Channels (WSTG-CRYP-003)
    *   Testing for Weak Encryption (WSTG-CRYP-004)

10. **Business Logic Testing (WSTG-BUSL)**: Identifying flaws in the application's business logic that could be exploited.
    *   Test Business Logic Data Validation (WSTG-BUSL-001)
    *   Test Ability to Forge Requests (WSTG-BUSL-002)
    *   Test Integrity Checks (WSTG-BUSL-003)
    *   Test for Process Timing (WSTG-BUSL-004)
    *   Test Number of Times Function Can Be Used Limits (WSTG-BUSL-005)
    *   Testing for the Circumvention of Workflows (WSTG-BUSL-006)
    *   Test Defenses Against Application Mis-use (WSTG-BUSL-007)
    *   Test Upload of Unexpected File Types (WSTG-BUSL-008)
    *   Test Upload of Malicious Files (WSTG-BUSL-009)

11. **Client Side Testing (WSTG-CLNT)**: Examining client-side code for vulnerabilities like DOM-based XSS, HTML injection, and insecure handling of sensitive data.
    *   Testing for DOM based Cross Site Scripting (WSTG-CLNT-001)
    *   Testing for JavaScript Execution (WSTG-CLNT-002)
    *   Testing for HTML Injection (WSTG-CLNT-003)
    *   Testing for Client Side URL Redirect (WSTG-CLNT-004)
    *   Testing for CSS Injection (WSTG-CLNT-005)
    *   Testing for Client Side Resource Manipulation (WSTG-CLNT-006)
    *   Testing for Cross Origin Resource Sharing (CORS) (WSTG-CLNT-007)
    *   Testing for Cross Site Flashing (WSTG-CLNT-008)
    *   Testing for Clickjacking (WSTG-CLNT-009)
    *   Testing for WebSockets (WSTG-CLNT-010)
    *   Testing for Web Messaging (WSTG-CLNT-011)
    *   Testing for Local Storage (WSTG-CLNT-012)

12. **API Testing (WSTG-APIT)**: Specific tests for APIs, often overlapping with other categories but focusing on API-specific attack vectors.
    *   Testing for Mass Assignment (WSTG-APIT-001)
    *   Testing for Excessive Data Exposure (WSTG-APIT-00X) - *Specific ID may vary*
    *   Testing for Security Misconfiguration in API (WSTG-APIT-00X)
    *   Testing for Injection in API (WSTG-APIT-00X)


## How to Use WSTG
The WSTG is intended to be a living document and a practical guide. Testers can use it to:
-   Develop a testing methodology for specific engagements.
-   Ensure comprehensive coverage of potential web application vulnerabilities.
-   As a reference for specific testing techniques.
-   To understand the "why" behind certain vulnerabilities.

## Official Resource
For the most up-to-date and complete version of the Web Security Testing Guide, please visit the official OWASP WSTG Project page:
[OWASP Web Security Testing Guide (WSTG)](https://owasp.org/www-project-web-security-testing-guide/)

This summary provides a high-level overview. It is highly recommended to consult the full WSTG for detailed explanations, testing procedures, and remediation advice. 