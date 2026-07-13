import React, { useState } from "react";
import { motion } from "framer-motion";
import { safeFetchJson } from "../services/apiClient.js";

export function AuthChamber({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";
      const body = isRegistering
        ? { email, password, username: username || "Vault-Breaker" }
        : { email, password };

      const data = await safeFetchJson(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      // Store JWT token
      if (data.token || data.accessToken) {
        localStorage.setItem("wyrmvault_token", data.token || data.accessToken);
        localStorage.setItem("wyrmvault_user", JSON.stringify(data.user || { id: email, username: username || email.split("@")[0] }));
      }

      onLoginSuccess(data.user || { id: email, username: username || email.split("@")[0] }, data.token || data.accessToken);
    } catch (err) {
      setError(err.message || "The heavy iron portcullis blocks your entry (`Connection Failed`).");
    } finally {
      setLoading(false);
    }
  };

  const enterAsGuest = () => {
    const guestUser = {
      id: "guest-" + Math.floor(Math.random() * 8999 + 1000),
      username: "Arch-Breaker " + Math.floor(Math.random() * 89 + 10)
    };
    localStorage.setItem("wyrmvault_user", JSON.stringify(guestUser));
    onLoginSuccess(guestUser, null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-6)",
      background: "radial-gradient(circle at 50% 20%, #262118 0%, var(--vault-bg) 70%)"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="stone-panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          border: "2px solid var(--stone-border)",
          boxShadow: "var(--shadow-vault)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Stone Archway Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <div style={{ fontSize: "36px", marginBottom: "var(--space-2)" }}>🗝️</div>
          <h1 style={{ fontSize: "28px", color: "var(--gilded-signet)", letterSpacing: "0.08em" }}>
            WYRMVAULT
          </h1>
          <p style={{ color: "var(--parchment-muted)", fontSize: "14px", marginTop: "var(--space-1)" }}>
            Cooperative Cipher-Dungeon Protocol (§1–§13)
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: "var(--space-3)",
            backgroundColor: "rgba(140, 32, 32, 0.2)",
            border: "1px solid var(--wyrm-fire)",
            borderRadius: "var(--radius-md)",
            color: "#ff9fb2",
            fontSize: "13px",
            marginBottom: "var(--space-4)"
          }}>
            🔥 <strong>Ward Alert:</strong> {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {isRegistering && (
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "var(--parchment-muted)", marginBottom: "var(--space-1)", fontWeight: 600 }}>
                VAULT-BREAKER CODENAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Archivist Vance"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-3)",
                  backgroundColor: "var(--vault-bg)",
                  border: "1px solid var(--stone-border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--parchment-light)",
                  fontSize: "14px"
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "var(--parchment-muted)", marginBottom: "var(--space-1)", fontWeight: 600 }}>
              SEALED EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              placeholder="breaker@wyrmvault.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "var(--space-3)",
                backgroundColor: "var(--vault-bg)",
                border: "1px solid var(--stone-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--parchment-light)",
                fontSize: "14px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", color: "var(--parchment-muted)", marginBottom: "var(--space-1)", fontWeight: 600 }}>
              OBSIDIAN PASSPHRASE
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "var(--space-3)",
                backgroundColor: "var(--vault-bg)",
                border: "1px solid var(--stone-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--parchment-light)",
                fontSize: "14px"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gilded"
            style={{ marginTop: "var(--space-2)", width: "100%", padding: "var(--space-3)" }}
          >
            {loading ? "Unsealing Stone Portcullis..." : isRegistering ? "Forge Signet & Enter Vault" : "Unseal Vault & Enter"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "var(--space-4)", fontSize: "13px" }}>
          <span style={{ color: "var(--parchment-muted)" }}>
            {isRegistering ? "Already forged a signet? " : "No signet in the archives? "}
          </span>
          <button
            type="button"
            onClick={() => { setIsRegistering(!isRegistering); setError(null); }}
            style={{
              background: "none",
              border: "none",
              color: "var(--gilded-signet)",
              textDecoration: "underline",
              padding: 0,
              minHeight: "auto"
            }}
          >
            {isRegistering ? "Access existing vault" : "Register new codename"}
          </button>
        </div>

        {/* Quick Guest Enter for demo / local co-op testing */}
        <div style={{ borderTop: "1px solid var(--stone-border)", marginTop: "var(--space-6)", paddingTop: "var(--space-4)", textAlign: "center" }}>
          <button
            type="button"
            onClick={enterAsGuest}
            className="btn-stone"
            style={{ width: "100%", fontSize: "13px", color: "var(--parchment-text)" }}
          >
            🚀 Enter Immediately as Guest Vault-Breaker
          </button>
        </div>
      </motion.div>
    </div>
  );
}
