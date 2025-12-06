import { Product } from "../../models/productModel.js";
import { Favourite } from "../../models/favouriteModel.js";
import { SUCCESS } from "../../utilities/successWords.js";
export const getAllProducts = async (req, res) => {
    const userId = req.user._id; 
  
    let products = await Product.find({ deleted_at: null });

    const favourites = await Favourite.find({ userId }).select("productId");
    const favSet = new Set(favourites.map((f) => f.productId.toString()));

    products = products.map((product) => {
      const images = product.images
      return {
        ...product.toObject(),
        images, 
        isFavourite: favSet.has(product._id.toString())
      };
    });
    return res.status(200).json({
      message: "All products fetched successfully",
      data: products,
      success: SUCCESS,
      status: 200,
    });
};
