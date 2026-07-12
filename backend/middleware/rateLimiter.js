import { logger } from "../utils/logger.js";

const ipBuckets = new Map();

/**
 * Rate limiting middleware for protecting Guild endpoints against brute-force or spam.
 */
export function rateLimit({ windowMs = 15 * 60 * 1000, max = 150, message = "Too many dispatches from your location. Please allow the pigeon carrier to rest." } = {}) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || "127.0.0.1";
    const now = Date.now();

    if (!ipBuckets.has(ip)) {
      ipBuckets.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const bucket = ipBuckets.get(ip);
    if (now > bucket.resetTime) {
      bucket.count = 1;
      bucket.resetTime = now + windowMs;
      return next();
    }

    bucket.count += 1;
    if (bucket.count > max) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({ error: message, retryAfterSeconds: Math.ceil((bucket.resetTime - now) / 1000) });
    }

    next();
  };
}

/**
 * Input sanitization middleware to prevent XSS and NoSQL/JSON injection.
 */
export function sanitizeInput(req, res, next) {
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes("..")) {
        delete obj[key];
        continue;
      }
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      } else if (typeof obj[key] === "object") {
        sanitizeObject(obj[key]);
      }
    }
    return obj;
  };

  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);

  next();
}
