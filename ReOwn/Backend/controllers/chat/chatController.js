import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel..js";
export const createConversation = async (req, res) => {

    try {

        const { receiverId, productId } = req.body;   //6a020231d84e8ae760fbab0d

        const existingConversation = await Conversation.findOne({
            members: {
                $all: [req.user.id, receiverId],
            },
            productId,
        });

        if (existingConversation) {
            return res.json(existingConversation);
        }

        const conversation = await Conversation.create({
            members: [req.user.id, receiverId],
            productId,
        });

        res.status(201).json(conversation);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserConversations = async (req, res) => {

    try {

        const conversations = await Conversation.find({
            members: req.user.id,
        })
        .populate("members", "name email")
        .populate("productId");

        res.json(conversations);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMessages = async (req, res) => {

    try {

        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });

        res.json(messages);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};