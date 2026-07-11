import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { sounds } from "../audio/soundEngine";

const BottleViewModal = ({ bottle, onClose, onReplyBottle, persona }) => {
  const [replyText, setReplyText] = useState("");
  const [hasPopped, setHasPopped] = useState(false);

  if (!bottle) return null;

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    sounds.playWaxSeal();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#1e3a8a", "#10403b", "#e8d7b9"]
    });
    onReplyBottle(bottle.id, {
      sender: `${persona.name} (${persona.title})`,
      content: replyText
    });
    setReplyText("");
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
        className="bottle-scroll-viewer"
        initial={{ scale: 0.4, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.4, y: 50, opacity: 0 }}
        transition={{ duration: 0.55, type: "spring" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn dark-btn" onClick={onClose}>✕</button>

        <div className="bottle-viewer-header">
          <div className="bottle-icon-badge">🍾</div>
          <div>
            <h2>{bottle.title}</h2>
            <span className="coords-tag">📍 Discovered at {bottle.coordinates}</span>
          </div>
        </div>

        <div className="scroll-metadata-bar">
          <span><strong>Cast by:</strong> {bottle.sender}</span>
          <span><strong>Date:</strong> {bottle.date}</span>
          <span><strong>Status:</strong> Washed Ashore on Pier</span>
        </div>

        {/* Message Content */}
        <div className="bottle-parchment-content">
          <p className="bottle-message-text">"{bottle.content}"</p>
        </div>

        {/* Beachcomber Chat Thread */}
        <div className="chat-thread-section ocean-thread">
          <h3>💬 Beachcomber Correspondence Chat ({bottle.replies?.length || 0})</h3>
          
          <div className="replies-list">
            {(!bottle.replies || bottle.replies.length === 0) ? (
              <p className="no-replies">You are the first wanderer to open this bottle! Send a message across the waves.</p>
            ) : (
              bottle.replies.map((reply) => (
                <div key={reply.id} className="reply-parchment-strip ocean-reply">
                  <div className="reply-header">
                    <span className="reply-sender">🌊 {reply.sender}</span>
                    <span className="reply-date">{reply.date}</span>
                  </div>
                  <p className="reply-content">{reply.content}</p>
                </div>
              ))
            )}
          </div>

          <div className="reply-input-area">
            <textarea
              placeholder="Write your response to be rolled into the glass bottle and kept on the shore..."
              value={replyText}
              onChange={(e) => {
                if (replyText.length % 15 === 0) sounds.playQuillWrite();
                setReplyText(e.target.value);
              }}
              className="reply-textarea ocean-textarea"
            />
            <button
              className="append-reply-btn ocean-reply-btn"
              disabled={!replyText.trim()}
              onClick={handleSendReply}
            >
              🍾 Seal & Reply to Sea Message
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BottleViewModal;
