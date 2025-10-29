# E-Digital India - Education Platform

Modern education platform built with React, Vite, and React Router featuring course management, blog system, and career opportunities.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Verify build is ready
npm run verify

# Or do both at once
npm run deploy:check

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── .htaccess          # Apache configuration (CRITICAL for deployment)
│   └── data/              # JSON data files
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Route-level pages
│   ├── services/         # API service layer
│   └── App.jsx           # Main application
├── scripts/              # Build scripts
└── dist/                 # Production build output
```

## 🎯 Key Features

- **Course Management**: Browse and enroll in courses
- **Blog System**: SEO-friendly blog with slug-based URLs
- **Career Portal**: Job listings and applications
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Code splitting, lazy loading, caching

## 🔧 Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Animation**: Framer Motion
- **SEO**: React Helmet Async
- **Notifications**: React Toastify
- **Icons**: Lucide React, React Icons

## 📦 Deployment to cPanel

### Quick Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to cPanel:**
   - Login to cPanel File Manager
   - Navigate to `public_html/`
   - Upload ALL files from `dist/` folder
   - Ensure `.htaccess` is uploaded (it's hidden by default)

3. **Set permissions:**
   - Files: `644`
   - Folders: `755`

4. **Test your site:**
   - Homepage: `https://yourdomain.com/`
   - Blog: `https://yourdomain.com/blog`
   - Dynamic route: `https://yourdomain.com/blog/any-slug-here`

### Important Files for Deployment

- ✅ `public/.htaccess` - Apache configuration (enables dynamic routing)
- ✅ `vite.config.js` - Build configuration (uses absolute paths)
- ✅ All files in `dist/` folder after build

### Deployment Documentation

Comprehensive deployment guides available:

- 📄 **[QUICK-FIX.md](QUICK-FIX.md)** - Quick reference card
- 📄 **[FIX-SUMMARY.md](FIX-SUMMARY.md)** - Complete fix overview
- 📄 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- 📄 **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** - Step-by-step checklist
- 📄 **[DEPLOYMENT-EXAMPLES.md](DEPLOYMENT-EXAMPLES.md)** - Scenario examples
- 📄 **[PRE-DEPLOYMENT-TEST.md](PRE-DEPLOYMENT-TEST.md)** - Testing guide
- 📄 **[HOW-IT-WORKS.md](HOW-IT-WORKS.md)** - Technical explanation
- 📄 **[DEPLOYMENT-STATUS.md](DEPLOYMENT-STATUS.md)** - Current status

## 🐛 Troubleshooting

### Common Issues

#### Blank page on dynamic routes
**Symptom**: `/blog/:slug` shows blank page  
**Solution**: Ensure `.htaccess` is uploaded to server

#### MIME type error
**Symptom**: "Expected JavaScript but got text/html"  
**Solution**: Check `base: '/'` in `vite.config.js` and rebuild

#### 404 on page refresh
**Symptom**: Direct URLs or refresh returns 404  
**Solution**: Verify `.htaccess` has correct rewrite rules

#### Assets not loading
**Symptom**: CSS/JS files return 404  
**Solution**: Check that `assets/` folder was uploaded

For more solutions, see the deployment documentation above.

## 🔍 Build Verification

Before deploying, verify your build:

```bash
npm run verify
```

This checks:
- ✅ Build folder exists
- ✅ Using absolute paths (not relative)
- ✅ .htaccess is present
- ✅ Assets folder exists
- ✅ MIME types configured

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run verify       # Verify build is deployment-ready
npm run deploy:check # Build + verify in one command
```

## 🌐 Environment Variables

Create `.env` files for different environments:

```env
# .env.development
VITE_API_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:5173

# .env.production
VITE_API_URL=https://be.edigital.globalinfosofts.com
VITE_SITE_URL=https://edigitalindian.com
```

## 🎨 Blog System

Blog posts use SEO-friendly slug-based URLs:

- ✅ `/blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters`
- ❌ `/blog/17`

Slugs are generated from blog post titles automatically.

## 🔐 Security Features

Included in `.htaccess`:
- Directory listing disabled
- Hidden files blocked
- XSS protection headers
- MIME sniffing prevention
- Secure font CORS

## ⚡ Performance

Optimizations included:
- Gzip compression
- Browser caching (1 year for static assets)
- Code splitting
- Lazy loading
- Image optimization

## 📱 Responsive Design

Fully responsive across:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🤝 Contributing

When contributing:
1. Test locally with `npm run preview`
2. Verify build with `npm run verify`
3. Check all routes work
4. Ensure no console errors

## 📄 License

Private - E-Digital India

## 🆘 Support

For deployment issues:
1. Check [QUICK-FIX.md](QUICK-FIX.md)
2. Review [DEPLOYMENT.md](DEPLOYMENT.md)
3. Run `npm run verify`
4. Check browser console
5. Review cPanel error logs

## ✅ Deployment Status

**Current Status**: ✅ Ready for Production

- Configuration: Complete
- Testing: Verified
- Documentation: Comprehensive
- Build: Optimized

See [DEPLOYMENT-STATUS.md](DEPLOYMENT-STATUS.md) for details.

---

**Built with ❤️ by E-Digital India Team**

*Last Updated: 2025-10-22*
