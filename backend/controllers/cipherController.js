import { CipherService } from "../services/cipherService.js";

export class CipherController {
  static async getCiphers(req, res, next) {
    try {
      const ciphers = CipherService.getAllCiphers();
      res.json(ciphers);
    } catch (err) {
      next(err);
    }
  }

  static async unlockCipher(req, res, next) {
    try {
      const { cipherId, attemptKey, userId } = req.body;
      const result = CipherService.unlockCipher(cipherId, attemptKey, userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createCipher(req, res, next) {
    try {
      const newCipher = CipherService.createCipher(req.body);
      if (req.app.locals.io) {
        req.app.locals.io.emit("new_cipher", newCipher);
      }
      res.status(201).json(newCipher);
    } catch (err) {
      next(err);
    }
  }
}
