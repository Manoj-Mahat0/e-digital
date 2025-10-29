const fs = require('fs');
const path = require('path');

// Function to create favicon files
function generateFavicons() {
  console.log('Generating favicon files...');
  
  // Check if logo.webp exists
  const logoPath = path.join(__dirname, '..', 'public', 'logo.webp');
  if (!fs.existsSync(logoPath)) {
    console.error('logo.webp not found in public directory');
    return;
  }
  
  // For now, we'll just copy the logo.webp to the required favicon files
  // In a production environment, you would convert these to proper formats and sizes
  
  try {
    // Copy logo.webp to favicon-16x16.png
    fs.copyFileSync(logoPath, path.join(__dirname, '..', 'public', 'favicon-16x16.png'));
    console.log('✓ Created favicon-16x16.png');
    
    // Copy logo.webp to favicon-32x32.png
    fs.copyFileSync(logoPath, path.join(__dirname, '..', 'public', 'favicon-32x32.png'));
    console.log('✓ Created favicon-32x32.png');
    
    // Copy logo.webp to apple-touch-icon.png
    fs.copyFileSync(logoPath, path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));
    console.log('✓ Created apple-touch-icon.png');
    
    console.log('Favicon generation completed!');
    console.log('\nTo properly create favicons, you should:');
    console.log('1. Convert your logo to proper ICO format (16x16, 32x32, 48x48)');
    console.log('2. Create PNG versions at exactly 16x16, 32x32, and 180x180 pixels');
    console.log('3. Replace the placeholder files with properly sized images');
    
  } catch (error) {
    console.error('Error generating favicon files:', error);
  }
}

// Run the function
generateFavicons();