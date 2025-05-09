'use client';

import React from 'react';
import Link from 'next/link';

export default function SubdomainEnumerationDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Subdomain Enumeration Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Subdomain enumeration is a critical first step in the bug bounty hunting process that helps expand your attack surface by discovering additional entry points into your target's infrastructure.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Subdomain Enumeration?</h2>
        <div className="card mb-6">
          <p className="mb-4">
            Subdomain enumeration is the process of finding valid subdomains for a domain. For example, if your target is <code>example.com</code>, subdomains might include <code>dev.example.com</code>, <code>api.example.com</code>, or <code>admin.example.com</code>.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why is Subdomain Enumeration Important?</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Expanded Attack Surface</strong>: Each subdomain represents a potential entry point</li>
            <li><strong>Forgotten Assets</strong>: Organizations often forget about old subdomains that may have vulnerabilities</li>
            <li><strong>Development Environments</strong>: Development/staging environments are typically less secure</li>
            <li><strong>Administrative Interfaces</strong>: Admin panels may be accessible via specific subdomains</li>
            <li><strong>Different Technology Stacks</strong>: Various subdomains may use different tech stacks with unique vulnerabilities</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subdomain Enumeration Techniques</h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">1. Passive Enumeration</h3>
            <p className="mb-3">Passive enumeration techniques collect subdomain information without directly interacting with the target infrastructure:</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Using Subfinder</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>subfinder -d example.com -all -recursive {'>'}  subdomain.txt</code>
                </pre>
                <h5 className="font-semibold mt-3 mb-1">Key features:</h5>
                <ul className="list-disc pl-6">
                  <li>Uses multiple passive sources</li>
                  <li>Recursive enumeration capability</li>
                  <li>Fast and efficient</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Using Amass in Passive Mode</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>amass enum -passive -d example.com -o amass_passive.txt</code>
                </pre>
                <h5 className="font-semibold mt-3 mb-1">Key features:</h5>
                <ul className="list-disc pl-6">
                  <li>Comprehensive passive data sources</li>
                  <li>Organized output</li>
                  <li>Part of a larger framework</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Certificate Transparency Logs</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>curl "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' | sort -u</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">2. Active Enumeration</h3>
            <p className="mb-3">Active enumeration involves directly querying DNS servers or interacting with the target's infrastructure:</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Using Amass in Active Mode</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>amass enum -active -d example.com -o amass_active.txt</code>
                </pre>
                <h5 className="font-semibold mt-3 mb-1">Key features:</h5>
                <ul className="list-disc pl-6">
                  <li>DNS brute forcing</li>
                  <li>Zone transfers</li>
                  <li>Permutation scanning</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">DNS Brute Force with Gobuster</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>gobuster dns -d example.com -w /path/to/wordlist.txt -o gobuster_dns.txt</code>
                </pre>
                <h5 className="font-semibold mt-3 mb-1">Recommended wordlists:</h5>
                <ul className="list-disc pl-6">
                  <li>SecLists/Discovery/DNS/subdomains-top1million-5000.txt</li>
                  <li>SecLists/Discovery/DNS/fierce-hostlist.txt</li>
                  <li>SecLists/Discovery/DNS/namelist.txt</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Using MassDNS for Fast Resolution</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>massdns -r /path/to/resolvers.txt -t A -o S -w massdns_results.txt domains_to_resolve.txt</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">3. Subdomain Permutation and Alteration</h3>
            <p className="mb-3">Generating new potential subdomains based on discovered ones:</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Using dnsgen</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>cat discovered_subdomains.txt | dnsgen - | massdns -r /path/to/resolvers.txt -t A -o S -w permutation_results.txt</code>
                </pre>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Using Altdns</h4>
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>altdns -i subdomains.txt -o altered_wordlist.txt -w words.txt</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filtering and Validation</h2>
        <div className="card">
          <p className="mb-3">After discovering potential subdomains, it's important to validate them:</p>
          
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-lg font-semibold mb-1">Filtering Live Subdomains with httpx</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>cat all_subdomains.txt | httpx -silent -status-code -title -tech-detect -o live_subdomains.txt</code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">Checking for HTTP/HTTPS Services</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>cat all_subdomains.txt | httprobe -c 50 -t 3000 {'>'}  live_hosts.txt</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Techniques</h2>
        <div className="card">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-1">1. Using ASN Information</h4>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>amass intel -org "Target Organization" -asn
amass enum -active -d example.com -asn 12345,67890</code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">2. Finding Subdomains Through GitHub</h4>
              <p>Search GitHub for:</p>
              <ul className="list-disc pl-6">
                <li>"example.com"</li>
                <li>"site:example.com"</li>
                <li>"domain:example.com"</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">3. Scraping Search Engines</h4>
              <p>Use tools like theHarvester:</p>
              <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                <code>theHarvester -d example.com -b all -f output.html</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Creating a Comprehensive Workflow</h2>
        <div className="card">
          <p className="mb-3">A typical subdomain enumeration workflow:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>Run passive enumeration with multiple tools</li>
            <li>Combine and deduplicate results</li>
            <li>Run active enumeration techniques</li>
            <li>Perform permutation scanning</li>
            <li>Validate live subdomains</li>
            <li>Categorize findings by technology/functionality</li>
            <li>Prioritize targets for further testing</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">BountyBud Integrated Commands</h2>
        <div className="card">
          <p className="mb-3">BountyBud offers several built-in commands for subdomain enumeration:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Basic Subdomain Discovery</strong>: Fast subdomain discovery with subfinder</li>
            <li><strong>Live Subdomain Filtering</strong>: Filter discovered subdomains with httpx</li>
            <li><strong>Amass Subdomain Enumeration</strong>: Comprehensive subdomain discovery with Amass</li>
            <li><strong>DNSGen Wordlist Generation</strong>: Generate potential subdomains through permutation</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitations and Considerations</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-2">
            <li>Some techniques may be noisy and detectable by the target</li>
            <li>Active scanning may be against the rules of some bug bounty programs</li>
            <li>Always check program policies before starting active enumeration</li>
            <li>Rate limiting may be necessary to avoid being blocked</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resources and Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Recommended Tools</h3>
            <ul className="list-disc pl-6">
              <li>Subfinder: Passive subdomain discovery</li>
              <li>Amass: Comprehensive subdomain enumeration</li>
              <li>MassDNS: Fast subdomain resolution</li>
              <li>httpx: HTTP probing and technology detection</li>
              <li>Altdns/dnsgen: Subdomain permutation</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Useful Wordlists</h3>
            <ul className="list-disc pl-6">
              <li>SecLists/Discovery/DNS/: Various subdomain wordlists</li>
              <li>JHaddix's all.txt: Comprehensive subdomain wordlist</li>
              <li>CommonSpeak2: Wordlist based on Certificate Transparency logs</li>
            </ul>
          </div>
        </div>
      </section>


      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/docs" className="btn btn-primary">
          Back to Documentation
        </Link>
      </div>
    </div>
  );
} 