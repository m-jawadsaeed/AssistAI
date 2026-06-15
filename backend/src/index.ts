import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";

import { env } from "./config/env";
import router from "./routes/index"
import { errorHandler, notFound } from "./middleware/errorHandler.middlware";
import { setupSocketHandlers } from "./services/socket.service";
import { startTicketWorker } from "./workers/ticket.worker";
import { pool } from "./db";
import type { ServerToClientEvents, ClientToServerEvents } from "./types";

const app = express();
app.set("trust proxy", 1);
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "*",
    credentials: false,
  },
  transports: ["websocket", "polling"],
});
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use((_req, res, next) => {
  res.setTimeout(15000, () => {
    res.status(408).json({ success: false, error: "Request timeout" });
  });
  next();
});

const limiter = rateLimit({
  windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(env.RATE_LIMIT_MAX),
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

app.use("/api", router);
if (env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "public");
  app.use(express.static(clientPath));

  app.get("/*splat", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/socket.io")) {
      res.sendFile(path.join(clientPath, "index.html"));
    }
  });
}

app.use(notFound);
app.use(errorHandler);

setupSocketHandlers(io);
startTicketWorker();

setInterval(
  async () => {
    try {
      await pool.query("SELECT 1");
      console.log(" DB keepalive ok");
    } catch (err) {
      console.error(" DB keepalive failed:", err);
    }
  },
  4 * 60 * 1000,
);

const PORT = parseInt(env.PORT);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(` Environment: ${env.NODE_ENV}`);
  console.log(` Frontend URL: ${env.FRONTEND_URL}`);
  console.log(` API: http://localhost:${PORT}/api`);
  console.log(` WebSocket ready`);
});

export { app, io };
