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

    for (const file of req.files) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.path,
        { folder: "ReOwn/products" }
      );

      images.push({
        url: secure_url,
        public_id: public_id
      });
    }
if(!title){
  console.log('no title');
}

    if (!description || description.length < 5 || description.length > 500)
      return res
        .status(422)
        .json({ message: "Description must be 5-500 chars", success: FAIL });

    if (price == null || price <= 0)
      return res
        .status(422)
        .json({ message: "Price must be a positive number", success: FAIL });

    if (categoryId) {
      const categoryExists = await Category.findOne({
        _id: categoryId,
        deleted_at: null,
      });
      if (!categoryExists)
        return res
          .status(422)
          .json({ message: "Category does not exist", success: FAIL });
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
      categoryId,
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
      data: newProduct,
      success: "success"
    });
};
