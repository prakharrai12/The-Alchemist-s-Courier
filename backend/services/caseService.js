// WYRMVAULT — §4, §5 & §7 Case Session & Wyrm's Breath State Management
// Manages multiplayer lobbies (4-6 players), Ready-Check, flippable role lock-ins,
// and authoritative Wyrm's Breath tension meter.

import { cipherEngine } from "./cipherEngine.js";
import { getRandomCaseByTier } from "../data/caseCatalog.js";

class CaseService {
  constructor() {
    this.activeCases = new Map();
  }

  // Create a new Case Session (e.g., WV-8492)
  createCase(hostUser, tierSeal = "NOVICE") {
    const catalogCase = getRandomCaseByTier(tierSeal);
    const caseId = "WV-" + Math.floor(1000 + Math.random() * 9000);
    
    // Generate chamber letters dynamically from catalog case
    const letters = (catalogCase.evidence_letters || []).map((letter, idx) => {
      const isCaesar = (letter.cipher_type || "").toLowerCase().includes("caesar") || (letter.cipher_type || "").toLowerCase().includes("shift") || (letter.cipher_type || "").toLowerCase().includes("rot");
      const tier = isCaesar ? "TIER_I" : "TIER_II";
      const cipherData = cipherEngine.generateChamberCipher(tier, idx + 1, caseId, letter.plaintext);
      return {
        id: `L-${idx + 1}`,
        chamber: letter.chamber_id || `Chamber ${idx + 1}`,
        title: `Sealed Evidence Volume #${idx + 101}`,
        tier: cipherData.tier,
        algorithm: cipherData.algorithm,
        ciphertext: cipherData.ciphertext,
        secretMetadata: cipherData.secretMetadata,
        secretPlaintext: letter.plaintext,
        hint: cipherData.hint,
        isSolved: false,
        solvedBy: null,
        plaintext: null,
        clue_tags: letter.clue_tags || [],
        advanced_suspects: letter.advanced_suspects || [],
        summary_when_solved: letter.summary_when_solved || ""
      };
    });

    const whispersMap = { NOVICE: 3, ADEPT: 2, MASTER: 1, ARCHON: 0 };
    const wardWhispersMax = whispersMap[tierSeal.toUpperCase()] ?? 3;

    const newCase = {
      caseId,
      tierSeal: tierSeal.toUpperCase(),
      status: "LOBBY", // LOBBY, ROLE_SELECT, EXPLORATION, VERDICT, DEBRIEF
      hostId: hostUser.id || hostUser.email,
      players: [
        {
          userId: hostUser.id || hostUser.email,
          username: hostUser.username || hostUser.name || "Host Vault-Breaker",
          isReady: false,
          role: null
        }
      ],
      wyrmsBreath: 0, // 0 to 100%
      usedPowers: new Set(), // Track one-time powers
      wardWhispersMax,
      wardWhispersRemaining: wardWhispersMax,
      letterWhispers: {}, // { "L-1": level }
      guessCooldowns: {}, // { userId: timestampMs }
      letters,
      pinnedEvidence: [],
      masterKeyword: (catalogCase.culprit || "SIGNET").toUpperCase(), // Final Verdict keyword fallback
      verdictAttempts: 0,
      createdAt: new Date().toISOString(),
      // Rich Case Schema Properties
      caseCatalogId: catalogCase.id,
      title: catalogCase.title,
      era_flavor_line: catalogCase.era_flavor_line,
      victim: catalogCase.victim,
      suspects: catalogCase.suspects,
      culprit: catalogCase.culprit,
      solution_requirement: catalogCase.solution_requirement
    };

    this.activeCases.set(caseId, newCase);
    return newCase;
  }

  getCase(caseId) {
    if (!caseId) return null;
    return this.activeCases.get(caseId.toUpperCase());
  }

  getSanitizedCase(caseId) {
    const caseObj = this.getCase(caseId);
    return this.sanitizeCase(caseObj);
  }

