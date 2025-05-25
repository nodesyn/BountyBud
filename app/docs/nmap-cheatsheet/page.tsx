'use client';

import React from 'react';
import Link from 'next/link';

export default function NmapCheatsheetPage() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Nmap Cheatsheet</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          A comprehensive guide to Nmap scanning options, covering basic commands, scan types, NSE scripting, and performance optimization.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Scanning</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap &lt;target&gt;</code>: Basic scan of the top 1000 TCP ports.</li>
            <li><code>nmap -sV &lt;target&gt;</code>: Version detection for services.</li>
            <li><code>nmap -O &lt;target&gt;</code>: OS detection (requires root/admin privileges).</li>
            <li><code>nmap -A &lt;target&gt;</code>: Aggressive scan (enables OS detection, version detection, script scanning, and traceroute).</li>
            <li><code>nmap -p &lt;port_range&gt; &lt;target&gt;</code>: Scan specific ports (e.g., <code>nmap -p 22,80,443 &lt;target&gt;</code>).</li>
            <li><code>nmap -p- &lt;target&gt;</code>: Scan all 65535 TCP ports.</li>
            <li><code>nmap -F &lt;target&gt;</code>: Fast scan (scans the 100 most common ports).</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Scan Types</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap -sS &lt;target&gt;</code>: TCP SYN (stealth) scan (default for privileged users).</li>
            <li><code>nmap -sT &lt;target&gt;</code>: TCP Connect scan (default for unprivileged users).</li>
            <li><code>nmap -sU &lt;target&gt;</code>: UDP scan.</li>
            <li><code>nmap -sN &lt;target&gt;</code>: TCP Null scan.</li>
            <li><code>nmap -sF &lt;target&gt;</code>: TCP FIN scan.</li>
            <li><code>nmap -sX &lt;target&gt;</code>: TCP Xmas scan.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Target Specification</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap &lt;target_ip&gt;</code>: Scan a single IP.</li>
            <li><code>nmap &lt;hostname&gt;</code>: Scan a hostname.</li>
            <li><code>nmap &lt;ip_range&gt;</code>: Scan an IP range (e.g., <code>192.168.1.0/24</code> or <code>192.168.1.1-254</code>).</li>
            <li><code>nmap -iL &lt;targets_file.txt&gt;</code>: Scan targets from a file.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Output Formats</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap -oN &lt;output_file.nmap&gt; &lt;target&gt;</code>: Normal output.</li>
            <li><code>nmap -oX &lt;output_file.xml&gt; &lt;target&gt;</code>: XML output.</li>
            <li><code>nmap -oG &lt;output_file.gnmap&gt; &lt;target&gt;</code>: Grepable output.</li>
            <li><code>nmap -oA &lt;basename&gt; &lt;target&gt;</code>: Output in all three major formats (normal, XML, grepable).</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">NSE (Nmap Scripting Engine)</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap --script &lt;script_name&gt; &lt;target&gt;</code>: Run a specific NSE script.</li>
            <li><code>nmap --script default &lt;target&gt;</code>: Run default safe scripts.</li>
            <li><code>nmap --script vuln &lt;target&gt;</code>: Run vulnerability detection scripts.</li>
            <li><code>nmap --script-help &lt;script_name&gt;</code>: Get help for a specific script.</li>
            <li><code>nmap --script-updatedb</code>: Update the script database.</li>
          </ul>
          
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Example NSE Scripts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><code>nmap --script http-title &lt;target&gt;</code>: Get HTTP titles from web servers.</li>
              <li><code>nmap -sV --script vulners --script-args mincvss=7.0 &lt;target&gt;</code>: Scan for vulnerabilities using Vulners.com database (filter by CVSS score).</li>
              <li><code>nmap --script banner &lt;target&gt;</code>: Grab service banners.</li>
              <li><code>nmap --script ssl-enum-ciphers -p 443 &lt;target&gt;</code>: Enumerate SSL/TLS ciphers.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Performance and Timing</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap -T&lt;0-5&gt; &lt;target&gt;</code>: Set timing template (0=paranoid, 1=sneaky, 2=polite, 3=normal, 4=aggressive, 5=insane).
              <ul className="list-disc pl-6 mt-1">
                <li><code>nmap -T4 &lt;target&gt;</code> is a common choice for faster scans.</li>
              </ul>
            </li>
            <li><code>--min-rate &lt;number&gt;</code>: Send packets no slower than &lt;number&gt; per second.</li>
            <li><code>--max-rate &lt;number&gt;</code>: Send packets no faster than &lt;number&gt; per second.</li>
            <li><code>--min-parallelism &lt;number&gt;</code>: Set minimum number of parallel probes.</li>
            <li><code>--max-parallelism &lt;number&gt;</code>: Set maximum number of parallel probes.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Evasion & Spoofing</h2>
        <div className="card mb-6">
          <p className="mb-2 text-yellow-500"><em>Note: Use ethically and legally with proper authorization</em></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><code>nmap -D &lt;decoy1,decoy2,ME,...&gt; &lt;target&gt;</code>: Cloak a scan with decoys. <code>ME</code> refers to your actual IP.</li>
            <li><code>nmap -S &lt;spoofed_ip&gt; &lt;target&gt;</code>: Spoof source IP address (often requires a specific network setup and might not work).</li>
            <li><code>nmap -e &lt;interface&gt; &lt;target&gt;</code>: Use a specific network interface.</li>
            <li><code>nmap --source-port &lt;port_num&gt;</code> or <code>nmap -g &lt;port_num&gt;</code>: Spoof source port number.</li>
            <li><code>--data-length &lt;number&gt;</code>: Append random data to sent packets.</li>
            <li><code>--mtu &lt;value&gt;</code>: Set custom MTU.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Firewall/IDS Evasion Techniques</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>-f</code>: Fragment packets (smaller MTU).</li>
            <li><code>--badsum</code>: Send packets with a bogus TCP/UDP/SCTP checksum.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Other Useful Options</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>-v</code>: Increase verbosity level.</li>
            <li><code>-vv</code>: Increase verbosity even more.</li>
            <li><code>-d</code>: Increase debugging level.</li>
            <li><code>-n</code>: No DNS resolution.</li>
            <li><code>-R</code>: Resolve DNS for all targets.</li>
            <li><code>--reason</code>: Display the reason a port is in a particular state.</li>
            <li><code>--open</code>: Only show open (or possibly open) ports.</li>
            <li><code>--iflist</code>: Show host interfaces and routes.</li>
            <li><code>--resume &lt;nmap_output_file&gt;</code>: Resume an aborted scan.</li>
          </ul>
        </div>
      </section>

      <div className="mt-6 card bg-gray-800 text-amber-300 p-4">
        <p className="font-semibold">
          <strong>Disclaimer:</strong> Always ensure you have explicit permission before scanning any target. Unauthorized scanning can be illegal.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <Link href="/docs" className="text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
} 