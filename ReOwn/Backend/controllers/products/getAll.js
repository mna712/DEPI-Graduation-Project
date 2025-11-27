import { Product } from "../../models/productModel";
import { Favourite } from "../../models/favouriteModel";
export const getAllProducts = async (req, res) => {
  let products = await Product.find({ deleted_at: null });
  const favourites = await Favourite.find({ userId }).select("productId");
  const favSet = new Set(favourites.map((f) => f.productId.toString()));
   products = products.map((product) => ({
    ...product.toObject(),
    isFavourite: favSet.has(product._id.toString()),
  }));
  return res.status(200).json({
    message: "All products fetched succesfully",
    data: products,
    success: SUCCESS,
    status: 200,
  });
};
