import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const LetterViewModal = ({ letter, onClose, onReply, onLike, persona }) => {
  const [replyText, setReplyText] = useState("");

  if (!letter) return null;

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    sounds.playWaxSeal();
    onReply(letter.id, {
      sender: `${persona.name} (${persona.title})`,
      content: replyText
    });
    setReplyText("");
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
        className="parchment-scroll-viewer"
        initial={{ scale: 0.3, rotate: -12, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.3, rotate: 12, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn dark-btn" onClick={onClose}>✕</button>

        {/* Scroll Header with Wax Seal */}
        <div className="scroll-header">
          <div className="wax-seal-crest" style={{ backgroundColor: letter.sealColor || "#8b0000" }}>
            <span>
              {letter.sealCrest === "quill" && "✍️"}
              {letter.sealCrest === "compass" && "🧭"}
              {letter.sealCrest === "hourglass" && "⏳"}
              {letter.sealCrest === "dragon" && "🐉"}
              {letter.sealCrest === "crown" && "👑"}
              {!letter.sealCrest && "📜"}
            </span>
          </div>
          <div className="header-meta">
            <h2>{letter.title}</h2>
            <div className="meta-tags">
              <span><strong>From:</strong> {letter.sender}</span>
              <span><strong>To:</strong> {letter.recipient || "All Wanderers"}</span>
              <span><strong>Date:</strong> {letter.date}</span>
            </div>
          </div>
        </div>

        {/* Main Parchment Letter Content */}
        <div className="scroll-body">
          <p className="letter-body-text">{letter.content}</p>
        </div>

        {/* Likes & Interaction */}
        <div className="scroll-actions">
          <button
            className="like-letter-btn"
            onClick={() => {
              sounds.playCorkPop();
              if (onLike) onLike(letter.id);
            }}
          >
            ❤️ Wax Endorsement ({letter.likes || 0})
          </button>
        </div>

        {/* Ancient Chat / Correspondence Replies Section */}
        <div className="chat-thread-section">
          <h3 className="thread-title">📜 Correspondence Replies & Chat Thread</h3>
          
          <div className="replies-list">
            {(!letter.replies || letter.replies.length === 0) ? (
              <p className="no-replies">No replies attached to this scroll yet. Be the first to answer!</p>
            ) : (
              letter.replies.map((reply) => (
                <div key={reply.id} className="reply-parchment-strip">
                  <div className="reply-header">
                    <span className="reply-sender">✍️ {reply.sender}</span>
                    <span className="reply-date">{reply.date}</span>
                  </div>
                  <p className="reply-content">{reply.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Reply Form */}
          <div className="reply-input-area">
            <textarea
              placeholder="Dip your quill and append your reply to this parchment scroll..."
              value={replyText}
              onChange={(e) => {
                if (replyText.length % 12 === 0) sounds.playQuillWrite();
                setReplyText(e.target.value);
              }}
              className="reply-textarea"
            />
            <button
              className="append-reply-btn"
              disabled={!replyText.trim()}
              onClick={handleSendReply}
            >
              🔥 Seal & Append Reply
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LetterViewModal;
