'use client';

import React from 'react';
import Link from 'next/link';

export default function DirectoryScanningDocs() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">Directory Scanning Wordlist Guide</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Selecting the appropriate wordlist from the <a href="https://github.com/danielmiessler/SecLists" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SecLists</a> repository
          for tools like <strong>DirBuster</strong> or <strong>Feroxbuster</strong> depends on the context of the target, the scope of your enumeration,
          and the balance between speed and thoroughness.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Considerations for Choosing a Wordlist</h2>
        <div className="card mb-6">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Target Type</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Is the target a generic web server, a specific CMS (e.g., WordPress, Drupal), or a custom application?</li>
                <li>Are you looking for directories, files, or specific file extensions (e.g., <code>.php</code>, <code>.txt</code>)?</li>
                <li>Does the target use a specific technology stack (e.g., Apache, IIS, or a framework like Django)?</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Scan Scope and Time Constraints</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Smaller wordlists (e.g., <code>common.txt</code>, <code>raft-small-words.txt</code>) are faster and better for initial scans or time-sensitive engagements.</li>
                <li>Larger wordlists (e.g., <code>raft-large-directories.txt</code>, <code>directory-list-2.3-big.txt</code>) are more comprehensive but can take hours or days.</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Tool Configuration</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li><strong>DirBuster</strong>: A Java-based tool that supports multithreading and extension-based enumeration.</li>
                <li><strong>Feroxbuster</strong>: A Rust-based, high-performance tool that supports recursive scanning, link extraction, and parallel requests.</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Specificity</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Use technology-specific wordlists if you've enumerated the target and identified its stack.</li>
                <li>Combine wordlists with custom words derived from the target for better results.</li>
              </ul>
            </li>
            <li className="mt-3">
              <strong>Environment</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>For penetration testing or bug bounty, avoid overly aggressive scans to prevent denial-of-service (DoS) risks.</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended SecLists Wordlists</h2>
        <p className="mb-4">
          SecLists organizes wordlists under <code>/Discovery/Web-Content/</code> for web directory and file enumeration.
          Below are the recommended wordlists, categorized by use case.
        </p>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">General-Purpose Enumeration (Initial Scans)</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1"><code>common.txt</code> (<code>/Discovery/Web-Content/common.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~4,600 lines</li>
                  <li><strong>Description</strong>: A curated list of the most common web directories and files.</li>
                  <li><strong>Use Case</strong>: Ideal for quick scans in time-constrained environments or to avoid overwhelming the target.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/common.txt --threads 50 --rate-limit 10</code>
                    </pre>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1"><code>raft-small-words.txt</code> (<code>/Discovery/Web-Content/raft-small-words.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~9,000 lines</li>
                  <li><strong>Description</strong>: Part of the RAFT series, includes common words for directories and files, optimized for fuzzing.</li>
                  <li><strong>Use Case</strong>: A good balance between speed and coverage for initial enumeration.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/raft-small-words.txt --extensions php,html,txt --recursive</code>
                    </pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Comprehensive Enumeration (Deep Scans)</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1"><code>directory-list-2.3-medium.txt</code> (<code>/Discovery/Web-Content/directory-list-2.3-medium.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~220,000 lines</li>
                  <li><strong>Description</strong>: A DirBuster-provided wordlist with medium-sized collection of directory names.</li>
                  <li><strong>Use Case</strong>: Use for thorough enumeration when you suspect hidden directories or need broader coverage.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt --threads 100 --scan-limit 2</code>
                    </pre>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1"><code>raft-large-directories.txt</code> (<code>/Discovery/Web-Content/raft-large-directories.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~1,000,000 lines</li>
                  <li><strong>Description</strong>: A large RAFT wordlist focused on directories, designed for comprehensive fuzzing.</li>
                  <li><strong>Use Case</strong>: Deep scans in bug bounty or pentesting where you need to uncover obscure directories.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt --threads 50 --rate-limit 5 --recursive</code>
                    </pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Technology-Specific Enumeration</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">CMS-Specific Wordlists (<code>/Discovery/Web-Content/CMS/</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Examples</strong>: <code>wordpress.txt</code>, <code>drupal.txt</code>, <code>joomla.txt</code></li>
                  <li><strong>Size</strong>: Varies (~1,000–10,000 lines)</li>
                  <li><strong>Use Case</strong>: When the target runs a known CMS, these wordlists are more effective than generic ones.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/CMS/wordpress.txt --extensions php</code>
                    </pre>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1">Technology-Specific Wordlists (<code>/Discovery/Web-Content/</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Examples</strong>: <code>CGIs.txt</code>, <code>coldfusion.txt</code>, <code>apache.txt</code></li>
                  <li><strong>Size</strong>: Varies (~1,000–5,000 lines)</li>
                  <li><strong>Use Case</strong>: When you've identified the server or application framework.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/apache.txt --extensions php,html</code>
                    </pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">File Enumeration (with Extensions)</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-1"><code>web-extensions.txt</code> (<code>/Discovery/Web-Content/web-extensions.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~200 lines</li>
                  <li><strong>Description</strong>: A list of common file extensions (e.g., <code>.php</code>, <code>.html</code>, <code>.txt</code>, <code>.bak</code>).</li>
                  <li><strong>Use Case</strong>: Use with Feroxbuster's <code>--extensions</code> flag or DirBuster's extension field to enumerate files.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/common.txt --extensions php,html,txt,bak</code>
                    </pre>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-1"><code>raft-large-files.txt</code> (<code>/Discovery/Web-Content/raft-large-files.txt</code>)</h4>
                <ul className="list-disc pl-6">
                  <li><strong>Size</strong>: ~1,000,000 lines</li>
                  <li><strong>Description</strong>: A large RAFT wordlist focused on file names, including backups and sensitive files.</li>
                  <li><strong>Use Case</strong>: Deep file enumeration, especially for finding backups or misconfigured files.</li>
                  <li><strong>Example Command</strong>:
                    <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                      <code>feroxbuster --url https://example.com --wordlist /usr/share/seclists/Discovery/Web-Content/raft-large-files.txt --collect-backups</code>
                    </pre>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Workflow</h2>
        <div className="card">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Initial Scan</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Start with <code>common.txt</code> or <code>raft-small-words.txt</code> for quick enumeration.</li>
                <li>Use Feroxbuster with <code>--extract-links</code> and <code>--recursive</code> to find additional paths dynamically.</li>
              </ul>
            </li>
            <li>
              <strong>Analyze Results</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Inspect discovered directories/files for clues about the technology stack.</li>
                <li>Use tools like <code>Wappalyzer</code> or manual inspection to identify CMS, server, or framework.</li>
              </ul>
            </li>
            <li>
              <strong>Targeted Scan</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Switch to a CMS-specific or technology-specific wordlist if applicable.</li>
                <li>For deeper scans, use <code>directory-list-2.3-medium.txt</code> or <code>raft-large-directories.txt</code>.</li>
              </ul>
            </li>
            <li>
              <strong>File Enumeration</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Combine a directory wordlist with <code>web-extensions.txt</code> or use <code>raft-large-files.txt</code> for file-focused scans.</li>
                <li>Enable Feroxbuster's <code>--collect-backups</code> for backup file detection.</li>
              </ul>
            </li>
            <li>
              <strong>Custom Enumeration</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Build a custom wordlist using Feroxbuster's <code>--collect-words</code> or manual analysis.</li>
                <li>Re-run scans with the custom wordlist for precision.</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tool-Specific Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">Feroxbuster</h3>
            <ul className="list-disc pl-6">
              <li>Use <code>--threads</code> (e.g., 50–100) and <code>--rate-limit</code> (e.g., 5–10) to balance speed and server load.</li>
              <li>Enable <code>--recursive</code> for recursive scanning and <code>--extract-links</code> to find additional endpoints.</li>
              <li>Example command:
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>feroxbuster --url https://example.com \
--wordlist /usr/share/seclists/Discovery/Web-Content/raft-small-words.txt \
--threads 50 --rate-limit 10 --recursive --extract-links</code>
                </pre>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-primary">DirBuster</h3>
            <ul className="list-disc pl-6">
              <li>Use the GUI to specify extensions (e.g., <code>php,html,txt</code>) and select wordlists.</li>
              <li>Enable "Go Faster" for quicker scans, but monitor performance on large wordlists.</li>
              <li>Example command:
                <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                  <code>dirbuster -u https://example.com \
-l /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \
-e php,html</code>
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notes and Best Practices</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Install SecLists</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>On Kali Linux, SecLists is pre-installed at <code>/usr/share/seclists/</code>. Update it with:
                  <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                    <code>sudo apt update && sudo apt install seclists</code>
                  </pre>
                </li>
                <li>Otherwise, clone the repository:
                  <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                    <code>git clone https://github.com/danielmiessler/SecLists.git</code>
                  </pre>
                </li>
              </ul>
            </li>
            <li>
              <strong>Performance Tuning</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>For Feroxbuster, adjust <code>--threads</code>, <code>--scan-limit</code>, and <code>--rate-limit</code> to avoid overwhelming the target.</li>
                <li>For DirBuster, limit threads in the GUI if scanning production systems.</li>
              </ul>
            </li>
            <li>
              <strong>Ethical Considerations</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Always obtain permission before scanning. Aggressive directory busting can cause unintended DoS.</li>
                <li>Use smaller wordlists and rate-limiting for bug bounty programs to comply with rules.</li>
              </ul>
            </li>
            <li>
              <strong>Combine Tools</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>Use Feroxbuster for speed and recursive scanning, then switch to DirBuster for visualizing results in its tree view.</li>
                <li>Supplement with other tools like <code>gobuster</code> or <code>ffuf</code> if results are inconsistent.</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Final Recommendations</h2>
        <div className="card">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>For OSCP or CTF</strong>: Start with <code>common.txt</code> or <code>raft-small-words.txt</code>. These are fast and often sufficient for exam-style challenges.
            </li>
            <li>
              <strong>For Bug Bounty or Pentesting</strong>: Use <code>directory-list-2.3-medium.txt</code> for general scans and switch to CMS/technology-specific wordlists based on enumeration.
            </li>
            <li>
              <strong>For File Enumeration</strong>: Pair <code>common.txt</code> or <code>raft-large-files.txt</code> with <code>web-extensions.txt</code> to find sensitive files like backups or configuration files.
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-gray-700">
        <Link href="/tools" className="btn btn-primary">
          Back to Command Generation Tool
        </Link>
      </div>
    </div>
  );
} 