import { Product } from "../../models/productModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;
  
  const product = await Product.findOne({ _id: id, deleted_at: null });
  
  if (!product) {
    return res.status(404).json({ 
      message: "Product not found", 
      success: FAIL, 
      status: 404
    });
  }

  // Only admin or product owner can delete
  if (userRole !== 'admin' && product.sellerId.toString() !== userId.toString()) {
    return res.status(403).json({
      message: "You are not authorized to delete this product",
      success: FAIL,
      status: 403
    });
  }

  product.deleted_at = new Date();
  await product.save();

  return res.status(200).json({ 
    message: "Product deleted successfully", 
    success: SUCCESS, 
    status: 200
  });
};