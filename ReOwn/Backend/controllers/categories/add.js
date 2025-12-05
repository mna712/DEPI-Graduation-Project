import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import upload from "../../config/multer.js";
export const addCategory = async (req, res) => {
const imageUrl = `/uploads/${req.file.filename}`;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const category = new Category({
      ...req.body,
      categoryImage: imageUrl
    });
    await category.save();
    return res.status(201).json({
      message: "Category added successfully",
      data: category,
      status:200
    });
}