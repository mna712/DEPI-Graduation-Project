# تعليمات تشغيل المشروع

## المشكلة الحالية
الخطأ `Cannot connect to server` يعني أن الـ Backend Server غير شغال.

## خطوات الحل السريع:

### 1. إنشاء ملف .env

**مهم جداً:** أنشئ ملف `.env` في مجلد `DEPI-Graduation-Project/ReOwn/Backend/`

المحتوى:
```env
PORT=3000
DB_URL=mongodb://localhost:27017/reown
JWT_SECRET=mySecretKey123456789
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. تشغيل Backend Server

افتح Terminal جديد واكتب:

```bash
cd DEPI-Graduation-Project/ReOwn/Backend
npm install
npm run dev
```

**يجب أن ترى:**
```
Server running on port 3000
API available at http://localhost:3000/api
```

### 3. تشغيل Frontend

في Terminal آخر:

```bash
cd DEPI-Graduation-Project/ReOwn/Frontend
npm run dev
```

### 4. التحقق من الاتصال

- ✅ Backend: `http://localhost:3000`
- ✅ Frontend: `http://localhost:5173` (أو المنفذ الذي يظهر)

## استكشاف الأخطاء:

### إذا ظهر خطأ "Cannot connect to server":
1. ✅ تأكد من أن الـ Backend يعمل (افتح Terminal واكتب `npm run dev`)
2. ✅ تأكد من وجود ملف `.env` في مجلد Backend
3. ✅ تأكد من أن PORT 3000 غير مستخدم (أغلق أي برامج أخرى تستخدمه)

### إذا ظهر خطأ Database:
- الـ server سيعمل حتى بدون database
- لكن API calls ستفشل
- استخدم MongoDB Atlas أو MongoDB محلي

### إذا ظهر خطأ Cloudinary:
- يمكنك استخدام أي image hosting service
- أو تعديل الكود لاستخدام local storage مؤقتاً

