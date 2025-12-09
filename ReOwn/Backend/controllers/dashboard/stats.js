import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import User from "../../models/userModel.js";
import Product from "../../models/productModel.js";
import Category from "../../models/categoryModel.js";

export const getStats = async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    // For reports, we'll use a placeholder for now (could be based on rates or something)
    const totalReports = 0; // TODO: implement based on actual reports

    res.status(200).json({
      status: 200,
      success: SUCCESS,
      data: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalReports
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      status: 500,
      success: FAIL,
      message: "Failed to fetch dashboard statistics"
    });
  }
};
