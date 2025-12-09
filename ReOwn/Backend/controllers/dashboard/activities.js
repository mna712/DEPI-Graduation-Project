import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import User from "../../models/userModel.js";
import Product from "../../models/productModel.js";

export const getRecentActivities = async (req, res) => {
  try {
    // Get recent products (last 5)
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name');

    // Get recent users (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Combine and format activities
    const activities = [];

    // Add product activities
    recentProducts.forEach(product => {
      activities.push({
        id: `product-${product._id}`,
        type: 'product',
        title: 'New Product Added',
        user: product.userId?.name || 'Unknown User',
        date: new Date(product.createdAt).toLocaleString()
      });
    });

    // Add user activities
    recentUsers.forEach(user => {
      activities.push({
        id: `user-${user._id}`,
        type: 'user',
        title: 'New User Registered',
        user: user.name,
        date: new Date(user.createdAt).toLocaleString()
      });
    });

    // Sort by date (most recent first) and limit to 10
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedActivities = activities.slice(0, 10);

    res.status(200).json({
      status: 200,
      success: SUCCESS,
      data: limitedActivities
    });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({
      status: 500,
      success: FAIL,
      message: "Failed to fetch recent activities"
    });
  }
};
