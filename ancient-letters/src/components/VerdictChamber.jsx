import React, { useState } from "react";
import { motion } from "framer-motion";

export function VerdictChamber({ activeCase, onSubmitVerdict, onReturnToChamber }) {
  const [keywordAttempt, setKeywordAttempt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!activeCase) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keywordAttempt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmitVerdict(activeCase.caseId, keywordAttempt.trim().toUpperCase());
    } catch (err) {
      setError(err.message || "Incorrect master keyword! The ward sparks crimson flame!");
    } finally {
      setLoading(false);
    }
  };

  const solvedCount = (activeCase.pinnedEvidence || []).length;
  const wyrmsBreath = activeCase.wyrmsBreath || 0;

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "var(--space-10) var(--space-4)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="stone-panel" style={{ border: "2px solid var(--gilded-signet)", padding: "var(--space-8)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-6)" }}>
          <div style={{ fontSize: "48px", marginBottom: "var(--space-3)" }}>🗝️</div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.14em" }}>
            FINAL VERDICT & KEY ASSEMBLY (§8)
          </span>
          <h1 style={{ fontSize: "32px", color: "var(--parchment-light)", marginTop: "var(--space-2)" }}>
            The Master Obsidian Vault Door
          </h1>
          <p style={{ color: "var(--parchment-muted)", fontSize: "15px", maxWidth: "600px", margin: "var(--space-2) auto 0", lineHeight: "1.6" }}>
            Review the {solvedCount} pieces of correspondence pinned on your party's Evidence Wall. Assemble the master keyword (`canonical target: SIGNET`) and lock in your team's single shared verdict.
          </p>
        </div>

        {/* Tension & Evidence Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
          <div style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
            <span style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600 }}>EVIDENCE RECOVERED</span>
            <div style={{ fontSize: "22px", color: "var(--parchment-light)", fontWeight: 700, marginTop: "var(--space-1)" }}>
              {solvedCount} Pinned Documents
            </div>
          </div>

          <div style={{ padding: "var(--space-4)", backgroundColor: wyrmsBreath >= 70 ? "rgba(140, 32, 32, 0.2)" : "var(--vault-bg)", border: `1px solid ${wyrmsBreath >= 70 ? "#d93838" : "var(--stone-border)"}`, borderRadius: "var(--radius-md)" }}>
            <span style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600 }}>WYRM'S BREATH TENSION</span>
            <div style={{ fontSize: "22px", color: wyrmsBreath >= 70 ? "#ff9fb2" : "#f0cc5d", fontWeight: 700, fontFamily: "var(--font-mono)", marginTop: "var(--space-1)" }}>
              {wyrmsBreath}% ({100 - wyrmsBreath}% buffer remaining)
            </div>
          </div>
        </div>

        {error && (
          <div style={{ padding: "var(--space-4)", backgroundColor: "rgba(140, 32, 32, 0.25)", border: "1px solid var(--wyrm-flame)", borderRadius: "var(--radius-md)", color: "#ff9fb2", marginBottom: "var(--space-6)", fontSize: "14px" }}>
            🔥 <strong>Ward Alert:</strong> {error} (+15% Wyrm's Breath penalized)
          </div>
        )}

        {/* Verdict Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "var(--gilded-signet)", fontWeight: 700, marginBottom: "var(--space-2)", letterSpacing: "0.06em" }}>
              ENTER THE MASTER VERDICT KEYWORD
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SIGNET"
              value={keywordAttempt}
              onChange={(e) => setKeywordAttempt(e.target.value.toUpperCase())}
              style={{
                width: "100%",
                padding: "var(--space-4)",
                backgroundColor: "var(--vault-bg)",
                border: "2px solid var(--gilded-signet)",
                borderRadius: "var(--radius-md)",
                color: "var(--parchment-light)",
                fontFamily: "var(--font-mono)",
                fontSize: "24px",
                fontWeight: 800,
                textAlign: "center",
                letterSpacing: "0.2em"
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-4)" }}>
            <button
              type="button"
              onClick={onReturnToChamber}
              className="btn-stone"
              style={{ padding: "var(--space-3) var(--space-6)" }}
            >
              ← Return to Chamber Exploration
            </button>

            <button
              type="submit"
              disabled={loading || !keywordAttempt.trim()}
              className="btn-gilded"
              style={{ padding: "var(--space-3) var(--space-8)", fontSize: "16px" }}
            >
              {loading ? "Testing Master Ward..." : "⚔️ Unseal Vault & Submit Verdict"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
