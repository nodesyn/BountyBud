export interface Placeholder {
  key: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

export interface Command {
  id: string;
  name: string;
  description: string;
  command: string;
  placeholders?: Placeholder[];
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  outputExample?: string;
  referenceUrl?: string;
}

export interface CommandCategory {
  id: string;
  name: string;
  description: string;
  commands: Command[];
  icon?: string;
}

export const categories: CommandCategory[] = [
  {
    id: "subdomain-enumeration",
    name: "Subdomain Enumeration",
    description: "Discovers subdomains for a target domain to expand the attack surface.",
    icon: "network-wired",
    commands: [
      {
        id: "basic-subdomain-discovery",
        name: "Basic Subdomain Discovery",
        description: "Discovers subdomains using subfinder with recursive enumeration and saves results to a file.",
        command: "subfinder -d {domain} -all -recursive > subdomain.txt",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["reconnaissance", "passive"],
        outputExample: "Found 23 subdomains for example.com\nSaved to subdomain.txt",
        referenceUrl: "https://github.com/projectdiscovery/subfinder"
      },
      {
        id: "live-subdomain-filtering",
        name: "Live Subdomain Filtering",
        description: "Filters discovered subdomains using httpx and saves the alive ones to a file.",
        command: "cat subdomain.txt | httpx-toolkit -ports {ports} -threads {threads} > subdomains_alive.txt",
        placeholders: [
          {
            key: "ports",
            description: "Ports to check (comma-separated)",
            defaultValue: "80,443,8080,8000,8888",
            required: true,
            type: "text"
          },
          {
            key: "threads",
            description: "Number of threads",
            defaultValue: "200",
            required: true,
            type: "number"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "active"],
        referenceUrl: "https://github.com/projectdiscovery/httpx"
      },
      {
        id: "amass-subdomain-enum",
        name: "Amass Subdomain Enumeration",
        description: "Uses Amass to discover subdomains with passive and active techniques",
        command: "amass enum -d {domain} -o amass_subdomains.txt",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "active", "passive"],
        outputExample: "Found 157 names.\nexample.com\ndev.example.com\nmail.example.com\nwww.example.com\nadmin.example.com\nblog.example.com\napi.example.com\nstaging.example.com",
        referenceUrl: "https://github.com/OWASP/Amass"
      },
      {
        id: "dnsgen-wordlist",
        name: "DNSGen Wordlist Generation",
        description: "Generates a list of potential subdomains using word permutations",
        command: "cat subdomains.txt | dnsgen - | massdns -r /path/to/resolvers.txt -t A -o S -w massdns_output.txt",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["reconnaissance", "active"],
        outputExample: "Generated 450 domains\nResolved 23 domains\nSaved to massdns_output.txt",
        referenceUrl: "https://github.com/ProjectAnte/dnsgen"
      }
    ]
  },
  {
    id: "url-collection",
    name: "URL Collection",
    description: "Gathers URLs from a target domain for further analysis.",
    commands: [
      {
        id: "gau-url-collection",
        name: "GetAllUrls Collection",
        description: "Uses GetAllUrls (gau) to discover URLs from various sources.",
        command: "gau {domain} | tee urls.txt",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["reconnaissance", "passive"],
        referenceUrl: "https://github.com/lc/gau"
      },
      {
        id: "waybackurls",
        name: "WaybackURLs",
        description: "Extracts URLs from Wayback Machine for a specific domain",
        command: "waybackurls {domain} | tee waybackurls.txt",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["reconnaissance", "passive"],
        outputExample: "https://example.com/login.php\nhttps://example.com/admin/dashboard\nhttps://example.com/products?id=123\nhttps://example.com/api/v1/users",
        referenceUrl: "https://github.com/tomnomnom/waybackurls"
      },
      {
        id: "hakrawler",
        name: "Hakrawler Web Crawler",
        description: "Fast web crawler for gathering URLs and JavaScript file locations",
        command: "echo {domain} | hakrawler -depth {depth} -scope {scope}",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          },
          {
            key: "depth",
            description: "Crawl depth",
            defaultValue: "2",
            required: true,
            type: "number"
          },
          {
            key: "scope",
            description: "Crawl scope",
            defaultValue: "subs",
            required: true,
            type: "select",
            options: ["subs", "strict", "fuzzy"]
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "active"],
        outputExample: "https://example.com/login\nhttps://example.com/admin\nhttps://example.com/assets/main.js\nhttps://api.example.com/v1/users",
        referenceUrl: "https://github.com/hakluke/hakrawler"
      }
    ]
  },
  {
    id: "sensitive-data-discovery",
    name: "Sensitive Data Discovery",
    description: "Scans for potentially sensitive information disclosure.",
    commands: [
      {
        id: "nuclei-exposures",
        name: "Nuclei Exposures Scan",
        description: "Scans for exposed sensitive data using Nuclei templates.",
        command: "nuclei -u https://{domain} -t exposures/",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "active"],
        referenceUrl: "https://github.com/projectdiscovery/nuclei"
      },
      {
        id: "gf-patterns",
        name: "GF Patterns",
        description: "Searches URLs for sensitive patterns using GF tool",
        command: "cat urls.txt | gf {pattern}",
        placeholders: [
          {
            key: "pattern",
            description: "Pattern to search for",
            defaultValue: "ssrf",
            required: true,
            type: "select",
            options: ["ssrf", "xss", "sqli", "redirect", "rce", "lfi", "idor", "secrets"]
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "passive"],
        outputExample: "https://example.com/redirect?url=https://attacker.com\nhttps://example.com/login?return_to=https://evil.com\nhttps://example.com/fetch?page=https://internal-service",
        referenceUrl: "https://github.com/tomnomnom/gf"
      },
      {
        id: "secretfinder",
        name: "SecretFinder",
        description: "Finds sensitive data like API keys and secrets in JavaScript files",
        command: "python3 SecretFinder.py -i https://{domain}{path} -o {output_file} -r",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          },
          {
            key: "path",
            description: "Path to JavaScript file",
            defaultValue: "/assets/js/main.js",
            required: true,
            type: "text"
          },
          {
            key: "output_file",
            description: "Output file",
            defaultValue: "secrets.json",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "passive"],
        outputExample: "Found the following secrets:\nAWS_KEY: AKIA1234567890ABCDEF\nGoogle API: AIzaSyD_qMJLy-0U1BhOg7RxCC_OpQC3C897YxA\nStripe API: sk_test_1234567890abcdefghijklmnopqrstuvwxyz",
        referenceUrl: "https://github.com/m4ll0k/SecretFinder"
      }
    ]
  },
  {
    id: "lfi-testing",
    name: "LFI Testing",
    description: "Tests for Local File Inclusion vulnerabilities.",
    commands: [
      {
        id: "ffuf-lfi",
        name: "FFUF LFI Fuzzing",
        description: "Fuzzes paths for LFI vulnerabilities using FFUF.",
        command: "ffuf -u \"https://{domain}/FUZZ\" -w {wordlist} -fr \"{filter}\"",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          },
          {
            key: "wordlist",
            description: "Path to LFI wordlist",
            defaultValue: "lfi-payloads.txt",
            required: true,
            type: "text"
          },
          {
            key: "filter",
            description: "Response filter",
            defaultValue: "not found",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["vulnerability", "active"],
        referenceUrl: "https://github.com/ffuf/ffuf"
      }
    ]
  },
  {
    id: "cors-testing",
    name: "CORS Testing",
    description: "Tests for Cross-Origin Resource Sharing misconfigurations.",
    commands: [
      {
        id: "curl-cors",
        name: "cURL CORS Check",
        description: "Uses cURL to test CORS headers with a malicious origin.",
        command: "curl -I -X OPTIONS https://{domain} -H \"Origin: {evil-origin}\"",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          },
          {
            key: "evil-origin",
            description: "Malicious origin",
            defaultValue: "evil.com",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["vulnerability", "active"],
        referenceUrl: "https://book.hacktricks.xyz/pentesting-web/cors-bypass"
      }
    ]
  },
  {
    id: "wordpress-scanning",
    name: "WordPress Scanning",
    description: "Scans WordPress installations for vulnerabilities.",
    commands: [
      {
        id: "wpscan-basic",
        name: "Basic WPScan",
        description: "Performs a basic WPScan enumeration of a WordPress site.",
        command: "wpscan --url https://{domain} --enumerate u",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["cms", "active"],
        referenceUrl: "https://github.com/wpscanteam/wpscan"
      }
    ]
  },
  {
    id: "network-scanning",
    name: "Network Scanning",
    description: "Scans network services and ports.",
    commands: [
      {
        id: "nmap-service-scan",
        name: "Nmap Service Scan",
        description: "Scans for service versions on all ports.",
        command: "nmap -sV -p- {domain}",
        placeholders: [
          {
            key: "domain",
            description: "Target domain or IP (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "active"],
        referenceUrl: "https://nmap.org/"
      }
    ]
  },
  {
    id: "parameter-discovery",
    name: "Parameter Discovery",
    description: "Discovers hidden parameters in web applications.",
    commands: [
      {
        id: "paramspider",
        name: "ParamSpider",
        description: "Uses ParamSpider to find URL parameters.",
        command: "paramspider -d {domain}",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["reconnaissance", "passive"],
        referenceUrl: "https://github.com/devanshbatham/ParamSpider"
      }
    ]
  },
  {
    id: "javascript-analysis",
    name: "JavaScript Analysis",
    description: "Analyzes JavaScript files for sensitive information.",
    commands: [
      {
        id: "getjs-secrets",
        name: "Extract JS Secrets",
        description: "Extracts and searches for secrets in JavaScript files.",
        command: "getJS --url https://{domain} | grep -E \"api|token|secret|key|password|user|username|login|sign\"",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["reconnaissance", "passive"],
        referenceUrl: "https://github.com/003random/getJS"
      }
    ]
  },
  {
    id: "api-security",
    name: "API Security Testing",
    description: "Tests the security of APIs and RESTful web services.",
    icon: "code-branch",
    commands: [
      {
        id: "jwt-scanning",
        name: "JWT Token Scanner",
        description: "Analyzes JWT tokens for vulnerabilities and weaknesses.",
        command: "jwt_tool {token} -M all",
        placeholders: [
          {
            key: "token",
            description: "JWT token to analyze",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["api", "authentication", "active"],
        outputExample: "Token header: { \"alg\": \"HS256\", \"typ\": \"JWT\" }\nPossible attacks: Algorithm confusion, None algorithm vulnerability",
        referenceUrl: "https://github.com/ticarpi/jwt_tool"
      },
      {
        id: "api-fuzzer",
        name: "API Parameter Fuzzing",
        description: "Fuzzes API endpoints for parameter vulnerabilities",
        command: "ffuf -u \"https://{domain}/api/{endpoint}?FUZZ=test\" -w {wordlist} -mc all -fc 404",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., api.example.com)",
            required: true,
            type: "text"
          },
          {
            key: "endpoint",
            description: "API endpoint path (e.g., v1/users)",
            required: true,
            type: "text"
          },
          {
            key: "wordlist",
            description: "Path to parameter wordlist",
            defaultValue: "/usr/share/wordlists/api-params.txt",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["api", "fuzzing", "active"],
        outputExample: "id [Status: 200, Size: 863]\nemail [Status: 200, Size: 712]\nrole [Status: 200, Size: 245]\ntoken [Status: 500, Size: 347]",
        referenceUrl: "https://github.com/ffuf/ffuf"
      },
      {
        id: "broken-auth-check",
        name: "Broken Authentication Check",
        description: "Tests for broken authentication in APIs",
        command: "for i in {1..5}; do curl -s -X GET -H \"Authorization: Bearer {token}\" https://{domain}/api/{endpoint}/$i; done",
        placeholders: [
          {
            key: "token",
            description: "Authentication token",
            required: true,
            type: "text"
          },
          {
            key: "domain",
            description: "Target domain (e.g., api.example.com)",
            required: true,
            type: "text"
          },
          {
            key: "endpoint",
            description: "API endpoint (e.g., users)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["api", "authentication", "active"],
        outputExample: "User ID: 1 - Access granted\nUser ID: 2 - Access granted\nUser ID: 3 - Access granted\nUser ID: 4 - Access granted\nUser ID: 5 - Access granted",
        referenceUrl: "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
      },
      {
        id: "graphql-introspection",
        name: "GraphQL Introspection",
        description: "Performs GraphQL schema introspection to map available operations",
        command: "curl -s -X POST https://{domain}/graphql -H \"Content-Type: application/json\" -d '{\"query\":\"{__schema{queryType{name}mutationType{name}subscriptionType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}\"}' | jq",
        placeholders: [
          {
            key: "domain",
            description: "Target domain with GraphQL endpoint (e.g., api.example.com)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["api", "graphql", "active"],
        referenceUrl: "https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql"
      },
      {
        id: "api-mass-assignment",
        name: "API Mass Assignment Test",
        description: "Tests for mass assignment vulnerabilities in API endpoints",
        command: "curl -s -X PUT https://{domain}/api/{endpoint}/{id} -H \"Content-Type: application/json\" -H \"Authorization: Bearer {token}\" -d '{\"user_data\":\"normal\",\"admin\":true,\"role\":\"admin\"}'",
        placeholders: [
          {
            key: "domain",
            description: "Target domain (e.g., api.example.com)",
            required: true,
            type: "text"
          },
          {
            key: "endpoint",
            description: "API endpoint (e.g., users)",
            required: true,
            type: "text"
          },
          {
            key: "id",
            description: "Resource ID",
            required: true,
            type: "text"
          },
          {
            key: "token",
            description: "Authentication token",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["api", "active"],
        outputExample: "{\"status\":\"success\",\"message\":\"User updated\",\"user\":{\"id\":\"123\",\"user_data\":\"normal\",\"admin\":true,\"role\":\"admin\"}}",
        referenceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html"
      }
    ]
  },
  {
    id: "mobile-app-security",
    name: "Mobile App Security Testing",
    description: "Tests the security of mobile applications and their backends.",
    icon: "mobile-alt",
    commands: [
      {
        id: "apk-decompile",
        name: "APK Decompiling",
        description: "Decompiles an Android APK to extract source code and resources",
        command: "apktool d {apk_file} -o {output_dir}",
        placeholders: [
          {
            key: "apk_file",
            description: "Path to APK file",
            required: true,
            type: "text"
          },
          {
            key: "output_dir",
            description: "Output directory",
            defaultValue: "decompiled_apk",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["mobile", "android", "reverse-engineering"],
        outputExample: "I: Using Apktool 2.6.1\nI: Decoding AndroidManifest.xml\nI: Decoding resources\nI: Copying assets and libs\nI: Copying unknown files\nI: Finished in 5 seconds",
        referenceUrl: "https://ibotpeaches.github.io/Apktool/"
      },
      {
        id: "mobile-api-intercept",
        name: "Mobile API Interception",
        description: "Sets up a proxy to intercept mobile app API traffic",
        command: "mitmproxy -p {port} --set block_global=false --ssl-insecure",
        placeholders: [
          {
            key: "port",
            description: "Proxy port",
            defaultValue: "8080",
            required: true,
            type: "number"
          }
        ],
        difficulty: "medium",
        tags: ["mobile", "proxy", "traffic-analysis"],
        outputExample: "Proxy server running at 127.0.0.1:8080\nWeb interface available at http://127.0.0.1:8081/",
        referenceUrl: "https://docs.mitmproxy.org/stable/"
      },
      {
        id: "android-ssl-pinning-bypass",
        name: "Android SSL Pinning Bypass",
        description: "Uses Frida to bypass SSL certificate pinning in Android apps",
        command: "frida -U -f {package_name} -l ssl_pinning_bypass.js --no-pause",
        placeholders: [
          {
            key: "package_name",
            description: "Android app package name (e.g., com.example.app)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["mobile", "android", "frida", "ssl-pinning"],
        outputExample: "Spawned `com.example.app`. Resuming main thread!\n[+] SSL Pinning Bypass Loaded\n[+] Bypassing SSL validation checks",
        referenceUrl: "https://github.com/httptoolkit/frida-android-unpinning"
      },
      {
        id: "ios-app-binary-analysis",
        name: "iOS App Binary Analysis",
        description: "Analyzes an iOS app binary for security issues",
        command: "ipa-dump {ipa_file} && otool -L {app_binary}",
        placeholders: [
          {
            key: "ipa_file",
            description: "Path to IPA file",
            required: true,
            type: "text"
          },
          {
            key: "app_binary",
            description: "Path to app binary",
            defaultValue: "Payload/App.app/App",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["mobile", "ios", "reverse-engineering"],
        outputExample: "Extracting IPA...\nLinked libraries:\n/System/Library/Frameworks/UIKit.framework/UIKit\n/System/Library/Frameworks/CoreData.framework/CoreData\n/usr/lib/libsqlite3.dylib",
        referenceUrl: "https://github.com/secmobi/wiki.secmobi.com"
      },
      {
        id: "mobile-app-dynamic-analysis",
        name: "Mobile App Dynamic Analysis",
        description: "Performs dynamic analysis on a running mobile app",
        command: "objection explore --startup-command \"android hooking watch class {class_name}\"",
        placeholders: [
          {
            key: "class_name",
            description: "Java class to hook (e.g., com.example.app.Authentication)",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["mobile", "android", "dynamic-analysis"],
        outputExample: "Watching class com.example.app.Authentication\n[*] Registering job...\n[*] Connected to Frida!\n[*] Method checkCredentials called with arguments:\n  Username: admin\n  Password: password123",
        referenceUrl: "https://github.com/sensepost/objection"
      }
    ]
  },
  {
    id: "cloud-security",
    name: "Cloud Security Testing",
    description: "Tests the security of cloud environments including AWS, Azure, and GCP.",
    icon: "cloud",
    commands: [
      {
        id: "aws-s3-public-buckets",
        name: "AWS S3 Public Buckets Scanner",
        description: "Checks for publicly accessible S3 buckets",
        command: "aws s3api list-buckets --query 'Buckets[].Name' --output text | xargs -I {} aws s3api get-bucket-acl --bucket {} | grep -A 1 \"AllUsers\"",
        placeholders: [],
        difficulty: "medium",
        tags: ["cloud", "aws", "s3", "reconnaissance"],
        outputExample: "{\n    \"Grantee\": {\n        \"Type\": \"Group\",\n        \"URI\": \"http://acs.amazonaws.com/groups/global/AllUsers\"\n    },\n    \"Permission\": \"READ\"\n}",
        referenceUrl: "https://docs.aws.amazon.com/cli/latest/reference/s3api/get-bucket-acl.html"
      },
      {
        id: "aws-iam-check-permissions",
        name: "AWS IAM Permissions Check",
        description: "Checks the permissions of the current IAM user or role",
        command: "aws iam get-user && aws iam list-attached-user-policies --user-name {user_name}",
        placeholders: [
          {
            key: "user_name",
            description: "AWS IAM username",
            required: true,
            type: "text"
          }
        ],
        difficulty: "easy",
        tags: ["cloud", "aws", "iam", "permissions"],
        outputExample: "{\n    \"User\": {\n        \"UserName\": \"security-tester\",\n        \"UserId\": \"AIDA12345EXAMPLE\",\n        \"Arn\": \"arn:aws:iam::123456789012:user/security-tester\",\n        \"CreateDate\": \"2023-01-01T00:00:00Z\"\n    }\n}\n{\n    \"AttachedPolicies\": [\n        {\n            \"PolicyName\": \"AmazonS3ReadOnlyAccess\",\n            \"PolicyArn\": \"arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess\"\n        }\n    ]\n}",
        referenceUrl: "https://docs.aws.amazon.com/cli/latest/reference/iam/"
      },
      {
        id: "prowler-aws-audit",
        name: "Prowler AWS Security Audit",
        description: "Runs Prowler to perform AWS security best practices assessment",
        command: "prowler {aws_profile} -c {check_groups}",
        placeholders: [
          {
            key: "aws_profile",
            description: "AWS CLI profile name",
            defaultValue: "default",
            required: true,
            type: "text"
          },
          {
            key: "check_groups",
            description: "Check groups to run",
            defaultValue: "check11,check12,check13,check14,check15",
            required: true,
            type: "text"
          }
        ],
        difficulty: "hard",
        tags: ["cloud", "aws", "audit", "compliance"],
        outputExample: "1.1 [INFO] Avoid the use of the root account (Scored)\n\n 1.1 [PASS] Root user has MFA enabled\n\n 1.2 [FAIL] Password policy requires at least one uppercase letter",
        referenceUrl: "https://github.com/prowler-cloud/prowler"
      },
      {
        id: "azure-security-scan",
        name: "Azure Security Scanner",
        description: "Scans Azure resources for security issues using az cli",
        command: "az security assessment list --subscription {subscription_id} --query \"[].{Name:displayName, Status:status.code, Severity:metadata.severity}\"",
        placeholders: [
          {
            key: "subscription_id",
            description: "Azure subscription ID",
            required: true,
            type: "text"
          }
        ],
        difficulty: "medium",
        tags: ["cloud", "azure", "audit"],
        outputExample: "[\n  {\n    \"Name\": \"Enable MFA for accounts with owner permissions\",\n    \"Severity\": \"High\",\n    \"Status\": \"Unhealthy\"\n  },\n  {\n    \"Name\": \"HTTP should be redirected to HTTPS in your web app\",\n    \"Severity\": \"Medium\",\n    \"Status\": \"Healthy\"\n  }\n]",
        referenceUrl: "https://docs.microsoft.com/en-us/cli/azure/security"
      },
      {
        id: "gcp-firewall-rules",
        name: "GCP Firewall Rules Analyzer",
        description: "Lists and analyzes GCP firewall rules for security issues",
        command: "gcloud compute firewall-rules list --format=\"table(name,network,direction,priority,allowed.ports,sourceRanges)\"",
        placeholders: [],
        difficulty: "medium",
        tags: ["cloud", "gcp", "firewall", "networking"],
        outputExample: "NAME                   NETWORK  DIRECTION  PRIORITY  ALLOWED               SOURCE_RANGES\ndefault-allow-internal  default  INGRESS    65534     all                   10.128.0.0/9\ndefault-allow-ssh       default  INGRESS    65534     tcp:22                0.0.0.0/0",
        referenceUrl: "https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules"
      },
      {
        id: "cloud-bucket-discovery",
        name: "Cloud Storage Bucket Discovery",
        description: "Attempts to discover cloud storage buckets for a target",
        command: "cloud_enum -k {keyword} -t {concurrency}",
        placeholders: [
          {
            key: "keyword",
            description: "Company name or keyword to search for",
            required: true,
            type: "text"
          },
          {
            key: "concurrency",
            description: "Number of concurrent threads",
            defaultValue: "50",
            required: true,
            type: "number"
          }
        ],
        difficulty: "medium",
        tags: ["cloud", "aws", "azure", "gcp", "reconnaissance"],
        outputExample: "Found: example-app.s3.amazonaws.com (AWS)\nFound: exampleapp.blob.core.windows.net (Azure)\nFound: storage.googleapis.com/example-dev (GCP)",
        referenceUrl: "https://github.com/initstring/cloud_enum"
      },
      {
        id: "lambda-security-check",
        name: "AWS Lambda Security Check",
        description: "Checks AWS Lambda functions for security issues",
        command: "aws lambda list-functions --query \"Functions[*].[FunctionName,Runtime,Role,Environment.Variables]\" --output json",
        placeholders: [],
        difficulty: "medium",
        tags: ["cloud", "aws", "lambda", "serverless"],
        outputExample: "[\n  [\n    \"api-handler\",\n    \"nodejs14.x\",\n    \"arn:aws:iam::123456789012:role/api-lambda-role\",\n    {\n      \"DB_PASSWORD\": \"REDACTED\",\n      \"API_KEY\": \"abcdef12345\"\n    }\n  ]\n]",
        referenceUrl: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
      }
    ]
  }
]; 