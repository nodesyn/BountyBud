# Nmap Cheatsheet

## Basic Scanning
- `nmap <target>`: Basic scan of the top 1000 TCP ports.
- `nmap -sV <target>`: Version detection for services.
- `nmap -O <target>`: OS detection (requires root/admin privileges).
- `nmap -A <target>`: Aggressive scan (enables OS detection, version detection, script scanning, and traceroute).
- `nmap -p <port_range> <target>`: Scan specific ports (e.g., `nmap -p 22,80,443 <target>`).
- `nmap -p- <target>`: Scan all 65535 TCP ports.
- `nmap -F <target>`: Fast scan (scans the 100 most common ports).

## Scan Types
- `nmap -sS <target>`: TCP SYN (stealth) scan (default for privileged users).
- `nmap -sT <target>`: TCP Connect scan (default for unprivileged users).
- `nmap -sU <target>`: UDP scan.
- `nmap -sN <target>`: TCP Null scan.
- `nmap -sF <target>`: TCP FIN scan.
- `nmap -sX <target>`: TCP Xmas scan.

## Target Specification
- `nmap <target_ip>`: Scan a single IP.
- `nmap <hostname>`: Scan a hostname.
- `nmap <ip_range>`: Scan an IP range (e.g., `192.168.1.0/24` or `192.168.1.1-254`).
- `nmap -iL <targets_file.txt>`: Scan targets from a file.

## Output Formats
- `nmap -oN <output_file.nmap> <target>`: Normal output.
- `nmap -oX <output_file.xml> <target>`: XML output.
- `nmap -oG <output_file.gnmap> <target>`: Grepable output.
- `nmap -oA <basename> <target>`: Output in all three major formats (normal, XML, grepable).

## NSE (Nmap Scripting Engine)
- `nmap --script <script_name> <target>`: Run a specific NSE script.
- `nmap --script default <target>`: Run default safe scripts.
- `nmap --script vuln <target>`: Run vulnerability detection scripts.
- `nmap --script-help <script_name>`: Get help for a specific script.
- `nmap --script-updatedb`: Update the script database.

### Example NSE Scripts:
- `nmap --script http-title <target>`: Get HTTP titles from web servers.
- `nmap -sV --script vulners --script-args mincvss=7.0 <target>`: Scan for vulnerabilities using Vulners.com database (filter by CVSS score).
- `nmap --script banner <target>`: Grab service banners.
- `nmap --script ssl-enum-ciphers -p 443 <target>`: Enumerate SSL/TLS ciphers.

## Performance and Timing
- `nmap -T<0-5> <target>`: Set timing template (0=paranoid, 1=sneaky, 2=polite, 3=normal, 4=aggressive, 5=insane).
  - `nmap -T4 <target>` is a common choice for faster scans.
- `--min-rate <number>`: Send packets no slower than <number> per second.
- `--max-rate <number>`: Send packets no faster than <number> per second.
- `--min-parallelism <number>`: Set minimum number of parallel probes.
- `--max-parallelism <number>`: Set maximum number of parallel probes.

## Evasion & Spoofing (Use Ethically and Legally)
- `nmap -D <decoy1,decoy2,ME,...> <target>`: Cloak a scan with decoys. `ME` refers to your actual IP.
- `nmap -S <spoofed_ip> <target>`: Spoof source IP address (often requires a specific network setup and might not work).
- `nmap -e <interface> <target>`: Use a specific network interface.
- `nmap --source-port <port_num>` or `nmap -g <port_num>`: Spoof source port number.
- `--data-length <number>`: Append random data to sent packets.
- `--mtu <value>`: Set custom MTU.

## Firewall/IDS Evasion Techniques
- `-f`: Fragment packets (smaller MTU).
- `--badsum`: Send packets with a bogus TCP/UDP/SCTP checksum.

## Other Useful Options
- `-v`: Increase verbosity level.
- `-vv`: Increase verbosity even more.
- `-d`: Increase debugging level.
- `-n`: No DNS resolution.
- `-R`: Resolve DNS for all targets.
- `--reason`: Display the reason a port is in a particular state.
- `--open`: Only show open (or possibly open) ports.
- `--iflist`: Show host interfaces and routes.
- `--resume <nmap_output_file>`: Resume an aborted scan.

**Disclaimer:** Always ensure you have explicit permission before scanning any target. Unauthorized scanning can be illegal. 