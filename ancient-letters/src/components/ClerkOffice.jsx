import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { sounds } from "../audio/soundEngine";

const ClerkOffice = ({ persona, onStampBlessing }) => {
  const [activeLore, setActiveLore] = useState("wisdom");
  const [clerkQuote, setClerkQuote] = useState(
    "Welcome to the inner sanctum of the Postal Library. Every letter sealed with wax carries the heartbeat of its sender across time and tide."
  );

  const quotes = [
    "A letter unread is like a candle unlit—full of potential, yet waiting for the spark of human connection.",
    "Mind the quill, good traveler! Too much pressure splits the nib, just as too much haste spoils a heartfelt letter.",
    "Do you know why we seal correspondence in crimson wax? It preserves not only the privacy of ink, but the warmth of the hand that pressed it.",
    "The ocean is a postman who takes his own sweet time, yet he never fails to deliver a bottle to the shore where it is needed most.",
    "In 1891, Captain Thorne sent a bottle from the Cape Lighthouse during a howling gale. Three years later, it comforted a lonely astronomer in Iceland."
  ];

  const handleNewQuote = () => {
    sounds.playQuillWrite();
    const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setClerkQuote(nextQuote);
  };

  const handleBlessing = () => {
    sounds.playWaxSeal();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#8b0000", "#d4af37", "#e8d7b9"]
    });
    if (onStampBlessing) onStampBlessing();
  };

  return (
    <div className="clerk-office-container">
      <div className="clerk-main-row">
        {/* Left Column: Portrait of Arthur Pendelton */}
        <motion.div
          className="clerk-portrait-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="portrait-frame">
            <img
              src="/victorian_postal_clerk.png"
              alt="Arthur Pendelton - Victorian Postal Clerk"
              className="portrait-image"
            />
            <div className="portrait-glow" />
          </div>
          <div className="clerk-name-badge">
            <h3>Arthur Pendelton</h3>
            <span>Chief Postal Clerk & Keeper of the Jar (Est. 1889)</span>
          </div>
        </motion.div>

        {/* Right Column: Dialogue Box & Lore Tabs */}
        <div className="clerk-dialogue-section">
          <motion.div
            className="parchment-dialogue-box"
            key={clerkQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="dialogue-header">
              <span className="quill-icon">✍️</span>
              <h4>Arthur Speaks:</h4>
            </div>
            <p className="clerk-quote-text">"{clerkQuote}"</p>
            <div className="dialogue-actions">
              <button className="wisdom-btn" onClick={handleNewQuote}>
                📜 Request Another Piece of Wisdom
              </button>
              <button className="blessing-btn" onClick={handleBlessing}>
                🔥 Receive Official Clerk Stamp & Blessing
              </button>
            </div>
          </motion.div>

          {/* Lore Selection Navigation */}
          <div className="lore-tabs">
            <button
              className={`lore-tab-btn ${activeLore === "wisdom" ? "active" : ""}`}
              onClick={() => { sounds.playParchmentUnroll(); setActiveLore("wisdom"); }}
            >
              🏛️ The Postal Registry
            </button>
            <button
              className={`lore-tab-btn ${activeLore === "wax" ? "active" : ""}`}
              onClick={() => { sounds.playParchmentUnroll(); setActiveLore("wax"); }}
            >
              🔥 Wax Seal Registry
            </button>
            <button
              className={`lore-tab-btn ${activeLore === "bottle" ? "active" : ""}`}
              onClick={() => { sounds.playParchmentUnroll(); setActiveLore("bottle"); }}
            >
              🍾 Sea Bottle History
            </button>
          </div>

          {/* Lore Display Panel */}
          <AnimatePresence mode="wait">
            {activeLore === "wisdom" && (
              <motion.div
                key="wisdom"
                className="lore-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4>The Sanctum of Ancient Correspondence</h4>
                <p>
                  Before modern signals crossed the skies, human souls entrusted their deepest desires, confessions, and discoveries to parchment and glass. Arthur Pendelton has guarded this grand mahogany desk for over half a century, sorting the incoming letters of travelers from every corner of the earth.
                </p>
              </motion.div>
            )}

            {activeLore === "wax" && (
              <motion.div
                key="wax"
                className="lore-panel wax-lore-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="lore-image-side">
                  <img src="/wax_seal_crest.png" alt="Antique Crimson Wax Seal" className="lore-thumbnail" />
                </div>
                <div className="lore-text-side">
                  <h4>The Language of Wax & Crests</h4>
                  <ul>
                    <li><strong style={{ color: "#8b0000" }}>Crimson Red:</strong> Urgent missives, heartfelt devotion, and binding oaths.</li>
                    <li><strong style={{ color: "#b8860b" }}>Imperial Gold:</strong> Royal decrees, philosophical treatises, and grand dreams.</li>
                    <li><strong style={{ color: "#10403b" }}>Forest Emerald:</strong> Hope, renewal, secret meetings, and garden poetry.</li>
                    <li><strong style={{ color: "#1e3a8a" }}>Royal Navy:</strong> Messages cast into the deep sea, navigational logs, and wanderlust.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeLore === "bottle" && (
              <motion.div
                key="bottle"
                className="lore-panel bottle-lore-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="lore-image-side">
                  <img src="/vintage_glass_bottle.png" alt="Antique Glass Sea Bottle" className="lore-thumbnail" />
                </div>
                <div className="lore-text-side">
                  <h4>The Ocean Courier Service</h4>
                  <p>
                    When a letter cannot be delivered by hand, it is sealed in thick blown glass, corked with Portuguese oak, and entrusted to the ocean tides. Some bottles drift across entire oceans before washing ashore on the starlit dock where kindred wanderers await.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ClerkOffice;
