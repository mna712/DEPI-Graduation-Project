import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
{
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },

    lastMessage: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
}
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;