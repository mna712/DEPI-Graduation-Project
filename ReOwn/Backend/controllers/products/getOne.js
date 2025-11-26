import { Product } from "../../models/productModel.js";
export const getProductById = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, deleted_at: null });

    if (!product)
     return res.status(404).json({ message: "Product not found" , success: "fail", status: 404});

    return res.status(200).json({data: product ,  message: "Product retrieved successfully", success: "success", status: 200});
};