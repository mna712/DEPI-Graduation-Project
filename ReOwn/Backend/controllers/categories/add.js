import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import cloudinary from "../../utilities/multer/cloudinary.config.js";
export const addCategory = async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
  // upload image to cloudinary
  let public_id, secure_url;
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "ReOwn/categories" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });
    public_id = uploadResult.public_id;
    secure_url = uploadResult.secure_url;
  } catch (uploadError) {
    console.error("Error uploading image:", uploadError);
    return res.status(500).json({
      message: "Error uploading image: " + uploadError.message,
      success: FAIL
    });
  }
  const url = secure_url;
    const category = new Category({
      ...req.body,
      image: {url,public_id}
    });
    await category.save();
    return res.status(201).json({
      message: "Category added successfully",
      data: category,
      status:200
    });
  }
