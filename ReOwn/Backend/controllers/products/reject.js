import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { Product } from "../../models/productModel.js";

//admin only can do that
export const rejectProduct = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  
  const product = await Product.findOne({ _id: id, deleted_at: null });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: FAIL,
      status: 404,
    });
  }

  if (role !== 'admin') {
    return res.status(401).json({
      message: "you are not allowed to reject this product",
      status: 401,
      success: FAIL
    });
  }

  if (product.status === 'rejected') {
    return res.status(400).json({
      status: 400,
      message: "Product is already rejected",
      success: FAIL
    });
  }

  product.status = 'rejected';
  await product.save();

  return res.status(200).json({
    message: "Product rejected successfully!",
    success: SUCCESS,
    data: product,
    status: 200,
  });
};

