import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title && (updates.title.length < 3 || updates.title.length > 40))
      return res.status(422).json({ message: "Title must be 3-40 chars", success: FAIL, status: 422 });

    if (updates.description && (updates.description.length < 5 || updates.description.length > 500))
      return res.status(422).json({ message: "Description must be 5-500 chars", success: FAIL, status: 422 });

    if (updates.price != null && updates.price <= 0)
      return res.status(422).json({ message: "Price must be positive", success: FAIL, status: 422 });

    if (updates.categoryId) {
      const categoryExists = await Category.findOne({ _id: updates.categoryId, deleted_at: null });
      if (!categoryExists)
        return res.status(422).json({ message: "Category does not exist", success: FAIL, status: 422 });
    }

    if (updates.location && (updates.location.length < 2 || updates.location.length > 100))
      return res.status(422).json({ message: "Location must be 2-100 chars", success: FAIL, status: 422 });

    if (updates.condition && !["new", "used"].includes(updates.condition))
      return res.status(422).json({ message: "Invalid condition", success: FAIL, status: 422 });

    if (updates.status && !["available", "sold", "pending"].includes(updates.status))
      return res.status(422).json({ message: "Invalid status", success: FAIL, status: 422 });

    const product = await Product.findOne({ _id: id, deleted_at: null });
    if (!product)
      return res.status(404).json({ message: "Product not found", success: FAIL, status: 404 });

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
      product.images = images;
    }

    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    await product.save();

    const imagesBase64 = product.images.map(
      (img) => `data:${img.contentType};base64,${img.data.toString("base64")}`
    );

    const productData = {
      ...product.toObject(),
      images: imagesBase64,
    };

    return res.status(200).json({
      message: "Product updated successfully!",
      success: SUCCESS,
      data: productData,
      status: 200,
    });
};
