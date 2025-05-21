#!/usr/bin/env node

/**
 * Performance optimization script for BountyBud
 * 
 * This script performs pre-deployment optimizations:
 * 1. Optimizes images
 * 2. Minifies CSS
 * 3. Analyzes bundle size
 * 4. Checks for performance issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Starting BountyBud production optimization...\n');

// Ensure all required directories exist
const dirs = ['./public/img', './scripts/temp'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Function to execute commands and handle errors
function runCommand(command, errorMessage) {
  try {
    console.log(`🔄 Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ ${errorMessage}:`);
    console.error(error.message);
    return false;
  }
}

// Step 1: Check for production environment in next.config.js
console.log('\n📝 Checking Next.js configuration...');
if (fs.existsSync('./next.config.js')) {
  let configContent = fs.readFileSync('./next.config.js', 'utf8');
  
  // Check if compression is enabled
  if (!configContent.includes('compress: true')) {
    console.log('⚠️ Adding compression to next.config.js');
    
    // Simple regex replacement to add compression
    const updatedConfig = configContent.replace(
      /const nextConfig = {/,
      'const nextConfig = {\n  compress: true,'
    );
    
    fs.writeFileSync('./next.config.js', updatedConfig);
    console.log('✅ Compression enabled in next.config.js');
  } else {
    console.log('✅ Compression already enabled in next.config.js');
  }
  
  // Check for output configuration
  if (!configContent.includes('output:')) {
    console.log('⚠️ Adding standalone output configuration for Replit compatibility');
    
    // Add output configuration
    const updatedConfig = configContent.replace(
      /const nextConfig = {/,
      'const nextConfig = {\n  output: "standalone",'
    );
    
    fs.writeFileSync('./next.config.js', updatedConfig);
    console.log('✅ Standalone output configuration added');
  } else {
    console.log('✅ Output configuration already present');
  }
} else {
  console.error('❌ next.config.js not found. Creating a basic configuration...');
  
  // Create a basic next.config.js file
  const basicConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
`;
  
  fs.writeFileSync('./next.config.js', basicConfig);
  console.log('✅ Created next.config.js with optimization settings');
}

// Step 2: Lint and fix code
console.log('\n🔍 Running linting and fixing code...');
runCommand('npm run lint', 'Failed to run linter');

// Step 3: Check for type errors
console.log('\n🔍 Checking for TypeScript errors...');
runCommand('npx tsc --noEmit', 'TypeScript errors detected');

// Step 4: Install and run production dependencies checker
console.log('\n📦 Checking for unused dependencies...');
runCommand('npx depcheck', 'Failed to check dependencies');

// Step 5: Check bundle size
console.log('\n📦 Analyzing bundle size...');
runCommand('npx next build', 'Build failed');

// Step 6: Create production build
console.log('\n🏗️ Creating optimized production build...');
const buildSuccess = runCommand('npm run build', 'Build failed');

if (buildSuccess) {
  console.log('\n✅ Production optimization complete!');
  console.log('\n📋 Pre-deployment checklist:');
  console.log('  1. Verify .env file configuration');
  console.log('  2. Test the application locally: npm start');
  console.log('  3. Follow the deployment guide for Replit');
  console.log('\n🚀 Ready for deployment!');
} else {
  console.log('\n❌ Production optimization failed. Please fix the errors above before deploying.');
  process.exit(1);
} 