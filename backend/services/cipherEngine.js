// WYRMVAULT — §12 Server-Side Seeded Cipher Engine
// All cipher generation and decryption verification are executed strictly on the backend
// so players cannot inspect browser devtools to find plaintexts.

import crypto from "crypto";

class CipherEngine {
  constructor() {
    this.vigenereKeywords = ["DRAGON", "WYRM", "VAULT", "OBSIDIAN", "BREATH", "SIGNET", "ARCHIVIST", "WARDEN", "SCROLL", "CHAMBER"];
  }

  // Tier I: Caesar Shift (Shift 1–25)
  encryptCaesar(plaintext, shift) {
    const cleanShift = ((shift % 26) + 26) % 26;
    return plaintext
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + cleanShift) % 26) + 65);
        }
        if (char >= "a" && char <= "z") {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + cleanShift) % 26) + 97);
        }
        return char;
      })
      .join("");
  }

  decryptCaesar(ciphertext, shift) {
    return this.encryptCaesar(ciphertext, 26 - (((shift % 26) + 26) % 26));
  }

  // Tier II: Vigenère Polyalphabetic Cipher
  encryptVigenere(plaintext, keyword) {
    const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleanKey.length) return plaintext;

    let keyIndex = 0;
    return plaintext
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        if (char >= "a" && char <= "z") {
          const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        return char;
      })
      .join("");
  }

  decryptVigenere(ciphertext, keyword) {
    const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleanKey.length) return ciphertext;

    let keyIndex = 0;
    return ciphertext
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        }
        if (char >= "a" && char <= "z") {
          const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
        }
        return char;
      })
      .join("");
  }

  // Deterministically generate a chamber cipher letter
  generateChamberCipher(tier, chamberNumber, caseId, plaintext) {
    const seed = crypto.createHash("md5").update(`${caseId}-${chamberNumber}-${tier}`).digest("hex");
    const seedNum = parseInt(seed.substring(0, 8), 16);

    if (tier === "TIER_I") {
      const shift = (seedNum % 25) + 1; // 1 to 25
      const ciphertext = this.encryptCaesar(plaintext, shift);
      return {
        tier: "TIER_I",
        algorithm: "Caesar Shift",
        ciphertext,
        secretMetadata: { shift },
        hint: `Rotary Shift Wheel Required (${shift > 12 ? "High Shift" : "Low Shift"})`
      };
    } else if (tier === "TIER_II") {
      const keyword = this.vigenereKeywords[seedNum % this.vigenereKeywords.length];
      const ciphertext = this.encryptVigenere(plaintext, keyword);
      return {
        tier: "TIER_II",
        algorithm: "Vigenère Polyalphabetic",
        ciphertext,
        secretMetadata: { keyword },
        hint: `Tabula Recta Matrix — Keyword length: ${keyword.length}`
      };
    } else {
      // Fallback or Tier III/IV
      const shift = 13;
      return {
        tier: "TIER_I",
        algorithm: "Caesar Shift (ROT13)",
        ciphertext: this.encryptCaesar(plaintext, shift),
        secretMetadata: { shift },
        hint: "Classic ROT13 Ward"
      };
    }
  }

  // Server-side verification of player decryption attempt
  verifyDecryption(ciphertext, attemptPlaintext, tier, secretMetadata, secretPlaintext = null) {
    if (!attemptPlaintext || !attemptPlaintext.trim()) return false;
    const cleanAttempt = attemptPlaintext.trim().toLowerCase().replace(/\s+/g, " ");

    if (secretPlaintext && typeof secretPlaintext === "string") {
      const cleanSecret = secretPlaintext.trim().toLowerCase().replace(/\s+/g, " ");
      if (cleanAttempt === cleanSecret) return true;
    }

    let actualPlaintext = "";
    if (tier === "TIER_I") {
      actualPlaintext = this.decryptCaesar(ciphertext, secretMetadata?.shift || 0);
    } else if (tier === "TIER_II") {
      actualPlaintext = this.decryptVigenere(ciphertext, secretMetadata?.keyword || "DRAGON");
    } else {
      actualPlaintext = ciphertext;
    }

    const cleanActual = actualPlaintext.trim().toLowerCase().replace(/\s+/g, " ");
    return cleanAttempt === cleanActual;
  }
}

export const cipherEngine = new CipherEngine();
