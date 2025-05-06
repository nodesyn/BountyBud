export interface SecurityTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  tags?: string[];
  installCommand?: string;
  language?: string;
}

export type ToolCategory = {
  id: string;
  name: string;
  description: string;
};

export const toolCategories: ToolCategory[] = [
  {
    id: "reconnaissance",
    name: "Reconnaissance",
    description: "Tools for initial information gathering and discovery."
  },
  {
    id: "scanning",
    name: "Vulnerability Scanning",
    description: "Tools for identifying potential security vulnerabilities."
  },
  {
    id: "exploitation",
    name: "Exploitation",
    description: "Tools that assist in exploiting identified vulnerabilities."
  },
  {
    id: "reporting",
    name: "Reporting",
    description: "Tools for documenting and reporting findings."
  }
];

export const securityTools: SecurityTool[] = [
  // Reconnaissance Tools
  {
    id: "subfinder",
    name: "Subfinder",
    description: "Fast passive subdomain enumeration tool that discovers valid subdomains for websites by using passive online sources.",
    category: "reconnaissance",
    url: "https://github.com/projectdiscovery/subfinder",
    tags: ["subdomain", "passive"],
    installCommand: "GO111MODULE=on go get -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder",
    language: "Go"
  },
  {
    id: "amass",
    name: "Amass",
    description: "In-depth attack surface mapping and asset discovery tool that performs network mapping of attack surfaces and external asset discovery.",
    category: "reconnaissance",
    url: "https://github.com/OWASP/Amass",
    tags: ["subdomain", "active", "passive"],
    installCommand: "go install -v github.com/OWASP/Amass/v3/...",
    language: "Go"
  },
  {
    id: "httpx",
    name: "httpx",
    description: "Fast and multi-purpose HTTP toolkit that allows running multiple probes using the retryablehttp library.",
    category: "reconnaissance",
    url: "https://github.com/projectdiscovery/httpx",
    tags: ["http", "probe"],
    installCommand: "GO111MODULE=on go get -v github.com/projectdiscovery/httpx/cmd/httpx",
    language: "Go"
  },
  {
    id: "gau",
    name: "GetAllUrls (gau)",
    description: "Fetches known URLs from multiple sources like the Wayback Machine, Common Crawl, and AlienVault OTX.",
    category: "reconnaissance",
    url: "https://github.com/lc/gau",
    tags: ["urls", "passive"],
    installCommand: "GO111MODULE=on go get -u -v github.com/lc/gau",
    language: "Go"
  },
  
  // Vulnerability Scanning Tools
  {
    id: "nuclei",
    name: "Nuclei",
    description: "Fast and customizable vulnerability scanner based on simple YAML-based template files for describing vulnerabilities.",
    category: "scanning",
    url: "https://github.com/projectdiscovery/nuclei",
    tags: ["template", "scanner"],
    installCommand: "GO111MODULE=on go get -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei",
    language: "Go"
  },
  {
    id: "nmap",
    name: "Nmap",
    description: "The Network Mapper, a free and open source utility for network discovery and security auditing.",
    category: "scanning",
    url: "https://nmap.org/",
    tags: ["network", "scanner"],
    installCommand: "apt-get install nmap",
    language: "C/C++"
  },
  {
    id: "wpscan",
    name: "WPScan",
    description: "WordPress Security Scanner that identifies vulnerabilities in WordPress installations.",
    category: "scanning",
    url: "https://github.com/wpscanteam/wpscan",
    tags: ["wordpress", "cms"],
    installCommand: "gem install wpscan",
    language: "Ruby"
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    description: "Automatic SQL injection and database takeover tool that detects and exploits SQL injection flaws.",
    category: "scanning",
    url: "https://github.com/sqlmapproject/sqlmap",
    tags: ["sql-injection", "database"],
    installCommand: "git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev",
    language: "Python"
  },
  
  // Exploitation Tools
  {
    id: "metasploit",
    name: "Metasploit Framework",
    description: "A penetration testing framework that provides information and tools for exploit development and research.",
    category: "exploitation",
    url: "https://github.com/rapid7/metasploit-framework",
    tags: ["exploit", "framework"],
    installCommand: "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall",
    language: "Ruby"
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    description: "An integrated platform for performing security testing of web applications.",
    category: "exploitation",
    url: "https://portswigger.net/burp",
    tags: ["proxy", "web"],
    language: "Java"
  },
  {
    id: "xsstrike",
    name: "XSStrike",
    description: "Advanced XSS scanner equipped with powerful detection capabilities using fuzzing and intelligent payload generation.",
    category: "exploitation",
    url: "https://github.com/s0md3v/XSStrike",
    tags: ["xss", "web"],
    installCommand: "git clone https://github.com/s0md3v/XSStrike.git",
    language: "Python"
  },
  
  // Reporting Tools
  {
    id: "xmind",
    name: "XMind",
    description: "Mind mapping tool useful for organizing bug bounty hunting approach and findings.",
    category: "reporting",
    url: "https://www.xmind.net/",
    tags: ["organization", "mindmap"],
    language: "Java"
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "Lightweight markup language for creating formatted reports that can be converted to HTML or PDF.",
    category: "reporting",
    url: "https://www.markdownguide.org/",
    tags: ["documentation"],
    language: "Text"
  },
  {
    id: "asciinema",
    name: "asciinema",
    description: "Terminal session recorder. Record your terminal sessions and share them with ease.",
    category: "reporting",
    url: "https://asciinema.org/",
    tags: ["terminal", "recording"],
    installCommand: "pip3 install asciinema",
    language: "Python"
  }
]; 