  sanitizeCase(caseObj) {
    if (!caseObj) return null;
    const isDebrief = caseObj.status === "DEBRIEF";

    return {
      ...caseObj,
      // Hide culprit and solution requirement unless case is finished in DEBRIEF
      culprit: isDebrief ? caseObj.culprit : null,
      solution_requirement: isDebrief ? caseObj.solution_requirement : null,
      letters: (caseObj.letters || []).map((letter) => {
        const isSolved = letter.isSolved || isDebrief;
        return {
          ...letter,
          plaintext: isSolved ? (letter.plaintext || letter.secretPlaintext) : null,
          secretMetadata: isSolved ? letter.secretMetadata : null,
          secretPlaintext: undefined
        };
      }),
      pinnedEvidence: (caseObj.pinnedEvidence || []).map((letter) => ({
        ...letter,
        plaintext: letter.plaintext || letter.secretPlaintext,
        secretPlaintext: undefined
      }))
    };
  }

  joinCase(caseId, user) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) {
      throw new Error("Case ID not found. Verify your 6-character obsidian seal.");
    }
    if (caseObj.status !== "LOBBY" && caseObj.status !== "ROLE_SELECT") {
      throw new Error("This Case is already in progress inside the Wyrmvault.");
    }
    if (caseObj.players.length >= 6) {
      throw new Error("Case Lobby is full (Maximum 6 Vault-Breakers allowed per chamber).");
    }

    const userId = user.id || user.email;
    const existing = caseObj.players.find((p) => p.userId === userId);
    if (!existing) {
      caseObj.players.push({
        userId,
        username: user.username || user.name || `Vault-Breaker #${caseObj.players.length + 1}`,
        isReady: false,
        role: null
      });
    }

    return caseObj;
  }

  // Ready-check inside Lobby or Role Select
  setPlayerReady(caseId, userId, isReady, role = null) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) throw new Error("Case not found.");

    const player = caseObj.players.find((p) => p.userId === userId);
    if (!player) throw new Error("Player not in Case.");

    player.isReady = isReady;
    if (role) {
      // Ensure no two players have the exact same role
      const roleTaken = caseObj.players.some((p) => p.role === role && p.userId !== userId);
      if (roleTaken) {
        throw new Error(`The role ${role} has already been claimed by another Vault-Breaker.`);
      }
      player.role = role;
    }

    // Check if 100% of players are ready (and min 4 players, or for MVP testing min 1)
    const allReady = caseObj.players.length >= 1 && caseObj.players.every((p) => p.isReady && p.role);
    if (allReady && caseObj.status === "ROLE_SELECT") {
      caseObj.status = "EXPLORATION";
    } else if (allReady && caseObj.status === "LOBBY") {
      caseObj.status = "ROLE_SELECT";
      // Reset ready check for role selection
      caseObj.players.forEach((p) => (p.isReady = false));
    }

    return { caseObj, allReady, status: caseObj.status };
  }

  // Wyrm's Breath meter update (§7)
  tickWyrmsBreath(caseId, delta, reason) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) return null;

    caseObj.wyrmsBreath = Math.max(0, Math.min(100, caseObj.wyrmsBreath + delta));
    if (caseObj.wyrmsBreath >= 100 && caseObj.status !== "DEBRIEF") {
      caseObj.status = "DEBRIEF";
      caseObj.outcome = "DRAGON_AWOKE";
    }

    return { wyrmsBreath: caseObj.wyrmsBreath, status: caseObj.status, reason };
  }

  // §5 Use Role Power (Once per Case enforcement)
  useRolePower(caseId, userId, roleName, targetId) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) throw new Error("Case not found.");

    const powerKey = `${caseId}-${userId}-${roleName}`;
    if (caseObj.usedPowers.has(powerKey)) {
      const error = new Error(`The power of ${roleName} has already been expended in this Case (§5).`);
      error.statusCode = 403;
      throw error;
    }

    // Mark expended
    caseObj.usedPowers.add(powerKey);

    let resultMsg = "";
    let powerData = {};

    if (roleName === "THE_ARCHIVIST") {
      const letter = caseObj.letters.find((l) => l.id === targetId);
      resultMsg = letter
        ? `Archivist revealed: Letter ${letter.id} is encrypted using ${letter.algorithm}.`
        : "Archivist revealed cipher registry entries.";
      powerData = { targetLetterId: targetId, algorithm: letter?.algorithm };
    } else if (roleName === "THE_CRYPTANALYST") {
      const letter = caseObj.letters.find((l) => l.id === targetId);
      resultMsg = `Cryptanalyst performed frequency scan on ${letter ? letter.id : "chamber text"}.`;
      powerData = { frequencyScan: { E: 14, T: 11, A: 9, O: 8, S: 7 } };
    } else if (roleName === "THE_SCRIBE") {
      const letter = caseObj.letters.find((l) => l.id === targetId);
      if (letter) {
        const firstThree = cipherEngine.decryptCaesar(letter.ciphertext.substring(0, 3), letter.secretMetadata?.shift || 0);
        resultMsg = `Scribe partially deciphered first 3 characters: "${firstThree}..."`;
        powerData = { partialPlaintext: firstThree };
      } else {
        resultMsg = "Scribe signet imprinted.";
      }
    } else if (roleName === "THE_SCOUT") {
      resultMsg = "Scout warded the next chamber doorway. Wyrm's Breath will not tick on next transition.";
      powerData = { warded: true };
    } else if (roleName === "THE_ALCHEMIST") {
      resultMsg = "Alchemist washed letter parchment with solvent, revealing hidden marginalia: 'LOOK FOR SHIFTS OVER 10'.";
      powerData = { marginalia: "LOOK FOR SHIFTS OVER 10" };
    } else if (roleName === "THE_WARDEN") {
      this.tickWyrmsBreath(caseId, -15, "WARDEN_SUPPRESSION");
      resultMsg = "Warden chanted suppression ward. Wyrm's Breath reduced by 15%!";
      powerData = { wyrmsBreath: caseObj.wyrmsBreath };
    } else {
      resultMsg = `Power deployed: ${roleName}`;
    }

    return { success: true, message: resultMsg, powerData, wyrmsBreath: caseObj.wyrmsBreath };
  }

  // §6 & §7 Use Ward Whisper (Progressive Hint Economy)
  useWardWhisper(caseId, letterId, userId, username) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) throw new Error("Case not found.");

    if (caseObj.wardWhispersRemaining <= 0) {
      const error = new Error("No Ward Whispers remaining in the pool (`§6`). The Archon/Master seals demand strict precision.");
      error.statusCode = 403;
      throw error;
    }

    const letter = caseObj.letters.find((l) => l.id === letterId);
    if (!letter) throw new Error("Letter evidence not found.");

    // Deduct 1 whisper
    caseObj.wardWhispersRemaining -= 1;

    // Cost: +5% Wyrm's Breath
    const breathTick = (caseObj.tierSeal === "MASTER" || caseObj.tierSeal === "ARCHON") ? 8 : 5;
    this.tickWyrmsBreath(caseId, breathTick, "WARD_WHISPER_INVOKED");

    // Increment level for this letter
    const currentLevel = (caseObj.letterWhispers[letterId] || 0) + 1;
    caseObj.letterWhispers[letterId] = currentLevel;

    let hintText = "";
    if (currentLevel === 1) {
      if (letter.tier === "TIER_I") {
        hintText = `🔮 Ward Whisper (Level 1 Nudge): This volume uses Caesar Shift. Look for rotation offsets between ${Math.max(1, (letter.secretMetadata?.shift || 3) - 2)} and ${Math.min(25, (letter.secretMetadata?.shift || 3) + 2)}.`;
      } else {
        hintText = `🔮 Ward Whisper (Level 1 Nudge): Polyalphabetic Vigenère cipher detected. The keyword begins with '${letter.secretMetadata?.keyword ? letter.secretMetadata.keyword.charAt(0) : "D"}'.`;
      }
    } else {
      if (letter.tier === "TIER_I") {
        const partial = cipherEngine.decryptCaesar(letter.ciphertext.substring(0, 5), letter.secretMetadata?.shift || 3);
        hintText = `🔮 Ward Whisper (Level 2 Narrow): Exact character mapping confirmed. The first 5 decrypted characters are "${partial}...".`;
      } else {
        const partial = letter.secretMetadata?.keyword ? letter.secretMetadata.keyword.substring(0, 3) : "DRA";
        hintText = `🔮 Ward Whisper (Level 2 Narrow): Keyword mapping partially unveiled. The first 3 letters of the secret keyword are "${partial}...".`;
      }
    }

    return {
      success: true,
      wardWhispersRemaining: caseObj.wardWhispersRemaining,
      wyrmsBreath: caseObj.wyrmsBreath,
      whisperLevel: currentLevel,
      hintText
    };
  }

  // Solve & Pin Letter to Evidence Wall (§6)
  solveLetter(caseId, letterId, attemptPlaintext, solvedByUsername, userId = null) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) throw new Error("Case not found.");

    if (userId && caseObj.guessCooldowns[userId] && caseObj.guessCooldowns[userId] > Date.now()) {
      const secs = Math.ceil((caseObj.guessCooldowns[userId] - Date.now()) / 1000);
      const err = new Error(`⏳ Ward Overheated! Your verification terminal is locked for ${secs} more seconds.`);
      err.statusCode = 429;
      err.cooldownUntil = caseObj.guessCooldowns[userId];
      throw err;
    }

    const letter = caseObj.letters.find((l) => l.id === letterId);
    if (!letter) throw new Error("Letter evidence not found in this Chamber.");
    if (letter.isSolved) throw new Error("This letter is already decrypted on the Evidence Wall.");

    const isValid = cipherEngine.verifyDecryption(
      letter.ciphertext,
      attemptPlaintext,
      letter.tier,
      letter.secretMetadata,
      letter.secretPlaintext
    );

    if (!isValid) {
      // Enforce soft guess cooldown on Master/Archon tiers (`10s–15s`), or Novice/Adept (`3s`)
      const cooldownSecs = (caseObj.tierSeal === "MASTER" || caseObj.tierSeal === "ARCHON") ? 12 : 3;
      if (userId) {
        caseObj.guessCooldowns[userId] = Date.now() + (cooldownSecs * 1000);
      }
      this.tickWyrmsBreath(caseId, 15, "FAILED_DECRYPTION_ATTEMPT");
      return {
        success: false,
        message: `Decryption verification failed! The ward sparks (+15% Breath) and locks your terminal for ${cooldownSecs}s.`,
        wyrmsBreath: caseObj.wyrmsBreath,
        cooldownUntil: userId ? caseObj.guessCooldowns[userId] : null
      };
    }

    letter.isSolved = true;
    letter.solvedBy = solvedByUsername;
    letter.plaintext = letter.secretPlaintext || attemptPlaintext.toUpperCase();
    caseObj.pinnedEvidence.push(letter);

    return { success: true, message: `Evidence ${letter.id} verified and pinned to the Evidence Wall!`, letter, wyrmsBreath: caseObj.wyrmsBreath };
  }

  // Verdict Key Assembly (§8) - Supports suspect accusation or master keyword
  submitVerdict(caseId, verdictInput) {
    const caseObj = this.getCase(caseId);
    if (!caseObj) throw new Error("Case not found.");

    caseObj.verdictAttempts += 1;
    let accusedSuspectId = null;
    let keywordAttempt = "";
    let proofLetterIds = [];

    if (typeof verdictInput === "object" && verdictInput !== null) {
      accusedSuspectId = verdictInput.accusedSuspectId || null;
      keywordAttempt = (verdictInput.keywordAttempt || "").trim().toUpperCase();
      proofLetterIds = Array.isArray(verdictInput.proofLetterIds) ? verdictInput.proofLetterIds : [];
    } else if (typeof verdictInput === "string") {
      keywordAttempt = verdictInput.trim().toUpperCase();
    }

    const isSuspectCorrect = accusedSuspectId && (
      accusedSuspectId.toLowerCase() === (caseObj.culprit || "").toLowerCase()
    );
    const isKeywordCorrect = keywordAttempt && (
      keywordAttempt === (caseObj.masterKeyword || "").toUpperCase() ||
      keywordAttempt === (caseObj.culprit || "").toUpperCase()
    );

    if (isSuspectCorrect || isKeywordCorrect) {
      caseObj.status = "DEBRIEF";
      caseObj.outcome = "VICTORY";
      return {
        success: true,
        outcome: "VICTORY",
        message: `The master lock clicks open! Suspect ${caseObj.culprit} is apprehended! The Wyrmvault secrets and victory are yours!`
      };
    } else {
      this.tickWyrmsBreath(caseId, 15, "FAILED_VERDICT_ATTEMPT");
      return {
        success: false,
        outcome: caseObj.status === "DEBRIEF" ? "DRAGON_AWOKE" : "FAILED_ATTEMPT",
        message: "Incorrect accusation or master keyword! The dragon stirs in anger (+15% Wyrm's Breath).",
        wyrmsBreath: caseObj.wyrmsBreath
      };
    }
  }
}

export const caseService = new CaseService();
