# الزامات Discovery بر اساس مستندات Farcaster

## 📚 بر اساس مستندات: https://miniapps.farcaster.xyz/docs

### ✅ الزامات Discovery (همه چک شده)

#### 1. Manifest Structure ✅
- ✅ `miniapp` key (نه `frame`) - **انجام شده**
- ✅ `name`: 1-50 characters - **"Base Soul" (9 chars) ✅**
- ✅ `description`: 1-280 characters - **✅**
- ✅ `primaryCategory` - **"entertainment" ✅**
- ✅ `tags`: 1-5 tags - **5 tags ✅**
- ✅ `iconUrl`: accessible - **✅**
- ✅ `homeUrl`: valid URL - **✅**

#### 2. Account Association ✅
- ✅ Domain verified - **✅**
- ✅ Signature valid - **✅**
- ✅ Account linked - **✅**

#### 3. Image Requirements ✅
- ✅ Icon accessible - **✅**
- ✅ Valid content-type - **✅**
- ✅ Proper dimensions - **✅**

---

## ⚠️ مشکل احتمالی: Usage & Engagement

بر اساس مستندات Farcaster:

### Requirements برای Search:
1. **Minimum Usage** ⚠️
   - Apps با 0 usage ممکن است در search نمایش داده نشوند
   - نیاز به حداقل engagement

2. **Recent Activity** ⚠️
   - App باید اخیراً استفاده شده باشد
   - Activity نشان می‌دهد که App فعال است

3. **Usage Score** ⚠️
   - Farcaster یک "usage score" محاسبه می‌کند
   - بر اساس تعداد users و interactions

---

## 🔍 وضعیت فعلی

### ✅ چیزهایی که درست هستند:
- Manifest structure صحیح
- همه فیلدها validated
- Account Association verified
- Images accessible
- All technical requirements met

### ⚠️ چیزی که ممکن است مشکل باشد:
- **Usage = 0** (احتمالاً)
- App جدید است
- هنوز engagement نداشته

---

## 🎯 راه‌حل بر اساس مستندات

### 1. افزایش Usage (اولویت اول)
```
بر اساس مستندات: "Apps need to demonstrate basic usage before appearing in search"
```

**راه‌های افزایش Usage:**
- Share با دوستان
- Cast در Farcaster
- معرفی در channels
- استفاده از Direct Link

### 2. Direct Link (همیشه کار می‌کند)
```
https://warpcast.com/~/add-cast-action?url=https://base-soul.vercel.app
```

### 3. صبر برای Indexing
- بعد از usage، indexing انجام می‌شود
- معمولاً 10 دقیقه تا 24 ساعت

---

## 📊 مقایسه با مستندات

| Requirement | Status | Notes |
|------------|--------|-------|
| Manifest Structure | ✅ | `miniapp` key صحیح |
| Required Fields | ✅ | همه فیلدها present |
| Account Association | ✅ | Verified |
| Images | ✅ | Accessible |
| **Usage** | ⚠️ | **احتمالاً 0** |
| **Recent Activity** | ⚠️ | **ندارد** |

---

## 💡 نتیجه‌گیری

**مشکل اصلی**: Usage = 0

**بر اساس مستندات**:
- Farcaster نیاز به minimum usage دارد
- Apps با 0 usage ممکن است در search نمایش داده نشوند
- بعد از usage، indexing انجام می‌شود

**راه‌حل**:
1. Share کن و usage ایجاد کن
2. از Direct Link استفاده کن
3. صبر کن برای indexing (بعد از usage)

---

**منبع**: https://miniapps.farcaster.xyz/docs/guides/discovery

