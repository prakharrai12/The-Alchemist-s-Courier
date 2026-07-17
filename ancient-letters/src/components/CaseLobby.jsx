import React, { useState } from "react";
import { motion } from "framer-motion";
import { safeFetchJson } from "../services/apiClient.js";

export function CaseLobby({ user, activeCase, onCaseCreated, onJoinCase, onProceedToRoleSelect, onToggleReady }) {
  const [inputCaseId, setInputCaseId] = useState("");
  const [selectedTier, setSelectedTier] = useState("NOVICE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      let token = localStorage.getItem("wyrmvault_token");
      if (!token && user) {
        token = "alchemist_token_" + (user.id || user.email);
        localStorage.setItem("wyrmvault_token", token);
      }
      const data = await safeFetchJson("/api/case/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ user, tierSeal: selectedTier })
      });
      onCaseCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!inputCaseId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      let token = localStorage.getItem("wyrmvault_token");
      if (!token && user) {
        token = "alchemist_token_" + (user.id || user.email);
        localStorage.setItem("wyrmvault_token", token);
      }
      const data = await safeFetchJson("/api/case/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ caseId: inputCaseId.trim().toUpperCase(), user })
      });
      onJoinCase(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If inside an active Case Lobby room
  if (activeCase) {
    const players = activeCase.players || [];
    const isHost = activeCase.hostId === (user.id || user.email);
    const myPlayer = players.find((p) => p.userId === (user.id || user.email));

    // For 4-6 players display grid (we show 6 slots)
    const slots = Array.from({ length: 6 }, (_, idx) => players[idx] || null);

    return (
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "var(--space-8) var(--space-4)" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="stone-panel">
          {/* Lobby Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.1em" }}>
                ACTIVE DUNGEON SESSION (§4)
              </span>
              <h2 style={{ fontSize: "24px", color: "var(--parchment-light)", marginTop: "var(--space-1)" }}>
                Case Seal: <span style={{ color: "var(--gilded-signet)", fontFamily: "var(--font-mono)" }}>{activeCase.caseId}</span>
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "13px", color: "var(--parchment-muted)" }}>Party Size</span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: players.length >= 4 ? "var(--gilded-signet)" : "var(--parchment-light)" }}>
                {players.length} / 6 Vault-Breakers
              </div>
            </div>
          </div>

          {/* Party Slots Grid (4-6 players per §4) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            {slots.map((player, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: player ? "var(--vault-bg)" : "rgba(18, 17, 14, 0.4)",
                  border: player ? "1px solid var(--stone-border)" : "1px dashed var(--stone-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "120px",
                  position: "relative"
                }}
              >
                {player ? (
                  <>
                    <div style={{ fontSize: "28px", marginBottom: "var(--space-2)" }}>
                      {player.userId === activeCase.hostId ? "👑" : "🛡️"}
                    </div>
                    <div style={{ fontWeight: 600, color: "var(--parchment-light)", fontSize: "15px" }}>
                      {player.username}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--parchment-muted)", marginTop: "var(--space-1)" }}>
                      {player.userId === (user.id || user.email) ? "(You)" : `Breaker #${idx + 1}`}
                    </div>
                    <div style={{
                      marginTop: "var(--space-3)",
                      padding: "2px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: player.isReady ? "rgba(46, 125, 95, 0.25)" : "rgba(140, 32, 32, 0.25)",
                      color: player.isReady ? "#6de8b5" : "#ff9fb2",
                      border: `1px solid ${player.isReady ? "#2e7d5f" : "#8c2020"}`
                    }}>
                      {player.isReady ? "READY FOR VAULT" : "PREPARING SIGNET"}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "20px", color: "var(--stone-border)", marginBottom: "var(--space-1)" }}>⏳</div>
                    <div style={{ color: "var(--parchment-muted)", fontSize: "13px", fontStyle: "italic" }}>
                      Empty Slot #{idx + 1}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--stone-border)", marginTop: "var(--space-1)" }}>
                      {idx < 4 ? "Core Party Requirement" : "Optional Reinforcements"}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Ready & Advance Controls */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", borderTop: "1px solid var(--stone-border)", paddingTop: "24px" }}>
            <button
              onClick={() => onToggleReady(activeCase.caseId, user.id || user.email, !myPlayer?.isReady)}
              className={myPlayer?.isReady ? "btn-stone" : "btn-gilded"}
              style={{ minHeight: "48px", padding: "12px 24px", minWidth: "200px" }}
            >
              {myPlayer?.isReady ? "Cancel Ready Signet" : "⚔️ Lock & Ready Check"}
            </button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                onClick={onProceedToRoleSelect}
                disabled={players.length < 1}
                className="btn-gilded"
                style={{ minHeight: "48px", padding: "12px 24px" }}
              >
                Enter Role Select Chamber →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Not yet inside a Case — Create or Join screen
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "48px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "32px", color: "var(--gilded-signet)", letterSpacing: "0.06em", fontFamily: "var(--font-display)" }}>
          THE WYRMVAULT ANTECHAMBER
        </h1>
        <p style={{ color: "var(--parchment-muted)", fontSize: "15px", marginTop: "8px", lineHeight: "1.6" }}>
          Assemble your cooperative party of 4 to 6 Vault-Breakers before unsealing the obsidian gates.
        </p>
      </div>

      {error && (
        <div style={{ padding: "16px", backgroundColor: "rgba(140, 32, 32, 0.2)", border: "1px solid var(--wyrm-fire)", borderRadius: "var(--radius-md)", color: "#ff9fb2", marginBottom: "24px" }}>
          🔥 <strong>Ward Alert:</strong> {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
        {/* Create Case Box */}
        <motion.div whileHover={{ translateY: -2 }} className="stone-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📜</div>
            <h3 style={{ fontSize: "20px", color: "var(--parchment-light)", fontFamily: "var(--font-display)" }}>Create New Case</h3>
            <p style={{ color: "var(--parchment-muted)", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              Forge a new unique 6-character Case ID (`WV-XXXX`), invite your team of codebreakers, and initiate the dungeon run.
            </p>
            <div style={{ marginTop: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "var(--gilded-signet)", fontWeight: 700, marginBottom: "10px", letterSpacing: "0.06em" }}>
                SELECT DIFFICULTY TIER SEAL (§4 & §6)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))", gap: "10px" }}>
                {[
                  { id: "NOVICE", label: "Novice (3 Whispers)", desc: "Easy shifts & hints" },
                  { id: "ADEPT", label: "Adept (2 Whispers)", desc: "Balanced tension meter" },
                  { id: "MASTER", label: "Master (1 Whisper)", desc: "Harsh Wyrm penalty" },
                  { id: "GRANDMASTER", label: "Grandmaster (0)", desc: "Permadeath timer" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTier(t.id)}
                    style={{
                      minHeight: "64px",
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      gap: "2px",
                      backgroundColor: selectedTier === t.id ? "rgba(212, 175, 55, 0.22)" : "var(--vault-bg)",
                      border: selectedTier === t.id ? "2px solid var(--gilded-signet)" : "1px solid var(--stone-border)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      textAlign: "left",
                      color: selectedTier === t.id ? "var(--gilded-signet)" : "var(--parchment-light)",
                      fontSize: "12px",
                      fontWeight: 700,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ lineHeight: "1.3" }}>{t.label}</div>
                    <div style={{ fontSize: "10px", color: "var(--parchment-muted)", fontWeight: 400, marginTop: "2px", lineHeight: "1.3" }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="btn-gilded"
            style={{ width: "100%", marginTop: "24px", minHeight: "48px", padding: "14px 20px", fontSize: "15px" }}
          >
            {loading ? "Forging Case Seal..." : `⚔️ Forge ${selectedTier} Case Session`}
          </button>
        </motion.div>

        {/* Join Case Box */}
        <motion.div whileHover={{ translateY: -2 }} className="stone-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", color: "var(--parchment-light)", fontFamily: "var(--font-display)" }}>Join Existing Case</h3>
            <p style={{ color: "var(--parchment-muted)", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              Enter the 6-character obsidian seal (`e.g., WV-8492`) provided by your party leader to step into their lobby.
            </p>
          </div>
          <form onSubmit={handleJoin} style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <input
              type="text"
              placeholder="WV-XXXX"
              required
              maxLength={7}
              value={inputCaseId}
              onChange={(e) => setInputCaseId(e.target.value)}
              style={{
                flex: "1 1 180px",
                minHeight: "48px",
                padding: "12px 16px",
                backgroundColor: "var(--vault-bg)",
                border: "1px solid var(--stone-border)",
                borderRadius: "var(--radius-md)",
                color: "var(--gilded-signet)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "16px",
                textTransform: "uppercase",
                outline: "none"
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--gilded-signet)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--stone-border)"; }}
            />
            <button
              type="submit"
              disabled={loading || !inputCaseId.trim()}
              className="btn-stone"
              style={{ minHeight: "48px", padding: "12px 24px", fontSize: "14px" }}
            >
              Join →
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
