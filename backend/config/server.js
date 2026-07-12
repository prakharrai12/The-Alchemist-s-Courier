import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import authRoutes from "../routes/authRoutes.js";
import cipherRoutes from "../routes/cipherRoutes.js";
import letterRoutes from "../routes/letterRoutes.js";
import paymentRoutes from "../routes/paymentRoutes.js";
import apiDocsRoutes from "../routes/apiDocs.js";
import { loggerMiddleware } from "../middleware/loggerMiddleware.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { rateLimit, sanitizeInput } from "../middleware/rateLimiter.js";
import { initializeSocketEvents } from "../socket/socketHandler.js";
import { startCleanerJob } from "../jobs/cleanerJob.js";

export function createServerApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"]
    }
  });

  // Attach io to locals for controller access
  app.locals.io = io;

  // Middleware
  app.use(loggerMiddleware);
  app.use(sanitizeInput);
  app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 250 }));

  // Routes
  app.use("/api", authRoutes);
  app.use("/api", cipherRoutes);
  app.use("/api", letterRoutes);
  app.use("/api", paymentRoutes);
  app.use("/api", apiDocsRoutes);

  // Error Handler
  app.use(errorMiddleware);

  // Initialize Socket.IO Events
  initializeSocketEvents(io);

  // Start background cleaner job
  startCleanerJob();

  return { app, server, io };
}
