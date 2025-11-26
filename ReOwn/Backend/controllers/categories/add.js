import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const addCategory = async (req, res) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({
      status: 403,
      message: "Only admin can add categories",
      success: FAIL,
    });
  }

  const { title } = req.body;
  if (!title || title.length < 3 || title.length > 30)
    return res.status(422).json({
      message: "Title must be 3-30 chars",
      success: FAIL,
      status: 422,
    });

  const existingCategory = await Category.find({ title });

  if (existingCategory) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Category with this title already exists",
    });
  }
  const newCategory = new Category({
    title,
    image: req.file
      ? { url: req.file.path, public_id: req.file.filename }
      : null,
  });
  await newCategory.save();
  res.status(201).json({
    status: 201,
    message: "Category added successfully",
    data: newCategory,
    success: SUCCESS,
  });
};
