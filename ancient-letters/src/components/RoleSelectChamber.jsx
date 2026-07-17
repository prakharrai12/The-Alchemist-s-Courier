import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANONICAL_ROLES } from "../constants/roles.js";

export { CANONICAL_ROLES };


export function RoleSelectChamber({ user, activeCase, onSelectRole, onToggleReady, onProceedToChamberHub }) {
  const [flippedCards, setFlippedCards] = useState({});
  const players = activeCase?.players || [];
  const myPlayer = players.find((p) => p.userId === (user.id || user.email));
  const myRole = myPlayer?.role;

  const toggleFlip = (roleId) => {
    setFlippedCards((prev) => ({ ...prev, [roleId]: !prev[roleId] }));
  };

  const isRoleClaimedByOther = (roleId) => {
    return players.some((p) => p.role === roleId && p.userId !== (user.id || user.email));
  };

  const getClaimedUsername = (roleId) => {
    const player = players.find((p) => p.role === roleId);
    return player ? player.username : null;
  };

  const allPlayersReady = players.length >= 1 && players.every((p) => p.isReady && p.role);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "var(--space-8) var(--space-4)" }}>
      {/* Header Bar */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.12em" }}>
          WYRMVAULT ROLE SELECT (§5)
        </span>
        <h1 style={{ fontSize: "32px", color: "var(--parchment-light)", marginTop: "var(--space-2)" }}>
          Choose Your Epistolary & Tactical Identity
        </h1>
        <p style={{ color: "var(--parchment-muted)", fontSize: "15px", maxWidth: "680px", margin: "var(--space-2) auto 0" }}>
          Click any card to flip between its <strong style={{ color: "var(--parchment-light)" }}>Lore Portrait</strong> (`Front`) and its <strong style={{ color: "var(--gilded-signet)" }}>Technical Power Matrix</strong> (`Back`). Each role grants one real, server-enforced one-time action inside the vault.
        </p>
      </div>

      {/* Six Flippable Role Cards Grid (§5) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        {CANONICAL_ROLES.map((role) => {
          const isFlipped = !!flippedCards[role.id];
          const isClaimedByMe = myRole === role.id;
          const claimedByOther = isRoleClaimedByOther(role.id);
          const claimerName = getClaimedUsername(role.id);

          return (
            <div key={role.id} style={{ perspective: "1000px", minHeight: "420px" }}>
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  cursor: "pointer"
                }}
                onClick={() => toggleFlip(role.id)}
              >
                {/* --- FRONT: Lore Portrait --- */}
                <div
                  className="stone-panel"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: isClaimedByMe ? "2px solid var(--gilded-signet)" : claimedByOther ? "1px dashed var(--wyrm-fire)" : "1px solid var(--stone-border)",
                    backgroundColor: isClaimedByMe ? "rgba(212, 175, 55, 0.08)" : claimedByOther ? "rgba(140, 32, 32, 0.08)" : "var(--stone-card)",
                    boxShadow: isClaimedByMe ? "var(--shadow-signet)" : "var(--shadow-stone)"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                      <div style={{ fontSize: "44px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>{role.icon}</div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "11px", color: "var(--gilded-signet)", fontFamily: "var(--font-mono)", fontWeight: 700, border: "1px solid var(--stone-border)", padding: "2px 8px", borderRadius: "var(--radius-sm)" }}>
                          ROLE CARD FRONT
                        </span>
                        {claimerName && (
                          <div style={{ fontSize: "12px", color: isClaimedByMe ? "var(--gilded-signet)" : "#ff9fb2", marginTop: "var(--space-1)", fontWeight: 600 }}>
                            {isClaimedByMe ? "👑 Claimed by You" : `🔒 Claimed by ${claimerName}`}
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 style={{ fontSize: "22px", color: "var(--parchment-light)" }}>{role.name}</h3>
                    <div style={{ fontSize: "13px", color: "var(--gilded-signet)", fontWeight: 600, marginBottom: "var(--space-3)" }}>
                      {role.title}
                    </div>

                    <p style={{ color: "var(--parchment-text)", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic" }}>
                      "{role.lore}"
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", borderTop: "1px solid var(--stone-border)", paddingTop: "14px" }}>
                    <span style={{ fontSize: "12px", color: "var(--parchment-muted)" }}>
                      🔄 Click to inspect power matrix
                    </span>

                    <button
                      type="button"
                      disabled={claimedByOther}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(activeCase.caseId, user.id || user.email, role.id);
                      }}
                      className={isClaimedByMe ? "btn-gilded" : "btn-stone"}
                      style={{ minHeight: "44px", padding: "10px 18px", fontSize: "13px" }}
                    >
                      {isClaimedByMe ? "Selected ✔" : claimedByOther ? "Locked" : "Claim Role"}
                    </button>
                  </div>
                </div>

                {/* --- BACK: Technical Power Matrix --- */}
                <div
                  className="stone-panel"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: isClaimedByMe ? "2px solid var(--gilded-signet)" : "1px solid var(--stone-border)",
                    backgroundColor: "#161411"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--stone-border)", paddingBottom: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--gilded-signet)", letterSpacing: "0.1em" }}>
                        TECHNICAL POWER MATRIX (§5)
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--parchment-muted)", fontFamily: "var(--font-mono)" }}>
                        CARD BACK
                      </span>
                    </div>

                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <div style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600 }}>POWER DESIGNATION</div>
                      <h4 style={{ fontSize: "20px", color: "var(--gilded-signet)", marginTop: "var(--space-1)" }}>
                        ⚡ {role.powerName}
                      </h4>
                    </div>

                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <div style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 600 }}>ENFORCEMENT SPECIFICATION</div>
                      <p style={{ color: "var(--parchment-light)", fontSize: "14px", marginTop: "var(--space-1)", lineHeight: "1.6" }}>
                        {role.powerDesc}
                      </p>
                    </div>

                    <div style={{ padding: "var(--space-3)", backgroundColor: "rgba(140, 32, 32, 0.15)", border: "1px solid var(--wyrm-fire)", borderRadius: "var(--radius-sm)", fontSize: "12px", color: "#ff9fb2" }}>
                      🛡️ <strong>Cooldown Rule:</strong> {role.cooldown}. The server (`caseService.js`) rejects any secondary invocation.
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", borderTop: "1px solid var(--stone-border)", paddingTop: "14px" }}>
                    <span style={{ fontSize: "12px", color: "var(--parchment-muted)" }}>
                      🔄 Click to return to lore portrait
                    </span>

                    <button
                      type="button"
                      disabled={claimedByOther}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(activeCase.caseId, user.id || user.email, role.id);
                      }}
                      className={isClaimedByMe ? "btn-gilded" : "btn-stone"}
                      style={{ minHeight: "44px", padding: "10px 18px", fontSize: "13px" }}
                    >
                      {isClaimedByMe ? "Selected ✔" : claimedByOther ? "Locked" : "Claim Role"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom Party Readiness Bar */}
      <div className="stone-panel" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", borderTop: "2px solid var(--stone-border)", padding: "20px" }}>
        <div>
          <div style={{ fontSize: "12px", color: "var(--parchment-muted)", fontWeight: 700, letterSpacing: "0.06em" }}>
            PARTY READINESS & LOCK-IN STATUS
          </div>
          <div style={{ fontSize: "15px", color: "var(--parchment-light)", marginTop: "6px" }}>
            Selected Role: <span style={{ color: "var(--gilded-signet)", fontWeight: 700 }}>{myRole || "None Selected"}</span> | Ready Status: <span style={{ color: myPlayer?.isReady ? "#6de8b5" : "#ff9fb2" }}>{myPlayer?.isReady ? "READY ✔" : "UNREADY"}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <button
            onClick={() => {
              if (!myRole) {
                alert("You must first click 'Claim Role' on one of the 6 canonical role cards above.");
                return;
              }
              onToggleReady(activeCase.caseId, user.id || user.email, !myPlayer?.isReady, myRole);
            }}
            disabled={!myRole}
            className={myPlayer?.isReady ? "btn-stone" : "btn-gilded"}
            style={{ minHeight: "48px", padding: "12px 24px", minWidth: "180px" }}
          >
            {myPlayer?.isReady ? "Unready Signet" : "⚔️ Lock Role & Ready"}
          </button>

          <button
            onClick={onProceedToChamberHub}
            disabled={!allPlayersReady}
            className="btn-gilded"
            style={{ minHeight: "48px", padding: "12px 24px" }}
          >
            Advance to Chamber Hub →
          </button>
        </div>
      </div>
    </div>
  );
}
