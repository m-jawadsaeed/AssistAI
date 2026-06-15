import { Router } from "express";
import * as chatController from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, chatController.getConversations);

router.post("/", authenticate, chatController.createConversation);

router.get("/:id", authenticate, chatController.getConversation);

router.delete("/:id", authenticate, chatController.deleteConversation);

router.get("/:id/messages", authenticate, chatController.getMessages);

export default router;
