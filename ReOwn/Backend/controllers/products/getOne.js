import { Product } from "../../models/productModel";
import { SUCCESS } from "../../utilities/successWords";
export const getProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("categoryId");
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found", success: FAIL });
    const images = product.images.map((img) => {
      return `data:${img.contentType};base64,${img.data.toString("base64")}`;
    });
    return res.status(200).json({
      message: "Product retrieved successfully",
      success: SUCCESS,
      data: {
        ...product._doc,
        images,
      },
    });
};
