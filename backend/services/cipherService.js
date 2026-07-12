import { CipherRepository } from "../repositories/cipherRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { EncryptionUtil } from "../utils/encryption.js";

export class CipherService {
  static getAllCiphers() {
    return CipherRepository.findAll();
  }

  static unlockCipher(cipherId, attemptKey, userId) {
    const cipher = CipherRepository.findById(cipherId);
    if (!cipher) {
      throw { status: 404, message: "Cipher volume not found in Occult Vault." };
    }

    if (!attemptKey || attemptKey.trim().toUpperCase() !== cipher.requiredKey.toUpperCase()) {
      throw {
        status: 401,
        message: `INCORRECT CIPHER KEY '${attemptKey || ""}'. The lead seal refuses to yield. Hint key length: ${cipher.requiredKey.length} letters.`
      };
    }

    const user = UserRepository.findByIdOrEmail(userId);
    const bonusGold = cipher.rewardGold || 50;
    if (user) {
      const unlocked = user.unlockedCiphers || [];
      if (!unlocked.includes(cipherId)) {
        unlocked.push(cipherId);
        UserRepository.update(user.id, {
          unlockedCiphers: unlocked,
          goldSovereigns: (user.goldSovereigns || 1000) + bonusGold
        });
      }
    }

    return {
      success: true,
      cipher,
      rewardGold: bonusGold,
      message: "🔓 Lead Seal Broken! Occult text decrypted successfully."
    };
  }

  static createCipher(data) {
    if (!data.title || !data.requiredKey || !data.plainMain) {
      throw { status: 400, message: "Title, Key, and Secret Text required." };
    }

    const encryptedMain = EncryptionUtil.caesarEncrypt(data.plainMain);
    const encryptedSub = data.plainSub ? EncryptionUtil.caesarEncrypt(data.plainSub) : "Eboz kpzt uif nppomjhau...";

    const newCipherData = {
      title: data.title,
      securityLevel: data.securityLevel || "MEMBER ENCRYPTED SEAL",
      requiredKey: data.requiredKey.toUpperCase().trim(),
      cipherMain: encryptedMain,
      cipherSub: encryptedSub,
      plainMain: data.plainMain,
      plainSub: data.plainSub || "Sealed by personal signet ring.",
      rewardGold: 75,
      author: data.author || "Unknown Guild Member"
    };

    return CipherRepository.create(newCipherData);
  }
}
