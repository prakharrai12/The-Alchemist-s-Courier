import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_DIR = path.join(__dirname, "..", "logs");
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const LOG_FILE = path.join(LOG_DIR, "guild_audit.log");

export const logger = {
  info: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [INFO] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    console.log(`📜 ${logEntry}`);
    fs.appendFileSync(LOG_FILE, logEntry + "\n", "utf-8");
  },
  warn: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [WARN] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    console.warn(`⚠️ ${logEntry}`);
    fs.appendFileSync(LOG_FILE, logEntry + "\n", "utf-8");
  },
  error: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [ERROR] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    console.error(`⚔️ ${logEntry}`);
    fs.appendFileSync(LOG_FILE, logEntry + "\n", "utf-8");
  }
};
