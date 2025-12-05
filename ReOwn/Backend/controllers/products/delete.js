import { Product } from "../../models/productModel.js";
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" , success: "fail", status: 404});
    return res.status(200).json({ message: "Product deleted Succesfully" , success: "success", status: 200});

};