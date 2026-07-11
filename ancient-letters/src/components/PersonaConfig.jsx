import React from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const PersonaConfig = ({ persona, setPersona, onSave }) => {
  const waxColors = [
    { name: "Crimson Red", value: "#8b0000", desc: "Urgent & Devoted" },
    { name: "Imperial Gold", value: "#b8860b", desc: "Wisdom & Royalty" },
    { name: "Forest Emerald", value: "#10403b", desc: "Hope & Nature" },
    { name: "Royal Navy", value: "#1e3a8a", desc: "Ocean & Voyager" },
    { name: "Amethyst Violet", value: "#6a1b9a", desc: "Mystery & Magic" }
  ];

  const crests = [
    { id: "quill", label: "✍️ Quill Pen", name: "The Scholar" },
    { id: "compass", label: "🧭 Compass Rose", name: "The Voyager" },
    { id: "hourglass", label: "⏳ Hourglass", name: "The Timekeeper" },
    { id: "dragon", label: "🐉 Royal Dragon", name: "The Guardian" },
    { id: "crown", label: "👑 Imperial Crown", name: "The Sovereign" }
  ];

  return (
    <div className="persona-config-container">
      <motion.div
        className="persona-parchment-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="persona-header">
          <span className="seal-badge" style={{ backgroundColor: persona.waxColor }}>
            {persona.crest === "quill" && "✍️"}
            {persona.crest === "compass" && "🧭"}
            {persona.crest === "hourglass" && "⏳"}
            {persona.crest === "dragon" && "🐉"}
            {persona.crest === "crown" && "👑"}
          </span>
          <div>
            <h2>Traveler Identity & Registry</h2>
            <p>Customize how your name and wax seals appear on all letters and sea bottles.</p>
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label>Traveler Name</label>
            <input
              type="text"
              value={persona.name}
              onChange={(e) => setPersona({ ...persona, name: e.target.value })}
              placeholder="e.g. Lord Julian Vance"
              className="persona-input"
            />
          </div>
          <div className="form-group">
            <label>Traveler Title / Epithet</label>
            <input
              type="text"
              value={persona.title}
              onChange={(e) => setPersona({ ...persona, title: e.target.value })}
              placeholder="e.g. Wayfarer of the Night"
              className="persona-input"
            />
          </div>
        </div>

        <div className="form-section">
          <label>Preferred Wax Seal Color</label>
          <div className="color-selector-grid">
            {waxColors.map((col) => (
              <button
                key={col.value}
                className={`color-pill ${persona.waxColor === col.value ? "selected" : ""}`}
                style={{ backgroundColor: col.value }}
                onClick={() => {
                  sounds.playWaxSeal();
                  setPersona({ ...persona, waxColor: col.value });
                }}
              >
                <span className="pill-name">{col.name}</span>
                <span className="pill-desc">{col.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>Preferred Crest Stamp</label>
          <div className="crest-selector-grid">
            {crests.map((cr) => (
              <button
                key={cr.id}
                className={`crest-box ${persona.crest === cr.id ? "selected" : ""}`}
                onClick={() => {
                  sounds.playQuillWrite();
                  setPersona({ ...persona, crest: cr.id });
                }}
              >
                <span className="crest-icon">{cr.label}</span>
                <span className="crest-name">{cr.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="persona-footer">
          <button
            className="save-persona-btn"
            onClick={() => {
              sounds.playWaxSeal();
              onSave();
            }}
          >
            📜 Save Identity to Registry
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonaConfig;
