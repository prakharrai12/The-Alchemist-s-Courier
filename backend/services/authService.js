import { UserRepository } from "../repositories/userRepository.js";

export class AuthService {
  static loginOrRegister(email, password, username) {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw { status: 400, message: "A valid sealed email address is required to enter the Wyrmvault." };
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = UserRepository.findByIdOrEmail(cleanEmail);

    if (!user) {
      if (!password || password.length < 6) {
        throw { status: 400, message: "New signet passphrase must be at least 6 characters." };
      }
      const cleanUsername = username && typeof username === "string"
        ? username.replace(/<[^>]*>?/gm, "").trim().substring(0, 32)
        : cleanEmail.split("@")[0].substring(0, 32) || "Vault-Breaker";

      user = UserRepository.create({
        email: cleanEmail,
        username: cleanUsername,
        password: password
      });
    } else {
      // Strict password match required for existing couriers
      if (!password || user.password !== password) {
        throw { status: 401, message: "Invalid signet password for these credentials." };
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || user.username,
        username: user.username || user.name,
        title: user.title,
        rank: user.rank,
        prestige: user.prestige,
        goldSovereigns: user.goldSovereigns,
        avatarUrl: user.avatarUrl,
        waxColor: user.waxColor,
        crest: user.crest
      },
      token: "alchemist_token_" + user.id
    };
  }

  static getProfile(userId) {
    if (!userId || typeof userId !== "string") {
      throw { status: 400, message: "Invalid codebreaker ID." };
    }
    const user = UserRepository.findByIdOrEmail(userId.trim());
    if (!user) {
      throw { status: 404, message: "Codebreaker not found in vault registry." };
    }
    return user;
  }

  static updateProfile(userId, updates) {
    if (!userId || !updates || typeof updates !== "object") {
      throw { status: 400, message: "Invalid profile update payload." };
    }

    // Strict allowlist of editable fields to prevent prototype pollution or privilege escalation
    const allowlistedKeys = ["name", "username", "title", "avatarUrl", "waxColor", "crest"];
    const safeUpdates = {};
    for (const key of allowlistedKeys) {
      if (updates[key] !== undefined && typeof updates[key] === "string") {
        safeUpdates[key] = updates[key].replace(/<[^>]*>?/gm, "").trim().substring(0, 128);
      }
    }

    const user = UserRepository.update(userId.trim(), safeUpdates);
    if (!user) {
      throw { status: 404, message: "Codebreaker not found." };
    }
    return user;
  }
}
