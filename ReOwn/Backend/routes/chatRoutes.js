import express from "express";
const router = express.Router();

import {
  createConversation,
  getUserConversations,
  getMessages,
} from "../controllers/chat/chatController.js";

import { protect } from "../middlewares/auth.js";
router.use(protect);

router.post("/conversation", protect, createConversation);

router.get("/conversations", protect, getUserConversations);

router.get("/messages/:conversationId", protect, getMessages);

export default router;
