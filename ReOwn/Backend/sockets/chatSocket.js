import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel..js";
import jwt from "jsonwebtoken";

export default (io) => {

    io.on(EVENTS.CONNECTION, (socket) => {

        console.log(`User connected: ${socket.user.id}`);

        socket.on(EVENTS.JOIN_CONVERSATION, async (conversationId) => {

            const conversation = await Conversation.findById(conversationId);

            if (!conversation) return;

            const isMember = conversation.members.some(
                member =>
                    member.toString() === socket.user.id
            );

            if (!isMember) return;

            socket.join(conversationId);

            console.log(`Joined room ${conversationId}`);
        });

        socket.on(EVENTS.SEND_MESSAGE, async (data) => {

            try {

                const { conversationId, text } = data;

                const conversation = await Conversation.findById(conversationId);

                if (!conversation) return;

                const isMember = conversation.members.some(
                    member =>
                        member.toString() === socket.user.id
                );

                if (!isMember) return;

                const message = await Message.create({
                    conversationId,
                    sender: socket.user.id,
                    text,
                });

                conversation.lastMessage = text;

                await conversation.save();

                const populatedMessage = await Message.findById(message._id)
                    .populate("sender", "name email");

                io.to(conversationId).emit(
                    EVENTS.RECEIVE_MESSAGE,
                    populatedMessage
                );

            } catch (error) {
                console.log(error);
            }
        });

        socket.on(EVENTS.TYPING, ({ conversationId }) => {

            socket.to(conversationId).emit(EVENTS.TYPING, {
                userId: socket.user.id,
            });
        });

        socket.on(EVENTS.DISCONNECT, () => {
            console.log("User disconnected");
        });

    });

};