# WPScan - WordPress Vulnerability Scanner Guide

## Overview
WPScan is a free, for non-commercial use, black box WordPress security scanner written for security professionals and blog maintainers to test the security of their sites. It can identify known vulnerabilities in WordPress core, plugins, and themes. 

## Key Features
- Detects WordPress version, themes, and plugins.
- Enumerates users.
- Checks for known vulnerabilities using a database.
- Brute-force password attacks (use responsibly).
- Detects publicly accessible sensitive files.

## Common Commands
*(Examples to be added once WPScan is integrated into BountyBud)*

Basic Scan:
`wpscan --url <target_wordpress_site>`

Enumerate vulnerable plugins:
`wpscan --url <target_wordpress_site> --enumerate vp`

Enumerate users:
`wpscan --url <target_wordpress_site> --enumerate u`

Update WPScan database:
`wpscan --update`

## Installation
- **Kali Linux:** Often pre-installed or `sudo apt install wpscan`
- **Gem/Ruby:** `gem install wpscan`
- **Docker:** `docker pull wpscanteam/wpscan`

## Official Documentation & Resources
- **Homepage:** [https://wpscan.com/](https://wpscan.com/)
- **GitHub Repository:** [https://github.com/wpscanteam/wpscan](https://github.com/wpscanteam/wpscan) 