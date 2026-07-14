// WYRMVAULT — Canonical Cooperative Cipher-Dungeon Application (§1–§13)
// No payment providers, QR codes, gold currency, or 6-theme switching per §13 explicit scope exclusions.
// Exact visual match for wyrmvault_hub_mockup.png with Norse rune portal frame.

import React, { useState, useEffect } from "react";
import { socketEngine } from "./services/socketEngine.js";
import { safeFetchJson } from "./services/apiClient.js";

// WYRMVAULT Chambers & Phases
import { AuthChamber } from "./components/AuthChamber.jsx";
import { CaseLobby } from "./components/CaseLobby.jsx";
import { RoleSelectChamber } from "./components/RoleSelectChamber.jsx";
import { ChamberHub } from "./components/ChamberHub.jsx";
import { VerdictChamber } from "./components/VerdictChamber.jsx";
import { DebriefDossier } from "./components/DebriefDossier.jsx";
import { GuildLedgerModal } from "./components/GuildLedgerModal.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("wyrmvault_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Canonical Game Phase: AUTH, LOBBY, ROLE_SELECT, EXPLORATION, VERDICT, or DEBRIEF
  const [phase, setPhase] = useState(() => (user ? "LOBBY" : "AUTH"));
  const [activeCase, setActiveCase] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  // Initialize Socket.IO connection when authenticated
  useEffect(() => {
    if (!user) return;

    socketEngine.connect(user.id || user.email, user.username);

    const unsubStatus = socketEngine.subscribe("connection_status", (status) => {
      setSocketConnected(status.connected);
    });

    const unsubCaseUpdate = socketEngine.subscribe("CASE_PLAYERS_UPDATED", (caseObj) => {
      setActiveCase(caseObj);
    });

    const unsubReady = socketEngine.subscribe("READY_STATE_UPDATED", (caseObj) => {
      setActiveCase(caseObj);
    });

    const unsubRoleSelectStart = socketEngine.subscribe("ROLE_SELECT_STARTED", (caseObj) => {
      setActiveCase(caseObj);
      setPhase("ROLE_SELECT");
      pushNotification("⚡ All Vault-Breakers checked ready! Entering Role Select Chamber (`§5`).");
    });

    const unsubCaseStart = socketEngine.subscribe("CASE_STARTED", (caseObj) => {
      setActiveCase(caseObj);
      setPhase("EXPLORATION");
      pushNotification("🚪 The obsidian portcullis rises! Chamber exploration begins (`§6`).");
    });

    const unsubRoleAssigned = socketEngine.subscribe("ROLE_ASSIGNED", ({ userId, role }) => {
      setActiveCase((prev) => {
        if (!prev) return prev;
        const updatedPlayers = prev.players.map((p) =>
          p.userId === userId ? { ...p, role } : p
        );
        return { ...prev, players: updatedPlayers };
      });
    });

    const unsubPowerUsed = socketEngine.subscribe("POWER_ACTIVATED", ({ userId, roleName, message }) => {
      pushNotification(`⚡ ${roleName.replace("THE_", "")}: ${message}`);
    });

    const unsubLetterDecrypted = socketEngine.subscribe("LETTER_DECRYPTED", (solvedLetter) => {
      setActiveCase((prev) => {
        if (!prev) return prev;
        const updatedLetters = prev.letters.map((l) =>
          l.id === solvedLetter.id ? solvedLetter : l
        );
        const exists = prev.pinnedEvidence.some((e) => e.id === solvedLetter.id);
        const updatedPinned = exists ? prev.pinnedEvidence : [...prev.pinnedEvidence, solvedLetter];
        return { ...prev, letters: updatedLetters, pinnedEvidence: updatedPinned };
      });
      pushNotification(`📌 New Evidence verified: "${solvedLetter.title}" pinned to wall!`);
    });

    const unsubBreathTick = socketEngine.subscribe("WYRMS_BREATH_TICK", ({ wyrmsBreath, reason }) => {
      setActiveCase((prev) => {
        if (!prev) return prev;
        const newStatus = wyrmsBreath >= 100 ? "DEBRIEF" : prev.status;
        const newOutcome = wyrmsBreath >= 100 ? "DRAGON_AWOKE" : prev.outcome;
        if (wyrmsBreath >= 100 && phase !== "DEBRIEF") {
          setPhase("DEBRIEF");
        }
        return { ...prev, wyrmsBreath, status: newStatus, outcome: newOutcome };
      });
    });

    const unsubVerdict = socketEngine.subscribe("VERDICT_RESOLVED", (result) => {
      setActiveCase((prev) => {
        if (!prev) return prev;
        return { ...prev, status: "DEBRIEF", outcome: result.outcome, wyrmsBreath: result.wyrmsBreath || prev.wyrmsBreath };
      });
      setPhase("DEBRIEF");
      if (result.success) {
        pushNotification("🏆 VICTORY! The Master Keyword unlocked the Vault!");
      } else {
        pushNotification("🔥 VERDICT REJECTED! The Dragon has awakened!");
      }
    });

    const unsubWhisper = socketEngine.subscribe("WARD_WHISPER_INVOKED", (whisperData) => {
      setActiveCase((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          wardWhispersRemaining: whisperData.wardWhispersRemaining,
          wyrmsBreath: whisperData.wyrmsBreath,
          letterWhispers: { ...(prev.letterWhispers || {}), [whisperData.letterId]: whisperData.whisperLevel }
        };
      });
      pushNotification(`🔮 ${whisperData.username} invoked Ward Whisper on ${whisperData.letterId}! (${whisperData.wardWhispersRemaining} left)`);
    });

    return () => {
      unsubStatus();
      unsubCaseUpdate();
      unsubReady();
      unsubRoleSelectStart();
      unsubCaseStart();
      unsubRoleAssigned();
      unsubPowerUsed();
      unsubLetterDecrypted();
      unsubBreathTick();
      unsubVerdict();
      unsubWhisper();
      socketEngine.disconnect();
    };
  }, [user]);

  // Join case room when activeCase changes
  useEffect(() => {
    if (user && activeCase?.caseId) {
      socketEngine.joinCaseRoom(activeCase.caseId, user.id || user.email, user.username);
    }
  }, [user, activeCase?.caseId]);

  const pushNotification = (msg) => {
    const isCritical = msg.includes("🔥") || msg.includes("Ward Alert") || msg.includes("Dragon") || msg.includes("REJECTED") || msg.includes("VERDICT") || msg.includes("Overheated");
    const newNotif = { id: Date.now() + Math.random(), text: msg, time: new Date().toLocaleTimeString(), isCritical };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setNotifications((prev) => prev.filter((n) => n.isCritical || (now - n.id < 6000)));
    }, 1000);
    return () => clearTimeout(timer);
  }, [notifications]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && notifications.length > 0 && !showLedger) {
        setNotifications((prev) => prev.slice(1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notifications, showLedger]);

  const handleLogout = () => {
    if (activeCase?.caseId) {
      socketEngine.leaveCaseRoom(activeCase.caseId);
    }
    localStorage.removeItem("wyrmvault_token");
    localStorage.removeItem("wyrmvault_user");
    setUser(null);
    setActiveCase(null);
    setPhase("AUTH");
  };

  const handleToggleReady = async (caseId, userId, isReady, role = null) => {
    try {
      const token = localStorage.getItem("wyrmvault_token");
      const data = await safeFetchJson("/api/case/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ caseId, userId, isReady, role })
      });
      if (data.caseObj) {
        setActiveCase(data.caseObj);
        if (data.status === "ROLE_SELECT" && phase !== "ROLE_SELECT") {
          setPhase("ROLE_SELECT");
        } else if (data.status === "EXPLORATION" && phase !== "EXPLORATION") {
          setPhase("EXPLORATION");
        }
      }
    } catch (err) {
      console.error("Ready toggle error:", err);
      pushNotification(`🔥 Ward Alert: ${err.message}`);
    }
  };

  const handleUseRolePower = async (caseId, userId, roleName, targetId) => {
    const token = localStorage.getItem("wyrmvault_token");
    const data = await safeFetchJson("/api/case/power", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify({ caseId, userId, roleName, targetId })
    });
    if (data.wyrmsBreath !== undefined) {
      setActiveCase((prev) => prev ? { ...prev, wyrmsBreath: data.wyrmsBreath } : prev);
    }
    return data;
  };

  const handleSolveLetter = async (caseId, letterId, attemptPlaintext) => {
    const token = localStorage.getItem("wyrmvault_token");
    const data = await safeFetchJson("/api/case/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify({ caseId, letterId, attemptPlaintext, username: user.username })
    });
    if (data.wyrmsBreath !== undefined) {
      setActiveCase((prev) => prev ? { ...prev, wyrmsBreath: data.wyrmsBreath } : prev);
    }
    if (data.success && data.letter) {
      setActiveCase((prev) => {
        if (!prev) return prev;
        const updatedLetters = prev.letters.map((l) => l.id === data.letter.id ? data.letter : l);
        const exists = prev.pinnedEvidence.some((e) => e.id === data.letter.id);
        const updatedPinned = exists ? prev.pinnedEvidence : [...prev.pinnedEvidence, data.letter];
        return { ...prev, letters: updatedLetters, pinnedEvidence: updatedPinned };
      });
    }
    return data;
  };

  const handleUseWhisper = async (caseId, letterId) => {
    const token = localStorage.getItem("wyrmvault_token");
    const data = await safeFetchJson("/api/case/whisper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify({ caseId, letterId, userId: user.id || user.email, username: user.username })
    });
    if (data && data.success) {
      setActiveCase((prev) => prev ? { ...prev, wardWhispersRemaining: data.wardWhispersRemaining, wyrmsBreath: data.wyrmsBreath, letterWhispers: { ...(prev.letterWhispers || {}), [letterId]: data.whisperLevel } } : prev);
      pushNotification(`🔮 Ward Whisper Level ${data.whisperLevel} invoked! (+5% Wyrm's Breath)`);
    }
    return data;
  };

  const handleSubmitVerdict = async (caseId, keywordAttempt) => {
    const token = localStorage.getItem("wyrmvault_token");
    const data = await safeFetchJson("/api/case/verdict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify({ caseId, keywordAttempt })
    });
    setActiveCase((prev) => prev ? { ...prev, status: "DEBRIEF", outcome: data.outcome, wyrmsBreath: data.wyrmsBreath || prev.wyrmsBreath } : prev);
    setPhase("DEBRIEF");
    return data;
  };

  if (phase === "AUTH" || !user) {
    return (
      <AuthChamber
        onLoginSuccess={(loggedInUser, token) => {
          setUser(loggedInUser);
          setPhase("LOBBY");
        }}
      />
    );
  }

  // Norse Runes for left and right stone portal pillars
  const leftRunes = ["ᚠ", "ᚢ", "ᚦ", "ᚬ", "ᚱ", "ᚴ", "ᚼ", "ᚾ", "ᛁ", "ᚨ", "ᛏ", "ᛒ"];
  const rightRunes = ["ᛒ", "ᛏ", "ᚨ", "ᛁ", "ᚾ", "ᚼ", "ᚴ", "ᚱ", "ᚬ", "ᚦ", "ᚢ", "ᚠ"];

  return (
    <div className="wyrm-portal-frame">
      {/* Top Left Portal Corner */}
      <div className="portal-corner" style={{ gridRow: 1, gridColumn: 1 }}>ᚠ</div>

      {/* Top Portal Horizontal Header Bar */}
      <header className="portal-horizontal-bar" style={{ gridRow: 1, gridColumn: 2, padding: "12px 24px", minHeight: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "24px" }}>🗝️</span>
          <div>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "var(--gilded-signet)", letterSpacing: "0.1em", fontFamily: "var(--font-display)" }}>
              WYRMVAULT
            </span>
            <span style={{ fontSize: "12px", color: "var(--parchment-muted)", marginLeft: "var(--space-3)" }}>
              CHAMBER PHASE: <strong style={{ color: "var(--parchment-light)" }}>{phase}</strong>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button
              onClick={() => setPhase(activeCase ? (activeCase.status === "EXPLORATION" ? "EXPLORATION" : activeCase.status === "ROLE_SELECT" ? "ROLE_SELECT" : "LOBBY") : "LOBBY")}
              className="btn-gilded"
              style={{ padding: "6px 14px", fontSize: "12px" }}
            >
              🏰 Co-op Vault ({activeCase?.caseId || "Antechamber"})
            </button>
            <button
              onClick={() => setShowLedger(true)}
              className="btn-stone"
              style={{ padding: "6px 14px", fontSize: "12px", borderColor: "var(--gilded-signet)", color: "var(--gilded-signet)" }}
            >
              📖 Guild Ledger
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "13px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "var(--radius-full)", backgroundColor: socketConnected ? "#6de8b5" : "#ff9fb2" }} />
            <span style={{ color: "var(--parchment-light)", fontWeight: 700 }}>{user.username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="btn-stone"
            style={{ padding: "6px 14px", fontSize: "12px", color: "#ff9fb2", borderColor: "var(--wyrm-fire)" }}
          >
            Sealed Exit
          </button>
        </div>
      </header>

      {/* Top Right Portal Corner */}
      <div className="portal-corner" style={{ gridRow: 1, gridColumn: 3 }}>ᚢ</div>

      {/* Left Vertical Norse Rune Pillar */}
      <div className="portal-rune-pillar" style={{ gridRow: 2, gridColumn: 1 }}>
        {leftRunes.map((rune, idx) => (
          <span key={idx} className="rune-char">{rune}</span>
        ))}
      </div>

      {/* Main Center Stage enclosed in stone portal */}
      <main style={{ gridRow: 2, gridColumn: 2, overflowY: "auto", position: "relative" }}>
        {phase === "LOBBY" && (
          <CaseLobby
            user={user}
            activeCase={activeCase}
            onCaseCreated={(newCase) => {
              setActiveCase(newCase);
              pushNotification(`📜 New Case ${newCase.caseId} forged! Invite your party.`);
            }}
            onJoinCase={(caseObj) => {
              setActiveCase(caseObj);
              if (caseObj.status === "ROLE_SELECT") setPhase("ROLE_SELECT");
              else if (caseObj.status === "EXPLORATION") setPhase("EXPLORATION");
              pushNotification(`Joined Case ${caseObj.caseId}! Party size: ${caseObj.players.length}/6.`);
            }}
            onToggleReady={handleToggleReady}
            onProceedToRoleSelect={() => setPhase("ROLE_SELECT")}
          />
        )}

        {phase === "ROLE_SELECT" && (
          <RoleSelectChamber
            user={user}
            activeCase={activeCase}
            onSelectRole={(caseId, userId, roleId) => {
              handleToggleReady(caseId, userId, true, roleId);
            }}
            onToggleReady={handleToggleReady}
            onProceedToChamberHub={() => setPhase("EXPLORATION")}
          />
        )}

        {phase === "EXPLORATION" && (
          <ChamberHub
            user={user}
            activeCase={activeCase}
            onUsePower={handleUseRolePower}
            onSolveLetter={handleSolveLetter}
            onUseWhisper={handleUseWhisper}
            onProceedToVerdict={() => setPhase("VERDICT")}
          />
        )}

        {phase === "VERDICT" && (
          <VerdictChamber
            activeCase={activeCase}
            onSubmitVerdict={handleSubmitVerdict}
            onReturnToChamber={() => setPhase("EXPLORATION")}
          />
        )}

        {phase === "DEBRIEF" && (
          <DebriefDossier
            activeCase={activeCase}
            onStartNewCase={() => {
              setActiveCase(null);
              setPhase("LOBBY");
            }}
            onExitToLobby={() => {
              setActiveCase(null);
              setPhase("LOBBY");
            }}
          />
        )}
      </main>

      {/* Right Vertical Norse Rune Pillar */}
      <div className="portal-rune-pillar" style={{ gridRow: 2, gridColumn: 3 }}>
        {rightRunes.map((rune, idx) => (
          <span key={idx} className="rune-char">{rune}</span>
        ))}
      </div>

      {/* Bottom Left Portal Corner */}
      <div className="portal-corner" style={{ gridRow: 3, gridColumn: 1 }}>ᚦ</div>

      {/* Bottom Horizontal Portal Bar */}
      <footer className="portal-horizontal-bar" style={{ gridRow: 3, gridColumn: 2, padding: "8px 24px", fontSize: "11px", color: "var(--parchment-muted)" }}>
        <span>🐉 WYRMVAULT COOPERATIVE CIPHER-DUNGEON GAME • CANONICAL §1–§13</span>
        <span>SERVER ROOM: {activeCase?.caseId || "ANTECHAMBER"} • REAL-TIME SOCKET AUTHENTICATED</span>
      </footer>

      {/* Bottom Right Portal Corner */}
      <div className="portal-corner" style={{ gridRow: 3, gridColumn: 3 }}>ᚬ</div>

      {/* Persistent In-World Guild Ledger Modal */}
      {showLedger && <GuildLedgerModal onClose={() => setShowLedger(false)} />}

      {/* Floating Notification Toasts */}
      {notifications.length > 0 && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "fixed",
            bottom: "32px",
            left: "64px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            width: "380px",
            maxWidth: "calc(100vw - 128px)"
          }}
        >
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              role={n.isCritical ? "alert" : "status"}
              className="stone-panel"
              style={{
                padding: "var(--space-3) var(--space-4)",
                border: `1px solid ${n.isCritical ? "var(--wyrm-fire)" : "var(--gilded-signet)"}`,
                backgroundColor: n.isCritical ? "#2a1212" : "#1e1a14",
                fontSize: "13px",
                color: "var(--parchment-light)",
                boxShadow: "var(--shadow-vault)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "var(--space-2)"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: n.isCritical ? "#ff9fb2" : "var(--gilded-signet)", marginBottom: "4px", fontWeight: 700 }}>
                  {n.time} {n.isCritical ? "• WARD ALERT" : ""}
                </div>
                <div style={{ lineHeight: 1.4 }}>{n.text}</div>
              </div>
              <button
                onClick={() => dismissNotification(n.id)}
                aria-label="Dismiss notification"
                className="btn-stone"
                style={{
                  padding: "2px 8px",
                  fontSize: "16px",
                  lineHeight: 1,
                  fontWeight: 700,
                  color: "var(--parchment-light)",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>
          ))}
          {notifications.length > 3 && (
            <div style={{ fontSize: "11px", color: "var(--parchment-muted)", textAlign: "center", fontStyle: "italic", backgroundColor: "var(--vault-bg)", padding: "4px", borderRadius: "4px", border: "1px solid var(--stone-border)" }}>
              +{notifications.length - 3} additional queued letters in ledger...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;