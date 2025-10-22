// Build Verification Script
// Run this after building to check if everything is configured correctly
// Usage: node verify-build.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const htaccessPath = path.join(distPath, '.htaccess');

console.log('🔍 Verifying build for cPanel deployment...\n');

let errors = [];
let warnings = [];
let success = [];

// Check if dist folder exists
if (!fs.existsSync(distPath)) {
  errors.push('❌ dist folder not found. Run "npm run build" first.');
} else {
  success.push('✅ dist folder exists');
  
  // Check index.html
  if (!fs.existsSync(indexPath)) {
    errors.push('❌ index.html not found in dist folder');
  } else {
    success.push('✅ index.html exists');
    
    // Read and check index.html content
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    // Check for relative paths (bad)
    if (indexContent.includes('src="./assets/')) {
      errors.push('❌ Found relative paths (./assets/) in index.html');
      errors.push('   Fix: Set base: "/" in vite.config.js');
    } else if (indexContent.includes('src="/assets/')) {
      success.push('✅ Using absolute paths (/assets/) - Good!');
    }
    
    // Check for assets folder reference
    if (indexContent.includes('/assets/')) {
      const assetsPath = path.join(distPath, 'assets');
      if (!fs.existsSync(assetsPath)) {
        errors.push('❌ assets folder not found but referenced in HTML');
      } else {
        success.push('✅ assets folder exists');
        
        // Count JS and CSS files
        const files = fs.readdirSync(assetsPath);
        const jsFiles = files.filter(f => f.endsWith('.js'));
        const cssFiles = files.filter(f => f.endsWith('.css'));
        success.push(`✅ Found ${jsFiles.length} JS file(s) and ${cssFiles.length} CSS file(s)`);
      }
    }
  }
  
  // Check .htaccess
  if (!fs.existsSync(htaccessPath)) {
    errors.push('❌ .htaccess not found in dist folder');
    errors.push('   Fix: Ensure .htaccess is in public folder before building');
  } else {
    success.push('✅ .htaccess exists');
    
    // Check .htaccess content
    const htaccessContent = fs.readFileSync(htaccessPath, 'utf-8');
    
    if (!htaccessContent.includes('RewriteEngine On')) {
      warnings.push('⚠️  .htaccess missing "RewriteEngine On"');
    }
    
    if (!htaccessContent.includes('RewriteRule')) {
      warnings.push('⚠️  .htaccess missing RewriteRule for SPA routing');
    }
    
    if (htaccessContent.includes('application/javascript')) {
      success.push('✅ .htaccess has MIME type definitions');
    } else {
      warnings.push('⚠️  .htaccess missing MIME type definitions');
    }
  }
  
  // Check for common files
  const robotsPath = path.join(distPath, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    success.push('✅ robots.txt exists');
  } else {
    warnings.push('⚠️  robots.txt not found (optional but recommended)');
  }
  
  // Check data folder if it should exist
  const dataPath = path.join(distPath, 'data');
  if (fs.existsSync(dataPath)) {
    success.push('✅ data folder exists');
  }
}

// Print results
console.log('═══════════════════════════════════════════════════════');
console.log('SUCCESS:');
console.log('═══════════════════════════════════════════════════════');
success.forEach(s => console.log(s));

if (warnings.length > 0) {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('WARNINGS:');
  console.log('═══════════════════════════════════════════════════════');
  warnings.forEach(w => console.log(w));
}

if (errors.length > 0) {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('ERRORS:');
  console.log('═══════════════════════════════════════════════════════');
  errors.forEach(e => console.log(e));
  console.log('\n❌ Build has errors. Fix them before deploying!');
  process.exit(1);
} else {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('🎉 Build is ready for deployment!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\nNext steps:');
  console.log('1. Upload all files from dist/ folder to cPanel');
  console.log('2. Ensure .htaccess is uploaded');
  console.log('3. Set file permissions: Files=644, Folders=755');
  console.log('4. Test all routes including dynamic blog routes');
  console.log('\nSee DEPLOYMENT.md for detailed instructions.');
  process.exit(0);
}
