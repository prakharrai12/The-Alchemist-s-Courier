import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function DecryptionBench({ activeLetter, activeCase, user, onSolveSubmitted, onUseWhisper, loading }) {
  const [attemptPlaintext, setAttemptPlaintext] = useState("");
  const [shiftValue, setShiftValue] = useState(13);
  const [keywordValue, setKeywordValue] = useState("DRAGON");
  const [whisperLoading, setWhisperLoading] = useState(false);
  const [whisperHint, setWhisperHint] = useState(null);
  const [now, setNow] = useState(Date.now());

  // Live ticker for soft guess cooldown
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeLetter) {
    return (
      <div className="stone-panel" style={{ textAlign: "center", padding: "var(--space-12) var(--space-6)" }}>
        <div style={{ fontSize: "40px", opacity: 0.3, marginBottom: "var(--space-3)" }}>⚗️</div>
        <h3 style={{ fontSize: "20px", color: "var(--parchment-muted)" }}>
          Decryption Bench is Currently Vacant
        </h3>
        <p style={{ color: "var(--parchment-muted)", fontSize: "14px", marginTop: "var(--space-2)" }}>
          Select a sealed letter from the left Chamber Exploration panel to bring it onto the deciphering table.
        </p>
      </div>
    );
  }

  const whispersRemaining = activeCase?.wardWhispersRemaining ?? 3;
  const whispersMax = activeCase?.wardWhispersMax ?? 3;
  const userId = user?.id || user?.email;
  const myCooldownUntil = activeCase?.guessCooldowns?.[userId] || null;
  const isCoolingDown = myCooldownUntil && myCooldownUntil > now;
  const cooldownSecs = isCoolingDown ? Math.ceil((myCooldownUntil - now) / 1000) : 0;

  const handleInvokeWhisper = async () => {
    if (!onUseWhisper || whispersRemaining <= 0) return;
    setWhisperLoading(true);
    try {
      const res = await onUseWhisper(activeCase.caseId, activeLetter.id);
      if (res && res.hintText) {
        setWhisperHint(res.hintText);
      }
    } catch (err) {
      setWhisperHint(`⚠️ Ward Error: ${err.message}`);
    } finally {
      setWhisperLoading(false);
    }
  };


  // Live preview for Caesar Shift tool
  const previewCaesar = () => {
    if (!activeLetter.ciphertext) return "";
    const cleanShift = ((shiftValue % 26) + 26) % 26;
    return activeLetter.ciphertext
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          return String.fromCharCode(((char.charCodeAt(0) - 65 - cleanShift + 26) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  // Live preview for Vigenère keyword tool
  const previewVigenere = () => {
    if (!activeLetter.ciphertext || !keywordValue.trim()) return activeLetter.ciphertext;
    const cleanKey = keywordValue.toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleanKey.length) return activeLetter.ciphertext;

    let keyIndex = 0;
    return activeLetter.ciphertext
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  const handleApplyToolPreview = () => {
    if (activeLetter.tier === "TIER_I") {
      setAttemptPlaintext(previewCaesar());
    } else if (activeLetter.tier === "TIER_II") {
      setAttemptPlaintext(previewVigenere());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!attemptPlaintext.trim()) return;
    onSolveSubmitted(activeLetter.id, attemptPlaintext.trim());
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="stone-panel">
      {/* Bench Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.1em" }}>
            CRYPTOGRAPHIC BENCH (§6) — {activeLetter.tier}
          </span>
          <h3 style={{ fontSize: "22px", color: "var(--parchment-light)", marginTop: "var(--space-1)" }}>
            {activeLetter.title} ({activeLetter.algorithm})
          </h3>
          <div style={{ fontSize: "13px", color: "var(--parchment-muted)", marginTop: "var(--space-1)" }}>
            💡 Ward Hint: {activeLetter.hint}
          </div>
        </div>

        <div style={{ padding: "4px 12px", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-sm)", fontSize: "12px", color: "var(--gilded-signet)", fontWeight: 700 }}>
          {activeLetter.chamber}
        </div>
      </div>

      {/* Raw Ciphertext Box */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <label style={{ display: "block", fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600, marginBottom: "var(--space-2)" }}>
          RAW ENCRYPTED CIPHERTEXT FROM PARCHMENT
        </label>
        <div style={{
          padding: "var(--space-4)",
          backgroundColor: "var(--vault-bg)",
          border: "1px solid var(--stone-border)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-mono)",
          fontSize: "16px",
          color: "#ffc48e",
          letterSpacing: "0.08em",
          lineHeight: "1.6",
          wordBreak: "break-all"
        }}>
          {activeLetter.ciphertext}
        </div>
      </div>

      {/* Interactive Tier Cipher Tool Bench (§6) */}
      <div style={{ padding: "var(--space-4)", backgroundColor: "#161411", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
        {activeLetter.tier === "TIER_I" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--gilded-signet)" }}>
                ⚙️ Tier I Rotary Caesar Wheel Tool
              </span>
              <span style={{ fontSize: "13px", color: "var(--parchment-light)", fontFamily: "var(--font-mono)" }}>
                Shift Parameter: <strong style={{ color: "var(--gilded-signet)" }}>{shiftValue}</strong> (ROT{shiftValue})
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={25}
              value={shiftValue}
              onChange={(e) => setShiftValue(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "var(--gilded-signet)", cursor: "pointer", marginBottom: "var(--space-3)" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-3)", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-sm)" }}>
              <span style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--parchment-light)" }}>
                Preview: {previewCaesar().substring(0, 48)}...
              </span>
              <button
                type="button"
                onClick={handleApplyToolPreview}
                className="btn-stone"
                style={{ padding: "4px 12px", fontSize: "12px" }}
              >
                Copy Preview to Input ↓
              </button>
            </div>
          </div>
        )}

        {activeLetter.tier === "TIER_II" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--gilded-signet)" }}>
                🧩 Tier II Vigenère Tabula Recta Matrix Tool
              </span>
              <span style={{ fontSize: "13px", color: "var(--parchment-muted)" }}>
                Input Keyword to test polyalphabetic substitution
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="e.g., DRAGON"
                value={keywordValue}
                onChange={(e) => setKeywordValue(e.target.value.toUpperCase())}
                style={{
                  flex: "1 1 200px",
                  minHeight: "44px",
                  padding: "10px 14px",
                  backgroundColor: "var(--vault-bg)",
                  border: "1px solid var(--stone-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--gilded-signet)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  outline: "none"
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--gilded-signet)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--stone-border)"; }}
              />
              <button
                type="button"
                onClick={handleApplyToolPreview}
                className="btn-stone"
                style={{ minHeight: "44px", padding: "10px 18px", fontSize: "13px" }}
              >
                Apply Keyword Preview ↓
              </button>
            </div>

            <div style={{ padding: "12px 16px", backgroundColor: "var(--vault-bg)", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-md)", fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--parchment-light)", wordBreak: "break-all" }}>
              Preview: {previewVigenere().substring(0, 56)}...
            </div>
          </div>
        )}
      </div>

      {/* Ward Whisper Card (§6 & §7 Hint Economy) */}
      <div style={{
        padding: "20px",
        backgroundColor: "#1c1813",
        border: "1px dashed var(--gilded-signet)",
        borderRadius: "var(--radius-lg)",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gilded-signet)" }}>🔮 WARD WHISPER HINT ECONOMY (§6)</span>
            <div style={{ fontSize: "14px", color: "var(--parchment-light)", marginTop: "4px" }}>
              Pool Whispers Remaining: <strong style={{ color: whispersRemaining > 0 ? "#6de8b5" : "#ff9fb2" }}>{whispersRemaining} / {whispersMax}</strong> ({activeCase?.tierSeal || "NOVICE"} Seal)
            </div>
          </div>
          <button
            type="button"
            onClick={handleInvokeWhisper}
            disabled={whisperLoading || whispersRemaining <= 0 || !onUseWhisper}
            className="btn-stone"
            style={{ minHeight: "44px", padding: "10px 18px", borderColor: "var(--gilded-signet)", color: "var(--gilded-signet)", fontSize: "13px" }}
          >
            {whisperLoading ? "Communing..." : whispersRemaining <= 0 ? "Whisper Pool Exhausted" : "Use Ward Whisper (+5% Breath)"}
          </button>
        </div>

        {(whisperHint || activeCase?.letterWhispers?.[activeLetter.id]) && (
          <div style={{
            marginTop: "14px",
            padding: "14px 16px",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            borderLeft: "3px solid var(--gilded-signet)",
            borderRadius: "4px",
            fontSize: "13px",
            color: "var(--parchment-light)",
            lineHeight: "1.6"
          }}>
            {whisperHint ? whisperHint : `🔮 Ward Whisper Level ${activeCase?.letterWhispers[activeLetter.id]}: Nudge active. Check the Ward Hint above or invoke again for narrow mapping.`}
          </div>
        )}
      </div>

      {/* Attempt Plaintext Submission Form */}
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 700, marginBottom: "8px", letterSpacing: "0.05em" }}>
          VERIFY DECRYPTED PLAINTEXT ATTEMPT
        </label>
        <textarea
          rows={3}
          required
          placeholder="Enter the deciphered English plaintext here..."
          value={attemptPlaintext}
          onChange={(e) => setAttemptPlaintext(e.target.value)}
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "14px 16px",
            backgroundColor: "var(--vault-bg)",
            border: "1px solid var(--stone-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--parchment-light)",
            fontFamily: "var(--font-ui)",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "16px",
            outline: "none",
            resize: "vertical"
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--gilded-signet)"; }}
          onBlur={(e) => { e.target.style.borderColor = "var(--stone-border)"; }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <span style={{ flex: "1 1 240px", fontSize: "13px", color: isCoolingDown ? "#ff9fb2" : "#ff9fb2", lineHeight: "1.4" }}>
            {isCoolingDown
              ? `⏳ Terminal Locked (§6): Soft cooldown active for ${cooldownSecs}s after failed guess.`
              : "⚠️ Note: Incorrect verification will spark the ward (+15% Wyrm's Breath!)."}
          </span>
          <button
            type="submit"
            disabled={loading || !attemptPlaintext.trim() || isCoolingDown}
            className="btn-gilded"
            style={{ minHeight: "48px", padding: "12px 24px", fontSize: "15px", opacity: isCoolingDown ? 0.6 : 1 }}
          >
            {isCoolingDown
              ? `⏳ Ward Cooling Down (${cooldownSecs}s)...`
              : loading
              ? "Verifying with Server Ward..."
              : "⚔️ Verify & Pin to Evidence Wall"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
