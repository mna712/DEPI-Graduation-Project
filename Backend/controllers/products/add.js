import { Product } from "../../models/productModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { Category } from "../../models/categoryModel.js";
export const addProduct = async (req, res) => {
  const buyerId = req.user._id;
  const {
    title,
    description,
    price,
    categoryId,
    location,
    condition,
    buyerPhone,
    contactMethod,
  } = req.body;

  const images =
    req.files?.map((file) => ({
      url: file.path,
      public_id: file.filename,
    })) || [];

    
  if (!title || title.length < 3 || title.length > 40)
    return res
      .status(422)
      .json({
        message: "Title must be 3-40 chars",
        success: FAIL,
        status: 422,
      });

  if (!description || description.length < 5 || description.length > 500)
    return res
      .status(422)
      .json({
        message: "Description must be 5-500 chars",
        success: FAIL,
        status: 422,
      });

  if (price == null || price <= 0)
    return res
      .status(422)
      .json({
        message: "Price must be a positive number",
        success: FAIL,
        status: 422,
      });

  const categoryExists = await Category.findOne({
    _id: categoryId,
    deleted_at: null,
  });
  if (categoryId && !categoryExists)
    return res
      .status(422)
      .json({ message: "Category does not exist", success: FAIL, status: 422 });
  if (!location || location.length < 2 || location.length > 100)
    return res
      .status(422)
      .json({
        message: "Location must be 2-100 chars",
        success: FAIL,
        status: 422,
      });

  if (!["new", "used"].includes(condition))
    return res
      .status(422)
      .json({ message: "Invalid condition", success: FAIL, status: 422 });

  if (contactMethod && !["phone", "chat", "both"].includes(contactMethod))
    return res
      .status(422)
      .json({
        message: "contactMethod must be phone or chat or both ",
        success: FAIL,
        status: 422,
      });

  if (!title || !description || !price || !location || !condition) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      message:
        "Title, description, price, location, and condition are required",
    });
  }

  const newProduct = new Product({
    title,
    description,
    price,
    categoryId,
    location,
    condition,
    buyerId,
    buyerPhone,
    contactMethod,
    images,
  });

  await newProduct.save();
  res.status(201).json({
    status: 201,
    message: "Product added successfully",
    data: newProduct,
    success: SUCCESS,
  });
};
