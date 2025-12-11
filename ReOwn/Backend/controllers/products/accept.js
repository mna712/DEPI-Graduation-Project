import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { Product } from "../../models/productModel.js";

//admin only can do that
export const acceptProduct = async (req, res) => {
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
      message: "you are not allowed to update this product",
      status: 401,
      success: FAIL
    });
  }

  if (product.status === 'available' || product.status === 'approved') {
    return res.status(400).json({
      status: 400,
      message: "Product is already approved",
      success: FAIL
    });
  }

  product.status = 'approved';
  await product.save();

  return res.status(200).json({
    message: "Product accepted successfully!",
    success: SUCCESS,
    data: product,
    status: 200,
  });
};
