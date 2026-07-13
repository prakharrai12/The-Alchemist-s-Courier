// WYRMVAULT — §4, §5, §6, §7, §8 Case & Dungeon API Routes
import express from "express";
import { caseService } from "../services/caseService.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Case Lobby
router.post("/case/create", authenticateToken, (req, res, next) => {
  try {
    const newCase = caseService.createCase(req.user || req.body.user || { id: "host", username: "Host Vault-Breaker" });
    const sanitized = caseService.sanitizeCase(newCase);
    if (req.app.locals.io) {
      req.app.locals.io.to(newCase.caseId).emit("CASE_PLAYERS_UPDATED", sanitized);
    }
    res.status(201).json(sanitized);
  } catch (err) {
    next(err);
  }
});

// Join Case Lobby
router.post("/case/join", authenticateToken, (req, res, next) => {
  try {
    const { caseId } = req.body;
    const caseObj = caseService.joinCase(caseId, req.user || req.body.user || { id: "player", username: "Vault-Breaker" });
    const sanitized = caseService.sanitizeCase(caseObj);
    if (req.app.locals.io) {
      req.app.locals.io.to(caseObj.caseId).emit("CASE_PLAYERS_UPDATED", sanitized);
    }
    res.json(sanitized);
  } catch (err) {
    next(err);
  }
});

// Get Case State
router.get("/case/:caseId", (req, res, next) => {
  try {
    const caseObj = caseService.getSanitizedCase(req.params.caseId);
    if (!caseObj) {
      return res.status(404).json({ error: "Case not found in vault registry." });
    }
    res.json(caseObj);
  } catch (err) {
    next(err);
  }
});

// Set Player Ready & Select Role (§4 & §5)
router.post("/case/ready", authenticateToken, (req, res, next) => {
  try {
    const { caseId, isReady, role } = req.body;
    const userId = req.user?.id || req.user?.email || req.body.userId;
    const result = caseService.setPlayerReady(caseId, userId, isReady, role);
    const sanitized = caseService.sanitizeCase(result.caseObj);
    if (req.app.locals.io) {
      req.app.locals.io.to(caseId).emit("READY_STATE_UPDATED", sanitized);
      if (role) {
        req.app.locals.io.to(caseId).emit("ROLE_ASSIGNED", { userId, role });
      }
      if (result.status === "EXPLORATION") {
        req.app.locals.io.to(caseId).emit("CASE_STARTED", sanitized);
      } else if (result.status === "ROLE_SELECT") {
        req.app.locals.io.to(caseId).emit("ROLE_SELECT_STARTED", sanitized);
      }
    }
    res.json({ ...result, caseObj: sanitized });
  } catch (err) {
    next(err);
  }
});

// Deploy Role Power (§5 One-Time Server-Side Enforcement)
router.post("/case/power", authenticateToken, (req, res, next) => {
  try {
    const { caseId, roleName, targetId } = req.body;
    const userId = req.user?.id || req.user?.email || req.body.userId;
    const result = caseService.useRolePower(caseId, userId, roleName, targetId);
    if (req.app.locals.io) {
      req.app.locals.io.to(caseId).emit("POWER_ACTIVATED", {
        userId,
        roleName,
        targetId,
        message: result.message,
        powerData: result.powerData
      });
      req.app.locals.io.to(caseId).emit("WYRMS_BREATH_TICK", {
        wyrmsBreath: result.wyrmsBreath,
        reason: "POWER_ACTIVATION"
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Verify & Pin Letter to Evidence Wall (§6)
router.post("/case/solve", authenticateToken, (req, res, next) => {
  try {
    const { caseId, letterId, attemptPlaintext } = req.body;
    const username = req.user?.username || req.body.username || "Vault-Breaker";
    const userId = req.user?.id || req.user?.email || req.body.userId;
    const result = caseService.solveLetter(caseId, letterId, attemptPlaintext, username, userId);
    if (req.app.locals.io) {
      if (result.success) {
        req.app.locals.io.to(caseId).emit("LETTER_DECRYPTED", result.letter);
      }
      req.app.locals.io.to(caseId).emit("WYRMS_BREATH_TICK", {
        wyrmsBreath: result.wyrmsBreath,
        reason: result.success ? "LETTER_SOLVED" : "FAILED_DECRYPTION"
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Invoke Ward Whisper (§6 Hint Economy)
router.post("/case/whisper", authenticateToken, (req, res, next) => {
  try {
    const { caseId, letterId } = req.body;
    const userId = req.user?.id || req.user?.email || req.body.userId;
    const username = req.user?.username || req.body.username || "Vault-Breaker";
    const result = caseService.useWardWhisper(caseId, letterId, userId, username);
    if (req.app.locals.io) {
      req.app.locals.io.to(caseId).emit("WARD_WHISPER_INVOKED", {
        caseId,
        letterId,
        userId,
        username,
        whisperLevel: result.whisperLevel,
        hintText: result.hintText,
        wardWhispersRemaining: result.wardWhispersRemaining,
        wyrmsBreath: result.wyrmsBreath
      });
      req.app.locals.io.to(caseId).emit("WYRMS_BREATH_TICK", {
        wyrmsBreath: result.wyrmsBreath,
        reason: "WARD_WHISPER_INVOKED"
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Submit Master Verdict (§8 Single Shared Key-Assembly)
router.post("/case/verdict", authenticateToken, (req, res, next) => {
  try {
    const { caseId, keywordAttempt } = req.body;
    const result = caseService.submitVerdict(caseId, keywordAttempt);
    if (req.app.locals.io) {
      req.app.locals.io.to(caseId).emit("VERDICT_RESOLVED", result);
      req.app.locals.io.to(caseId).emit("WYRMS_BREATH_TICK", {
        wyrmsBreath: result.wyrmsBreath || caseService.getCase(caseId)?.wyrmsBreath || 0,
        reason: "VERDICT_ATTEMPT"
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
