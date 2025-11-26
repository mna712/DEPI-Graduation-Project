import { SUCCESS } from "../../utilities/successWords";
import { Favourite } from "../../models/favouriteModel";
export const removeFavourite = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const deleted = await Favourite.findOneAndDelete({ userId, productId });
   
    if (!deleted)
      return res.status(404).json({ message: "Not found in favourites" ,status:404,success:SUCCESS});

    res.status(200).json({ message: "Removed from favourites",status:200,success:SUCCESS });
};