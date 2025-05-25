# Droopescan - CMS Vulnerability Scanner Guide

## Overview
Droopescan is a plugin-based scanner that aids security researchers in identifying issues with several content management systems (CMS), including Drupal, Silverstripe, Joomla!, WordPress and Moodle. It is designed to be a versatile tool for initial reconnaissance of CMS-based websites.

## Key Features
- Scans multiple CMS types (Drupal, Silverstripe, Joomla!, WordPress, Moodle).
- Plugin-based architecture for extensibility.
- Identifies CMS version.
- Detects themes, plugins, and modules.
- Checks for interesting URLs and sensitive files.

## Common Commands
*(Examples to be added once Droopescan is integrated into BountyBud)*

Basic Scan (auto-detects CMS):
`droopescan scan -u <target_site_url>`

Scan for Drupal:
`droopescan scan drupal -u <target_site_url>`

Enumerate plugins:
`droopescan scan -u <target_site_url> -m plugins`

## Installation
- **Pip:** `pip install droopescan`
- **From GitHub:** 
  `git clone https://github.com/droope/droopescan.git`
  `cd droopescan`
  `pip install -r requirements.txt`
  `python setup.py install` (or run directly with `python droopescan.py`)

## Official Documentation & Resources
- **GitHub Repository:** [https://github.com/droope/droopescan](https://github.com/droope/droopescan) 