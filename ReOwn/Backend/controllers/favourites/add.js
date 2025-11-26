import { Favourite } from "../../models/favouriteModel";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const addFavourite = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    const exists = await Favourite.findOne({ userId, productId });
    if (exists)return res.status(409).json({ message: "Already in favourites", status: 409,  success : FAIL });

    await Favourite.create({ userId, productId });

    res.status(201).json({ message: "Added to favourites", status: 201 , success : SUCCESS});
};