import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const LetterWriteModal = ({ onClose, onSendLetter, persona }) => {
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("All Wanderers");
  const [content, setContent] = useState("");
  const [sealColor, setSealColor] = useState(persona.waxColor || "#8b0000");
  const [sealCrest, setSealCrest] = useState(persona.crest || "quill");
  const [isSealing, setIsSealing] = useState(false);

  const handleSubmit = () => {
    if (!title || !content) return;
    setIsSealing(true);
    sounds.playWaxSeal();

    setTimeout(() => {
      onSendLetter({
        title,
        sender: `${persona.name} (${persona.title})`,
        recipient,
        content,
        sealColor,
        sealCrest
      });
    }, 900);
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`parchment-modal-card ${isSealing ? "sealing-active" : ""}`}
        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" onClick={onClose}>✕</button>
        <h2 className="parchment-title">Write A Letter for the Jar</h2>
        <p className="parchment-subtitle">Your words will be sealed in wax and preserved inside the glowing glass jar.</p>

        <div className="write-fields">
          <div className="field-row">
            <input
              type="text"
              placeholder="Letter Title (e.g. To the Wanderer at Dawn)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="parchment-input"
              onFocus={() => sounds.playQuillWrite()}
            />
          </div>
          <div className="field-row">
            <input
              type="text"
              placeholder="Addressed To (e.g. All Wanderers, or a specific friend)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="parchment-input"
            />
          </div>

          <textarea
            placeholder="Dip your quill in ink and write your letter here..."
            value={content}
            onChange={(e) => {
              if (content.length % 12 === 0) sounds.playQuillWrite();
              setContent(e.target.value);
            }}
            className="parchment-textarea"
          />

          {/* Wax Seal Preview & Selector */}
          <div className="seal-selection-row">
            <div className="wax-color-dots">
              <span>Seal Wax:</span>
              {["#8b0000", "#b8860b", "#10403b", "#1e3a8a", "#6a1b9a"].map((c) => (
                <button
                  key={c}
                  className={`wax-dot-btn ${sealColor === c ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => { sounds.playWaxSeal(); setSealColor(c); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hot Wax Sealing Animation Overlay */}
        {isSealing && (
          <motion.div
            className="wax-press-animation"
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="giant-wax-seal" style={{ backgroundColor: sealColor }}>
              <span>📜</span>
            </div>
            <h4>Sealing in Hot Wax...</h4>
          </motion.div>
        )}

        <div className="modal-actions">
          <button
            className="seal-send-btn"
            disabled={isSealing || !title || !content}
            onClick={handleSubmit}
          >
            🔥 Press Wax Seal & Deposit into Jar 📜
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LetterWriteModal;
