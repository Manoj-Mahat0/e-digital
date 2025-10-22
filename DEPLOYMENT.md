# cPanel Deployment Guide for React App

## Problem
Dynamic routes like `/blog/:slug` show blank pages with MIME type errors because:
- Relative asset paths break on nested routes
- Apache returns `index.html` for missing JS files
- Server doesn't handle client-side routing

## Solution

### Step 1: Build the Project
```bash
npm run build
```

This creates a `dist` folder with your production files.

### Step 2: Upload to cPanel

#### Option A: Deploy to Root Directory (e.g., public_html)
1. Open cPanel File Manager
2. Navigate to `public_html`
3. Delete any existing files (backup first!)
4. Upload ALL contents from your `dist` folder:
   - `index.html`
   - `assets/` folder
   - `data/` folder (if exists)
   - `.htaccess` file
   - Any other files/folders in `dist`

#### Option B: Deploy to Subfolder (e.g., public_html/myapp)
1. Create a subfolder in `public_html` (e.g., `myapp`)
2. Upload all `dist` contents to that subfolder
3. **IMPORTANT**: Update `vite.config.js` BEFORE building:
   ```javascript
   base: '/myapp/',  // Change to your subfolder name
   ```
4. Rebuild: `npm run build`
5. Upload the new `dist` contents

### Step 3: Verify .htaccess is Working
After uploading, check:
1. Main route: `https://yourdomain.com/` ✅
2. Blog list: `https://yourdomain.com/blog` ✅
3. Blog post: `https://yourdomain.com/blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters` ✅
4. Refresh on any route - should still work ✅

### Step 4: Check Console for Errors
Open browser DevTools (F12) and check:
- No MIME type errors ✅
- JS files load from `/assets/` ✅
- No 404 errors ✅

## Common Issues & Fixes

### Issue 1: .htaccess Not Working
**Symptom**: Routes still show 404
**Fix**: 
- Ensure `.htaccess` is in the same folder as `index.html`
- Check if cPanel has `mod_rewrite` enabled (contact hosting support)
- Verify file permissions: `.htaccess` should be 644

### Issue 2: Assets Return 404
**Symptom**: CSS/JS files not loading
**Fix**:
- Verify `assets/` folder uploaded correctly
- Check file paths in browser DevTools Network tab
- Ensure `base: '/'` in `vite.config.js`

### Issue 3: Blank Page on Subfolder Deployment
**Symptom**: Works on root but not in subfolder
**Fix**:
- Update `base` in `vite.config.js` to match subfolder
- Rebuild the project
- Re-upload all files

### Issue 4: MIME Type Error Persists
**Symptom**: Still getting "text/html" MIME type error
**Fix**:
- Check `.htaccess` has correct MIME type definitions
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito/private mode

## File Permissions on cPanel
```
Folders: 755
Files:   644
.htaccess: 644
```

## Testing Checklist
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Blog list page loads
- [ ] Individual blog posts load
- [ ] Direct URL access works (paste URL in browser)
- [ ] Page refresh works on all routes
- [ ] No console errors
- [ ] Assets (images, CSS, JS) load correctly
- [ ] SEO meta tags appear in page source

## For HTTPS Sites
Uncomment these lines in `.htaccess`:
```apache
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Important Notes
1. **Always backup** your existing site before uploading
2. **Test locally** with `npm run preview` before deploying
3. **Clear cache** after deployment to see changes
4. **Check DNS** if using custom domain
5. **SSL certificate** should be installed for HTTPS

## Support
If issues persist:
1. Check cPanel error logs
2. Verify Apache version supports mod_rewrite
3. Contact hosting provider for server configuration
4. Ensure PHP version is compatible (if using API)
