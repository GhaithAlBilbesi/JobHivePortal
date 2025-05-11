#!/usr/bin/env node

/**
 * JobHive Setup Script
 * This script helps initialize the project for local development.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n\x1b[33m=================================\x1b[0m');
console.log('\x1b[1m🐝 Welcome to JobHive Setup 🐝\x1b[0m');
console.log('\x1b[33m=================================\x1b[0m\n');

console.log('This script will help you set up JobHive for local development.\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`\x1b[36mNode.js version: ${nodeVersion}\x1b[0m`);

const minNodeVersion = 'v18.0.0';
if (compareVersions(nodeVersion, minNodeVersion) < 0) {
  console.log(`\x1b[31m⚠️  Warning: JobHive requires Node.js ${minNodeVersion} or higher.\x1b[0m`);
  console.log(`Please update your Node.js installation: https://nodejs.org/\n`);
} else {
  console.log('\x1b[32m✓ Node.js version is compatible\x1b[0m\n');
}

// Install dependencies
console.log('\x1b[36mInstalling dependencies...\x1b[0m');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('\x1b[32m✓ Dependencies installed successfully\x1b[0m\n');
} catch (error) {
  console.error('\x1b[31m✗ Failed to install dependencies\x1b[0m');
  console.error(error);
  process.exit(1);
}

// Setup complete
console.log('\n\x1b[32m=================================\x1b[0m');
console.log('\x1b[1m🎉 Setup Complete! 🎉\x1b[0m');
console.log('\x1b[32m=================================\x1b[0m\n');

console.log('To start the development server, run:');
console.log('\x1b[36mnpm run dev\x1b[0m\n');

console.log('Then open your browser at:');
console.log('\x1b[36mhttp://localhost:5000\x1b[0m\n');

console.log('Test account credentials:');
console.log('\x1b[36mStudent: student@jobhive.com / password123\x1b[0m');
console.log('\x1b[36mEmployer: employer@jobhive.com / password123\x1b[0m');
console.log('\x1b[36mAdmin: admin@jobhive.com / password123\x1b[0m\n');

console.log('Thank you for using JobHive!\n');

process.exit(0);

// Helper function to compare version strings
function compareVersions(v1, v2) {
  // Remove 'v' prefix if present
  v1 = v1.replace(/^v/, '');
  v2 = v2.replace(/^v/, '');
  
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  
  return 0;
}