import { Product } from "../../models/productModel";
import { Favourite } from "../../models/favouriteModel";

export const getAllProducts = async (req, res) => {
    const userId = req.user._id; 

    let products = await Product.find({ deleted_at: null });

    const favourites = await Favourite.find({ userId }).select("productId");
    const favSet = new Set(favourites.map((f) => f.productId.toString()));

    products = products.map((product) => {
      const images = product.images.map(
        (img) => `data:${img.contentType};base64,${img.data.toString("base64")}`
      );

      return {
        ...product.toObject(),
        images, 
        isFavourite: favSet.has(product._id.toString())?true:false,
      };
    });

    return res.status(200).json({
      message: "All products fetched successfully",
      data: products,
      success: SUCCESS,
      status: 200,
    });
};
