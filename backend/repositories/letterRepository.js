import { getDatabase, saveDatabase } from "../config/database.js";
import { Letter } from "../models/Letter.js";
import { Bottle } from "../models/Bottle.js";

export class LetterRepository {
  static findAllLetters() {
    const db = getDatabase();
    return db.letters;
  }

  static findLetterById(id) {
    const db = getDatabase();
    return db.letters.find(l => l.id === id) || null;
  }

  static createLetter(data) {
    const db = getDatabase();
    const newLetter = new Letter(data);
    db.letters.unshift(newLetter);
    saveDatabase();
    return newLetter;
  }

  static addLetterReply(letterId, replyData) {
    const db = getDatabase();
    const letter = db.letters.find(l => l.id === letterId);
    if (!letter) return null;

    const reply = {
      id: "r" + Date.now(),
      sender: replyData.sender || "Anonymous Traveler",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      content: replyData.content
    };
    letter.replies.push(reply);
    saveDatabase();
    return letter;
  }

  static likeLetter(letterId) {
    const db = getDatabase();
    const letter = db.letters.find(l => l.id === letterId);
    if (!letter) return null;

    letter.likes = (letter.likes || 0) + 1;
    saveDatabase();
    return letter;
  }

  static findAllBottles() {
    const db = getDatabase();
    return db.bottles;
  }

  static findBottleById(id) {
    const db = getDatabase();
    return db.bottles.find(b => b.id === id) || null;
  }

  static createBottle(data) {
    const db = getDatabase();
    const newBottle = new Bottle(data);
    db.bottles.unshift(newBottle);
    saveDatabase();
    return newBottle;
  }

  static addBottleReply(bottleId, replyData) {
    const db = getDatabase();
    const bottle = db.bottles.find(b => b.id === bottleId);
    if (!bottle) return null;

    const reply = {
      id: "br" + Date.now(),
      sender: replyData.sender || "Beachcomber",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      content: replyData.content
    };
    bottle.replies.push(reply);
    bottle.status = "washed_ashore";
    saveDatabase();
    return bottle;
  }
}
