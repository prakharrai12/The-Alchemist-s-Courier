// WYRMVAULT — §11 Socket.IO Real-Time Protocol
// Rooms keyed by 6-character Case ID (e.g., WV-8492)
// Server-authoritative Wyrm's Breath meter and party events broadcast

import { caseService } from "../services/caseService.js";

export function initializeSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("Vault-Breaker connected to Wyrmvault Socket:", socket.id);

    // §11 Join a specific Case Room
    socket.on("JOIN_CASE_ROOM", ({ caseId, userId, username }) => {
      if (!caseId) return;
      const cleanId = caseId.toUpperCase();
      socket.join(cleanId);
      console.log(`Socket ${socket.id} joined Wyrmvault Case room ${cleanId}`);

      const caseObj = caseService.getCase(cleanId);
      if (caseObj) {
        io.to(cleanId).emit("CASE_PLAYERS_UPDATED", caseObj);
      }
    });

    // Leave Room
    socket.on("LEAVE_CASE_ROOM", ({ caseId }) => {
      if (!caseId) return;
      socket.leave(caseId.toUpperCase());
    });

    // Real-Time Ready Check broadcast
    socket.on("TOGGLE_READY", ({ caseId, userId, isReady, role }) => {
      try {
        const cleanId = caseId.toUpperCase();
        const result = caseService.setPlayerReady(cleanId, userId, isReady, role);
        io.to(cleanId).emit("READY_STATE_UPDATED", result.caseObj);
        if (role) {
          io.to(cleanId).emit("ROLE_ASSIGNED", { userId, role });
        }
        if (result.status === "EXPLORATION") {
          io.to(cleanId).emit("CASE_STARTED", result.caseObj);
        } else if (result.status === "ROLE_SELECT") {
          io.to(cleanId).emit("ROLE_SELECT_STARTED", result.caseObj);
        }
      } catch (err) {
        socket.emit("SOCKET_ERROR", { message: err.message });
      }
    });

    // Real-Time Role Power Activation (§5)
    socket.on("ACTIVATE_POWER", ({ caseId, userId, roleName, targetId }) => {
      try {
        const cleanId = caseId.toUpperCase();
        const result = caseService.useRolePower(cleanId, userId, roleName, targetId);
        io.to(cleanId).emit("POWER_ACTIVATED", {
          userId,
          roleName,
          targetId,
          message: result.message,
          powerData: result.powerData
        });
        io.to(cleanId).emit("WYRMS_BREATH_TICK", {
          wyrmsBreath: result.wyrmsBreath,
          reason: `POWER_USED_${roleName}`
        });
      } catch (err) {
        socket.emit("SOCKET_ERROR", { message: err.message });
      }
    });

    // Real-Time Letter Decryption verification & pinning to Evidence Wall (§6)
    socket.on("SOLVE_LETTER", ({ caseId, letterId, attemptPlaintext, username, userId }) => {
      try {
        const cleanId = caseId.toUpperCase();
        const result = caseService.solveLetter(cleanId, letterId, attemptPlaintext, username || "Vault-Breaker", userId);
        if (result.success) {
          io.to(cleanId).emit("LETTER_DECRYPTED", result.letter);
        }
        io.to(cleanId).emit("WYRMS_BREATH_TICK", {
          wyrmsBreath: result.wyrmsBreath,
          reason: result.success ? "EVIDENCE_PINNED" : "FAILED_DECRYPTION_ATTEMPT"
        });
        socket.emit("SOLVE_RESULT", result);
      } catch (err) {
        socket.emit("SOCKET_ERROR", { message: err.message, cooldownUntil: err.cooldownUntil });
      }
    });

    // Real-Time Ward Whisper Invocation (§6 Hint Economy)
    socket.on("USE_WARD_WHISPER", ({ caseId, letterId, userId, username }) => {
      try {
        const cleanId = caseId.toUpperCase();
        const result = caseService.useWardWhisper(cleanId, letterId, userId, username || "Vault-Breaker");
        io.to(cleanId).emit("WARD_WHISPER_INVOKED", {
          caseId: cleanId,
          letterId,
          userId,
          username: username || "Vault-Breaker",
          whisperLevel: result.whisperLevel,
          hintText: result.hintText,
          wardWhispersRemaining: result.wardWhispersRemaining,
          wyrmsBreath: result.wyrmsBreath
        });
        io.to(cleanId).emit("WYRMS_BREATH_TICK", {
          wyrmsBreath: result.wyrmsBreath,
          reason: "WARD_WHISPER_INVOKED"
        });
      } catch (err) {
        socket.emit("SOCKET_ERROR", { message: err.message });
      }
    });

    // Real-Time Verdict Submission (§8)
    socket.on("SUBMIT_VERDICT", ({ caseId, keywordAttempt }) => {
      try {
        const cleanId = caseId.toUpperCase();
        const result = caseService.submitVerdict(cleanId, keywordAttempt);
        io.to(cleanId).emit("VERDICT_RESOLVED", result);
        const caseObj = caseService.getCase(cleanId);
        if (caseObj) {
          io.to(cleanId).emit("WYRMS_BREATH_TICK", {
            wyrmsBreath: caseObj.wyrmsBreath,
            reason: "VERDICT_SUBMITTED"
          });
        }
      } catch (err) {
        socket.emit("SOCKET_ERROR", { message: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("Vault-Breaker disconnected from Wyrmvault:", socket.id);
    });
  });
}
