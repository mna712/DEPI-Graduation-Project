import { Product } from "../../models/productModel.js";
import { Favourite } from "../../models/favouriteModel.js";

export const getSellerProducts = async (req, res) => {
    const { sellerId } = req.params;
    const userId = req.user._id; 

    let products = await Product.find({
      sellerId,
      deleted_at: null,
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: "This seller has no products",
        success: false,
      });
    }

    let favSet = new Set();

    if (userId) {
      const favourites = await Favourite.find({ userId }).select("productId");
      favSet = new Set(favourites.map((f) => f.productId.toString()));
    }

    const data = products.map((p) => ({
      ...p.toObject(),
      images: p.images,
      isFavourite: favSet.has(p._id.toString()),
    }));

    return res.status(200).json({
      message: "Seller products fetched successfully",
      success: true,
      count: data.length,
      products: data,
    });


};
