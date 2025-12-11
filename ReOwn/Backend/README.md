# Backend Server Setup

## خطوات التشغيل السريع:

### 1. إنشاء ملف .env
أنشئ ملف `.env` في مجلد `Backend` وأضف:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/reown
JWT_SECRET=mySecretKey123456789
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. تثبيت Dependencies
```bash
npm install
```

### 3. تشغيل الـ Server
```bash
npm run dev
```

أو بدون nodemon:
```bash
node app.js
```

### 4. التحقق من التشغيل
يجب أن ترى في الـ console:
```
Server running on port 3000
API available at http://localhost:3000/api
```

## ملاحظات مهمة:

- إذا لم يكن لديك MongoDB محلي، استخدم MongoDB Atlas أو أي MongoDB cloud service
- إذا لم يكن لديك Cloudinary، يمكنك استخدام أي image hosting service
- الـ server سيعمل حتى بدون database (لكن API calls ستفشل)

## استكشاف الأخطاء:

- **خطأ في الاتصال**: تأكد من أن الـ PORT 3000 غير مستخدم
- **خطأ في Database**: تأكد من أن MongoDB شغال أو استخدم MongoDB Atlas
- **خطأ في Cloudinary**: تأكد من أن الـ credentials صحيحة

