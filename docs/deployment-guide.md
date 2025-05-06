# BountyBud Deployment Guide for Replit

This guide provides detailed instructions for deploying BountyBud to Replit for production use.

## Prerequisites

- A Replit account
- Basic familiarity with Git and command line

## Deployment Steps

### 1. Import from GitHub (Recommended)

1. Log in to your Replit account
2. Click on "Create Repl" or "+" button
3. Select "Import from GitHub"
4. Enter the repository URL for BountyBud
5. Choose "Next.js" as the template or "Node.js" if Next.js isn't available
6. Click "Import from GitHub"

### 2. Manual Upload (Alternative)

1. Create a new Node.js Repl
2. Upload the project files using Replit's file upload feature
3. Configure the project settings as described below

### 3. Configuration

Once your project is imported or uploaded, you'll need to configure a few settings:

#### Environment Variables

Create a `.env` file with the following variables (if they don't exist):

```
PORT=3000
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-repl-name.your-username.repl.co
```

Replace `your-repl-name.your-username.repl.co` with your actual Replit URL.

#### Package Scripts

Ensure your `package.json` contains the following scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

#### Replit Configuration

Make sure your `.replit` file contains:

```
run = "npm run start"
entrypoint = "app/page.tsx"

[env]
PORT = "3000"
NODE_ENV = "production"
```

And ensure your `replit.nix` file includes the necessary packages.

### 4. Build and Deploy

1. Open the Replit shell
2. Run the following commands:

```bash
npm install
npm run build
```

3. Once the build is complete, start the application:

```bash
npm run start
```

4. Replit should automatically detect the port and create a web view with your application

### 5. Setting Up Always-On (Optional)

For production use, you'll want your Repl to stay running even when you're not actively using it:

1. Click on the "Tools" button in the sidebar
2. Select "Always-On"
3. Toggle the switch to enable Always-On for your Repl

Note: Always-On is a paid feature on Replit. You'll need a subscription to use it.

### 6. Custom Domain Setup (Optional)

To use a custom domain with your Replit deployment:

1. Go to your Repl's settings
2. Click on the "Custom Domain" tab
3. Enter your domain name
4. Follow the DNS configuration instructions provided by Replit
5. Wait for DNS propagation (can take up to 48 hours)

### 7. Performance Optimization

For optimal performance on Replit:

1. Ensure static assets are properly optimized
2. Use the `next.config.js` compression and caching settings
3. Implement the image optimization hook created during development
4. Set appropriate cache headers for static assets

### 8. Post-Deployment Verification

After deployment, verify:

1. All pages load correctly
2. Command Generator tool works as expected
3. Security Tools and Browser Extensions pages display correctly
4. Responsive design works on mobile devices
5. Accessibility features function properly

### 9. Monitoring

Set up monitoring using:

1. Replit's built-in monitoring tools
2. UptimeRobot for external monitoring
3. The built-in analytics implemented in the app

### 10. Troubleshooting

Common issues and solutions:

#### Application not starting
- Check for errors in the Replit console
- Verify that all dependencies are correctly installed
- Check for port conflicts in the Replit environment

#### Slow performance
- Check for memory leaks
- Optimize image loading
- Implement proper caching

#### Styling issues
- Verify Tailwind CSS is properly configured
- Check for CSS specificity conflicts

## Maintenance

After deployment, follow the maintenance schedule outlined in the Monitoring and Maintenance Plan document.

## Backup and Recovery

1. Set up automatic Git synchronization in Replit
2. Create periodic snapshots of your Repl
3. Document any custom configurations made during deployment 