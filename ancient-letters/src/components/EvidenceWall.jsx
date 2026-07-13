import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EvidenceWall({ pinnedEvidence = [], onSelectLetter }) {
  if (!pinnedEvidence || pinnedEvidence.length === 0) {
    return (
      <div
        className="stone-panel"
        style={{
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          border: "2px dashed var(--stone-border)",
          padding: "var(--space-8) var(--space-4)"
        }}
      >
        <div style={{ fontSize: "48px", opacity: 0.3, marginBottom: "var(--space-4)" }}>📌</div>
        <h3 style={{ fontSize: "20px", color: "var(--parchment-muted)" }}>
          The Shared Evidence Wall is Blank
        </h3>
        <p style={{ color: "var(--parchment-muted)", fontSize: "14px", maxWidth: "420px", marginTop: "var(--space-2)", lineHeight: "1.6" }}>
          No encrypted correspondence recovered yet. Search the chamber shadows (`§6`), decipher the letters on the Decryption Bench, and verify them with the server ward to pin them here for your entire party.
        </p>
      </div>
    );
  }

  return (
    <div className="stone-panel" style={{ minHeight: "420px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-3)", marginBottom: "var(--space-6)" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.1em" }}>
            SHARED PARTY EVIDENTIARY ARCHIVE (§6)
          </span>
          <h3 style={{ fontSize: "22px", color: "var(--parchment-light)", marginTop: "var(--space-1)" }}>
            Pinned Decrypted Evidence ({pinnedEvidence.length})
          </h3>
        </div>
        <div style={{ fontSize: "12px", color: "var(--parchment-muted)" }}>
          Visible to all 4–6 connected Vault-Breakers
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
        <AnimatePresence>
          {pinnedEvidence.map((evidence, index) => (
            <motion.div
              key={evidence.id || index}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundColor: "#221e18",
                border: "1px solid var(--gilded-signet)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-4)",
                position: "relative",
                boxShadow: "var(--shadow-stone)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {/* Wax Seal Pin badge */}
              <div style={{
                position: "absolute",
                top: "-10px",
                right: "16px",
                width: "28px",
                height: "28px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--wyrm-fire)",
                border: "2px solid var(--gilded-signet)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.6)"
              }}>
                📌
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                  <span style={{ fontSize: "11px", color: "var(--gilded-signet)", fontWeight: 700 }}>
                    {evidence.chamber} — {evidence.tier}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--parchment-muted)" }}>
                    Solved by: <strong style={{ color: "var(--parchment-light)" }}>{evidence.solvedBy || "Party"}</strong>
                  </span>
                </div>

                <h4 style={{ fontSize: "16px", color: "var(--parchment-light)", marginBottom: "var(--space-2)" }}>
                  {evidence.title}
                </h4>

                <div style={{
                  padding: "var(--space-3)",
                  backgroundColor: "rgba(18, 17, 14, 0.6)",
                  borderLeft: "3px solid var(--gilded-signet)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--parchment-light)",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  marginBottom: "var(--space-3)"
                }}>
                  "{evidence.plaintext}"
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--stone-border)", paddingTop: "var(--space-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "var(--parchment-muted)" }}>
                  Algorithm: {evidence.algorithm}
                </span>
                {onSelectLetter && (
                  <button
                    type="button"
                    onClick={() => onSelectLetter(evidence)}
                    className="btn-stone"
                    style={{ padding: "2px 8px", fontSize: "11px" }}
                  >
                    Inspect Codex →
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
