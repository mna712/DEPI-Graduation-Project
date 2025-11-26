import { Product } from "../../models/productModel";
import { Favourite } from "../../models/favouriteModel";
import { SUCCESS, FAIL } from "../../utilities/successWords";
export const getFavouriteProducts = async (req, res) => {
  const userId = req.user._id;
  const favourites = await Favourite.find({ userId });
  if (!favourites)
    return res.status(404).json({
      message: "No favourites found",
      status: 404,
      success: FAIL,
    });

  const productIds = favourites.map((f) => f.productId);
  const products = await Product.find({
    _id: { $in: productIds },
    deleted_at: null,
  });
  return res.status(200).json({
    message: "favourite products fetched succesfully",
    status: 200,
    data: products,
    success: SUCCESS,
  });
};
