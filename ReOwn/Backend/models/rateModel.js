import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  profileId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  reviewerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  rate: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  feedback: { 
    type: String 
  }
}, { timestamps: true });

export const Rate = mongoose.model("Rate", rateSchema);
