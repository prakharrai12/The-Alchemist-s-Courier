import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DecryptionBench } from "./DecryptionBench.jsx";
import { EvidenceWall } from "./EvidenceWall.jsx";

export function ChamberHub({ user, activeCase, onUsePower, onSolveLetter, onUseWhisper, onProceedToVerdict }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeTab, setActiveTab] = useState("BENCH"); // BENCH or WALL
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

  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "var(--space-6) var(--space-4)" }}>
      {/* --- §7 TOP BAR: Wyrm's Breath Authoritative Tension Meter --- */}
      <motion.div
        animate={isDangerLevel ? { borderColor: ["#8c2020", "#d93838", "#8c2020"] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="stone-panel"
        style={{
          marginBottom: "var(--space-6)",
          padding: "var(--space-4) var(--space-6)",
          backgroundColor: isDangerLevel ? "rgba(140, 32, 32, 0.15)" : "var(--stone-card)",
          border: isDangerLevel ? "2px solid var(--wyrm-flame)" : "1px solid var(--stone-border)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span style={{ fontSize: "28px", filter: isDangerLevel ? "drop-shadow(0 0 8px #d93838)" : "none" }}>
              🐉
            </span>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: isDangerLevel ? "#ff9fb2" : "var(--gilded-signet)", letterSpacing: "0.12em" }}>
                WYRM'S BREATH TENSION METER (§7 — SERVER AUTHORITATIVE)
              </span>
              <h2 style={{ fontSize: "20px", color: "var(--parchment-light)" }}>
                Active Case: <span style={{ fontFamily: "var(--font-mono)", color: "var(--gilded-signet)" }}>{activeCase.caseId}</span> | Party Role: <strong style={{ color: "var(--parchment-light)" }}>{myRoleName.replace("THE_", "")}</strong>
              </h2>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "24px", fontWeight: 800, fontFamily: "var(--font-mono)", color: wyrmsBreath >= 70 ? "#ff9fb2" : wyrmsBreath >= 40 ? "#f0cc5d" : "#6de8b5" }}>
              {wyrmsBreath}% TENSION
            </div>
            <span style={{ fontSize: "12px", color: "var(--parchment-muted)" }}>
              {wyrmsBreath >= 100 ? "DRAGON AWOKE (`Case Failed`)" : wyrmsBreath >= 70 ? "CRITICAL: Vapors suffocating chamber" : "Atmospheric ward stable"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", height: "12px", backgroundColor: "#141310", border: "1px solid var(--stone-border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{
            width: `${wyrmsBreath}%`,
            height: "100%",
            backgroundColor: wyrmsBreath >= 70 ? "#d93838" : wyrmsBreath >= 40 ? "#d4af37" : "#2e7d5f",
            transition: "width 0.4s ease-out, background-color 0.4s ease-out"
          }} />
        </div>
      </motion.div>

      {/* Main Grid: Left Exploration Panel, Right Decryption/Wall Tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", alignItems: "start" }}>
        
        {/* Left Panel: Chamber Exploration List (§6) */}
        <div className="stone-panel" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-3)" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)" }}>CHAMBER FLOOR VOLUMES (§6)</span>
              <h3 style={{ fontSize: "20px", color: "var(--parchment-light)" }}>Recovered Sealed Correspondence</h3>
            </div>
            <button onClick={onProceedToVerdict} className="btn-gilded" style={{ padding: "var(--space-2) var(--space-4)", fontSize: "13px" }}>
              Unlock Verdict Gate →
            </button>
          </div>

          <p style={{ fontSize: "13px", color: "var(--parchment-muted)" }}>
            Inspect any volume below to transport it to the <strong style={{ color: "var(--parchment-light)" }}>Decryption Bench</strong>. Once solved, it pins automatically to the shared Evidence Wall.
          </p>

          {powerAlert && (
            <div style={{
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius-sm)",
              backgroundColor: powerAlert.type === "error" ? "rgba(140, 32, 32, 0.2)" : "rgba(46, 125, 95, 0.2)",
              border: `1px solid ${powerAlert.type === "error" ? "var(--wyrm-fire)" : "#6de8b5"}`,
              color: powerAlert.type === "error" ? "#ff9fb2" : "#6de8b5",
              fontSize: "13px"
            }}>
              {powerAlert.message}
            </div>
          )}

          {/* Role Power Action Card */}
          <div style={{ padding: "var(--space-4)", backgroundColor: "#1e1a14", border: "1px dashed var(--gilded-signet)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--gilded-signet)" }}>⚡ ONE-TIME ROLE ACTION (§5)</span>
              <span style={{ fontSize: "11px", color: "var(--parchment-muted)" }}>Server Enforced</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4)" }}>
              <span style={{ fontSize: "14px", color: "var(--parchment-light)" }}>
                Invoke <strong style={{ color: "var(--gilded-signet)" }}>{myRoleName.replace("THE_", "")}</strong> capability on <strong style={{ color: "#f0cc5d" }}>{selectedLetter ? selectedLetter.id : "Active Chamber"}</strong>
              </span>
              <button
                onClick={handleActivatePower}
                disabled={powerLoading}
                className="btn-gilded"
                style={{ padding: "var(--space-2) var(--space-4)", fontSize: "13px" }}
              >
                {powerLoading ? "Warding..." : "Deploy Power"}
              </button>
            </div>
          </div>

          {/* List of Letters */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxHeight: "480px", overflowY: "auto" }}>
            {letters.map((letter) => {
              const isSelected = selectedLetter && selectedLetter.id === letter.id;
              return (
                <motion.div
                  key={letter.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => { setSelectedLetter(letter); setActiveTab("BENCH"); }}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    backgroundColor: isSelected ? "rgba(212, 175, 55, 0.12)" : "var(--vault-bg)",
                    border: isSelected ? "2px solid var(--gilded-signet)" : "1px solid var(--stone-border)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
                    <span style={{ fontSize: "11px", color: "var(--gilded-signet)", fontWeight: 700 }}>
                      {letter.chamber} • {letter.tier}
                    </span>
                    <span style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                      fontWeight: 700,
                      backgroundColor: letter.isSolved ? "rgba(46, 125, 95, 0.25)" : "rgba(140, 32, 32, 0.25)",
                      color: letter.isSolved ? "#6de8b5" : "#ff9fb2"
                    }}>
                      {letter.isSolved ? "SOLVED ✔" : "LOCKED"}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, color: "var(--parchment-light)", fontSize: "14px" }}>
                    {letter.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--parchment-muted)", marginTop: "var(--space-1)" }}>
                    Cipher: {letter.algorithm}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Tab Switcher between Decryption Bench & Evidence Wall */}
        <div>
          {/* Tab Bar */}
          <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            <button
              onClick={() => setActiveTab("BENCH")}
              className={activeTab === "BENCH" ? "btn-gilded" : "btn-stone"}
              style={{ flex: 1, padding: "var(--space-3)" }}
            >
              ⚗️ Decryption Bench ({selectedLetter?.tier || "Select Letter"})
            </button>
            <button
              onClick={() => setActiveTab("WALL")}
              className={activeTab === "WALL" ? "btn-gilded" : "btn-stone"}
              style={{ flex: 1, padding: "var(--space-3)" }}
            >
              📌 Shared Evidence Wall ({pinnedEvidence.length} Solved)
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "BENCH" ? (
            <DecryptionBench
              activeLetter={selectedLetter}
              activeCase={activeCase}
              user={user}
              onSolveSubmitted={handleSolveSubmission}
              onUseWhisper={onUseWhisper}
            />
          ) : (
            <EvidenceWall
              pinnedEvidence={pinnedEvidence}
              onSelectLetter={(item) => { setSelectedLetter(item); setActiveTab("BENCH"); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
