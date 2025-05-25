# BountyBud Subdomain Enumeration Guide

Subdomain enumeration is a critical first step in the bug bounty hunting process that helps expand your attack surface by discovering additional entry points into your target's infrastructure.

## What is Subdomain Enumeration?

Subdomain enumeration is the process of finding valid subdomains for a domain. For example, if your target is `example.com`, subdomains might include `dev.example.com`, `api.example.com`, or `admin.example.com`.

## Why is Subdomain Enumeration Important?

- **Expanded Attack Surface**: Each subdomain represents a potential entry point
- **Forgotten Assets**: Organizations often forget about old subdomains that may have vulnerabilities
- **Development Environments**: Development/staging environments are typically less secure
- **Administrative Interfaces**: Admin panels may be accessible via specific subdomains
- **Different Technology Stacks**: Various subdomains may use different tech stacks with unique vulnerabilities

## Subdomain Enumeration Techniques

### 1. Passive Enumeration

Passive enumeration techniques collect subdomain information without directly interacting with the target infrastructure:

#### Using Subfinder

```bash
subfinder -d example.com -all -recursive > subdomain.txt
```

Key features:
- Uses multiple passive sources
- Recursive enumeration capability
- Fast and efficient

#### Using Amass in Passive Mode

```bash
amass enum -passive -d example.com -o amass_passive.txt
```

Key features:
- Comprehensive passive data sources
- Organized output
- Part of a larger framework

#### Certificate Transparency Logs

Certificate Transparency (CT) logs are a rich source of subdomain information:

```bash
curl "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' | sort -u
```

### 2. Active Enumeration

Active enumeration involves directly querying DNS servers or interacting with the target's infrastructure:

#### Using Amass in Active Mode

```bash
amass enum -active -d example.com -o amass_active.txt
```

Key features:
- DNS brute forcing
- Zone transfers
- Permutation scanning

#### DNS Brute Force with Gobuster

```bash
gobuster dns -d example.com -w /path/to/wordlist.txt -o gobuster_dns.txt
```

Recommended wordlists:
- SecLists/Discovery/DNS/subdomains-top1million-5000.txt
- SecLists/Discovery/DNS/fierce-hostlist.txt
- SecLists/Discovery/DNS/namelist.txt

#### Using MassDNS for Fast Resolution

```bash
massdns -r /path/to/resolvers.txt -t A -o S -w massdns_results.txt domains_to_resolve.txt
```

### 3. Subdomain Permutation and Alteration

Generating new potential subdomains based on discovered ones:

#### Using dnsgen

```bash
cat discovered_subdomains.txt | dnsgen - | massdns -r /path/to/resolvers.txt -t A -o S -w permutation_results.txt
```

#### Using Altdns

```bash
altdns -i subdomains.txt -o altered_wordlist.txt -w words.txt
```

## Filtering and Validation

After discovering potential subdomains, it's important to validate them:

### Filtering Live Subdomains with httpx

```bash
cat all_subdomains.txt | httpx -silent -status-code -title -tech-detect -o live_subdomains.txt
```

### Checking for HTTP/HTTPS Services

```bash
cat all_subdomains.txt | httprobe -c 50 -t 3000 > live_hosts.txt
```

## Advanced Techniques

### 1. Using ASN Information

```bash
amass intel -org "Target Organization" -asn
amass enum -active -d example.com -asn 12345,67890
```

### 2. Finding Subdomains Through GitHub

Search GitHub for:
- "example.com"
- "site:example.com"
- "domain:example.com"

### 3. Scraping Search Engines

Use tools like theHarvester:

```bash
theHarvester -d example.com -b all -f output.html
```

## Creating a Comprehensive Workflow

A typical subdomain enumeration workflow:

1. Run passive enumeration with multiple tools
2. Combine and deduplicate results
3. Run active enumeration techniques
4. Perform permutation scanning
5. Validate live subdomains
6. Categorize findings by technology/functionality
7. Prioritize targets for further testing

## BountyBud Integrated Commands

BountyBud offers several built-in commands for subdomain enumeration:

- **Basic Subdomain Discovery**: Fast subdomain discovery with subfinder
- **Live Subdomain Filtering**: Filter discovered subdomains with httpx
- **Amass Subdomain Enumeration**: Comprehensive subdomain discovery with Amass
- **DNSGen Wordlist Generation**: Generate potential subdomains through permutation

## Limitations and Considerations

- Some techniques may be noisy and detectable by the target
- Active scanning may be against the rules of some bug bounty programs
- Always check program policies before starting active enumeration
- Rate limiting may be necessary to avoid being blocked

## Resources and Tools

### Recommended Tools
- Subfinder: Passive subdomain discovery
- Amass: Comprehensive subdomain enumeration
- MassDNS: Fast subdomain resolution
- httpx: HTTP probing and technology detection
- Altdns/dnsgen: Subdomain permutation

### Useful Wordlists
- SecLists/Discovery/DNS/: Various subdomain wordlists
- JHaddix's all.txt: Comprehensive subdomain wordlist
- CommonSpeak2: Wordlist based on Certificate Transparency logs

## Future Enhancements

BountyBud plans to add more advanced subdomain enumeration capabilities:
- Automated workflow execution
- Visualization of subdomain relationships
- Integration with vulnerability scanning tools
- Subdomain monitoring for changes over time 