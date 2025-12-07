
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 40 },
  deleted_at: { type: Date, default: null },

image: {
  url: { type: String, required: true },
  public_id: { type: String, required: true }
},
});

export const Category = mongoose.model("Category", categorySchema);
