import multer from "multer";

export const filevalidation = {
  images: ["image/jpeg", "image/png", "image/gif"],
  document: ["application/pdf", "application/msword"],
};

export const uploadCloudFile = (filevalidation = []) => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (filevalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid type"), false);
    }
  }

  return multer({ fileFilter, storage });
};
