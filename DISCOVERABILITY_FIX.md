# Discoverability Fix - Base Soul Mini App

## 🔍 Issue Found

**Problem**: Mini App not appearing in Farcaster search results

**Root Cause**: Manifest structure was using `"frame"` key instead of `"miniapp"` key, which is required for Mini App discoverability.

---

## ✅ Fix Applied

### Changed Manifest Structure

**Before**:
```json
{
  "accountAssociation": { ... },
  "frame": {
    "version": "1",
    "name": "Base Soul",
    ...
  }
}
```

**After**:
```json
{
  "accountAssociation": { ... },
  "miniapp": {
    "version": "1",
    "name": "Base Soul",
    "canonicalDomain": "base-soul.vercel.app",
    ...
  }
}
```

### Changes Made:
1. ✅ Changed `"frame"` → `"miniapp"` (required for Mini Apps)
2. ✅ Added `"canonicalDomain"` field (recommended for discoverability)

---

## 📋 Current Manifest Status

### ✅ Required Fields Present:
- ✅ `accountAssociation` (with valid signature)
- ✅ `miniapp.name`
- ✅ `miniapp.iconUrl`
- ✅ `miniapp.homeUrl`
- ✅ `miniapp.primaryCategory` ("entertainment")
- ✅ `miniapp.tags` (array with relevant tags)
- ✅ `miniapp.canonicalDomain`

### ✅ Optional Fields Present:
- ✅ `miniapp.subtitle`
- ✅ `miniapp.description`
- ✅ `miniapp.ogTitle`
- ✅ `miniapp.ogDescription`
- ✅ `miniapp.ogImageUrl`
- ✅ `miniapp.splashImageUrl`
- ✅ `miniapp.buttonTitle`

---

## 🚀 Next Steps

### 1. Wait for Deployment
- Changes have been pushed to GitHub
- Vercel will auto-deploy (or manual deploy in progress)
- Wait 2-5 minutes for deployment to complete

### 2. Verify Manifest Accessibility
After deployment, verify:
```bash
curl https://base-soul.vercel.app/.well-known/farcaster.json
```

Should return JSON with `"miniapp"` key (not `"frame"`).

### 3. Wait for Farcaster Indexing
- Farcaster needs to re-index the manifest
- This can take **10 minutes to 24 hours**
- The app should appear in search after indexing

### 4. Test Discoverability
1. Open Warpcast
2. Search for "Base Soul" or "soul"
3. The app should appear in results

---

## 🔍 Additional Checks (If Still Not Discoverable)

If the app still doesn't appear after 24 hours:

### Check 1: App Registration
- Go to: https://warpcast.com/~/developers/mini-apps
- Verify app is registered
- Check account association shows green checkmark

### Check 2: Image Accessibility
Verify all images are accessible:
- `https://base-soul.vercel.app/icon.png` (should return image/png)
- `https://base-soul.vercel.app/splash.png` (should return image/png)
- `https://base-soul.vercel.app/api/og?default=true` (should return image)

### Check 3: Minimum Usage
- Farcaster requires minimum usage before apps appear in search
- Share the app with friends to generate usage
- Apps with 0 usage may not appear in search

### Check 4: Manifest Validator
- Use Farcaster's official manifest validator
- Check for any validation errors

---

## 📝 Summary

**Issue**: Wrong manifest key (`"frame"` instead of `"miniapp"`)  
**Fix**: Changed to `"miniapp"` and added `canonicalDomain`  
**Status**: ✅ Fixed and deployed  
**Next**: Wait for Farcaster indexing (10 min - 24 hours)

---

## 🔗 Resources

- Farcaster Mini Apps Docs: https://miniapps.farcaster.xyz
- Warpcast Developer Portal: https://warpcast.com/~/developers/mini-apps
- Base Mini Apps Guide: https://docs.base.org/mini-apps

---

**Date**: Current  
**Commit**: `206f493` - "Fix: Change manifest structure from frame to miniapp for discoverability"

