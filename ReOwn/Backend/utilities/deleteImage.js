import cloudinary from "../config/multer.js";

export const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.log("Cloudinary delete error:", err);
  }
};
