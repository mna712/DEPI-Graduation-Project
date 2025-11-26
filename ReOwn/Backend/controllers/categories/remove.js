import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const removeCategory = async (req, res) => {
  const id = req.user.role;
  const { categoryId } = req.params;
  if (role !== "admin") {
    res.status(403).json({
      status: 403,
      message: "Only admin can remove categories",
      success: FAIL,
    });
  }

  const category = await Category.findOne({
    _id: categoryId,
    deleted_at: null,
  });

  if (!category) {
    return res.status(404).json({
      status: 404,
      message: "Category not found",
      success: FAIL,
    });
  }
  category.deleted_at =  new Date();
   await deleteImage(category.image.public_id);
  await category.save();
  res.status(204).json({
    status: 204,
    message: "Category removed successfully",
    success: SUCCESS,
  });
};
