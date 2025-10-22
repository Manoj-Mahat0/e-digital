# Deployment Examples for Different Scenarios

## Scenario 1: Deploy to Root Domain
**Example**: `https://edigital.globalinfosofts.com/`

### Configuration
**vite.config.js:**
```javascript
export default defineConfig(({ mode }) => ({
  base: '/',  // ✅ Absolute path from root
  // ... rest of config
}))
```

**public/.htaccess:**
```apache
RewriteBase /
```

### File Structure on Server
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── assets/
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── ...
└── data/
    └── courses.json
```

### URLs Will Work
```
✅ https://edigital.globalinfosofts.com/
✅ https://edigital.globalinfosofts.com/blog
✅ https://edigital.globalinfosofts.com/blog/chatgpt-5-vs-gpt-4
✅ https://edigital.globalinfosofts.com/courses/web-development
✅ https://edigital.globalinfosofts.com/about
```

### Asset Paths in HTML
```html
<script type="module" crossorigin src="/assets/index-abc123.js"></script>
<link rel="stylesheet" href="/assets/index-def456.css">
```

---

## Scenario 2: Deploy to Subfolder
**Example**: `https://yourdomain.com/myapp/`

### Configuration
**vite.config.js:**
```javascript
export default defineConfig(({ mode }) => ({
  base: '/myapp/',  // ✅ Change to your subfolder name
  // ... rest of config
}))
```

**public/.htaccess:**
```apache
RewriteBase /myapp/
```

### File Structure on Server
```
public_html/
├── (other files...)
└── myapp/
    ├── index.html
    ├── .htaccess
    ├── robots.txt
    ├── assets/
    │   ├── index-abc123.js
    │   ├── index-def456.css
    │   └── ...
    └── data/
        └── courses.json
```

### URLs Will Work
```
✅ https://yourdomain.com/myapp/
✅ https://yourdomain.com/myapp/blog
✅ https://yourdomain.com/myapp/blog/chatgpt-5-vs-gpt-4
✅ https://yourdomain.com/myapp/courses/web-development
✅ https://yourdomain.com/myapp/about
```

### Asset Paths in HTML
```html
<script type="module" crossorigin src="/myapp/assets/index-abc123.js"></script>
<link rel="stylesheet" href="/myapp/assets/index-def456.css">
```

---

## Scenario 3: Deploy to Subdomain
**Example**: `https://blog.yourdomain.com/`

### Configuration
Same as Scenario 1 (root deployment)

**vite.config.js:**
```javascript
export default defineConfig(({ mode }) => ({
  base: '/',  // ✅ Root of subdomain
  // ... rest of config
}))
```

### cPanel Setup
1. Create subdomain in cPanel: `blog.yourdomain.com`
2. cPanel will create folder: `public_html/blog/`
3. Upload all `dist/` contents to that folder

### File Structure on Server
```
public_html/
├── blog/           ← Subdomain document root
│   ├── index.html
│   ├── .htaccess
│   ├── assets/
│   └── data/
└── (main site files...)
```

### URLs Will Work
```
✅ https://blog.yourdomain.com/
✅ https://blog.yourdomain.com/chatgpt-5-vs-gpt-4
✅ https://blog.yourdomain.com/about
```

---

## Common Mistakes & Solutions

### ❌ Mistake 1: Using Relative Paths
```javascript
// DON'T DO THIS
base: './',
```
**Problem**: Assets break on nested routes like `/blog/post-slug`
**Solution**: Use absolute paths `base: '/'`

---

### ❌ Mistake 2: Wrong RewriteBase
```apache
# File in: public_html/myapp/.htaccess
RewriteBase /  ❌ Wrong!
```
**Problem**: Rewrites go to wrong location
**Solution**: Match the subfolder
```apache
RewriteBase /myapp/  ✅ Correct!
```

---

### ❌ Mistake 3: Missing .htaccess
**Problem**: Routes return 404, refresh breaks
**Solution**: Ensure `.htaccess` is in same folder as `index.html`

---

### ❌ Mistake 4: Incorrect File Permissions
```
.htaccess: 777  ❌ Wrong!
```
**Problem**: Security risk, may not work
**Solution**: Use correct permissions
```
Files:   644  ✅
Folders: 755  ✅
```

---

## Testing Your Deployment

### 1. Test Asset Loading
Open DevTools (F12) → Network tab
```
✅ /assets/index-abc123.js → 200 OK (application/javascript)
❌ /blog/assets/index-abc123.js → 404 Not Found
```

### 2. Test Route Handling
Direct URL access (paste in browser):
```
✅ /blog/any-slug → Shows blog post
❌ /blog/any-slug → 404 or blank page
```

### 3. Test Page Refresh
1. Navigate to `/blog/post-slug`
2. Press F5 to refresh
```
✅ Page reloads correctly
❌ Shows 404 or Apache error
```

### 4. Check Console
```
✅ No errors
❌ MIME type error: "Expected JavaScript but got text/html"
```

---

## Build Commands for Each Scenario

### Root Domain Deployment
```bash
# 1. Ensure config is correct
# vite.config.js: base: '/'

# 2. Build
npm run build

# 3. Upload dist/* to public_html/
```

### Subfolder Deployment
```bash
# 1. Update config
# vite.config.js: base: '/myapp/'

# 2. Build
npm run build

# 3. Upload dist/* to public_html/myapp/
```

### Subdomain Deployment
```bash
# 1. Ensure config is correct
# vite.config.js: base: '/'

# 2. Build
npm run build

# 3. Upload dist/* to subdomain folder
```

---

## Quick Reference Table

| Deployment Type | `base` Value | `RewriteBase` | Upload To |
|----------------|-------------|--------------|-----------|
| Root Domain | `'/'` | `/` | `public_html/` |
| Subfolder | `'/myapp/'` | `/myapp/` | `public_html/myapp/` |
| Subdomain | `'/'` | `/` | `public_html/subdomain/` |

---

## Environment-Specific API URLs

If your API URL changes per environment:

**Option 1: .env files**
```env
# .env.production
VITE_API_URL=https://be.edigital.globalinfosofts.com
```

```javascript
// src/services/api.js
const API_HOST = import.meta.env.VITE_API_URL || "https://be.edigital.globalinfosofts.com";
```

**Option 2: Build-time detection**
```javascript
// vite.config.js
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  define: {
    __API_URL__: JSON.stringify(
      mode === 'production' 
        ? 'https://production-api.com' 
        : 'http://localhost:3000'
    )
  }
}))
```

---

## Need Help?

### Check Build Output
```bash
npm run build
# Look for: "building for production..."
# Check: dist/index.html for correct asset paths
```

### Verify .htaccess Syntax
Upload and check cPanel error logs:
```
cPanel → Metrics → Errors
```

### Test Locally First
```bash
npm run preview
# Should mimic production behavior
```

### Still Having Issues?
1. Check `DEPLOYMENT.md` for detailed troubleshooting
2. Review `DEPLOYMENT-CHECKLIST.md` for step-by-step guide
3. Compare your setup with examples above
4. Contact hosting support for Apache configuration
