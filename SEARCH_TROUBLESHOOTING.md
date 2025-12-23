# Troubleshooting: چرا در جستجو پیدا نمی‌شود؟

## 🔍 بررسی مشکلات احتمالی

### 1. ⏱️ زمان Indexing
**مشکل**: Farcaster indexing ممکن است زمان بیشتری نیاز داشته باشد

**راه‌حل**:
- ⏰ **زمان معمول**: 10 دقیقه تا 24 ساعت
- 🔄 **Cache**: Farcaster ممکن است cache داشته باشد (تا 24 ساعت)
- 💡 **پیشنهاد**: صبر کن و دوباره تست کن

---

### 2. 📊 Usage صفر
**مشکل**: Farcaster نیاز به حداقل usage دارد تا در جستجو نمایش داده شود

**راه‌حل**:
1. **Share با دوستان**:
   - Mini App را با دوستان share کن
   - از آن‌ها بخواه که استفاده کنند

2. **Cast در Farcaster**:
   - یک cast بنویس و Mini App را معرفی کن
   - Link را share کن: `https://base-soul.vercel.app`

3. **Channels**:
   - در channels مرتبط معرفی کن (مثلاً `base`, `farcaster`)

---

### 3. ✅ Registration
**مشکل**: ممکن است نیاز به registration اضافی باشد

**بررسی**:
1. برو به: https://warpcast.com/~/developers/mini-apps
2. بررسی کن که Mini App ثبت شده است
3. مطمئن شو که Account Association green checkmark دارد

---

### 4. 🖼️ Images Accessibility
**مشکل**: اگر images accessible نباشند، ممکن است index نشود

**بررسی**:
```bash
# تست icon
curl -I https://base-soul.vercel.app/icon.png

# تست splash
curl -I https://base-soul.vercel.app/splash.png

# تست OG image
curl -I https://base-soul.vercel.app/api/og?default=true
```

همه باید `200 OK` برگردانند.

---

### 5. 🔄 Cache
**مشکل**: Farcaster ممکن است cache داشته باشد

**راه‌حل**:
- ⏰ صبر کن (cache ممکن است تا 24 ساعت باشد)
- 🔄 Hard refresh در browser
- 🧹 Clear browser cache

---

### 6. 📝 Manifest Validation
**مشکل**: ممکن است validation errors وجود داشته باشد

**بررسی**:
1. برو به: https://farcaster.xyz/~/developers/mini-apps/manifest?domain=base-soul.vercel.app
2. بررسی کن که همه چیز validated است
3. مطمئن شو که هیچ خطایی وجود ندارد

---

## 🎯 راه‌حل‌های فوری

### روش 1: Direct Link
اگر جستجو کار نکرد، از direct link استفاده کن:
```
https://warpcast.com/~/add-cast-action?url=https://base-soul.vercel.app
```

### روش 2: Share در Cast
یک cast بنویس و Mini App را معرفی کن:
```
Discover your Base Soul! 🎨
Analyze your Farcaster activity and reveal your unique digital soul.

🔗 https://base-soul.vercel.app
```

### روش 3: افزایش Usage
- با دوستان share کن
- در channels معرفی کن
- در community ها post کن

---

## 📋 Checklist

- [ ] Manifest validated است؟
- [ ] Account Association verified است؟
- [ ] Images accessible هستند؟
- [ ] Registration انجام شده؟
- [ ] Usage > 0 است؟
- [ ] 24 ساعت گذشته است؟

---

## ⚠️ اگر بعد از 24 ساعت هنوز پیدا نشد

### تماس با Support
1. برو به: https://farcaster.xyz/support
2. مشکل را توضیح بده
3. Manifest URL را share کن: `https://base-soul.vercel.app/.well-known/farcaster.json`

---

## 💡 نکات مهم

1. **Indexing زمان می‌برد**: معمولاً 10 دقیقه تا 24 ساعت
2. **Usage مهم است**: بدون usage ممکن است در جستجو نمایش داده نشود
3. **Cache**: Farcaster cache دارد (تا 24 ساعت)
4. **Direct Link**: همیشه کار می‌کند، حتی اگر در جستجو نباشد

---

**وضعیت فعلی**: در انتظار indexing + نیاز به usage  
**پیشنهاد**: Share کن و usage ایجاد کن

