// import Product from "../../models/productModel.js";
// import { SUCCESS } from "../../utilities/successWords";
// const updateProduct = async (req, res) => {
// const productId = req.params.id;
//   const {
//     title,
//     description,
//     price,
//     categoryId,
//     location,
//     condition,
//     favourite,
//     buyerPhone,
//     contactMethod,
//     images,
//   } = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(
//         {_id:productId},
// {
//     title,
//     description, 
//     price,
//     categoryId,
//     location,
//     condition,
//     favourite,
//     buyerPhone,
//     contactMethod,
//     images
// },
//     res.status(200).json({
//     status: 200,
//     message: "Product updated successfully",
//     data: updatedProduct,
//     success: SUCCESS,
//     });
// };
// export default updateProduct;