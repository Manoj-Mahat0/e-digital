// scripts/sitemap-plugin.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createSitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    async closeBundle() {
      await generateSitemap();
    }
  };
}

export async function generateSitemap() {
  const siteUrl = process.env.VITE_SITE_URL || 'https://edigital.globalinfosofts.com';
  const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');
  
  try {
    // Get static routes
    const staticRoutes = [
      '/',
      '/about',
      '/contact',
      '/apply'
    ];
    
    // Get dynamic routes from API or local file
    const dynamicRoutes = await getDynamicRoutes();
    
    // Combine all routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate sitemap XML
    const sitemap = generateSitemapXml(siteUrl, allRoutes);
    
    // Write to file
    fs.writeFileSync(outputPath, sitemap);
    
    console.log(`Sitemap generated at ${outputPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

async function getDynamicRoutes() {
  const routes = [];
  
  try {
    // Try to get courses from API
    try {
      const coursesResponse = await axios.get('https://be.edigital.globalinfosofts.com/courses/');
      if (coursesResponse.data && Array.isArray(coursesResponse.data)) {
        coursesResponse.data.forEach(course => {
          if (course.slug) {
            routes.push(`/courses/${course.slug}`);
          }
        });
      }
    } catch (error) {
      console.warn('Could not fetch courses from API, trying local file...');
      
      // Fallback to local file
      try {
        const coursesPath = path.resolve(__dirname, '../public/data/courses.json');
        if (fs.existsSync(coursesPath)) {
          const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
          if (Array.isArray(coursesData)) {
            coursesData.forEach(course => {
              if (course.slug) {
                routes.push(`/courses/${course.slug}`);
              }
            });
          }
        }
      } catch (localError) {
        console.error('Error reading local courses file:', localError);
      }
    }
    
    // Try to get blog posts from API
    try {
      const blogResponse = await axios.get('https://be.edigital.globalinfosofts.com/blog/');
      if (blogResponse.data && Array.isArray(blogResponse.data)) {
        blogResponse.data.forEach(post => {
          if (post.id) {
            routes.push(`/blog/${post.id}`);
          }
        });
      }
    } catch (error) {
      console.warn('Could not fetch blog posts from API');
    }
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
  }
  
  return routes;
}

function generateSitemapXml(siteUrl, routes) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${route}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// For direct execution from command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap().catch(console.error);
}