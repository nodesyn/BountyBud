# Nikto Web Server Scanner Guide

## Overview
Nikto is an Open Source (GPL) web server scanner which performs comprehensive tests against web servers for multiple items, including over 6700 potentially dangerous files/CGIs, checks for outdated versions of over 1250 servers, and version specific problems on over 270 servers. It also checks for server configuration items such as the presence of multiple index files, HTTP server options, and will attempt to identify installed web servers and software.

## Key Features
- Identifies dangerous files and CGIs.
- Checks for outdated server software.
- Detects version-specific problems.
- Examines server configuration items (index files, HTTP options).
- Attempts to identify installed web servers and software.
- SSL Support (with OpenSSL).
- Full HTTP proxy support.
- Checks for guessing portion of authorization realm.
- And many more...

## Common Commands
*(Examples to be added once Nikto is integrated into BountyBud)*

Basic Scan:
`nikto -h <target_host>`

Scan a specific port:
`nikto -h <target_host> -p <port>`

Scan with SSL:
`nikto -h <target_host> -ssl`

Output to file:
`nikto -h <target_host> -o report.txt -Format txt`

## Installation
- **Kali Linux / Debian-based:** `sudo apt install nikto`
- **Source:** Download from [https://cirt.net/Nikto2](https://cirt.net/Nikto2)

## Official Documentation & Resources
- **Homepage:** [https://cirt.net/Nikto2](https://cirt.net/Nikto2)
- **GitHub (Unofficial Mirror):** [https://github.com/sullo/nikto](https://github.com/sullo/nikto) 