import React from "react";
import { motion } from "framer-motion";

export function DebriefDossier({ activeCase, onStartNewCase, onExitToLobby }) {
  if (!activeCase) return null;

  const isVictory = activeCase.outcome === "VICTORY";
  const solvedCount = (activeCase.pinnedEvidence || []).length;
  const totalLetters = (activeCase.letters || []).length;
  const wyrmsBreath = activeCase.wyrmsBreath || 0;

  // Compute rank progression
  const calculateRank = () => {
    if (isVictory && solvedCount >= 4) return { rank: "Rank IV: Grand Arch-Alchemist", badge: "🏆" };
    if (isVictory) return { rank: "Rank III: Master Obsidian Codebreaker", badge: "📜" };
    if (solvedCount >= 2) return { rank: "Rank II: Adept Epistolary Scholar", badge: "🛡️" };
    return { rank: "Rank I: Novice Vault-Breaker", badge: "🗝️" };
  };

  const rankData = calculateRank();

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "var(--space-10) var(--space-4)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="stone-panel"
        style={{
          border: isVictory ? "2px solid var(--gilded-signet)" : "2px solid var(--wyrm-flame)",
          padding: "var(--space-8)",
          boxShadow: isVictory ? "var(--shadow-signet)" : "0 0 32px rgba(217, 56, 56, 0.4)"
        }}
      >
        {/* Banner */}
        <div style={{ textAlign: "center", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-6)", marginBottom: "var(--space-6)" }}>
          <div style={{ fontSize: "64px", marginBottom: "var(--space-3)" }}>
            {isVictory ? "🏆" : "🐉"}
          </div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: isVictory ? "var(--gilded-signet)" : "#ff9fb2", letterSpacing: "0.15em" }}>
            {isVictory ? "WYRMVAULT EXPEDITION SUCCESSFUL (§8)" : "EXPEDITION TERMINATED BY DRAGON AWAKENING (§7)"}
          </span>
          <h1 style={{ fontSize: "36px", color: "var(--parchment-light)", marginTop: "var(--space-2)" }}>
            {isVictory ? "The Obsidian Master Seal is Broken" : "The Crimson Vapors Ignited the Chamber"}
          </h1>
          <p style={{ color: "var(--parchment-muted)", fontSize: "15px", maxWidth: "600px", margin: "var(--space-3) auto 0", lineHeight: "1.6" }}>
            {isVictory
              ? "Your party of Vault-Breakers correctly deduced the master keyword, bypassed the ancient wards, and retrieved the sealed royal archives."
              : "The Wyrm's Breath tension meter reached critical mass before the master lock could be safely unsealed. The dragon sleeps once more beneath the stone."}
          </p>
        </div>

        {/* Rank Progression Card (§9 No Currency/Purchases) */}
        <div style={{ padding: "var(--space-6)", backgroundColor: "#161411", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-6)", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600, letterSpacing: "0.1em" }}>
            PARTY CODEBREAKER PROGRESSION & RANKING
          </div>
          <div style={{ fontSize: "28px", color: "var(--gilded-signet)", fontWeight: 700, marginTop: "var(--space-2)" }}>
            {rankData.badge} {rankData.rank}
          </div>
          <p style={{ color: "var(--parchment-text)", fontSize: "13px", marginTop: "var(--space-2)" }}>
            Expedition Performance: <strong style={{ color: "var(--parchment-light)" }}>{solvedCount} of {totalLetters} Documents Deciphered</strong> | Final Tension: <strong style={{ color: wyrmsBreath >= 70 ? "#ff9fb2" : "#6de8b5" }}>{wyrmsBreath}%</strong>
          </p>
        </div>

        {/* Pinned Evidence Recap */}
        <div style={{ marginBottom: "var(--space-8)" }}>
          <h4 style={{ fontSize: "16px", color: "var(--parchment-light)", marginBottom: "var(--space-3)" }}>
            Recovered Evidence Log
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-3)" }}>
            {(activeCase.pinnedEvidence || []).map((ev, idx) => (
              <div key={idx} style={{ padding: "var(--space-3)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ fontSize: "11px", color: "var(--gilded-signet)", fontWeight: 700 }}>{ev.id} • {ev.tier}</div>
                <div style={{ fontSize: "14px", color: "var(--parchment-light)", fontWeight: 600 }}>{ev.title}</div>
                <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--parchment-muted)", marginTop: "var(--space-1)" }}>
                  Solved by: {ev.solvedBy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            type="button"
            onClick={onExitToLobby}
            className="btn-stone"
            style={{ padding: "var(--space-3) var(--space-6)" }}
          >
            ← Return to Wyrmvault Antechamber
          </button>

          <button
            type="button"
            onClick={onStartNewCase}
            className="btn-gilded"
            style={{ padding: "var(--space-3) var(--space-8)", fontSize: "16px" }}
          >
            ⚔️ Forge New Case Expedition
          </button>
        </div>
      </motion.div>
    </div>
  );
}
