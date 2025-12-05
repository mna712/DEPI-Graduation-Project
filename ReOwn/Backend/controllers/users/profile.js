import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/userModel.js";
import { SUCCESS } from "../../utilities/successWords.js";

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
    if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });
  }
 
    return res.status(200).json({
    success: SUCCESS,
    status: 200,
    data: {
      firstName:user.firstName,
      lastName:user.lastName,
      phone:user.phone,
      email: user.email,
      address: user.address,
      image:user.image,
      gender: user.gender,
      location : user.location,
      rate:user.rate,
      image: user.image,
    },
  });
 
});
