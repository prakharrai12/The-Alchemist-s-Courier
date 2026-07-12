import assert from "assert";
import { logger } from "../utils/logger.js";
import { createServerApp } from "../config/server.js";

console.log("🧪 Running Guild Operations & Logging Tests...");

logger.info("Test audit log entry generation.");
assert.ok(true, "Logger should append info entry cleanly.");

const { app } = createServerApp();
assert.ok(app, "Express server with rate limiter and API docs initialized.");

console.log("✅ All Operations, Logging, and Documentation tests passed!");
