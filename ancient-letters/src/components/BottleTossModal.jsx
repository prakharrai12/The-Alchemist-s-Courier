import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const BottleTossModal = ({ onClose, onTossBottle, persona }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bottleColor, setBottleColor] = useState("emerald");
  const [sealColor, setSealColor] = useState(persona.waxColor || "#10403b");
  const [isTossing, setIsTossing] = useState(false);

  const bottleTints = [
    { id: "emerald", name: "Deep Emerald Glass", col: "#1e5e3a" },
    { id: "sapphire", name: "Cobalt Sapphire Glass", col: "#1d3d8f" },
    { id: "amber", name: "Antique Honey Amber", col: "#8f5b1d" },
    { id: "amethyst", name: "Royal Amethyst Glass", col: "#5e1d8f" }
  ];

  const handleToss = () => {
    if (!content) return;
    setIsTossing(true);
    sounds.playCorkPop();

    setTimeout(() => {
      sounds.playBottleSplash();
    }, 1100);

    setTimeout(() => {
      onTossBottle({
        title: title || "Message in a Glass Bottle",
        sender: `${persona.name} (${persona.title})`,
        content,
        bottleColor,
        sealColor
      });
    }, 1900);
  };

  return (
    <motion.div
      className="modal-overlay ocean-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bottle-toss-card"
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" onClick={onClose}>✕</button>
        <h2>🍾 Cork a Message & Toss to the Sea</h2>
        <p className="ocean-subtitle">Your scroll will be sealed in glass and cast into the starlit ocean currents.</p>

        <AnimatePresence>
          {isTossing ? (
            <motion.div
              className="bottle-flight-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="flying-bottle-sprite"
                animate={{
                  x: [0, 180, 240],
                  y: [0, -220, 120],
                  rotate: [0, 360, 720],
                  scale: [1, 1.3, 0.4]
                }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                🍾
              </motion.div>
              <motion.div
                className="water-splash-effect"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 2.5, 3] }}
                transition={{ delay: 1.1, duration: 0.7 }}
              >
                🌊 SPLASH! 🌊
              </motion.div>
              <h3>Casting into the Ocean Currents...</h3>
            </motion.div>
          ) : (
            <div className="toss-form-fields">
              <input
                type="text"
                placeholder="Bottle Title or Theme (e.g. A Song Across the Waves)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ocean-input"
                onFocus={() => sounds.playQuillWrite()}
              />

              <textarea
                placeholder="Write your secret confession, chat invitation, or poem to be discovered by a distant beachcomber..."
                value={content}
                onChange={(e) => {
                  if (content.length % 15 === 0) sounds.playQuillWrite();
                  setContent(e.target.value);
                }}
                className="ocean-textarea"
              />

              <div className="bottle-tint-selector">
                <label>Select Antique Glass Tint:</label>
                <div className="tint-grid">
                  {bottleTints.map((t) => (
                    <button
                      key={t.id}
                      className={`tint-btn ${bottleColor === t.id ? "selected" : ""}`}
                      style={{ borderColor: t.col }}
                      onClick={() => { sounds.playCorkPop(); setBottleColor(t.id); }}
                    >
                      <span className="tint-preview" style={{ backgroundColor: t.col }} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="toss-action-btn"
                  disabled={!content}
                  onClick={handleToss}
                >
                  🌊 Cork Bottle & Toss into Ocean 🍾
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BottleTossModal;
