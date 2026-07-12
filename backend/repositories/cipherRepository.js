import { getDatabase, saveDatabase } from "../config/database.js";
import { Cipher } from "../models/Cipher.js";

export class CipherRepository {
  static findAll() {
    const db = getDatabase();
    return db.ciphers;
  }

  static findById(id) {
    const db = getDatabase();
    return db.ciphers.find(c => c.id === id) || null;
  }

  static create(cipherData) {
    const db = getDatabase();
    const newCipher = new Cipher(cipherData);
    db.ciphers.push(newCipher);
    saveDatabase();
    return newCipher;
  }
}
