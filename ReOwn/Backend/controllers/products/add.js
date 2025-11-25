import {Product} from "../../models/productModel.js";
import {SUCCESS} from "../../utilities/successWords.js";
const addProduct = async (req, res) => {
  const buyerId = req.user._id;
  const {
    title,
    description,
    price,
    categoryId,
    location,
    condition,
    favourite,
    buyerPhone,
    contactMethod,
    images,
  } = req.body;

  const newProduct = new Product({
    title,
    description,
    price,
    categoryId,
    location,
    condition,
    favourite,
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

export default addProduct;