'use client';

import React from 'react';
import Link from 'next/link';

export default function SecurityToolsCheatsheet() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Security Tools Cheatsheet</h1>
      
      <p className="mb-8 text-gray-300">
        Quick reference guides for popular cybersecurity tools, with command syntax, common options, and usage examples.
      </p>

      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-primary">Contents</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
          <li><a href="#recon" className="text-primary hover:underline">Reconnaissance Tools</a></li>
          <li><a href="#scanning" className="text-primary hover:underline">Scanning & Enumeration</a></li>
          <li><a href="#webapp" className="text-primary hover:underline">Web Application Tools</a></li>
          <li><a href="#network" className="text-primary hover:underline">Network Tools</a></li>
          <li><a href="#exploitation" className="text-primary hover:underline">Exploitation Frameworks</a></li>
          <li><a href="#postexploit" className="text-primary hover:underline">Post-Exploitation</a></li>
        </ul>
      </div>

      {/* Reconnaissance Tools */}
      <section id="recon" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Reconnaissance Tools</h2>
        
        {/* Subfinder */}
        <div className="mb-8 p-5 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Subfinder</h3>
          <p className="mb-3 text-gray-300">
            A subdomain discovery tool that discovers valid subdomains for websites using passive online sources.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              subfinder -d example.com
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Options</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Option</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-d, --domain</td>
                  <td className="px-4 py-2">Domain to find subdomains for</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-o, --output</td>
                  <td className="px-4 py-2">File to write output to</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-r, --resolvers</td>
                  <td className="px-4 py-2">File containing resolver list</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-t, --threads</td>
                  <td className="px-4 py-2">Number of concurrent threads</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-v, --verbose</td>
                  <td className="px-4 py-2">Show verbose output</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Find subdomains and save to a file
              subfinder -d example.com -o output.txt
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Use multiple sources
              subfinder -d example.com -all
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Find subdomains for multiple domains
              subfinder -d example.com,example.org -silent | sort -u
            </pre>
          </div>
        </div>
        
        {/* Amass */}
        <div className="mb-8 p-5 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Amass</h3>
          <p className="mb-3 text-gray-300">
            Network mapping of attack surfaces and external asset discovery using OSINT techniques.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              amass enum -d example.com
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Options</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Option</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-d, --domain</td>
                  <td className="px-4 py-2">Domain names to enumerate</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-o, --output</td>
                  <td className="px-4 py-2">Path to output file</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-brute</td>
                  <td className="px-4 py-2">Perform brute force subdomain enumeration</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-passive</td>
                  <td className="px-4 py-2">Only perform passive enumeration</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-active</td>
                  <td className="px-4 py-2">Perform active enumeration methods</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Passive mode with output to file
              amass enum -passive -d example.com -o output.txt
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Aggressive enumeration with brute forcing
              amass enum -active -brute -d example.com -o output.txt
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Visualize collected data
              amass viz -d3 -d example.com
            </pre>
          </div>
        </div>
      </section>

      {/* Scanning & Enumeration */}
      <section id="scanning" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Scanning & Enumeration</h2>
        
        {/* Nmap */}
        <div className="mb-8 p-5 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Nmap</h3>
          <p className="mb-3 text-gray-300">
            The Network Mapper, used for network discovery and security auditing.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              nmap 192.168.1.0/24
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Scan Types</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Command</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">nmap -sT</td>
                  <td className="px-4 py-2">TCP connect scan</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">nmap -sS</td>
                  <td className="px-4 py-2">SYN/Stealth scan (default)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">nmap -sU</td>
                  <td className="px-4 py-2">UDP scan</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">nmap -sV</td>
                  <td className="px-4 py-2">Version detection</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">nmap -O</td>
                  <td className="px-4 py-2">OS detection</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Comprehensive scan with version detection, OS detection, and scripts
              nmap -sV -sC -O -p- 192.168.1.10
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Scan for specific vulnerability
              nmap --script=vuln 192.168.1.10
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Aggressive scan with all features
              nmap -A -T4 192.168.1.10
            </pre>
          </div>
        </div>
        
        {/* Enum4linux */}
        <div className="mb-8 p-5 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Enum4linux</h3>
          <p className="mb-3 text-gray-300">
            A tool for enumerating information from Windows and Samba systems.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              enum4linux -a 192.168.1.10
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Options</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Option</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-a</td>
                  <td className="px-4 py-2">Do all simple enumeration (-U -S -G -P -r -o -n -i)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-U</td>
                  <td className="px-4 py-2">Get userlist</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-S</td>
                  <td className="px-4 py-2">Get sharelist</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-G</td>
                  <td className="px-4 py-2">Get group and member list</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-P</td>
                  <td className="px-4 py-2">Get password policy information</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Get user listing with RID cycling
              enum4linux -U -r 192.168.1.10
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Check null sessions
              enum4linux -n 192.168.1.10
            </pre>
          </div>
        </div>
      </section>

      {/* Web Application Tools */}
      <section id="webapp" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Web Application Tools</h2>
        
        {/* Gobuster */}
        <div className="mb-8 p-5 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Gobuster</h3>
          <p className="mb-3 text-gray-300">
            Directory/file & DNS busting tool written in Go.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Options</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Option</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">dir</td>
                  <td className="px-4 py-2">Uses directory/file enumeration mode</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">dns</td>
                  <td className="px-4 py-2">Uses DNS subdomain enumeration mode</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">vhost</td>
                  <td className="px-4 py-2">Uses virtual host enumeration mode</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-u, --url</td>
                  <td className="px-4 py-2">Target URL or domain</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-w, --wordlist</td>
                  <td className="px-4 py-2">Path to wordlist</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Directory enumeration with file extensions
              gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt -x php,txt,html
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # DNS subdomain enumeration
              gobuster dns -d example.com -w /usr/share/wordlists/dns.txt
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Virtual host discovery
              gobuster vhost -u https://example.com -w /usr/share/wordlists/vhosts.txt
            </pre>
          </div>
        </div>
        
        {/* SQLMap */}
        <div className="p-5 bg-gray-800 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">SQLMap</h3>
          <p className="mb-3 text-gray-300">
            Automatic SQL injection and database takeover tool.
          </p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Basic Usage</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              sqlmap -u "http://example.com/page.php?id=1"
            </pre>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-primary">Common Options</h4>
            <table className="w-full text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Option</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">-u URL</td>
                  <td className="px-4 py-2">Target URL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">--data=DATA</td>
                  <td className="px-4 py-2">Data string to be sent through POST</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">--dbs</td>
                  <td className="px-4 py-2">Enumerate databases</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">--tables</td>
                  <td className="px-4 py-2">Enumerate tables</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">--dump</td>
                  <td className="px-4 py-2">Dump database table entries</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primary">Advanced Examples</h4>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Test all parameters with POST request
              sqlmap -u "http://example.com/login.php" --data="username=test&password=test" --level=5 --risk=3
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300 mb-2">
              # Dump specific table from a database
              sqlmap -u "http://example.com/page.php?id=1" -D database_name -T users --dump
            </pre>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
              # Use a request from Burp Suite
              sqlmap -r request.txt --batch
            </pre>
          </div>
        </div>
      </section>

      {/* More sections would be added here */}

      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 