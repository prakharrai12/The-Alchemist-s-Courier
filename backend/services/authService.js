import { UserRepository } from "../repositories/userRepository.js";

export class AuthService {
  static loginOrRegister(email, password, username) {
    if (!email) {
      throw { status: 400, message: "Email is required to enter the Wyrmvault." };
    }

    let user = UserRepository.findByIdOrEmail(email);

    if (!user) {
      user = UserRepository.create({
        email,
        username: username || email.split("@")[0] || "Vault-Breaker",
        password: password || "wyrmvault1894"
      });
    } else if (password && user.password && user.password !== password) {
      throw { status: 401, message: "Invalid signet password for these credentials." };
    }

    return {
      user,
      token: "alchemist_token_" + user.id
    };
  }

  static getProfile(userId) {
    const user = UserRepository.findByIdOrEmail(userId);
    if (!user) {
      throw { status: 404, message: "Codebreaker not found in vault registry." };
    }
    return user;
  }

  static updateProfile(userId, updates) {
    const user = UserRepository.update(userId, updates);
    if (!user) {
      throw { status: 404, message: "Codebreaker not found." };
    }
    return user;
  }
}
