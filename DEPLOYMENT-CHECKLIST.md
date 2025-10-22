# Quick Deployment Checklist

## Before Building

### 1. Check Configuration
- [ ] `vite.config.js` has correct `base` value
  - Root deployment: `base: '/'`
  - Subfolder deployment: `base: '/subfolder-name/'`
- [ ] `.htaccess` exists in `public/` folder
- [ ] API endpoints are correct in `src/services/api.js`

### 2. Test Locally
```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```
- [ ] Test all routes
- [ ] Test dynamic blog routes
- [ ] Check console for errors
- [ ] Verify assets load correctly

## Deployment to cPanel

### 3. Build for Production
```bash
npm run build
```

### 4. Upload to cPanel
**Method 1: File Manager (Recommended)**
1. Login to cPanel
2. Open File Manager
3. Navigate to destination folder:
   - Root: `public_html/`
   - Subfolder: `public_html/your-subfolder/`
4. Delete old files (backup first!)
5. Upload all files from `dist/` folder
6. Verify `.htaccess` is uploaded

**Method 2: FTP**
1. Connect via FTP client (FileZilla, etc.)
2. Navigate to destination
3. Upload all `dist/` contents
4. Set file permissions:
   - Folders: 755
   - Files: 644

### 5. Verify Deployment
- [ ] Homepage loads: `https://yourdomain.com/`
- [ ] Static pages work: `/about`, `/contact`
- [ ] Blog list: `/blog`
- [ ] Blog post: `/blog/any-slug-here`
- [ ] Refresh on any route works
- [ ] Assets load (check Network tab)
- [ ] No console errors

### 6. Test Dynamic Routes
Visit these URLs directly (paste in browser):
```
https://yourdomain.com/blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters
https://yourdomain.com/courses/any-course-slug
https://yourdomain.com/about
```
All should work without errors.

## Troubleshooting

### Issue: Blank Page
**Check:**
- [ ] `.htaccess` uploaded correctly
- [ ] `base` path matches deployment location
- [ ] Browser cache cleared
- [ ] Console errors

### Issue: 404 for Assets
**Check:**
- [ ] `assets/` folder uploaded
- [ ] Path in console matches uploaded location
- [ ] Case sensitivity (Linux servers)

### Issue: MIME Type Error
**Check:**
- [ ] `.htaccess` has MIME type definitions
- [ ] Apache has `mod_mime` enabled
- [ ] File permissions correct

### Issue: Routes Don't Work
**Check:**
- [ ] `.htaccess` rewrite rules present
- [ ] Apache has `mod_rewrite` enabled
- [ ] RewriteBase matches deployment path

## Performance Checks
- [ ] Enable HTTPS redirect in `.htaccess`
- [ ] Enable compression (GZIP)
- [ ] Check caching headers
- [ ] Verify image optimization
- [ ] Test page load speed

## SEO Verification
- [ ] Meta tags appear in source
- [ ] Canonical URLs correct
- [ ] Open Graph tags present
- [ ] Sitemap accessible
- [ ] robots.txt accessible

## Final Steps
- [ ] Clear CDN cache (if using)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor error logs in cPanel

## Need Help?
- Check `DEPLOYMENT.md` for detailed guide
- Review `.htaccess` comments
- Contact hosting support for server issues
- Check browser console for client errors
