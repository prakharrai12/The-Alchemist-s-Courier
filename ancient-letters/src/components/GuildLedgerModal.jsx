import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANONICAL_ROLES } from "../constants/roles.js";

export function GuildLedgerModal({ onClose }) {
  const [activeSection, setActiveSection] = useState("PROTOCOL"); // PROTOCOL, ROLES, PRIMERS, WHISPERS

  // Close via Escape key (§9 accessibility)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(18, 17, 14, 0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="stone-panel"
        style={{
          width: "100%",
          maxWidth: "1040px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
          border: "2px solid var(--gilded-signet)",
          boxShadow: "0 0 32px rgba(0,0,0,0.8)"
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "var(--space-5) var(--space-6)",
            borderBottom: "1px solid var(--stone-border)",
            backgroundColor: "var(--vault-bg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.12em" }}>
              WYRMVAULT IN-WORLD RULEBOOK (§2, §5, §6, §7)
            </span>
            <h2 style={{ fontSize: "24px", color: "var(--parchment-light)", marginTop: "var(--space-1)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              📖 The Guild Ledger & Vault Manual
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Guild Ledger"
            className="btn-stone"
            style={{
              padding: "var(--space-2) var(--space-4)",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--parchment-light)"
            }}
          >
            ×
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#161411",
            borderBottom: "1px solid var(--stone-border)",
            overflowX: "auto"
          }}
        >
          <button
            onClick={() => setActiveSection("PROTOCOL")}
            className={activeSection === "PROTOCOL" ? "btn-gilded" : "btn-stone"}
            style={{ flex: 1, padding: "var(--space-3) var(--space-4)", borderRadius: 0, border: "none", borderRight: "1px solid var(--stone-border)", fontSize: "13px" }}
          >
            🏰 Case Protocol & Tension
          </button>
          <button
            onClick={() => setActiveSection("ROLES")}
            className={activeSection === "ROLES" ? "btn-gilded" : "btn-stone"}
            style={{ flex: 1, padding: "var(--space-3) var(--space-4)", borderRadius: 0, border: "none", borderRight: "1px solid var(--stone-border)", fontSize: "13px" }}
          >
            ⚡ Role Roster (Live Sync §5)
          </button>
          <button
            onClick={() => setActiveSection("PRIMERS")}
            className={activeSection === "PRIMERS" ? "btn-gilded" : "btn-stone"}
            style={{ flex: 1, padding: "var(--space-3) var(--space-4)", borderRadius: 0, border: "none", borderRight: "1px solid var(--stone-border)", fontSize: "13px" }}
          >
            🧩 Cipher Mechanics (§6)
          </button>
          <button
            onClick={() => setActiveSection("WHISPERS")}
            className={activeSection === "WHISPERS" ? "btn-gilded" : "btn-stone"}
            style={{ flex: 1, padding: "var(--space-3) var(--space-4)", borderRadius: 0, border: "none", fontSize: "13px" }}
          >
            🔮 Ward Whispers & Cooldowns
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div style={{ padding: "var(--space-6)", overflowY: "auto", flex: 1, fontSize: "15px", lineHeight: 1.6, color: "var(--parchment-light)" }}>
          {activeSection === "PROTOCOL" && (
            <div>
              <h3 style={{ fontSize: "20px", color: "var(--gilded-signet)", marginBottom: "var(--space-3)" }}>
                🏰 Cooperative Vault Protocol & Core Loop (§2)
              </h3>
              <p style={{ marginBottom: "var(--space-4)" }}>
                When your expedition party seals the heavy iron doors behind you, you step into an ancient vault guarded by a slumbering dragon (`Kaelgrith`). Across four historical chambers rest encrypted volumes and imperial correspondence holding the secrets of the First Seal. To survive and claim victory, your party must operate as a synchronized unit across three vital stages:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                <div style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                  <h4 style={{ color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>1. Chamber Exploration & Recovery</h4>
                  <p style={{ fontSize: "14px", color: "var(--parchment-muted)" }}>
                    Inspect the left-hand exploration pane to recover sealed volumes from the chamber floors. Any courier can bring an unsolved volume to the central <strong style={{ color: "var(--parchment-light)" }}>Decryption Bench</strong>.
                  </p>
                </div>
                <div style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                  <h4 style={{ color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>2. Deciphering & Pinning</h4>
                  <p style={{ fontSize: "14px", color: "var(--parchment-muted)" }}>
                    Employ tier-specific mechanical tools (`Caesar shift wheel / Vigenère matrix`) to test plaintext hypotheses. Once verified by the server ward, the volume is pinned automatically to the shared <strong style={{ color: "var(--parchment-light)" }}>Evidence Wall</strong>.
                  </p>
                </div>
              </div>

              <h4 style={{ fontSize: "18px", color: "#ff9fb2", marginBottom: "var(--space-2)" }}>
                🐉 Authoritative Wyrm's Breath Tension Meter (§7)
              </h4>
              <p style={{ marginBottom: "var(--space-3)" }}>
                Tension inside WYRMVAULT is governed strictly by the authoritative Wyrm's Breath meter (`0% to 100%`), maintained in server memory. Arbitrary timers do not exist. Instead, the meter ticks upward based on tangible expedition activity:
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "var(--space-6)", marginBottom: "var(--space-6)", color: "var(--parchment-muted)" }}>
                <li><strong style={{ color: "#ff9fb2" }}>+2% per minute</strong> — Atmospheric sulfur vapors slowly accumulating in the chamber.</li>
                <li><strong style={{ color: "#ff9fb2" }}>+10% on transition</strong> — Moving between chambers and disturbing ancient stone dust.</li>
                <li><strong style={{ color: "#ff9fb2" }}>+15% on failed ward</strong> — Submitting an incorrect decryption attempt or wrong Verdict keyword (`Alarming the Dragon`).</li>
                <li><strong style={{ color: "#6de8b5" }}>-15% breath purge</strong> — Executed when <strong style={{ color: "var(--parchment-light)" }}>The Warden</strong> activates Breath Suppression.</li>
              </ul>

              <h4 style={{ fontSize: "18px", color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>
                🔑 The Final Verdict & Master Key Assembly (§8)
              </h4>
              <p>
                Unlike individual letter guessing, escaping the vault requires one unified team decision. When all correspondence on the Evidence Wall is read, the party must assemble the single master keyword (`e.g., SIGNET`). Clicking <strong style={{ color: "var(--gilded-signet)" }}>Assemble Final Key & Submit Verdict</strong> locks in the team's shared attempt. If correct: <strong style={{ color: "#6de8b5" }}>Victory (§8)</strong>. If incorrect, the ward sparks (+15% Wyrm's Breath).
              </p>
            </div>
          )}

          {activeSection === "ROLES" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
                <h3 style={{ fontSize: "20px", color: "var(--gilded-signet)" }}>
                  ⚡ Canonical Role Roster & Tactical Powers (§5)
                </h3>
                <span style={{ fontSize: "12px", color: "var(--parchment-muted)", fontFamily: "var(--font-mono)" }}>
                  LIVE SYNCED WITH ROLE SELECT
                </span>
              </div>
              <p style={{ marginBottom: "var(--space-6)" }}>
                Every player selects one of six canonical roles before entering the vault. Each role grants <strong style={{ color: "var(--gilded-signet)" }}>one real, server-enforced one-time action per Case</strong> (`if triggered a second time, the server rejects with 403 Power Expended`). Use these powers strategically to overcome high-tier cryptographic blocks or atmospheric crises:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
                {CANONICAL_ROLES.map((role) => (
                  <div key={role.id} style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                      <span style={{ fontSize: "24px" }}>{role.icon}</span>
                      <div>
                        <h4 style={{ fontSize: "16px", color: "var(--parchment-light)", margin: 0 }}>{role.name}</h4>
                        <span style={{ fontSize: "11px", color: "var(--parchment-muted)" }}>{role.title}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--parchment-muted)", marginBottom: "var(--space-3)", fontStyle: "italic" }}>
                      "{role.lore}"
                    </p>
                    <div style={{ padding: "var(--space-2) var(--space-3)", backgroundColor: "rgba(212, 175, 55, 0.1)", borderLeft: "3px solid var(--gilded-signet)", borderRadius: "4px" }}>
                      <strong style={{ fontSize: "13px", color: "var(--gilded-signet)" }}>⚡ {role.powerName}:</strong>
                      <p style={{ fontSize: "13px", color: "var(--parchment-light)", margin: "4px 0 0" }}>{role.powerDesc}</p>
                      <span style={{ fontSize: "11px", color: "#6de8b5", display: "block", marginTop: "4px", fontWeight: 600 }}>
                        {role.cooldown}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "PRIMERS" && (
            <div>
              <h3 style={{ fontSize: "20px", color: "var(--gilded-signet)", marginBottom: "var(--space-3)" }}>
                🧩 Cryptographic Primers & Substitution Mechanics (§6)
              </h3>
              <p style={{ marginBottom: "var(--space-6)" }}>
                WYRMVAULT tests your team's deduction across two primary mechanical cipher tiers. These primers explain the mathematical rules governing symbol substitution without handing over the solutions to live chamber puzzles:
              </p>

              <div style={{ marginBottom: "var(--space-6)", padding: "var(--space-5)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                <h4 style={{ fontSize: "18px", color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>
                  Tier I: Novice Seal — Caesar Shift Wheel (`Monoalphabetic Substitution`)
                </h4>
                <p style={{ fontSize: "14px", color: "var(--parchment-muted)", marginBottom: "var(--space-3)" }}>
                  The Caesar Shift is one of history's oldest ciphers. Every character in the plaintext is shifted a fixed number of positions down the 26-letter English alphabet (`modulus 26`).
                </p>
                <div style={{ padding: "var(--space-3)", backgroundColor: "#141310", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--parchment-light)", borderLeft: "3px solid var(--gilded-signet)" }}>
                  Example Shift of N = 3:<br />
                  Plain text: &nbsp;A &nbsp;B &nbsp;C &nbsp;D &nbsp;E &nbsp;F &nbsp;G &nbsp;H &nbsp;I &nbsp;J &nbsp;K ...<br />
                  Cipher text: D &nbsp;E &nbsp;F &nbsp;G &nbsp;H &nbsp;I &nbsp;J &nbsp;K &nbsp;L &nbsp;M &nbsp;N ...<br />
                  <span style={{ color: "var(--parchment-muted)" }}>If the ciphertext reads "KHOOR", applying a reverse shift of -3 reveals "HELLO". Use the rotary slider on the Decryption Bench to test shift frequencies instantly.</span>
                </div>
              </div>

              <div style={{ padding: "var(--space-5)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                <h4 style={{ fontSize: "18px", color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>
                  Tier II: Adept Seal — Vigenère Keyword Matrix (`Polyalphabetic Substitution`)
                </h4>
                <p style={{ fontSize: "14px", color: "var(--parchment-muted)", marginBottom: "var(--space-3)" }}>
                  Unlike Caesar shifts where every letter shifts identically, the Vigenère cipher uses a repeating secret <strong style={{ color: "var(--parchment-light)" }}>Keyword</strong> (`e.g., DRAGON`) to shift each letter by a different amount based on the Tabula Recta matrix.
                </p>
                <div style={{ padding: "var(--space-3)", backgroundColor: "#141310", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--parchment-light)", borderLeft: "3px solid var(--gilded-signet)" }}>
                  Keyword: DRAGON (`D=3, R=17, A=0, G=6, O=14, N=13`)<br />
                  Plaintext: &nbsp; S &nbsp; E &nbsp; C &nbsp; R &nbsp; E &nbsp; T &nbsp; S &nbsp; E &nbsp; C &nbsp; R ...<br />
                  Key stream: D &nbsp; R &nbsp; A &nbsp; G &nbsp; O &nbsp; N &nbsp; D &nbsp; R &nbsp; A &nbsp; G ...<br />
                  Ciphertext: V &nbsp; V &nbsp; C &nbsp; X &nbsp; S &nbsp; G &nbsp; V &nbsp; V &nbsp; C &nbsp; X ...<br />
                  <span style={{ color: "var(--parchment-muted)" }}>Input the party's suspected keyword into the Decryption Bench Tier II tool to decrypt polyalphabetic sequences where frequency analysis alone falls short.</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "WHISPERS" && (
            <div>
              <h3 style={{ fontSize: "20px", color: "var(--gilded-signet)", marginBottom: "var(--space-3)" }}>
                🔮 Graduated Hint Economy & Soft Guess Cooldowns (`Ward Whispers`)
              </h3>
              <p style={{ marginBottom: "var(--space-4)" }}>
                To ensure gameplay never feels like blind trial-and-error at low skill or trivial at high skill, WYRMVAULT balances hints and wrong attempts through a strict risk-reward dungeon economy:
              </p>

              <div style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
                <h4 style={{ color: "var(--gilded-signet)", marginBottom: "var(--space-2)" }}>
                  🔮 Ward Whispers — The Tier-Scaled Hint Pool
                </h4>
                <p style={{ fontSize: "14px", color: "var(--parchment-muted)", marginBottom: "var(--space-3)" }}>
                  Each Case session initializes with a limited pool of <strong style={{ color: "var(--parchment-light)" }}>Ward Whispers</strong> shared across the entire team for the entire expedition (`not per chamber`):
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)", color: "var(--parchment-light)", fontSize: "14px" }}>
                  <li><strong style={{ color: "var(--gilded-signet)" }}>Novice Seal (Tier I):</strong> 3 Ward Whispers in pool.</li>
                  <li><strong style={{ color: "var(--gilded-signet)" }}>Adept Seal (Tier II):</strong> 2 Ward Whispers in pool.</li>
                  <li><strong style={{ color: "#f0cc5d" }}>Master Seal (Tier III):</strong> 1 Ward Whisper in pool.</li>
                  <li><strong style={{ color: "#ff9fb2" }}>Archon Seal (Tier IV):</strong> 0 Ward Whispers (`Endgame difficulty requires relying strictly on role power coordination`).</li>
                </ul>
                <div style={{ padding: "var(--space-3)", backgroundColor: "rgba(140, 32, 32, 0.15)", borderLeft: "3px solid var(--wyrm-flame)", borderRadius: "4px", fontSize: "13px" }}>
                  <strong style={{ color: "#ff9fb2" }}>⚠️ The Cost of a Whisper (+5% Wyrm's Breath):</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--parchment-light)" }}>
                    Hints are never free. Invoking a Ward Whisper agitates Kaelgrith, immediately ticking the shared Wyrm's Breath meter upward by <strong style={{ color: "#ff9fb2" }}>+5%</strong> (`or +8% on Master tier`). Furthermore, whispers are graduated:
                  </p>
                  <ul style={{ listStyleType: "circle", paddingLeft: "var(--space-5)", margin: "8px 0 0", color: "var(--parchment-muted)" }}>
                    <li><strong style={{ color: "var(--parchment-light)" }}>First Use (`Level 1 Nudge`):</strong> Reveals the cipher family and approximate rotation modulus (`or first letter of keyword`).</li>
                    <li><strong style={{ color: "var(--parchment-light)" }}>Second Use (`Level 2 Narrow`):</strong> Reveals an exact mapping of the first word or 3 character indices. Never reveals the full plaintext outright.</li>
                  </ul>
                </div>
              </div>

              <div style={{ padding: "var(--space-4)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)" }}>
                <h4 style={{ color: "#ff9fb2", marginBottom: "var(--space-2)" }}>
                  ⏳ Soft Guess Cooldown Penalty (`High-Tier Spam Protection`)
                </h4>
                <p style={{ fontSize: "14px", color: "var(--parchment-muted)", marginBottom: "var(--space-2)" }}>
                  On <strong style={{ color: "var(--parchment-light)" }}>Master (`Tier III`)</strong> and <strong style={{ color: "var(--parchment-light)" }}>Archon (`Tier IV`)</strong> difficulties, brute-force guessing is actively suppressed by the chamber wards.
                </p>
                <p style={{ fontSize: "14px", color: "var(--parchment-light)", margin: 0 }}>
                  If a player submits an incorrect plaintext verification, in addition to the +15% Wyrm's Breath penalty, the ward overheats and locks their verification terminal for <strong style={{ color: "#ff9fb2" }}>10 to 15 seconds</strong> (`or 3 seconds on Novice/Adept`). During this cooldown, the team must coordinate partial info before attempting another verification.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "var(--space-4) var(--space-6)",
            borderTop: "1px solid var(--stone-border)",
            backgroundColor: "var(--vault-bg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--parchment-muted)", fontFamily: "var(--font-mono)" }}>
            KEYBOARD SHORTCUT: ESC OR CLICK OUTSIDE TO DISMISS
          </span>
          <button onClick={onClose} className="btn-gilded" style={{ padding: "var(--space-2) var(--space-6)", fontSize: "14px" }}>
            Return to Active Case Session ↓
          </button>
        </div>
      </motion.div>
    </div>
  );
}
