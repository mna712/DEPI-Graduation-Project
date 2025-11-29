import { SUCCESS,FAIL } from "../../utilities/successWords.js";
import { Product } from "../../models/productModel.js";
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title && (updates.title.length < 3 || updates.title.length > 40))
      return res.status(422).json({ message: "Title must be 3-40 chars" ,success : FAIL, status: 422});

    if (updates.description && (updates.description.length < 5 || updates.description.length > 500))
      return res.status(422).json({ message: "Description must be 5-500 chars", success : FAIL, status: 422 });

    if (updates.price != null && updates.price <= 0)
      return res.status(422).json({ message: "Price must be positive" , success : FAIL, status: 422  });
     const categoryExists = await Category.findOne({ _id: updates.categoryId, deleted_at: null });
    if (updates.categoryId && !categoryExists)
        return res.status(422).json({ message: "Category does not exist" , success : FAIL, status: 422 });

    if (updates.location && (updates.location.length < 2 || updates.location.length > 100))
      return res.status(422).json({ message: "Location must be 2-100 chars", success : FAIL, status: 422  });

    if (updates.condition && !["new", "used"].includes(updates.condition))
      return res.status(422).json({ message: "Invalid condition" , success : FAIL, status: 422 });

    if (updates.status && !["available", "sold", "pending"].includes(updates.status))
      return res.status(422).json({ message: "Invalid status", success : FAIL, status: 422  });
  
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const images = req.files?.map((file) => ({
      url: file.path,
      public_id: file.filename,
    })) || [];

    product.images = images;
    const product = await Product.findOneAndUpdate(
      { _id: id, deleted_at: null },
      updates,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" , success : FAIL, status: 404 });

    return res.status(200).json({ message: "product updated succesfully!",success:SUCCESS ,data:product, status:200 });
};
