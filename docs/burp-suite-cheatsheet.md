# Burp Suite Cheatsheet

## General Navigation & Setup
- **Proxy Tab**: Main area for intercepting and modifying HTTP/S traffic.
  - **Intercept is ON/OFF**: Toggle to capture or pass through requests.
  - **HTTP history**: Log of all requests made through the proxy.
  - **WebSockets history**: Log of WebSocket messages.
  - **Options**: Configure listener ports (default: `127.0.0.1:8080`), SSL passthrough, client/server SSL certificates.
- **Target Tab**: Site map and scope definition.
  - **Site map**: Tree structure of discovered application content.
  - **Scope**: Define what hosts and paths are in scope for testing.
    - Right-click on a request/host -> "Add to scope".
    - Configure scope settings to include/exclude specific items.
- **Intruder Tab**: Automated custom attacks.
  - **Positions**: Define payload positions in a request template.
  - **Payloads**: Configure payload sets (simple lists, custom iterators, etc.).
  - **Options**: Request engine settings, grep match, extract, and payload type settings.
- **Repeater Tab**: Manually modify and resend individual requests.
  - Send requests from Proxy or Target to Repeater (Ctrl+R or Cmd+R).
  - Modify request, click "Send", view response.
- **Sequencer Tab**: Analyze randomness of session tokens or other unpredictable data.
- **Decoder Tab**: Transform data (URL decode, Base64, Hex, etc.).
- **Comparer Tab**: Visually compare two pieces of data (e.g., two responses).
- **Extender Tab**: Manage Burp extensions (BApps).
  - **BApp Store**: Install community-contributed extensions.
  - **APIs**: For developing custom extensions.
- **Project Options Tab**: Settings for the current project (connections, SSL, display, etc.).
- **User Options Tab**: Global settings for Burp Suite (display, hotkeys, upstream proxy, etc.).

## Key Hotkeys (Default - Check User Options > Misc > Hotkeys)
- **Ctrl+R / Cmd+R**: Send request to Repeater.
- **Ctrl+I / Cmd+I**: Send request to Intruder.
- **Ctrl+F / Cmd+F**: Forward intercepted proxy message.
- **Ctrl+Shift+D / Cmd+Shift+D**: Open Decoder tab.
- **Ctrl+Shift+C / Cmd+Shift+C**: Open Comparer tab.
- **Ctrl+Shift+P / Cmd+Shift+P**: Open Project options.
- **Ctrl+Shift+U / Cmd+Shift+U**: Open User options.

## Proxy Workflow Tips
1. **Configure Browser**: Set browser to use Burp proxy (e.g., via FoxyProxy).
2. **Install Burp CA Certificate**: In your browser, to avoid SSL warnings for HTTPS sites.
   - Visit `http://burp` or `http://127.0.0.1:8080` and download the CA certificate.
3. **Define Scope**: Early on, define your target scope to filter noise.
4. **Intercept & Analyze**: Browse the application with intercept on (or view history).
5. **Action Requests**: 
   - **Send to Repeater**: For manual manipulation and re-sending.
   - **Send to Intruder**: For automated attacks (fuzzing, brute-force).
   - **Send to Sequencer**: For analyzing tokens.
   - **Do intercept / Do not intercept**: For specific request types or domains.

## Intruder Attack Types
- **Sniper**: Single payload set, iterates through positions one by one.
- **Battering ram**: Single payload set, places the same payload in all defined positions simultaneously.
- **Pitchfork**: Multiple payload sets, one payload set per position. Iterates through payload sets simultaneously.
- **Cluster bomb**: Multiple payload sets, tries every combination of payloads from each set.

## Useful Burp Extensions (BApp Store)
- **Logger++**: Enhanced logging and filtering of requests/responses.
- **Autorize**: Helps detect authorization bypasses.
- **Flow**: Provides a proxy history graph and better search/filtering.
- **Active Scan++**: Enhances active scanning capabilities.
- **Param Miner**: Discovers hidden, unlinked parameters.
- **Reflected Parameters**: Highlights reflected input in responses.
- **JSON Web Tokens (JWT4B)**: Decode and manipulate JWTs.
- **Software Version Reporter**: Passively reports versions of scanned software.

## Common Tasks & Where to Find Them
- **Searching HTTP History**: Proxy > HTTP history. Use the filter bar.
- **Saving/Loading Project**: Project menu > Save copy / Open project.
- **Spidering (Discovering Content)**: Target > Site map. Right-click host/folder > "Spider this host/branch". (Use with caution, can be noisy).
- **Active Scanning (Pro Version)**: Target > Site map. Right-click host/folder > "Actively scan this host/branch".
- **Passive Scanning**: Occurs automatically as you browse.
- **Engagements Tools**: Useful for documenting findings (Pro version).

## Tips for Effective Use
- **Filter, Filter, Filter**: Use display filters in Proxy history and Target sitemap extensively.
- **Scope is Your Friend**: Define it tightly to focus your testing.
- **Understand Your Target**: Don't just blindly run automated tools. Know what the application does.
- **Use Multiple Tabs**: Repeater and Intruder can have multiple tabs for different requests.
- **Check Extender Regularly**: New BApps are frequently added.
- **Read the Docs**: PortSwigger has excellent documentation on their website.

**Disclaimer:** Burp Suite is a powerful tool. Always ensure you have explicit, written permission before testing any application or system that you do not own. Unauthorized testing can lead to legal consequences. 