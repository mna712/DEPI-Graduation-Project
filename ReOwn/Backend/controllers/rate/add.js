import { Rate } from "../../models/rateModel.js";
import { User } from "../../models/userModel.js";

export const addRate = async (req, res) => {
    const { profileId } = req.params; 
    const reviewerId = req.user._id; 
    const { rate, feedback } = req.body;

    if (profileId === reviewerId.toString()) {
      return res.status(400).json({ message: "You cannot rate yourself" });
    }

    if (!rate || rate < 1 || rate > 5) {
      return res.status(400).json({ message: "Rate must be between 1 and 5" });
    }

    const exists = await Rate.findOne({ profileId, reviewerId });
    if (exists) {
      return res.status(400).json({ message: "You already rated this user" });
    }

    const newRate = new Rate({
      profileId,
      reviewerId,
      rate,
      feedback
    });
    await newRate.save();

    const stats = await Rate.aggregate([
      { $match: { profileId: new mongoose.Types.ObjectId(profileId) } },
      { $group: { _id: "$profileId", avg: { $avg: "$rate" }, count: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
      await User.findByIdAndUpdate(profileId, {
        avgRate: stats[0].avg,
        rateCount: stats[0].count
      });
    }

    return res.status(200).json({
      message: "Rate added successfully",
      rate: newRate
    });
};
