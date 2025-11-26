import { Product } from "../../models/productModel";
export const getAllProducts = async (req, res) => {

 const categoryId = req.params.categoryId;
 const categoryProducts= await Product.find({categoryId,deleted_at:null})
 if(!categoryProducts || categoryProducts.length===0)
 {
    return res.status(404).json({
        status: 404,
        message: "No products found for this category",
        success: FAIL
    });
}
    res.status(200).json({
      status: 200,
      message: "Category products fetched successfully",
      data: categoryProducts,
      success: SUCCESS,
    });
}



