import { Category } from "../../models/categoryModel.js";
export const getAllCategories = async (req, res) => {
  let categories = await Category.find({ deleted_at: null });
  if (!categories || categories.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "No categories found",
      success: FAIL,
    });
  }
  categories = categories.map((category) => ({
    id: category._id,
    title: category.title,
  }));

  res.status(200).json({
    status: 200,
    message: "Categories fetched successfully",
    data: categories,
    success: SUCCESS,
  });
};
