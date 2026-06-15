import { Router } from "express";

import authRoutes from "./auth.routes";
import conversationRoutes from "./conversation.routes";
import ticketRoutes from "./ticket.routes";
import faqRoutes from "./faq.routes";
import healthRoutes from "./health.routes";

const router = Router();

// Authentication
router.use("/auth", authRoutes);

// Conversations
router.use("/conversations", conversationRoutes);

// Tickets
router.use("/tickets", ticketRoutes);

// FAQs
router.use("/faqs", faqRoutes);

// Health
router.use("/health", healthRoutes);

export default router;
