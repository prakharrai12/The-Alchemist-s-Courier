import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EvidenceWall({ pinnedEvidence = [], onSelectLetter, letters = [] }) {
  // Combine solved pinned evidence with some atmospheric clues/notes for exact visual match
  const displayEvidence = pinnedEvidence && pinnedEvidence.length > 0 ? pinnedEvidence : [];

  return (
    <div className="shared-evidence-board" style={{ minHeight: "680px" }}>
      <div className="evidence-board-header">
        SHARED EVIDENCE WALL
      </div>

      {/* Grid of Pinned Parchment Letters and Sticky Notes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-5)",
        position: "relative",
        zIndex: 3
      }}>
        {/* Pinned Solved Letters */}
        <AnimatePresence>
          {displayEvidence.map((evidence, index) => {
            const pushpins = ["pushpin-crimson", "pushpin-sapphire", "pushpin-emerald"];
            const pinClass = pushpins[index % pushpins.length];
            return (
              <motion.div
                key={evidence.id || index}
                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => onSelectLetter && onSelectLetter(evidence)}
                className="evidence-pinned-letter"
                style={{
                  minHeight: "190px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                {/* Pushpin top right */}
                <div className={`board-pushpin ${pinClass}`} />

                {/* Wax Seal Ribbon bottom right */}
                <div className="wax-seal-ribbon">
                  <div className="wax-seal-disc">
                    {evidence.tier === "CAESAR" ? "I" : evidence.tier === "VIGENERE" ? "II" : "III"}
                  </div>
                  <div className="wax-ribbon-tails" />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)", borderBottom: "1px dashed #b8a680", paddingBottom: "4px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#8c2020", letterSpacing: "0.08em" }}>
                      {evidence.chamber} • {evidence.tier}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6e5d42" }}>
                      Solved by: <strong>{evidence.solvedBy || "Party"}</strong>
                    </span>
                  </div>

                  <h4 style={{ fontSize: "15px", color: "#281e10", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                    {evidence.title}
                  </h4>

                  <div style={{
                    padding: "var(--space-2) var(--space-3)",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderLeft: "3px solid #8c2020",
                    borderRadius: "2px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "#281e10",
                    lineHeight: "1.4",
                    wordBreak: "break-word",
                    fontStyle: "italic",
                    marginBottom: "var(--space-3)"
                  }}>
                    "{evidence.plaintext || evidence.ciphertext || "Decrypted correspondence fragments..."}"
                  </div>
                </div>

                <div style={{ fontSize: "11px", color: "#6e5d42", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(184, 166, 128, 0.4)", paddingTop: "6px" }}>
                  <span>Cipher: {evidence.algorithm}</span>
                  <span style={{ fontWeight: 700, color: "#2e7d5f" }}>VERIFIED ✔</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* If no letters solved yet, show interactive atmospheric letters from chamber or clues */}
        {displayEvidence.length === 0 && letters.slice(0, 2).map((letter, idx) => (
          <motion.div
            key={letter.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelectLetter && onSelectLetter(letter)}
            className="evidence-pinned-letter"
            style={{
              minHeight: "180px",
              opacity: 0.95,
              border: "1.5px dashed #8c2020",
              background: "linear-gradient(145deg, #f3eedc 0%, #e1d6b8 100%)"
            }}
          >
            <div className="board-pushpin pushpin-crimson" />
            <div className="wax-seal-ribbon">
              <div className="wax-seal-disc" style={{ background: "#4a3e2e" }}>🔒</div>
              <div className="wax-ribbon-tails" style={{ background: "#4a3e2e" }} />
            </div>

            <div style={{ fontSize: "11px", color: "#8c2020", fontWeight: 800, marginBottom: "4px" }}>
              {letter.chamber} • {letter.tier} [SEALED]
            </div>
            <h4 style={{ fontSize: "16px", color: "#281e10", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "8px" }}>
              {letter.title}
            </h4>
            <p style={{ fontSize: "12px", color: "#57462c", lineHeight: "1.5", fontStyle: "italic" }}>
              Encrypted Codex requiring deciphering at the central altar bench. Click to inspect & unlock...
            </p>
            <div style={{ marginTop: "12px", fontSize: "11px", fontWeight: 700, color: "#8c2020" }}>
              [Click to channel cipher at Decryption Bench →]
            </div>
          </motion.div>
        ))}

        {/* Atmospheric Sticky Note Clues matching the mockup image */}
        <div className="evidence-sticky-note sticky-blue" style={{ gridColumn: displayEvidence.length % 2 === 0 ? "1" : "auto" }}>
          <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px", color: "#00485c" }}>
            📌 Cryptanalyst Rot-Note:
          </div>
          <div>
            "Check Shift +3 on the Arch-Alchemist's seal. Frequency scan shows high 'E' occurrences on Letter L-1!"
          </div>
        </div>

        <div className="evidence-sticky-note sticky-pink" style={{ transform: "rotate(-2deg)" }}>
          <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px", color: "#6e004a" }}>
            🗝️ Master Keyword Clue:
          </div>
          <div>
            "Once both correspondence fragments are pinned, combine the initials of the High Scriptorium!"
          </div>
        </div>

        <div className="evidence-sticky-note sticky-yellow" style={{ gridColumn: "span 2", transform: "rotate(1deg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: "bold", color: "#634d00" }}>🗺️ Vault Exploration Map Note:</span> Chamber III doors remain locked until Wyrm's Breath ward is balanced below 70%.
          </div>
          <span style={{ fontSize: "20px" }}>🧭</span>
        </div>
      </div>

      {/* Decorative Ancient Map Fragment at Bottom */}
      <div style={{
        marginTop: "var(--space-6)",
        padding: "var(--space-4)",
        background: "linear-gradient(135deg, rgba(255, 245, 220, 0.7) 0%, rgba(210, 190, 150, 0.8) 100%)",
        border: "1px solid #a89673",
        borderRadius: "4px",
        boxShadow: "inset 0 0 12px rgba(80, 60, 30, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <span style={{ fontSize: "32px" }}>📜</span>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#4a3e2e", letterSpacing: "0.1em" }}>
              ARCH-SEAL SCHEMATIC MAP (§6 EVIDENCE WALL)
            </div>
            <div style={{ fontSize: "13px", color: "#281e10", fontFamily: "var(--font-mono)" }}>
              Total Letters Solved: {pinnedEvidence.length} / {letters.length || 2} • Party Sync: 100%
            </div>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#8c2020", fontWeight: 700 }}>
          [All pinned clues feed directly into the Final Verdict]
        </div>
      </div>
    </div>
  );
}
