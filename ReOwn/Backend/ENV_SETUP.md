# إعداد ملف .env

يجب إنشاء ملف `.env` في مجلد Backend يحتوي على:

```
PORT=3000
DB_URL=mongodb://localhost:27017/reown
JWT_SECRET=your-secret-key-here-change-in-production
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## خطوات التشغيل:

1. أنشئ ملف `.env` في مجلد `Backend`
2. أضف المتغيرات أعلاه مع القيم الصحيحة
3. شغل الـ server:
   ```bash
   cd DEPI-Graduation-Project/ReOwn/Backend
   npm run dev
   ```

## ملاحظات:
- تأكد من أن MongoDB شغال إذا كنت تستخدمه محلياً
- إذا لم يكن لديك Cloudinary، يمكنك استخدام MongoDB Atlas أو أي قاعدة بيانات أخرى
- JWT_SECRET يمكن أن يكون أي نص عشوائي قوي

