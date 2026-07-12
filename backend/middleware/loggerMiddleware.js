import { logger } from "../utils/logger.js";

export function loggerMiddleware(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`[${req.method}] ${req.originalUrl} -> Status: ${res.statusCode} (${duration}ms)`);
  });
  next();
}
