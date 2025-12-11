import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      address: user.address,
      image: user.image,
      location: user.location,
    },
  });
});
