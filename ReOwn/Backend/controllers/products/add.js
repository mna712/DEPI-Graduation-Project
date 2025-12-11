import { FAIL } from "../../utilities/successWords.js";
import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";
import cloudinary from "../../utilities/multer/cloudinary.config.js";
export const addProduct = async (req, res) => {
    const sellerId = req.user._id;
    const {
      title,
      description,
      price,
      categoryId,
      location,
      condition,
      sellerPhone,
      contactMethod,
    } = req.body;

    // Upload all images
    const images = [];

    if (!req.files || req.files.length === 0) {
      return res.status(422).json({
        message: "At least one image is required",
        success: FAIL
      });
    }

    if (req.files.length > 6) {
      return res.status(422).json({
        message: "Maximum 6 images allowed",
        success: FAIL
      });
    }

    for (const file of req.files) {
      try {
        // Convert buffer to base64 or use stream
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

        images.push({
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id
        });
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return res.status(500).json({
          message: "Error uploading images: " + uploadError.message,
          success: FAIL
        });
      }
    }
    if (!title || title.trim().length < 3 || title.trim().length > 40)
      return res
        .status(422)
        .json({ message: "Title must be 3-40 characters", success: FAIL });

    if (!description || description.length < 5 || description.length > 500)
      return res
        .status(422)
        .json({ message: "Description must be 5-500 chars", success: FAIL });

    if (price == null || price <= 0)
      return res
        .status(422)
        .json({ message: "Price must be a positive number", success: FAIL });

    let finalCategoryId = null;
    if (categoryId) {
      // Try to find category by ID first
      let categoryExists = await Category.findOne({
        _id: categoryId,
        deleted_at: null,
      });
      
      // If not found by ID, try to find by title/name
      if (!categoryExists) {
        categoryExists = await Category.findOne({
          title: categoryId,
          deleted_at: null,
        });
      }
      
      if (categoryExists) {
        finalCategoryId = categoryExists._id;
      } else {
        // If category doesn't exist, make it optional (set to null)
        // Or you can return an error if you want strict validation
        finalCategoryId = null;
      }
    }

    if (!location || location.length < 2 || location.length > 100)
      return res
        .status(422)
        .json({ message: "Location must be 2-100 chars", success: FAIL });

    if (!["new", "used"].includes(condition))
      return res
        .status(422)
        .json({ message: "Invalid condition", success: FAIL });

    if (
      contactMethod &&
      !["phone", "chat", "both"].includes(contactMethod)
    )
      return res.status(422).json({
        message: "contactMethod must be phone or chat or both",
        success: FAIL,
      });


    const newProduct = new Product({
      title,
      description,
      price,
      categoryId: finalCategoryId,
      location,
      condition,
      sellerId,
      sellerPhone,
      contactMethod,
      images
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      data: {
        _id: newProduct._id,
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        categoryId: newProduct.categoryId,
        location: newProduct.location,
        condition: newProduct.condition,
        sellerId: newProduct.sellerId,
        sellerPhone: newProduct.sellerPhone,
        contactMethod: newProduct.contactMethod,
        images: newProduct.images,
        status: newProduct.status
      },
      success: "success"
    });
};
