import { Rate } from "../../models/rateModel.js";
import { User } from "../../models/userModel.js";

export const getUserRatings = async (req, res) => {
    const { profileId } = req.params;
    const user = await User.findById(profileId).select("avgRate rateCount");
    if (!user) return res.status(404).json({ message: "User not found" });
    const ratings = await Rate.find({ profileId })
      .populate("reviewerId", "name email");

    return res.status(200).json({
      avgRate: user.avgRate,
      rateCount: user.rateCount,
      ratings
    });
};
