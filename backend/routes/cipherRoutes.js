// WYRMVAULT — §12 Server-Side Seeded Cipher Routes
import express from "express";
import { cipherEngine } from "../services/cipherEngine.js";

const router = express.Router();

router.post("/cipher/verify", (req, res) => {
  const { ciphertext, attemptPlaintext, tier, secretMetadata } = req.body;
  const isValid = cipherEngine.verifyDecryption(ciphertext, attemptPlaintext, tier, secretMetadata);
  res.json({ isValid });
});

router.post("/cipher/generate", (req, res) => {
  const { tier, chamberNumber, caseId, plaintext } = req.body;
  const cipherData = cipherEngine.generateChamberCipher(
    tier || "TIER_I",
    chamberNumber || 1,
    caseId || "WV-DEMO",
    plaintext || "THE OBSIDIAN WARD PROTECTS THE ANCIENT ARCHIVE"
  );
  res.json(cipherData);
});

export default router;
