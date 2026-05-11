import express from "express";
const router = express.Router();

import 
    {createConversation,
    getUserConversations,
    getMessages} from "../controllers/chat/chatController.js";

import { protect } from "../middlewares/auth.js";
router.use(protect);

router.post("/conversation", createConversation);

router.get("/conversations", getUserConversations);

router.get(
    "/messages/:conversationId",
    getMessages
);

export default router;