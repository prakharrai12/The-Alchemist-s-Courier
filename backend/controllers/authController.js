import { AuthService } from "../services/authService.js";

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = AuthService.loginOrRegister(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const user = AuthService.getProfile(userId);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const user = AuthService.updateProfile(userId, req.body);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async goldTransaction(req, res, next) {
    try {
      const { userId, amount, reason } = req.body;
      const result = AuthService.processGoldTransaction(userId, amount, reason);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
