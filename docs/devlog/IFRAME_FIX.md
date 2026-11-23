# Fix: Error retrieving data در Farcaster

## 🔍 مشکل

**خطا**: "Error retrieving data" هنگام باز کردن Mini App در Farcaster

**علت**: Mini App نمی‌تواند در iframe Farcaster load شود به دلیل عدم وجود headers مناسب

---

## ✅ Fix اعمال شده

### اضافه کردن CSP Headers

**فایل**: `next.config.js`

**تغییرات**:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://*.farcaster.xyz https://*.warpcast.com https://*.farcaster.com https://farcaster.xyz https://warpcast.com;",
        },
      ],
    },
  ];
}
```

**توضیح**:
- `frame-ancestors` به Farcaster domains اجازه می‌دهد که Mini App را در iframe embed کنند
- این header برای امنیت و جلوگیری از clickjacking است
- بدون این header، Farcaster نمی‌تواند Mini App را load کند

---

## 🚀 Deploy

- ✅ **Committed**: `9b4322c` - "Fix: Add CSP headers to allow Farcaster iframe embedding"
- ✅ **Deployed**: Production deployment completed
- ✅ **Status**: Ready for testing

---

## 🧪 تست

### 1. تست Direct Link
```
https://warpcast.com/~/add-cast-action?url=https://base-soul.vercel.app
```

### 2. بررسی Headers
```bash
curl -I https://base-soul.vercel.app
```

باید `Content-Security-Policy` header را ببینید.

### 3. تست در Farcaster
- برو به: https://farcaster.xyz/~/add-cast-action?url=https://base-soul.vercel.app
- Mini App باید load شود (نه "Error retrieving data")

---

## 📋 Checklist

- [x] CSP headers اضافه شد
- [x] Deploy انجام شد
- [ ] تست در Farcaster (بعد از deploy)
- [ ] بررسی که error برطرف شده

---

## ⚠️ اگر هنوز کار نمی‌کند

### بررسی‌های اضافی:

1. **Browser Console**
   - F12 را بزن
   - Console را بررسی کن
   - خطاهای JavaScript را ببین

2. **Network Tab**
   - Network tab را باز کن
   - ببین که آیا requests موفق هستند
   - بررسی CORS errors

3. **Headers Verification**
   ```bash
   curl -I https://base-soul.vercel.app
   ```
   باید `Content-Security-Policy` را ببینی

---

**تاریخ**: Current  
**Commit**: `9b4322c` - "Fix: Add CSP headers to allow Farcaster iframe embedding"

