import { AuthService } from "../services/authService.js";

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const result = AuthService.loginOrRegister(email, password, username);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const result = AuthService.loginOrRegister(email, password, username);
      res.status(201).json(result);
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
}
