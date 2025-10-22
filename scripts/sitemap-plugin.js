// scripts/sitemap-plugin.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

// Helper function to generate URL-friendly slugs from titles
function generateSlug(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
    // Get static routes with priorities
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.9', changefreq: 'monthly' },
      { url: '/contact-us', priority: '0.9', changefreq: 'monthly' },
      { url: '/apply', priority: '0.9', changefreq: 'monthly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/careers', priority: '0.8', changefreq: 'weekly' },
      { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    ];
    
    // Get dynamic routes from API or local file
    const dynamicRoutes = await getDynamicRoutes();
    
    // Combine all routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate sitemap XML
    const sitemap = generateSitemapXml(siteUrl, allRoutes);
    
    // Write to file
    fs.writeFileSync(outputPath, sitemap);
    
    console.log(`✅ Sitemap generated successfully at ${outputPath}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    console.log(`   - Static pages: ${staticRoutes.length}`);
    console.log(`   - Dynamic pages: ${dynamicRoutes.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

async function getDynamicRoutes() {
  const routes = [];
  
  try {
    // Try to get courses from API
    try {
      const coursesResponse = await axios.get('https://be.edigital.globalinfosofts.com/courses/', {
        timeout: 10000
      });
      if (coursesResponse.data && Array.isArray(coursesResponse.data)) {
        console.log(`🏛️ Found ${coursesResponse.data.length} courses from API`);
        coursesResponse.data.forEach(course => {
          if (course.slug) {
            routes.push({
              url: `/courses/${course.slug}`,
              priority: '0.8',
              changefreq: 'weekly'
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️  Could not fetch courses from API, trying local file...');
      
      // Fallback to local file
      try {
        const coursesPath = path.resolve(__dirname, '../public/data/courses.json');
        if (fs.existsSync(coursesPath)) {
          const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
          if (Array.isArray(coursesData)) {
            console.log(`🏛️ Found ${coursesData.length} courses from local file`);
            coursesData.forEach(course => {
              if (course.slug) {
                routes.push({
                  url: `/courses/${course.slug}`,
                  priority: '0.8',
                  changefreq: 'weekly'
                });
              }
            });
          }
        }
      } catch (localError) {
        console.error('❌ Error reading local courses file:', localError.message);
      }
    }
    
    // Try to get blog posts from API
    try {
      const blogResponse = await axios.get('https://be.edigital.globalinfosofts.com/blog/', {
        timeout: 10000
      });
      if (blogResponse.data && Array.isArray(blogResponse.data)) {
        console.log(`📝 Found ${blogResponse.data.length} blog posts from API`);
        blogResponse.data.forEach(post => {
          // Generate slug from h1 title or use existing slug
          const slug = post.slug || generateSlug(post.h1 || `post-${post.id}`);
          if (slug) {
            routes.push({
              url: `/blog/${slug}`,
              priority: '0.7',
              changefreq: 'weekly',
              lastmod: post.created_at || post.updated_at
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️  Could not fetch blog posts from API:', error.message);
    }
  } catch (error) {
    console.error('❌ Error fetching dynamic routes:', error.message);
  }
  
  return routes;
}

function generateSitemapXml(siteUrl, routes) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';
  xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
  xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  xml += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
  
  routes.forEach(route => {
    // Handle both string and object route formats
    const url = typeof route === 'string' ? route : route.url;
    const priority = typeof route === 'object' ? route.priority : '0.8';
    const changefreq = typeof route === 'object' ? route.changefreq : 'weekly';
    const lastmod = typeof route === 'object' && route.lastmod ? 
      new Date(route.lastmod).toISOString().split('T')[0] : today;
    
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// For direct execution from command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap().catch(console.error);
}