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
    const index = db.users.findIndex(u => u.id === identifier || u.email.toLowerCase() === (identifier || "").toLowerCase());
    if (index === -1) return null;

    Object.assign(db.users[index], updates);
    saveDatabase();
    return db.users[index];
  }
}
