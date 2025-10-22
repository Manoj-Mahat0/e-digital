# ⚡ QUICK FIX REFERENCE CARD

## The Problem
```
❌ /blog/:slug routes show blank page
❌ Console error: MIME type "text/html" instead of "application/javascript"
❌ Browser tries to load: /blog/assets/index.js (doesn't exist)
❌ Actual location: /assets/index.js
```

## The Solution (3 Steps)

### 1️⃣ Fix vite.config.js
```javascript
// Change this:
base: './',  // ❌

// To this:
base: '/',   // ✅
```

### 2️⃣ Add .htaccess to public/
File already created at: `public/.htaccess`

Key contents:
```apache
RewriteEngine On
RewriteBase /

# Don't rewrite existing files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Route to index.html
RewriteRule . /index.html [L]

# Correct MIME types
AddType application/javascript .js .mjs
```

### 3️⃣ Build & Deploy
```bash
npm run build
npm run verify
# Upload dist/* to cPanel
```

---

## 📁 What Changed

| File | Change | Why |
|------|--------|-----|
| `vite.config.js` | `base: '/'` | Absolute paths for nested routes |
| `public/.htaccess` | Created | Apache routing + MIME types |
| `package.json` | Added scripts | Verification helpers |

---

## 🚀 Deploy Now

```bash
# 1. Build
npm run build

# 2. Verify (optional)
npm run verify

# 3. Upload to cPanel
# Upload all files from dist/ to public_html/
```

---

## ✅ Test After Deploy

Visit these URLs directly:
```
✅ https://yourdomain.com/
✅ https://yourdomain.com/blog
✅ https://yourdomain.com/blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters
```

Press F5 on any route - should still work!

---

## 🐛 Still Broken?

### Check 1: .htaccess uploaded?
```
Should be at: public_html/.htaccess
```

### Check 2: Correct paths in HTML?
```
Open: public_html/index.html
Look for: src="/assets/   ✅
Not: src="./assets/        ❌
```

### Check 3: File permissions?
```
Files:   644
Folders: 755
```

### Check 4: Apache modules enabled?
Contact hosting: Need `mod_rewrite` and `mod_mime`

---

## 📚 Detailed Guides

- `FIX-SUMMARY.md` - Complete overview
- `DEPLOYMENT.md` - Full deployment guide
- `DEPLOYMENT-CHECKLIST.md` - Step-by-step
- `PRE-DEPLOYMENT-TEST.md` - Testing guide

---

## 🎯 Root Cause Explained

**Before (Broken):**
```
URL:      /blog/post-slug
HTML:     <script src="./assets/index.js">
Browser:  /blog/assets/index.js  ❌ 404
Result:   Blank page
```

**After (Fixed):**
```
URL:      /blog/post-slug
HTML:     <script src="/assets/index.js">
Browser:  /assets/index.js  ✅ 200
.htaccess: Routes /blog/post-slug → index.html
Result:   Page works! 🎉
```

---

## ⚙️ Special Scenarios

### Deploying to Subfolder?
```javascript
// vite.config.js
base: '/myapp/',  // Change to your folder

// .htaccess
RewriteBase /myapp/

// Upload to
public_html/myapp/
```

### Using Subdomain?
Same as root (use `base: '/'`)

---

## 💡 Key Takeaways

1. ✅ Use absolute paths (`/assets/`)
2. ✅ Never use relative paths (`./assets/`)
3. ✅ Always include `.htaccess`
4. ✅ Test locally with `npm run preview`
5. ✅ Verify build before deploying

---

**Need help?** Check the detailed guides!
**Ready to deploy?** Run `npm run deploy:check`

---

Last Updated: 2025-10-22 ✨
