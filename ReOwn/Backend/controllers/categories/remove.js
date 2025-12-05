export const removeCategory = async (req, res) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      success: FAIL,
    });
  }

  const role = req.user.role;
  const { categoryId } = req.params;

  if (role !== "admin") {
    return res.status(403).json({
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

  category.deleted_at = new Date();
  await category.save();

  return res.status(200).json({
    status: 200,
    message: "Category removed successfully",
    success: SUCCESS,
  });
};
