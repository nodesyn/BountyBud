# JoomScan - Joomla Vulnerability Scanner Guide

## Overview
JoomScan is an open-source project developed in Perl that allows security professionals to detect Joomla CMS vulnerabilities. It helps identify misconfigurations and known vulnerabilities in Joomla installations, their components, modules, and plugins.

## Key Features
- Detects Joomla version.
- Scans for known vulnerabilities in core Joomla, components, and modules.
- Identifies misconfigurations (e.g., debug mode, error reporting).
- Checks for sensitive files (e.g., configuration files, logs).
- User-friendly interface.
- Ability to update the vulnerability database.

## Common Commands
*(Examples to be added once JoomScan is integrated into BountyBud)*

Basic Scan:
`joomscan --url <target_joomla_site>`

Scan with specific tests (e.g., components):
`joomscan --url <target_joomla_site> --enumerate-components`

Update JoomScan database:
`joomscan --update`

## Installation
- **Kali Linux:** `sudo apt install joomscan`
- **From GitHub:** 
  `git clone https://github.com/OWASP/joomscan.git`
  `cd joomscan`
  `perl joomscan.pl --help` (May require `cpan install URI::URL LWP::UserAgent`) 

## Official Documentation & Resources
- **OWASP JoomScan Page:** [https://owasp.org/www-project-joomscan/](https://owasp.org/www-project-joomscan/)
- **GitHub Repository:** [https://github.com/OWASP/joomscan](https://github.com/OWASP/joomscan) 