export interface BrowserExtension {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  browsers: string[];
  tags?: string[];
}

export type ExtensionCategory = {
  id: string;
  name: string;
  description: string;
};

export const extensionCategories: ExtensionCategory[] = [
  {
    id: "security-headers",
    name: "Security Headers",
    description: "Extensions for analyzing and modifying security headers."
  },
  {
    id: "request-modification",
    name: "Request Modification",
    description: "Tools for intercepting and modifying HTTP requests."
  },
  {
    id: "response-analysis",
    name: "Response Analysis",
    description: "Extensions for analyzing HTTP responses and content."
  },
  {
    id: "authentication",
    name: "Authentication Testing",
    description: "Tools for testing authentication mechanisms."
  },
  {
    id: "api-testing",
    name: "API Testing",
    description: "Extensions for working with and testing APIs."
  }
];

export const browserExtensions: BrowserExtension[] = [
  // Security Headers Extensions
  {
    id: "wappalyzer",
    name: "Wappalyzer",
    description: "Identifies technologies used on websites including frameworks, content management systems, and security headers.",
    category: "security-headers",
    url: "https://www.wappalyzer.com/",
    browsers: ["Chrome", "Firefox"],
    tags: ["technology-detection", "reconnaissance"]
  },
  {
    id: "security-headers",
    name: "Security Headers",
    description: "Analyzes the security headers of websites and provides a rating based on the implemented headers.",
    category: "security-headers",
    url: "https://securityheaders.com/",
    browsers: ["Chrome"],
    tags: ["header-analysis", "security"]
  },
  
  // Request Modification Extensions
  {
    id: "tamper-data",
    name: "Tamper Data for FF Quantum",
    description: "Allows viewing and modifying HTTP/HTTPS headers and post parameters.",
    category: "request-modification",
    url: "https://addons.mozilla.org/en-US/firefox/addon/tamper-data-for-ff-quantum/",
    browsers: ["Firefox"],
    tags: ["http-headers", "request-manipulation"]
  },
  {
    id: "requestly",
    name: "Requestly",
    description: "Intercept and modify network requests with rules to redirect URLs, modify headers, switch hosts, etc.",
    category: "request-modification",
    url: "https://www.requestly.io/",
    browsers: ["Chrome", "Firefox", "Edge"],
    tags: ["http-modification", "redirect"]
  },
  {
    id: "modify-header-value",
    name: "Modify Header Value",
    description: "Add, modify or remove a header for any request on specified domains.",
    category: "request-modification",
    url: "https://chrome.google.com/webstore/detail/modify-header-value-http/cbdibdfhahmknbkkojljfncpnhmacdek",
    browsers: ["Chrome"],
    tags: ["header-modification"]
  },
  
  // Response Analysis Extensions
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Makes JSON easy to read in the browser by formatting and highlighting the structure.",
    category: "response-analysis",
    url: "https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa",
    browsers: ["Chrome"],
    tags: ["json", "formatting"]
  },
  {
    id: "retire-js",
    name: "Retire.js",
    description: "Identifies JavaScript libraries with known vulnerabilities on websites.",
    category: "response-analysis",
    url: "https://github.com/RetireJS/retire.js",
    browsers: ["Chrome", "Firefox"],
    tags: ["javascript", "vulnerability-detection"]
  },
  {
    id: "builtwith",
    name: "BuiltWith Technology Profiler",
    description: "Reveals the technology stack websites are built with, useful for reconnaissance.",
    category: "response-analysis",
    url: "https://builtwith.com/",
    browsers: ["Chrome", "Firefox"],
    tags: ["technology-detection", "reconnaissance"]
  },
  
  // Authentication Testing Extensions
  {
    id: "cookieeditor",
    name: "Cookie-Editor",
    description: "Makes manipulating cookies easy with an intuitive interface to add, delete, edit, and search cookies.",
    category: "authentication",
    url: "https://cookie-editor.cgagnier.ca/",
    browsers: ["Chrome", "Firefox", "Edge"],
    tags: ["cookie-manipulation", "session"]
  },
  {
    id: "jwt-debugger",
    name: "JWT Debugger",
    description: "Decode and debug JSON Web Tokens in your browser.",
    category: "authentication",
    url: "https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd",
    browsers: ["Chrome"],
    tags: ["jwt", "token-analysis"]
  },
  
  // API Testing Extensions
  {
    id: "postman",
    name: "Postman",
    description: "Platform for API development and testing with a comprehensive interface for sending requests.",
    category: "api-testing",
    url: "https://www.postman.com/",
    browsers: ["Chrome"],
    tags: ["api", "request"]
  },
  {
    id: "rested",
    name: "RESTED",
    description: "A REST client for browsers with a clean interface for making HTTP requests.",
    category: "api-testing",
    url: "https://github.com/esphen/RESTED",
    browsers: ["Firefox"],
    tags: ["rest", "api"]
  },
  {
    id: "talend-api-tester",
    name: "Talend API Tester",
    description: "Free web-based tool for testing REST, SOAP and HTTP APIs directly in your browser.",
    category: "api-testing",
    url: "https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm",
    browsers: ["Chrome"],
    tags: ["api", "rest", "soap"]
  }
]; 