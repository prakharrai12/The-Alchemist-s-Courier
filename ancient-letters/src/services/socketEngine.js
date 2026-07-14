// WYRMVAULT — §11 SocketEngine Real-Time Client Protocol
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (typeof window !== "undefined" && window.location.port === "5173" ? "http://localhost:5000" : "/");

class SocketEngine {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.currentCaseId = null;
    this.currentUserId = null;
    this.currentUsername = null;
  }

  connect(userId, username) {
    if (userId) this.currentUserId = userId;
    if (username) this.currentUsername = username;

    if (this.socket && this.socket.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      auth: { userId: this.currentUserId, username: this.currentUsername },
      reconnectionAttempts: 5,
      timeout: 10000
    });

    this.socket.on("connect", () => {
      console.log("⚡ [Wyrmvault Socket] Connected to Dungeon Server Hub:", this.socket.id);
      this.emitEvent("connection_status", { connected: true, id: this.socket.id });
      if (this.currentCaseId) {
        this.socket.emit("JOIN_CASE_ROOM", {
          caseId: this.currentCaseId,
          userId: this.currentUserId,
          username: this.currentUsername
        });
      }
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("⚠️ [Wyrmvault Socket] Disconnected from Dungeon Hub:", reason);
      this.emitEvent("connection_status", { connected: false, reason });
    });

    // Room state events
    const events = [
      "CASE_PLAYERS_UPDATED",
      "READY_STATE_UPDATED",
      "ROLE_ASSIGNED",
      "POWER_ACTIVATED",
      "LETTER_DECRYPTED",
      "WYRMS_BREATH_TICK",
      "VERDICT_RESOLVED",
      "CASE_STARTED",
      "ROLE_SELECT_STARTED",
      "SOCKET_ERROR"
    ];

    events.forEach((eventName) => {
      this.socket.on(eventName, (data) => {
        this.emitEvent(eventName, data);
      });
    });

    return this.socket;
  }

  joinCaseRoom(caseId, userId, username) {
    this.currentCaseId = caseId;
    if (userId) this.currentUserId = userId;
    if (username) this.currentUsername = username;
    if (this.socket && caseId) {
      this.socket.emit("JOIN_CASE_ROOM", { caseId, userId: this.currentUserId, username: this.currentUsername });
    }
  }

  leaveCaseRoom(caseId) {
    if (this.currentCaseId === caseId) {
      this.currentCaseId = null;
    }
    if (this.socket && caseId) {
      this.socket.emit("LEAVE_CASE_ROOM", { caseId });
    }
  }

  toggleReady(caseId, userId, isReady, role = null) {
    if (this.socket && caseId) {
      this.socket.emit("TOGGLE_READY", { caseId, userId, isReady, role });
    }
  }

  activatePower(caseId, userId, roleName, targetId) {
    if (this.socket && caseId) {
      this.socket.emit("ACTIVATE_POWER", { caseId, userId, roleName, targetId });
    }
  }

  solveLetter(caseId, letterId, attemptPlaintext, username) {
    if (this.socket && caseId) {
      this.socket.emit("SOLVE_LETTER", { caseId, letterId, attemptPlaintext, username });
    }
  }

  submitVerdict(caseId, keywordAttempt) {
    if (this.socket && caseId) {
      this.socket.emit("SUBMIT_VERDICT", { caseId, keywordAttempt });
    }
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => {
      const set = this.listeners.get(event);
      if (set) {
        set.delete(callback);
      }
    };
  }

  emitEvent(event, data) {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => cb(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketEngine = new SocketEngine();
