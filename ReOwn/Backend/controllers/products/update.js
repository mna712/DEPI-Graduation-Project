import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";
import { User } from "../../models/userModel.js";
import cloudinary from "../../utilities/multer/cloudinary.config.js";
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const updates = req.body;
  
  const product = await Product.findOne({ _id: id, deleted_at: null });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: FAIL,
      status: 404,
    });
  }
  
  if (product.sellerId.toString() !== userId.toString()) {
    return res.status(403).json({
      message: "you are not allowed to update this product",
      status: 403,
      success: FAIL
    });
  }

  if (product.status === 'sold') {
    return res.status(400).json({
      status: 400,
      message: "you cannot update a sold product",
      success: FAIL
    });
  }

  if (
    updates.title &&
    (updates.title.length < 3 || updates.title.length > 40)
  ) {
    return res.status(422).json({
      message: "Title must be 3-40 chars",
      success: FAIL,
      status: 422,
    });
  }

  if (
    updates.description &&
    (updates.description.length < 5 || updates.description.length > 500)
  ) {
    return res.status(422).json({
      message: "Description must be 5-500 chars",
      success: FAIL,
      status: 422,
    });
  }

  if (updates.price != null && updates.price <= 0) {
    return res.status(422).json({
      message: "Price must be positive",
      success: FAIL,
      status: 422,
    });
  }

  if (updates.categoryId) {
    const categoryExists = await Category.findOne({
      _id: updates.categoryId,
      deleted_at: null,
    });

    if (!categoryExists) {
      return res.status(422).json({
        message: "Category does not exist",
        success: FAIL,
        status: 422,
      });
    }
  }
  if (
    updates.location &&
    (updates.location.length < 2 || updates.location.length > 100)
  ) {
    return res.status(422).json({
      message: "Location must be 2-100 chars",
      success: FAIL,
      status: 422,
    });
  }

  if (updates.condition && !["new", "used"].includes(updates.condition)) {
    return res.status(422).json({
      message: "Invalid condition",
      success: FAIL,
      status: 422,
    });
  }

  if (
    updates.status &&
    !["available", "sold", "pending"].includes(updates.status)
  ) {
    return res.status(422).json({
      message: "Invalid status",
      success: FAIL,
      status: 422,
    });
  }

  if (req.files && req.files.length > 0) {
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      let newImages = [];
      for (const file of req.files) {
        try {
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "ReOwn/products" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });

          newImages.push({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          });
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).json({
            message: "Error uploading images: " + uploadError.message,
            success: FAIL
          });
        }
      }

      product.images = newImages;
    }

  Object.keys(updates).forEach((key) => {
    product[key] = updates[key];
  });

  await product.save();

  return res.status(200).json({
    message: "Product updated successfully!",
    success: SUCCESS,
    data: product,
    status: 200,
  });
};
