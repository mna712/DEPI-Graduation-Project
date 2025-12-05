import { Product } from "../../models/productModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getAllProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    const categoryProducts = await Product.find({ categoryId, deleted_at: null });

    if (!categoryProducts || categoryProducts.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No products found for this category",
        success: FAIL,
      });
    }

    // Convert images to Base64
    const productsWithImages = categoryProducts.map((product) => {
      const images = product.images.map(
        (img) => `data:${img.contentType};base64,${img.data.toString("base64")}`
      );

      return {
        ...product.toObject(),
        images,
      };
    });

    return res.status(200).json({
      status: 200,
      message: "Category products fetched successfully",
      data: productsWithImages,
      success: SUCCESS,
    });
};
