import test from "node:test";
import assert from "node:assert";
import { cipherEngine } from "../services/cipherEngine.js";
import { caseService } from "../services/caseService.js";

test("WYRMVAULT — §12 Server-Side Cipher Engine Verification", async (t) => {
  await t.test("Tier I Caesar Shift encryption and decryption should be deterministic and accurate", () => {
    const plaintext = "THE WYRM SLEEPS BENEATH THE OBSIDIAN VAULT";
    const shift = 13;
    const ciphertext = cipherEngine.encryptCaesar(plaintext, shift);
    assert.strictEqual(ciphertext, "GUR JLEZ FYRRCF ORARNGU GUR BOFVQVNA INHYG");
    const decrypted = cipherEngine.decryptCaesar(ciphertext, shift);
    assert.strictEqual(decrypted, plaintext);
  });

  await t.test("Tier II Vigenère Polyalphabetic Cipher should correctly substitute via keyword", () => {
    const plaintext = "GUARD THE FIRST SEAL WITH FIRE AND IRON";
    const keyword = "DRAGON";
    const ciphertext = cipherEngine.encryptVigenere(plaintext, keyword);
    const decrypted = cipherEngine.decryptVigenere(ciphertext, keyword);
    assert.strictEqual(decrypted, plaintext);
  });

  await t.test("verifyDecryption should return true only for verified server-side plaintext", () => {
    const cipherData = cipherEngine.generateChamberCipher("TIER_I", 1, "WV-TEST", "SECRET VAULT KEY");
    const valid = cipherEngine.verifyDecryption(cipherData.ciphertext, "SECRET VAULT KEY", "TIER_I", cipherData.secretMetadata);
    assert.strictEqual(valid, true);
    const invalid = cipherEngine.verifyDecryption(cipherData.ciphertext, "WRONG GUESS", "TIER_I", cipherData.secretMetadata);
    assert.strictEqual(invalid, false);
  });
});

test("WYRMVAULT — §4, §5 & §7 Case Session & Wyrm's Breath State Engine", async (t) => {
  const host = { id: "u-1", username: "Archivist-Vance" };
  const caseObj = caseService.createCase(host);

  await t.test("should initialize Case Lobby with 4-6 player slot capacity and 0% Wyrm's Breath", () => {
    assert.ok(caseObj.caseId.startsWith("WV-"));
    assert.strictEqual(caseObj.status, "LOBBY");
    assert.strictEqual(caseObj.players.length, 1);
    assert.strictEqual(caseObj.wyrmsBreath, 0);
  });

  await t.test("should enforce Ready-Check and role claim lock-in", () => {
    const player2 = { id: "u-2", username: "Warden-Iron" };
    caseService.joinCase(caseObj.caseId, player2);
    assert.strictEqual(caseObj.players.length, 2);

    caseService.setPlayerReady(caseObj.caseId, "u-1", true, "THE_ARCHIVIST");
    const res = caseService.setPlayerReady(caseObj.caseId, "u-2", true, "THE_WARDEN");
    assert.strictEqual(res.status, "ROLE_SELECT");
  });

  await t.test("should strictly enforce §5 One-Time Role Power limit per Case", () => {
    const powerRes = caseService.useRolePower(caseObj.caseId, "u-2", "THE_WARDEN");
    assert.strictEqual(powerRes.success, true);
    assert.strictEqual(powerRes.wyrmsBreath, 0); // Was already 0, so max(0, -15) is 0

    assert.throws(() => {
      caseService.useRolePower(caseObj.caseId, "u-2", "THE_WARDEN");
    }, /has already been expended in this Case/);
  });

  await t.test("should tick authoritative Wyrm's Breath on failed attempt (+15%) and wake Dragon at 100%", () => {
    caseService.tickWyrmsBreath(caseObj.caseId, 15, "TEST_RISK");
    assert.strictEqual(caseObj.wyrmsBreath, 15);

    caseService.tickWyrmsBreath(caseObj.caseId, 85, "CRITICAL_FAILURE");
    assert.strictEqual(caseObj.wyrmsBreath, 100);
    assert.strictEqual(caseObj.status, "DEBRIEF");
    assert.strictEqual(caseObj.outcome, "DRAGON_AWOKE");
  });
});

test("WYRMVAULT — §6 Hint Economy & Soft Guess Cooldowns", async (t) => {
  const host = { id: "u-10", username: "Master-Scribe" };
  const caseObj = caseService.createCase(host, "ADEPT"); // ADEPT seal: 2 whispers max, 3s cooldown

  await t.test("should initialize whisper pool based on Seal Tier (ADEPT = 2)", () => {
    assert.strictEqual(caseObj.tierSeal, "ADEPT");
    assert.strictEqual(caseObj.wardWhispersMax, 2);
    assert.strictEqual(caseObj.wardWhispersRemaining, 2);
  });

  await t.test("should deduct whisper from pool, increment hint level, and tick Wyrm's Breath (+5%)", () => {
    const letter = caseObj.letters[0];
    const res = caseService.useWardWhisper(caseObj.caseId, letter.id, host.id, host.username);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.wardWhispersRemaining, 1);
    assert.strictEqual(res.whisperLevel, 1);
    assert.strictEqual(caseObj.wyrmsBreath, 5);
    assert.ok(res.hintText.includes("Ward Whisper"));
  });

  await t.test("should enforce soft guess cooldown on failed verification attempt", () => {
    const letter = caseObj.letters[0];
    const failRes = caseService.solveLetter(caseObj.caseId, letter.id, "WRONG GUESS ATTEMPT", host.username, host.id);
    assert.strictEqual(failRes.success, false);
    assert.ok(failRes.cooldownUntil > Date.now());

    assert.throws(() => {
      caseService.solveLetter(caseObj.caseId, letter.id, "SECOND WRONG GUESS", host.username, host.id);
    }, /Ward Overheated! Your verification terminal is locked/);
  });
});

