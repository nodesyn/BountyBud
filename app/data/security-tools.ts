export interface SecurityTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  tags?: string[];
  installCommand?: string;
  language?: string;
  wordlistNote?: string;
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
    id: "gobuster",
    name: "Gobuster",
    description: "Directory/file, DNS and Virtual Host busting tool written in Go that can be used to brute-force URIs, DNS subdomains, and virtual host names.",
    category: "reconnaissance",
    url: "https://github.com/OJ/gobuster",
    tags: ["directory", "dns", "vhost", "brute-force"],
    installCommand: "go install github.com/OJ/gobuster/v3@latest",
    language: "Go",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): For directory mode, use Discovery/Web-Content/directory-list-2.3-medium.txt or Discovery/Web-Content/raft-medium-directories.txt. For DNS brute forcing, use Discovery/DNS/subdomains-top1million-5000.txt."
  },
  {
    id: "feroxbuster",
    name: "Feroxbuster",
    description: "A fast, simple, recursive content discovery tool written in Rust designed to search for unlinked content in target directories.",
    category: "reconnaissance",
    url: "https://github.com/epi052/feroxbuster",
    tags: ["directory", "recursive", "content-discovery"],
    installCommand: "curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | bash",
    language: "Rust",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): Discovery/Web-Content/raft-medium-directories.txt for directories or Discovery/Web-Content/raft-medium-files.txt for files."
  },
  {
    id: "ffuf",
    name: "FFUF",
    description: "Fast web fuzzer written in Go with a focus on speed and flexibility, supporting various fuzzing modes for content discovery, parameter fuzzing, and more.",
    category: "reconnaissance",
    url: "https://github.com/ffuf/ffuf",
    tags: ["fuzzer", "content-discovery", "web"],
    installCommand: "go install github.com/ffuf/ffuf/v2@latest",
    language: "Go",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): For web content fuzzing, use Discovery/Web-Content/directory-list-2.3-medium.txt. For parameter fuzzing, use Discovery/Web-Content/burp-parameter-names.txt."
  },
  {
    id: "httpx",
    name: "httpx",
    description: "Fast and multi-purpose HTTP toolkit that allows running multiple probes using the retryablehttp library.",
    category: "reconnaissance",
    url: "https://github.com/projectdiscovery/httpx",
    tags: ["http", "probe"],
    installCommand: "go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest",
    language: "Go"
  },
  {
    id: "gau",
    name: "GetAllUrls (gau)",
    description: "Fetches known URLs from multiple sources like the Wayback Machine, Common Crawl, and AlienVault OTX.",
    category: "reconnaissance",
    url: "https://github.com/lc/gau",
    tags: ["urls", "passive"],
    installCommand: "go install github.com/lc/gau/v2/cmd/gau@latest",
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
    id: "nmap-vulners",
    name: "Nmap Vulners",
    description: "NSE script for Nmap that uses vulners.com API to detect vulnerabilities in scanned systems based on their service banners.",
    category: "scanning",
    url: "https://github.com/vulnersCom/nmap-vulners",
    tags: ["network", "scanner", "vulnerability"],
    installCommand: "git clone https://github.com/vulnersCom/nmap-vulners /usr/share/nmap/scripts/vulners && nmap --script-updatedb",
    language: "Lua"
  },
  {
    id: "sslscan",
    name: "SSLScan",
    description: "Tests SSL/TLS enabled services to discover supported cipher suites, protocols, certificate information and vulnerabilities.",
    category: "scanning",
    url: "https://github.com/rbsec/sslscan",
    tags: ["ssl", "tls", "security"],
    installCommand: "apt-get install sslscan || git clone https://github.com/rbsec/sslscan.git && cd sslscan && make && make install",
    language: "C"
  },
  {
    id: "nikto",
    name: "Nikto",
    description: "Web server scanner that tests for dangerous files/CGIs, outdated server software and other vulnerabilities.",
    category: "scanning",
    url: "https://github.com/sullo/nikto",
    tags: ["web", "scanner", "security"],
    installCommand: "apt-get install nikto || git clone https://github.com/sullo/nikto.git",
    language: "Perl"
  },
  {
    id: "joomscan",
    name: "JoomScan",
    description: "OWASP Joomla Vulnerability Scanner Project designed to find known vulnerabilities and misconfigurations in Joomla CMS.",
    category: "scanning",
    url: "https://github.com/OWASP/joomscan",
    tags: ["joomla", "cms", "scanner"],
    installCommand: "git clone https://github.com/OWASP/joomscan.git && chmod +x joomscan/joomscan.pl",
    language: "Perl"
  },
  {
    id: "droopescan",
    name: "DroopeScan",
    description: "Plugin-based scanner that helps identify issues with several CMS, including Drupal, Silverstripe, and WordPress.",
    category: "scanning",
    url: "https://github.com/droope/droopescan",
    tags: ["drupal", "cms", "scanner"],
    installCommand: "pip3 install droopescan",
    language: "Python"
  },
  {
    id: "wpscan",
    name: "WPScan",
    description: "WordPress Security Scanner that identifies vulnerabilities in WordPress installations.",
    category: "scanning",
    url: "https://github.com/wpscanteam/wpscan",
    tags: ["wordpress", "cms"],
    installCommand: "gem install wpscan",
    language: "Ruby",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): For WordPress username enumeration, use Usernames/Names/names.txt. For password brute forcing, use Passwords/Leaked-Databases/rockyou.txt or Passwords/Common-Credentials/10-million-password-list-top-1000.txt."
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    description: "Automatic SQL injection and database takeover tool that detects and exploits SQL injection flaws.",
    category: "scanning",
    url: "https://github.com/sqlmapproject/sqlmap",
    tags: ["sql-injection", "database"],
    installCommand: "git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev",
    language: "Python",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): For database enumeration, use Fuzzing/Databases. For more targeted SQL injection payloads, use Fuzzing/SQLi."
  },
  
  // Enumeration Tools
  {
    id: "smbmap",
    name: "SMBMap",
    description: "SMB enumeration tool that allows users to enumerate samba share drives across a domain, list share contents, download files, and upload files.",
    category: "scanning",
    url: "https://github.com/ShawnDEvans/smbmap",
    tags: ["smb", "enumeration", "windows"],
    installCommand: "git clone https://github.com/ShawnDEvans/smbmap.git && cd smbmap && pip3 install -r requirements.txt",
    language: "Python"
  },
  {
    id: "enum4linux",
    name: "Enum4Linux",
    description: "Linux alternative to enum.exe for enumerating data from Windows and Samba hosts, including user listing, share listing, and password policy information.",
    category: "scanning",
    url: "https://github.com/CiscoCXSecurity/enum4linux",
    tags: ["windows", "samba", "enumeration"],
    installCommand: "apt-get install enum4linux || git clone https://github.com/CiscoCXSecurity/enum4linux.git",
    language: "Perl"
  },
  {
    id: "dnsrecon",
    name: "DNSRecon",
    description: "DNS Enumeration Script with various lookup methods including zone transfers, reverse lookups, and domain expansion.",
    category: "reconnaissance",
    url: "https://github.com/darkoperator/dnsrecon",
    tags: ["dns", "enumeration", "reconnaissance"],
    installCommand: "apt-get install dnsrecon || pip3 install dnsrecon",
    language: "Python"
  },
  {
    id: "odat",
    name: "ODAT",
    description: "Oracle Database Attacking Tool that can identify and exploit vulnerabilities in Oracle databases.",
    category: "scanning",
    url: "https://github.com/quentinhardy/odat",
    tags: ["oracle", "database", "exploitation"],
    installCommand: "git clone https://github.com/quentinhardy/odat.git && cd odat && pip3 install -r requirements.txt",
    language: "Python"
  },
  {
    id: "smtp-user-enum",
    name: "SMTP User Enum",
    description: "Tool for enumerating OS users via the SMTP service using VRFY, EXPN or RCPT TO commands.",
    category: "scanning",
    url: "https://github.com/pentestmonkey/smtp-user-enum",
    tags: ["smtp", "enumeration", "users"],
    installCommand: "apt-get install smtp-user-enum || git clone https://github.com/pentestmonkey/smtp-user-enum.git",
    language: "Perl"
  },
  {
    id: "snmp-check",
    name: "SNMP-Check",
    description: "SNMP enumeration tool that provides a more user-friendly output compared to snmpwalk with detailed system information.",
    category: "scanning",
    url: "https://gitlab.com/kalilinux/packages/snmpcheck",
    tags: ["snmp", "enumeration", "network"],
    installCommand: "apt-get install snmp-check || git clone https://gitlab.com/kalilinux/packages/snmpcheck.git",
    language: "Ruby"
  },
  {
    id: "snmpwalk",
    name: "SNMPWalk",
    description: "SNMP data collection application that uses SNMP GETNEXT requests to query a network entity for a tree of information.",
    category: "scanning",
    url: "http://www.net-snmp.org/",
    tags: ["snmp", "enumeration", "network"],
    installCommand: "apt-get install snmp",
    language: "C"
  },
  {
    id: "ldapsearch",
    name: "LDAPSearch",
    description: "Command-line tool for querying and searching LDAP directories to extract information such as users, groups, and other organizational data.",
    category: "scanning",
    url: "https://linux.die.net/man/1/ldapsearch",
    tags: ["ldap", "enumeration", "directory"],
    installCommand: "apt-get install ldap-utils",
    language: "C"
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
    language: "Ruby",
    wordlistNote: "Recommended wordlists from SecLists (https://github.com/danielmiessler/SecLists): For password brute forcing, use Passwords/Leaked-Databases/rockyou.txt. For SSH brute forcing, consider Passwords/Default-Credentials/ssh-betterdefaultpasslist.txt. For username enumeration, use Usernames/top-usernames-shortlist.txt."
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