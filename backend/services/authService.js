import { UserRepository } from "../repositories/userRepository.js";

export class AuthService {
  static loginOrRegister(email, password) {
    if (!email) {
      throw { status: 400, message: "Email is required to access the Guild Ledger." };
    }

    let user = UserRepository.findByIdOrEmail(email);

    if (!user) {
      user = UserRepository.create({ email, password: password || "guild1894" });
    } else if (password && user.password && user.password !== password) {
      throw { status: 401, message: "Invalid password for this Guild credentials." };
    }

    if (typeof user.goldSovereigns !== "number") {
      user = UserRepository.update(user.id, { goldSovereigns: 1000 });
    }

    return {
      user,
      token: "alchemist_token_" + user.id
    };
  }

  static getProfile(userId) {
    const user = UserRepository.findByIdOrEmail(userId);
    if (!user) {
      throw { status: 404, message: "Guild member not found in the Ledger." };
    }
    return user;
  }

  static updateProfile(userId, updates) {
    const user = UserRepository.update(userId, updates);
    if (!user) {
      throw { status: 404, message: "Guild member not found." };
    }
    return user;
  }

  static processGoldTransaction(userId, amount, reason) {
    const user = UserRepository.findByIdOrEmail(userId);
    if (!user) {
      throw { status: 404, message: "Guild member not found." };
    }

    if (amount < 0 && user.goldSovereigns + amount < 0) {
      throw { status: 400, message: "Insufficient Gold Sovereigns in Exchequer." };
    }

    const newGold = Math.max(0, user.goldSovereigns + amount);
    const newPrestige = amount > 0 ? (user.prestige || 0) + Math.floor(amount / 5) : (user.prestige || 0);

    const updated = UserRepository.update(user.id, {
      goldSovereigns: newGold,
      prestige: newPrestige
    });

    return {
      goldSovereigns: updated.goldSovereigns,
      prestige: updated.prestige,
      reason
    };
  }
}
