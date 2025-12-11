import multer from "multer";

export const filevalidation = {
  images: ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"],
  document: ["application/pdf", "application/msword"],
};

export const uploadCloudFile = (filevalidation = []) => {
  // Use memory storage for cloudinary uploads
  const storage = multer.memoryStorage();
  
  function fileFilter(req, file, cb) {
    if (filevalidation.length === 0 || filevalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${filevalidation.join(", ")}`), false);
    }
  }

  return multer({ 
    fileFilter, 
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB limit
    }
  });
};
