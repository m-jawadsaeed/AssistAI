import { Router } from "express";
import * as ticketController from "../controllers/ticket.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, ticketController.getTickets);

router.post("/", authenticate, ticketController.createTicket);

router.get("/:id", authenticate, ticketController.getTicket);

router.patch("/:id", authenticate, ticketController.updateTicket);

export default router;
