import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import cloudinary from "../../utilities/multer/cloudinary.config.js";
export const addCategory = async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
  // upload image to cloudinary
  const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
    folder: "ReOwn/categories"
  });
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
