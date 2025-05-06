# BountyBud

BountyBud is a comprehensive toolkit for bug bounty hunters and security researchers designed to streamline the workflow of security testing. The platform generates optimized command-line commands, provides a curated collection of security tools, and offers resources to enhance your bug hunting workflow.

![BountyBud Screenshot](public/screenshot.png)

## Features

- **Quick Start Domain Reconnaissance**: Enter a domain on the homepage to instantly generate basic reconnaissance commands
- **Command Generation Tool**: Configure and generate complex command-line commands for various security testing scenarios
- **Command History**: Save and reuse previously generated commands
- **Command Chaining**: Create scripts by combining multiple commands in sequence
- **Security Tools Database**: Browse curated list of security tools with installation instructions and documentation links
- **Browser Extensions Collection**: Discover essential browser extensions for bug bounty hunting, filtered by category and browser compatibility
- **Modern UI**: Dark-themed interface designed specifically for security professionals

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/BountyBud.git
cd BountyBud

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Quick Start**: Enter a domain on the homepage to generate basic reconnaissance commands
2. **Command Generation**: 
   - Navigate to the Command Generator tool
   - Select a command category and specific command
   - Configure parameters as needed
   - Generate and copy the command for use in your terminal
3. **Command Chaining**:
   - Generate multiple commands
   - Add them to your command chain
   - Export as a bash script for batch execution
4. **Security Tools**: Browse the security tools section to discover new tools for your arsenal
5. **Browser Extensions**: Explore recommended browser extensions to enhance your testing capabilities

## Project Structure

```
/app                     # Next.js App Router
  /page.tsx              # Home page with Quick Start functionality
  /layout.tsx            # Root layout
  /tools                 # Command generation tool
  /security-tools        # Security tools section
  /browser-extensions    # Browser extensions section
  /data                  # Data files for commands, tools, and extensions
/components              # Reusable UI components
/public                  # Static assets
```

## Technologies

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT 