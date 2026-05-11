import socketio from "socket.io";
import jwt from "jsonwebtoken";
import registerChatSocket from "../sockets/chatSocket.js";
export default (server) => {

    const io = socketio(server, {
        cors: {
            origin: "*",
        },
    });

    io.use((socket, next) => {
          next();
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

    registerChatSocket(io);

    return io;
};