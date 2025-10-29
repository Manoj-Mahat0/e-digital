/**
 * Build optimization script to reduce render-blocking resources
 * This script analyzes the build output and optimizes CSS/JS loading
 */

const fs = require('fs');
const path = require('path');

// Function to inline critical CSS
function inlineCriticalCSS(indexPath) {
  try {
    // Read the index.html file
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Define critical CSS (this would be extracted from your actual critical styles)
    const criticalCSS = `
      body {
        margin: 0;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      #root {
        height: 100%;
      }
      
      .header-gradient {
        background: linear-gradient(to right, #7e22ce, #3b82f6);
      }
      
      .btn-primary {
        background: linear-gradient(to right, #7e22ce, #3b82f6);
        color: white;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .heading {
        font-weight: 700;
        line-height: 1.2;
        color: #1e293b;
      }
      
      .subheading {
        color: #64748b;
        line-height: 1.6;
      }
    `;
    
    // Insert critical CSS into the head
    indexContent = indexContent.replace(
      '</style>',
      `${criticalCSS.trim()}\n    </style>`
    );
    
    // Add async/defer attributes to scripts
    indexContent = indexContent.replace(
      /<script type="module" src="([^"]+)"><\/script>/g,
      '<script type="module" src="$1" async></script>'
    );
    
    // Add preload for critical resources
    const headEndIndex = indexContent.indexOf('</head>');
    if (headEndIndex > -1) {
      const preloadTags = `
    <link rel="preload" href="/assets/index-*.js" as="script">
    <link rel="preload" href="/assets/index-*.css" as="style">`;
      
      indexContent = indexContent.slice(0, headEndIndex) + 
                     preloadTags + 
                     indexContent.slice(headEndIndex);
    }
    
    // Write the optimized file
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('✓ Critical CSS inlined and scripts optimized');
  } catch (error) {
    console.error('Error optimizing build:', error);
  }
}

// Function to analyze and optimize JS chunks
function optimizeJSChunks(distPath) {
  try {
    const files = fs.readdirSync(distPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    console.log(`Found ${jsFiles.length} JavaScript files`);
    
    // For each JS file, we could implement additional optimizations
    // like removing unused code, but for now we'll just report sizes
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`  ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    });
    
    return jsFiles;
  } catch (error) {
    console.error('Error analyzing JS chunks:', error);
  }
}

// Function to analyze and optimize CSS files
function optimizeCSSFiles(distPath) {
  try {
    const files = fs.readdirSync(distPath);
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    console.log(`Found ${cssFiles.length} CSS files`);
    
    cssFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`  ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    });
    
    return cssFiles;
  } catch (error) {
    console.error('Error analyzing CSS files:', error);
  }
}

// Main optimization function
function optimizeBuild() {
  const distPath = path.join(__dirname, '..', 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  console.log('Starting build optimization...');
  
  // Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    console.error('Dist folder not found. Please run build first.');
    return;
  }
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found in dist folder.');
    return;
  }
  
  // Optimize the build
  inlineCriticalCSS(indexPath);
  optimizeJSChunks(distPath);
  optimizeCSSFiles(distPath);
  
  console.log('Build optimization completed!');
}

// Run optimization if called directly
if (require.main === module) {
  optimizeBuild();
}

module.exports = {
  optimizeBuild,
  inlineCriticalCSS,
  optimizeJSChunks,
  optimizeCSSFiles
};