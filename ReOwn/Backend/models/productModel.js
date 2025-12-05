import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    description: { type: String, required: true, minlength: 5, maxlength: 500 },
    price: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    location: { type: String, required: true, minlength: 2, maxlength: 100 },
    condition: {
      type: String,
      required: true,
      enum: ["new", "used"],
    },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    sellerPhone: { type: String, default: null },
    contactMethod: { type: String, default: null, enum: ["phone", "chat","both"] },
  images:[
    {
      data: Buffer,
      contentType: String,
    }],  
    deleted_at: { type: Date, default: null },
    status: {enum: ["available","sold","pending"], type: String, default: "pending"},
    isFavourite:{
        type:Boolean
    }
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
