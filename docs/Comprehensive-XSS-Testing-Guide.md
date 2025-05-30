# Comprehensive Guide to Finding and Testing Cross-Site Scripting (XSS) Vulnerabilities

As a bug bounty hunter or penetration tester, identifying Cross-Site Scripting (XSS) vulnerabilities is a critical skill. XSS is a prevalent web application vulnerability that allows attackers to inject malicious scripts into web pages, compromising user interactions. This guide provides an in-depth look at where to find XSS vulnerabilities, how to identify them, and detailed procedural steps for testing various aspects of XSS.

## 1. Introduction to XSS

### What is XSS?
Cross-Site Scripting (XSS) is a security flaw where attackers inject client-side scripts, typically JavaScript, into web pages viewed by other users. These scripts execute in the victim's browser, potentially stealing sensitive data, hijacking sessions, or altering page content. XSS is listed in the [OWASP Top 10](https://owasp.org/www-project-top-ten/) and affects approximately one in three websites.

### Why is XSS Important?
- **Prevalence:** XSS is one of the most common vulnerabilities, with significant real-world impacts, such as the 2018 British Airways breach affecting 380,000 customers ([Invicti](https://www.invicti.com/learn/cross-site-scripting-xss/)).
- **Impact:** It can lead to session hijacking, data theft, website defacement, or malware distribution.
- **Ease of Exploitation:** XSS is relatively easy to exploit, making it a favorite for attackers.

## 2. Types of XSS

Understanding the types of XSS is essential for effective testing:

| **Type**              | **Description**                                                                 | **Key Characteristics**                              |
|-----------------------|--------------------------------------------------------------------------------|-----------------------------------------------------|
| **Reflected XSS**     | Malicious script in a URL or form input is reflected in the server’s response.  | Non-persistent; requires user interaction (e.g., clicking a link). |
| **Stored XSS**        | Malicious script is stored on the server (e.g., in a database) and served to users. | Persistent; affects multiple users over time.        |
| **DOM-based XSS**     | Vulnerability in client-side JavaScript manipulates the DOM with unsanitized input. | Client-side; does not involve the server.            |
| **Blind XSS**         | Stored XSS where the payload is reflected via backend systems (e.g., admin panels). | Persistent; harder to detect as it targets specific users. |
| **Mutated XSS**       | Modified scripts bypass filters or detection mechanisms.                        | Advanced; requires creative payload crafting.        |
| **Self-XSS**          | User is tricked into executing the script themselves (e.g., via browser console). | Relies on social engineering; less common.           |

### Examples
- **Reflected XSS:** A URL like `http://example.com/search?q=<script>alert('XSS')</script>` triggers a script when clicked.
- **Stored XSS:** A comment like `<script>alert('XSS')</script>` on a forum executes for all viewers.
- **DOM-based XSS:** A single-page app uses a URL parameter like `#name=<script>alert('XSS')</script>` to update the DOM unsafely.

## 3. Where to Look for XSS Vulnerabilities

XSS occurs where user input is improperly handled. Focus on these areas:

### 3.1 Input Sources
- **URL Parameters:** Search queries, filters, or IDs (e.g., `?id=123`).
- **Form Fields:** Comments, user profiles, feedback forms, or message boards.
- **Cookies:** Input stored in cookies and reflected in pages.
- **HTTP Headers:** Rarely, headers like `User-Agent` may be reflected.

### 3.2 Output Locations
- **HTML Content:** User input directly inserted into the page body.
- **JavaScript Code:** Input used in scripts (e.g., `var x = "${userInput}";`).
- **HTML Attributes:** Input in attributes like `href`, `src`, or `onmouseover`.
- **CSS Properties:** Input in styles (e.g., `style="color: ${userInput};"`).

### 3.3 High-Risk Areas
- **Search Functionality:** Often reflects user input in results.
- **User-Generated Content:** Forums, blogs, or social media platforms.
- **Dynamic Pages:** Single-page applications using JavaScript frameworks.
- **Error Messages:** Input reflected in error pages or alerts.

## 4. How to Find XSS Vulnerabilities

### 4.1 General Approach
1. **Map the Application:** Use a web proxy like [Burp Suite](https://portswigger.net/burp) to identify all input points.
2. **Inject Test Payloads:** Use scripts to check if they execute.
3. **Analyze Responses:** Look for script execution or improper sanitization.
4. **Bypass Filters:** Test encoded or obfuscated payloads to evade defenses.

### 4.2 Common Payloads
| **Payload Type**      | **Example**                                      | **Use Case**                              |
|-----------------------|--------------------------------------------------|-------------------------------------------|
| **Basic Script**      | `<script>alert('XSS')</script>`                  | Tests direct script execution.            |
| **Attribute-based**   | `<img src=x onerror=alert('XSS')>`              | Tests event handlers in attributes.       |
| **Encoded**           | `%3Cscript%3Ealert('XSS')%3C/script%3E`         | Bypasses basic input filters.             |
| **Event-based**       | `<a href="#" onmouseover="alert('XSS')">Hover</a>` | Tests mouse or keyboard events.          |
| **Base64**            | `<script>eval(atob('YWxlcnQoIlhTUyIp'))</script>` | Evades simple string-based filters.       |

### 4.3 Testing Contexts
- **HTML Context:** Test where input is rendered as HTML (e.g., `<div>${input}</div>`).
- **Attribute Context:** Test attributes like `href` or `src`.
- **JavaScript Context:** Test where input is used in scripts (e.g., `eval(input)`).
- **CSS Context:** Test CSS properties or inline styles.

## 5. Detailed Procedural Steps for Testing XSS

### 5.1 Testing Reflected XSS
1. **Identify Parameters:** Use Burp Suite to find URL parameters (e.g., `?q=`).
2. **Inject Payloads:** Try `<script>alert('XSS')</script>` or `<img src=x onerror=alert('XSS')>`.
3. **Check Response:** Look for the payload in the HTML response and verify execution.
4. **Test Encodings:** Use URL-encoded (`%3Cscript%3E`) or HTML-encoded (`&lt;script&gt;`) payloads.
5. **Example:** If `http://example.com/search?q=test` reflects `test`, try `http://example.com/search?q=<script>alert('XSS')</script>`.

### 5.2 Testing Stored XSS
1. **Locate Input Fields:** Find forms for comments, profiles, or messages.
2. **Submit Payloads:** Enter `<script>alert('XSS')</script>` or similar.
3. **Verify Persistence:** Check if the payload appears on the page for other users or after a refresh.
4. **Test Scope:** Log in as another user to confirm the payload executes.
5. **Example:** Post `<script>alert('XSS')</script>` in a forum comment and check if it triggers for others.

### 5.3 Testing DOM-based XSS
1. **Inspect JavaScript:** Use browser developer tools to find DOM manipulation (e.g., `document.write(input)`).
2. **Identify Inputs:** Look for URL parameters or form inputs used by JavaScript.
3. **Inject Payloads:** Modify inputs like `#name=<script>alert('XSS')</script>`.
4. **Verify Execution:** Check the DOM or console for script execution.
5. **Example:** If a page uses `location.hash` to update content, test with `#<script>alert('XSS')</script>`.

### 5.4 Bypassing Filters
- **Obfuscation:** Use payloads like `<scr<script>ipt>alert('XSS')</scr<script>ipt>` to bypass `<script>` filters.
- **Alternative Tags:** Try `<img src="javascript:alert('XSS')">` or `<svg onload=alert('XSS')>`.
- **Encoding:** Use Unicode (`\u003Cscript\u003E`) or Base64 encoding.
- **Example:** If `<script>` is filtered, try `<img src=x onerror=alert('XSS')>`.

### 5.5 Testing with Content Security Policy (CSP)
1. **Check CSP Headers:** Inspect HTTP responses for CSP directives.
2. **Test Bypasses:** Try payloads like `<img src="data:image/svg+xml,%3Csvg onload=alert('XSS')%3E">`.
3. **Verify Restrictions:** Ensure CSP blocks unauthorized scripts.
4. **Example:** If CSP allows `unsafe-inline`, test inline scripts; if strict, test for misconfigurations.

## 6. Tools for XSS Testing
- **Burp Suite:** Intercepts requests and scans for vulnerabilities ([PortSwigger](https://portswigger.net/burp)).
- **Acunetix/Invicti:** Automated scanners for XSS detection ([Acunetix](https://www.acunetix.com/), [Invicti](https://www.invicti.com/)).
- **ZAP:** Open-source proxy for manual and automated testing.
- **XSS Hunter:** Useful for detecting Blind XSS.

## 7. Prevention Methods
While testing is the focus, understanding prevention aids in responsible disclosure:
- **Input Validation:** Ensure inputs match expected formats.
- **Output Encoding:** Escape characters like `<` to `&lt;` based on context ([OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)).
- **CSP:** Restrict script sources with nonces or hashes ([MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)).
- **Sanitization Libraries:** Use [DOMPurify](https://github.com/cure53/DOMPurify) for HTML sanitization.
- **Regular Audits:** Conduct penetration testing and code reviews.

## 8. Real-World Examples
- **2005 MySpace Samy Worm:** A stored XSS in profile comments infected over a million users ([Samy](https://samy.pl/myspace/)).
- **2018 British Airways Breach:** An XSS attack stole payment data from 380,000 customers ([Invicti](https://www.invicti.com/podcasts/appsec-serialized-1x1-hot-cross-site-fun/)).
- **2011 Facebook Mobile API Worm:** Exploited XSS to spread malicious code.

## 9. Conclusion
XSS remains a critical vulnerability due to its prevalence and impact. By systematically testing input points, using creative payloads, and leveraging tools, pentesters can uncover XSS flaws. Ethical testing within bug bounty scopes and responsible disclosure are essential to improve web security.