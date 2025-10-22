# Pre-Deployment Test Guide

## Before uploading to cPanel, test everything locally

### 1. Clean Build Test
```bash
# Remove old build
rm -rf dist/

# Clean build
npm run build

# Verify build
npm run verify
```

**Expected output:**
```
✅ dist folder exists
✅ index.html exists
✅ Using absolute paths (/assets/)
✅ assets folder exists
✅ Found X JS file(s) and X CSS file(s)
✅ .htaccess exists
✅ .htaccess has MIME type definitions
```

---

### 2. Local Preview Test
```bash
npm run preview
```

Visit: `http://localhost:4173`

**Test these routes:**
- [ ] `/` - Homepage
- [ ] `/about` - About page
- [ ] `/blog` - Blog list
- [ ] `/blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters` - Blog post
- [ ] `/courses/web-development` - Course detail
- [ ] `/contact-us` - Contact page

**For each route:**
1. Does it load correctly? ✅
2. Press F5 to refresh - does it still work? ✅
3. Check browser console - no errors? ✅

---

### 3. Check Built Files

#### Open `dist/index.html` and verify:
```html
<!-- ✅ GOOD - Absolute paths -->
<script type="module" crossorigin src="/assets/index-XXXX.js"></script>
<link rel="stylesheet" href="/assets/index-XXXX.css">

<!-- ❌ BAD - Relative paths (means base is wrong) -->
<script type="module" crossorigin src="./assets/index-XXXX.js"></script>
```

If you see relative paths (`./`), fix [`vite.config.js`](vite.config.js):
```javascript
base: '/',  // Must be absolute
```

---

### 4. Check .htaccess Presence
```bash
# Windows PowerShell
ls dist/.htaccess

# Should show the file
# If not found, check public/.htaccess exists
```

---

### 5. Inspect Network Requests

With preview server running:
1. Open DevTools (F12)
2. Go to Network tab
3. Visit `/blog/some-slug`
4. Check loaded resources

**Expected:**
```
✅ index.html         200 OK  text/html
✅ /assets/index.js   200 OK  application/javascript
✅ /assets/index.css  200 OK  text/css
✅ Images, fonts      200 OK  (various)
```

**Not expected:**
```
❌ /blog/assets/index.js  404 Not Found
```

If assets load from `/blog/assets/`, you still have relative paths!

---

### 6. Test Slug Generation

Visit blog post and check URL:
```
✅ /blog/chatgpt-5-vs-gpt-4-whats-new-and-why-it-matters
❌ /blog/17
```

If you see `/blog/17`, the slug generation isn't working.

---

### 7. Test API Calls

Open Network tab and filter by "Fetch/XHR":
```
✅ https://be.edigital.globalinfosofts.com/blog/  200 OK
```

Ensure API is accessible and returning data.

---

### 8. Check Meta Tags

View page source (Ctrl+U) and verify:
```html
✅ <title>Blog Post Title | E-Digital India</title>
✅ <meta name="description" content="...">
✅ <meta property="og:title" content="...">
✅ <link rel="canonical" href="...">
```

---

### 9. Test on Different Browsers

Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)
- [ ] Mobile browser (Chrome/Safari)

All should work identically.

---

### 10. Mobile Responsive Test

Use browser DevTools:
1. Press F12
2. Click device toolbar icon
3. Test different screen sizes

Routes should work on mobile too.

---

## Common Issues During Local Testing

### Issue: Preview shows blank page
**Solution:**
```bash
# Clear dist and rebuild
rm -rf dist/
npm run build
npm run preview
```

### Issue: Assets not loading in preview
**Check:**
- Is `base: '/'` in vite.config.js?
- Did you rebuild after changing config?
- Check browser console for actual error

### Issue: Slugs not working
**Check:**
- Is `generateSlug()` function in BlogList.jsx?
- Is route `/blog/:slug` in App.jsx?
- Rebuild and test again

---

## Final Checklist Before Upload

- [ ] `npm run build` completes successfully
- [ ] `npm run verify` shows all ✅
- [ ] `npm run preview` works for all routes
- [ ] All routes work with page refresh
- [ ] Browser console shows no errors
- [ ] Network tab shows correct MIME types
- [ ] Meta tags present in source
- [ ] Mobile responsive works
- [ ] API calls succeed
- [ ] Images load correctly

---

## If All Tests Pass

You're ready to deploy! 🚀

### Upload Steps:
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html/`
4. Backup existing files
5. Upload all `dist/` contents
6. Set permissions (644/755)
7. Test live site

### Post-Upload Test:
Visit the same URLs but on your live domain:
```
https://yourdomain.com/
https://yourdomain.com/blog
https://yourdomain.com/blog/chatgpt-5-vs-gpt-4
```

All should work exactly like local preview!

---

## If Tests Fail

### Don't deploy yet!

1. Review error messages
2. Check `FIX-SUMMARY.md` for solutions
3. Read `DEPLOYMENT.md` for detailed help
4. Fix issues locally first
5. Re-test until all pass
6. Then deploy

**Never deploy a broken build to production!**

---

## Quick Debug Commands

```bash
# Check build output
cat dist/index.html | grep "src="

# Should show: src="/assets/
# Not: src="./assets/

# Check .htaccess exists
ls dist/.htaccess

# Preview and test
npm run preview
```

---

## Support Resources

1. `FIX-SUMMARY.md` - Quick overview
2. `DEPLOYMENT.md` - Detailed guide
3. `DEPLOYMENT-CHECKLIST.md` - Step by step
4. `DEPLOYMENT-EXAMPLES.md` - Scenarios

---

**Remember:** 
- ✅ Test locally first
- ✅ Fix all issues before deploying
- ✅ Backup production before upload
- ✅ Test live site after deployment

Good luck! 🎉
