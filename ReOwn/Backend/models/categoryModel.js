import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 40 },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
