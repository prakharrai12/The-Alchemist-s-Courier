import { getDatabase, saveDatabase } from "../config/database.js";
import { User } from "../models/User.js";

export class UserRepository {
  static findAll() {
    const db = getDatabase();
    return db.users;
  }

  static findByIdOrEmail(identifier) {
    const db = getDatabase();
    if (!identifier) return null;
    const lower = identifier.toLowerCase();
    return db.users.find(u => u.id === identifier || u.email.toLowerCase() === lower) || null;
  }

  static create(userData) {
    const db = getDatabase();
    const newUser = new User(userData);
    db.users.push(newUser);
    saveDatabase();
    return newUser;
  }

  static update(identifier, updates) {
    const db = getDatabase();
    if (!identifier || typeof identifier !== "string") return null;
    const cleanId = identifier.trim().toLowerCase();
    const index = db.users.findIndex(u => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId);
    if (index === -1) return null;

    if (updates && typeof updates === "object") {
      const safeUpdates = {};
      for (const [key, value] of Object.entries(updates)) {
        if (key !== "__proto__" && key !== "constructor" && key !== "prototype" && !key.startsWith("$")) {
          safeUpdates[key] = value;
        }
      }
      Object.assign(db.users[index], safeUpdates);
      saveDatabase();
    }
    return db.users[index];
  }
}
