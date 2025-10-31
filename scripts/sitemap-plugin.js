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
  const siteUrl = process.env.VITE_SITE_URL || 'https://edigitalindian.com';
  const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');
  
  try {
    // Get static routes with priorities
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about-us', priority: '0.9', changefreq: 'monthly' },
      { url: '/contact-us', priority: '0.9', changefreq: 'monthly' },
      { url: '/apply', priority: '0.9', changefreq: 'monthly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/career', priority: '0.8', changefreq: 'weekly' },
      { url: '/term-and-condition', priority: '0.5', changefreq: 'yearly' },
    ];
    
    // Get dynamic routes (courses and blog posts)
    const dynamicRoutes = await getDynamicRoutes();
    
    // Combine all routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate XML
    const xml = generateSitemapXml(siteUrl, allRoutes);
    
    // Write to file
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated with ${allRoutes.length} URLs at ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

async function getDynamicRoutes() {
  const routes = [];
  
  try {
    // Fetch courses from local JSON file
    try {
      const coursesPath = path.resolve(__dirname, '../public/data/courses.json');
      if (fs.existsSync(coursesPath)) {
        const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
        console.log(`📚 Found ${coursesData.length} courses from local JSON`);
        coursesData.forEach(course => {
          if (course.slug) {
            routes.push({
              url: `/${course.slug}`,
              priority: '0.8',
              changefreq: 'weekly',
              lastmod: course.lastModified || course.updated_at
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️  Could not fetch courses from local JSON:', error.message);
    }
    
    // Fetch blog posts from API
    try {
      const blogResponse = await axios.get('https://be.edigital.globalinfosofts.com/blog-html/', {
        timeout: 10000
      });
      if (blogResponse.data && Array.isArray(blogResponse.data)) {
        console.log(`📝 Found ${blogResponse.data.length} blog posts from API`);
        blogResponse.data.forEach(post => {
          // Use existing slug only (no fallback to generated slug)
          const slug = post.slug;
          if (slug && slug.trim() !== '') {
            routes.push({
              url: `/${slug}`,
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
  xml += ' xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"';
  xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  xml += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${route.url}</loc>\n`;
    xml += `    <lastmod>${route.lastmod ? new Date(route.lastmod).toISOString().split('T')[0] : today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}