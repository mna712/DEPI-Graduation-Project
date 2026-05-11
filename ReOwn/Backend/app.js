import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";

import dbConnect from "./config/dbConnection.js";

import Router from "./routes/index.js";
import chatRoutes from "./routes/chatRoutes.js";

import Conversation from "./models/conversationModel.js";
import Message from "./models/messageModel..js";

const app = express();

const PORT = process.env.PORT;

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api", Router);

app.use("/api/chat", chatRoutes);

/*
|--------------------------------------------------------------------------
| Create HTTP Server
|--------------------------------------------------------------------------
*/

const server = http.createServer(app);

/*
|--------------------------------------------------------------------------
| Socket.IO
|--------------------------------------------------------------------------
*/

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

/*
|--------------------------------------------------------------------------
| Socket Authentication Middleware
|--------------------------------------------------------------------------
*/

io.use((socket, next) => {

    try {

        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = decoded;

        next();

    } catch (error) {

        next(new Error("Unauthorized"));
    }
});

/*
|--------------------------------------------------------------------------
| Socket Connection
|--------------------------------------------------------------------------
*/

io.on("connection", (socket) => {

    console.log(`User connected with ID: ${socket.user.id}`);

    /*
    |--------------------------------------------------------------------------
    | Join Conversation
    |--------------------------------------------------------------------------
    */

    socket.on("joinConversation", async (conversationId) => {

        try {

            const conversation = await Conversation.findById(
                conversationId
            );

            if (!conversation) {
                return;
            }

            const isMember = conversation.members.some(
                member =>
                    member.toString() === socket.user.id
            );

            if (!isMember) {
                return;
            }

            socket.join(conversationId);

            console.log(
                `User ${socket.user.id} joined ${conversationId}`
            );

        } catch (error) {

            console.log(error);
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Send Message
    |--------------------------------------------------------------------------
    */

    socket.on("sendMessage", async (data) => {

        try {

            const { conversationId, text } = data;

            if (!text?.trim()) {
                return;
            }

            const conversation = await Conversation.findById(
                conversationId
            );

            if (!conversation) {
                return;
            }

            const isMember = conversation.members.some(
                member =>
                    member.toString() === socket.user.id
            );

            if (!isMember) {
                return;
            }

            const message = await Message.create({
                conversationId,
                sender: socket.user.id,
                text,
            });

            conversation.lastMessage = text;

            await conversation.save();

            const populatedMessage =
                await Message.findById(message._id)
                    .populate("sender", "name email");

            io.to(conversationId).emit(
                "receiveMessage",
                populatedMessage
            );

        } catch (error) {

            console.log(error);
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Typing Indicator
    |--------------------------------------------------------------------------
    */

    socket.on("typing", ({ conversationId }) => {

        socket
            .to(conversationId)
            .emit("typing", {
                userId: socket.user.id,
            });
    });

    /*
    |--------------------------------------------------------------------------
    | Disconnect
    |--------------------------------------------------------------------------
    */

    socket.on("disconnect", () => {

        console.log(
            `User disconnected: ${socket.user.id}`
        );
    });
});

/*
|--------------------------------------------------------------------------
| Database + Server Start
|--------------------------------------------------------------------------
*/

dbConnect()
    .then(() => {

        server.listen(PORT, () => {

            console.log(
                `Server running on ${PORT}`
            );
        });

    })
    .catch(console.log);