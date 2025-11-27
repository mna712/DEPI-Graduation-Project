import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { upload }from "../../middlewares/upload.js";
export const addCategory = async (req, res) => {
  try {
    console.log("Starting addCategory...");

    // 🔥 Debug logs
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const image = await upload(req.file);
    console.log("Uploaded image →", image);

    const category = new Category({
      ...req.body,
      categoryImage: image?.ImgUrl,
    });

    await category.save();

    return res.status(201).json({
      message: "Category added successfully",
      data: category,
      status: 201,
      success: SUCCESS,
    });

  } catch (err) {
    console.error("💥 Controller Error:", err);

    return res.status(500).json({
      message: "Server error",
      error: err.message, // <-- IMPORTANT
      stack: err.stack,    // <-- THIS EXPOSES THE REAL ISSUE
    });
  }
};
