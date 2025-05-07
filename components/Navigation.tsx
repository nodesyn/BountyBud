"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccessibilitySettings from "./AccessibilitySettings";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path ? "text-primary" : "hover:text-primary";
  };

  return (
    <header className="bg-surface-dark border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center h-16">
              <img src="/bb.png" alt="Bounty Bud" className="h-full py-1" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className={isActive("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className={isActive("/tools")}>
                  Command Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/security-tools"
                  className={isActive("/security-tools")}
                >
                  Security Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/browser-extensions"
                  className={isActive("/browser-extensions")}
                >
                  Extensions
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className={isActive("/docs")}
                >
                  Documentation
                </Link>
              </li>
            </ul>
            <AccessibilitySettings />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="mr-3">
              <AccessibilitySettings />
            </div>
            <button
              className="text-gray-300 hover:text-primary focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-800 pt-2">
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className={isActive("/")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className={isActive("/tools")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Command Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security-tools"
                    className={isActive("/security-tools")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Security Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browser-extensions"
                    className={isActive("/browser-extensions")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Extensions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className={isActive("/docs")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
