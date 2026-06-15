import { Router } from "express";
import * as faqController from "../controllers/faq.controller";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", faqController.getFAQs);

router.post("/", authenticate, requireAdmin, faqController.createFAQ);

router.patch("/:id", authenticate, requireAdmin, faqController.updateFAQ);

router.delete("/:id", authenticate, requireAdmin, faqController.deleteFAQ);

export default router;
