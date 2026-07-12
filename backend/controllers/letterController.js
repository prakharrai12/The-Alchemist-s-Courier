import { LetterService } from "../services/letterService.js";

export class LetterController {
  static async getLetters(req, res, next) {
    try {
      const letters = LetterService.getAllLetters();
      res.json(letters);
    } catch (err) {
      next(err);
    }
  }

  static async createLetter(req, res, next) {
    try {
      const newLetter = LetterService.createLetter(req.body);
      if (req.app.locals.io) {
        req.app.locals.io.emit("new_letter", newLetter);
      }
      res.status(201).json(newLetter);
    } catch (err) {
      next(err);
    }
  }

  static async replyLetter(req, res, next) {
    try {
      const { id } = req.params;
      const letter = LetterService.replyToLetter(id, req.body);
      if (req.app.locals.io) {
        req.app.locals.io.emit("letter_updated", letter);
      }
      res.json(letter);
    } catch (err) {
      next(err);
    }
  }

  static async getBottles(req, res, next) {
    try {
      const bottles = LetterService.getAllBottles();
      res.json(bottles);
    } catch (err) {
      next(err);
    }
  }

  static async createBottle(req, res, next) {
    try {
      const newBottle = LetterService.createBottle(req.body);
      if (req.app.locals.io) {
        req.app.locals.io.emit("new_bottle", newBottle);
      }
      res.status(201).json(newBottle);
    } catch (err) {
      next(err);
    }
  }

  static async replyBottle(req, res, next) {
    try {
      const { id } = req.params;
      const bottle = LetterService.replyToBottle(id, req.body);
      if (req.app.locals.io) {
        req.app.locals.io.emit("bottle_updated", bottle);
      }
      res.json(bottle);
    } catch (err) {
      next(err);
    }
  }
}
