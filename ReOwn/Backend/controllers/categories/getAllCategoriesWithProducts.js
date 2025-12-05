import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";
import { SUCCESS } from "../../utilities/successWords.js";

export const getAllCategoriesWithItsProducts = async (req, res) => {
    const categories = await Category.find();
    const result = [];

    for (let category of categories) {
      const products = await Product.find({ categoryId: category._id });

      const productsWithImages = products.map((product) => {
        const images =product.images;

        return {
          ...product.toObject(),
          images,
        };
      });

      result.push({
        ...category._doc,
        products: productsWithImages,
      });
    }

    return res.status(200).json({
      success: SUCCESS,
      data: result,
      status: 200,
    });
};
