const fs = require('fs');
const path = require('path');

try {
  // Read package.json
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  console.log('Package.json Summary:');
  console.log('-----------------------');
  console.log(`Name: ${packageJson.name}`);
  console.log(`Version: ${packageJson.version}`);
  console.log(`Node Engine Requirement: ${packageJson.engines.node}`);

  // Check for important security-related packages
  const securityPackages = [
    'helmet', 'xss-clean', 'express-rate-limit',
    'react-markdown', 'remark-gfm', 'express'
  ];

  console.log('\nSecurity-Related Packages Check:');
  console.log('-----------------------');
  const deps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};
  securityPackages.forEach(pkg => {
    if (deps[pkg]) {
      console.log(`✅ ${pkg}: ${deps[pkg]}`);
    } else if (devDeps[pkg]) {
      console.log(`✅ ${pkg} (dev): ${devDeps[pkg]}`);
    } else {
      console.log(`❌ ${pkg}: Not installed`);
    }
  });

  console.log('\nScripts:');
  console.log('-----------------------');
  for (const [name, script] of Object.entries(packageJson.scripts || {})) {
    console.log(`${name}: ${script}`);
  }
} catch (error) {
  console.error('Error checking package.json:', error.message);
} 