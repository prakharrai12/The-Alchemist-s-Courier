import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DecryptionBench } from "./DecryptionBench.jsx";
import { EvidenceWall } from "./EvidenceWall.jsx";

export function ChamberHub({ user, activeCase, onUsePower, onSolveLetter, onUseWhisper, onProceedToVerdict }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showBenchModal, setShowBenchModal] = useState(false);
  const [powerLoading, setPowerLoading] = useState(false);
  const [powerAlert, setPowerAlert] = useState(null);

  if (!activeCase) {
    return (
      <div className="stone-panel" style={{ textAlign: "center", padding: "var(--space-12)" }}>
        <h3>No Active Case Session Connected</h3>
      </div>
    );
  }

  const players = activeCase.players || [];
  const myPlayer = players.find((p) => p.userId === (user.id || user.email));
  const myRoleName = myPlayer?.role || "THE_ARCHIVIST";
  const wyrmsBreath = activeCase.wyrmsBreath || 0;
  const letters = activeCase.letters || [];
  const pinnedEvidence = activeCase.pinnedEvidence || [];

  // Set first unsolved letter as selected if null
  if (!selectedLetter && letters.length > 0) {
    const firstUnsolved = letters.find((l) => !l.isSolved) || letters[0];
    if (firstUnsolved) {
      setSelectedLetter(firstUnsolved);
    }
  }

  const handleActivatePower = async () => {
    setPowerLoading(true);
    setPowerAlert(null);
    try {
      const res = await onUsePower(activeCase.caseId, user.id || user.email, myRoleName, selectedLetter?.id || "L-1");
      if (res && res.message) {
        setPowerAlert({ type: res.success ? "success" : "error", message: res.message });
      }
    } catch (err) {
      setPowerAlert({ type: "error", message: err.message || "Power invocation rejected by ward." });
    } finally {
      setPowerLoading(false);
    }
  };

  const handleSolveSubmission = async (letterId, attemptPlaintext) => {
    try {
      const res = await onSolveLetter(activeCase.caseId, letterId, attemptPlaintext);
      if (res && res.message) {
        setPowerAlert({ type: res.success ? "success" : "error", message: res.message });
      }
    } catch (err) {
      setPowerAlert({ type: "error", message: err.message });
    }
  };

  const isDangerLevel = wyrmsBreath >= 70;

  // Canonical 4–6 player card display (ensuring at least 4 radial cards match the mockup visual)
  const canonicalSlots = [
    { name: players[0]?.username || "Player Clazs", role: players[0]?.role || "THE_ARCHIVIST", hp: "350/130", avatar: "🧙‍♂️", icon: "🧿" },
    { name: players[1]?.username || "Player Clazs", role: players[1]?.role || "THE_SCOUT", hp: "250/150", avatar: "🛡️", icon: "🧭" },
    { name: players[2]?.username || "Player Clazs", role: players[2]?.role || "THE_ALCHEMIST", hp: "250/150", avatar: "🧝‍♀️", icon: "⚗️" },
    { name: players[3]?.username || "Player Clazs", role: players[3]?.role || "THE_WARDEN", hp: "150/150", avatar: "🧝‍♂️", icon: "⚔️" }
  ];

  return (
    <div style={{ maxWidth: "1680px", margin: "0 auto", padding: "var(--space-2) var(--space-4) var(--space-8)" }}>
      {/* --- §7 TOP DRAGON CREST HEADER: Authoritative Wyrm's Breath Tension Meter --- */}
      <div className="dragon-crest-header">
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", px: "4px" }}>
          <span style={{ fontSize: "11px", color: "#f0cc5d", fontWeight: 700, letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}>
            CASE: {activeCase.caseId} | PARTY: {players.length}/6 | YOUR ROLE: {myRoleName.replace("THE_", "")}
          </span>
          <span style={{ fontSize: "13px", color: wyrmsBreath >= 70 ? "#ff9fb2" : "#6de8b5", fontWeight: 800 }}>
            {wyrmsBreath >= 100 ? "DRAGON AWOKE (`Case Failed`)" : wyrmsBreath >= 70 ? "CRITICAL VAPORS" : "Atmospheric Ward Stable"}
          </span>
        </div>

        {/* Chiseled Tension Bar Track & Fill */}
        <div className="dragon-tension-bar-track">
          <div
            className="dragon-tension-bar-fill"
            style={{ width: `${Math.min(wyrmsBreath, 100)}%` }}
          />
          <div className="dragon-tension-label">
            WYRM'S BREATH TENSION — {wyrmsBreath}%
          </div>
        </div>

        {/* Flame Emblem directly below */}
        <div className="dragon-flame-pendant">🔥</div>
      </div>

      {/* Main Dual Grid: Left Chamber Hub, Right Shared Evidence Wall */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "24px", alignItems: "start", marginTop: "16px" }}>
        
        {/* ================= LEFT PANEL: CHAMBER HUB (§6) ================= */}
        <div className="chamber-hub-octagonal" style={{ minHeight: "680px" }}>
          <div className="chamber-panel-header">
            CHAMBER HUB
          </div>

          {/* Radial Dungeon Floor with Altar Core & Player Class Status Cards */}
          <div style={{ position: "relative", padding: "16px 0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* Top 2 Player Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px", width: "100%", maxWidth: "580px", marginBottom: "16px" }}>
              {canonicalSlots.slice(0, 2).map((slot, i) => (
                <div key={i} className="party-member-card">
                  <div className="party-member-avatar">{slot.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--parchment-light)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {slot.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--gilded-signet)", fontWeight: 600 }}>
                      Player Class: {slot.role.replace("THE_", "")} {slot.icon}
                    </div>
                    {/* Health/Resilience Bar */}
                    <div style={{ marginTop: "6px", width: "100%", height: "8px", backgroundColor: "#0f0e0c", borderRadius: "var(--radius-full)", border: "1px solid #38332a", overflow: "hidden" }}>
                      <div style={{ width: i === 0 ? "85%" : "70%", height: "100%", backgroundColor: i === 0 ? "#d93838" : "#d4af37" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--parchment-muted)", textAlign: "right", marginTop: "2px" }}>
                      {slot.hp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Altar Console Core */}
            <div
              onClick={() => setShowBenchModal(!showBenchModal)}
              className="chamber-altar-core"
              title="Click to access Altar Core Decryption Bench"
            >
              <span style={{ fontSize: "36px", filter: "drop-shadow(0 0 10px #38b6ff)" }}>⚗️</span>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#38b6ff", marginTop: "4px", letterSpacing: "0.08em" }}>
                ALTAR BENCH
              </span>
              <span style={{ fontSize: "10px", color: "var(--gilded-signet)", fontWeight: 600 }}>
                [Click to Decipher]
              </span>
            </div>

            {/* Bottom 2 Player Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px", width: "100%", maxWidth: "580px", marginTop: "16px" }}>
              {canonicalSlots.slice(2, 4).map((slot, i) => (
                <div key={i + 2} className="party-member-card">
                  <div className="party-member-avatar">{slot.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--parchment-light)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {slot.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--gilded-signet)", fontWeight: 600 }}>
                      Player Class: {slot.role.replace("THE_", "")} {slot.icon}
                    </div>
                    {/* Health/Resilience Bar */}
                    <div style={{ marginTop: "6px", width: "100%", height: "8px", backgroundColor: "#0f0e0c", borderRadius: "var(--radius-full)", border: "1px solid #38332a", overflow: "hidden" }}>
                      <div style={{ width: i === 0 ? "75%" : "95%", height: "100%", backgroundColor: i === 0 ? "#d93838" : "#2e7d5f" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--parchment-muted)", textAlign: "right", marginTop: "2px" }}>
                      {slot.hp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovered Sealed Correspondence & Power Action Drawer below Altar */}
          <div style={{ borderTop: "1px solid var(--stone-border)", paddingTop: "var(--space-4)", marginTop: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)" }}>SEALED CORRESPONDENCE (§6)</span>
                <h4 style={{ fontSize: "16px", color: "var(--parchment-light)" }}>Pick up Codex for Altar Decryption</h4>
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <button
                  onClick={() => setShowBenchModal(!showBenchModal)}
                  className="btn-gilded"
                  style={{ padding: "var(--space-2) var(--space-4)", fontSize: "12px" }}
                >
                  ⚗️ {showBenchModal ? "Close Bench" : "Open Altar Bench"}
                </button>
                <button
                  onClick={onProceedToVerdict}
                  className="btn-stone"
                  style={{ padding: "var(--space-2) var(--space-4)", fontSize: "12px", borderColor: "var(--gilded-signet)", color: "var(--gilded-signet)" }}
                >
                  Unlock Verdict Gate →
                </button>
              </div>
            </div>

            {powerAlert && (
              <div style={{
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-sm)",
                backgroundColor: powerAlert.type === "error" ? "rgba(140, 32, 32, 0.25)" : "rgba(46, 125, 95, 0.25)",
                border: `1px solid ${powerAlert.type === "error" ? "var(--wyrm-fire)" : "#6de8b5"}`,
                color: powerAlert.type === "error" ? "#ff9fb2" : "#6de8b5",
                fontSize: "12px",
                marginBottom: "var(--space-3)"
              }}>
                {powerAlert.message}
              </div>
            )}

            {/* Role Power Bar */}
            <div style={{ padding: "var(--space-3)", backgroundColor: "#141310", border: "1px dashed var(--gilded-signet)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)" }}>⚡ ONE-TIME ROLE POWER (§5)</span>
                <div style={{ fontSize: "13px", color: "var(--parchment-light)" }}>
                  Invoke <strong>{myRoleName.replace("THE_", "")}</strong> on <strong>{selectedLetter ? selectedLetter.id : "Active Chamber"}</strong>
                </div>
              </div>
              <button
                onClick={handleActivatePower}
                disabled={powerLoading}
                className="btn-stone"
                style={{ padding: "6px 14px", fontSize: "12px", borderColor: "var(--gilded-bright)", color: "var(--gilded-bright)" }}
              >
                {powerLoading ? "Warding..." : "Deploy Power"}
              </button>
            </div>

            {/* Letter selector pills */}
            <div style={{ display: "flex", gap: "var(--space-3)", overflowX: "auto", paddingBottom: "4px" }}>
              {letters.map((letter) => {
                const isSelected = selectedLetter && selectedLetter.id === letter.id;
                return (
                  <div
                    key={letter.id}
                    onClick={() => { setSelectedLetter(letter); setShowBenchModal(true); }}
                    style={{
                      padding: "var(--space-2) var(--space-3)",
                      backgroundColor: isSelected ? "rgba(212, 175, 55, 0.18)" : "#141310",
                      border: isSelected ? "2px solid var(--gilded-signet)" : "1px solid var(--stone-border)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      minWidth: "180px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
                      <span style={{ color: "var(--gilded-signet)", fontWeight: 700 }}>{letter.id} • {letter.tier}</span>
                      <span style={{ color: letter.isSolved ? "#6de8b5" : "#ff9fb2", fontWeight: 700 }}>
                        {letter.isSolved ? "SOLVED" : "LOCKED"}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--parchment-light)", fontWeight: 600, marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {letter.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL: SHARED EVIDENCE WALL (§6) ================= */}
        <div>
          <EvidenceWall
            pinnedEvidence={pinnedEvidence}
            letters={letters}
            onSelectLetter={(item) => {
              setSelectedLetter(item);
              setShowBenchModal(true);
            }}
          />
        </div>
      </div>

      {/* --- COLLAPSIBLE / MODAL DECRYPTION BENCH OVERLAY over the Central Altar --- */}
      <AnimatePresence>
        {showBenchModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(10, 9, 7, 0.88)",
              backdropFilter: "blur(8px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-6)"
            }}
          >
            <div style={{ width: "100%", maxWidth: "1100px", maxHeight: "92vh", overflowY: "auto", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "var(--space-2)" }}>
                <button
                  onClick={() => setShowBenchModal(false)}
                  className="btn-gilded"
                  style={{ padding: "var(--space-2) var(--space-5)", fontSize: "14px" }}
                >
                  ✕ Close Altar Decryption Bench
                </button>
              </div>
              <DecryptionBench
                activeLetter={selectedLetter}
                activeCase={activeCase}
                user={user}
                onSolveSubmitted={async (lid, pt) => {
                  await handleSolveSubmission(lid, pt);
                  setShowBenchModal(false);
                }}
                onUseWhisper={onUseWhisper}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
