import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BountyBud</h3>
            <p className="text-gray-400 mb-4">
              A comprehensive toolkit for bug bounty hunters and security researchers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary">Command Generator</Link>
              </li>
              <li>
                <Link href="/security-tools" className="hover:text-primary">Security Tools</Link>
              </li>
              <li>
                <Link href="/browser-extensions" className="hover:text-primary">Browser Extensions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://github.com/projectdiscovery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  ProjectDiscovery
                </a>
              </li>
              <li>
                <a 
                  href="https://portswigger.net/web-security" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  PortSwigger Web Security
                </a>
              </li>
              <li>
                <a 
                  href="https://hackerone.com/hacktivity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  HackerOne Hacktivity
                </a>
              </li>
              <li>
                <a 
                  href="https://owasp.org/www-project-top-ten/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  OWASP Top 10
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BountyBud. All rights reserved.</p>
          <p className="text-sm mt-2">Built for educational purposes. Always ensure you have authorization before testing.</p>
        </div>
      </div>
    </footer>
  );
} 