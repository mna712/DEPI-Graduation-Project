
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 40 },
    deleted_at: { type: Date, default: null },

  image: {
    type: Buffer,   
    required: true,
  },

  imageType: {
    type: String,
    required: true,
  }
});

categorySchema.virtual("imageSrc").get(function () {
  if (this.image && this.imageType) {
    return `data:${this.imageType};base64,${this.image.toString("base64")}`;
  }
});

export const Category = mongoose.model("Category", categorySchema);
