import React from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const OceanWaves = ({ bottles, onSelectBottle, onOpenBottleToss }) => {
  const driftingBottles = bottles.filter((b) => b.status === "drifting");
  const ashoreBottles = bottles.filter((b) => b.status === "washed_ashore");

  const getBottleTintClass = (color) => {
    switch (color) {
      case "sapphire": return "tint-sapphire";
      case "amber": return "tint-amber";
      case "amethyst": return "tint-amethyst";
      case "emerald":
      default: return "tint-emerald";
    }
  };

  return (
    <div className="ocean-shore-container relative">
      {/* Starry Sky & Moon (No Emojis - Using CSS & High-Res Glow) */}
      <div className="ocean-sky">
        <div className="absolute top-8 right-16 w-20 h-20 rounded-full bg-[#fcf9f8] shadow-[0_0_80px_#ffdcc2] opacity-90 border border-white/40" />
        <div className="moon-reflection" />
        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 45}%`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `scale(${0.5 + Math.random() * 0.8})`
            }}
          />
        ))}
      </div>

      {/* Action Header on Dock */}
      <div className="shore-header">
        <div className="shore-info">
          <h2 className="flex items-center gap-3">
            <span>Starlit Ocean Dock & Tide</span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#ffb77b]">
            {driftingBottles.length} bottles drifting at sea • {ashoreBottles.length} washed ashore
          </p>
        </div>
        <motion.button
          className="toss-bottle-btn flex items-center gap-3 bg-[#610000] hover:bg-[#8b0000] text-white px-6 py-3 rounded-xl font-serif text-sm font-bold uppercase tracking-widest shadow-xl border border-[#ffdcc2]/40"
          onClick={() => {
            sounds.playCorkPop();
            onOpenBottleToss();
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 215, 0, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Write & Toss Bottle to Sea</span>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">+</div>
        </motion.button>
      </div>

      {/* Floating Ocean Waves & Drifting Bottles */}
      <div className="water-expanse">
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />

        <div className="drifting-area">
          {driftingBottles.map((bottle, idx) => {
            const leftPos = 12 + (idx * 28) % 75;
            const topPos = 20 + ((idx * 37) % 55);
            return (
              <motion.div
                key={bottle.id}
                className={`sea-bottle drifting ${getBottleTintClass(bottle.bottleColor)}`}
                style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                animate={{
                  y: [0, -14, 0],
                  rotate: [-6, 6, -6]
                }}
                transition={{
                  duration: 3.5 + (idx % 3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  sounds.playCorkPop();
                  onSelectBottle(bottle);
                }}
                whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))" }}
              >
                <div className="bottle-cork" />
                <div className="bottle-body">
                  <div className="bottle-parchment-scroll" />
                  <div
                    className="bottle-wax-dot"
                    style={{ backgroundColor: bottle.sealColor || "#8b0000" }}
                  />
                </div>
                <span className="bottle-label">{bottle.title}</span>
                <span className="bottle-coords font-mono text-[9px]">COORDS: {bottle.coordinates}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Wooden Dock / Washed Ashore Section */}
      <div className="wooden-dock">
        <h3 className="dock-title font-serif text-xl font-bold text-[#ffdcc2] uppercase tracking-wider mb-6">
          Washed Ashore on the Wooden Pier (Click to Pop Cork & Reply)
        </h3>
        <div className="ashore-grid">
          {ashoreBottles.length === 0 ? (
            <p className="empty-ashore font-serif text-sm italic text-[#cec6ad]">
              No bottles washed ashore yet. Toss one or check drifting bottles!
            </p>
          ) : (
            ashoreBottles.map((bottle) => (
              <motion.div
                key={bottle.id}
                className={`sea-bottle ashore ${getBottleTintClass(bottle.bottleColor)}`}
                onClick={() => {
                  sounds.playCorkPop();
                  onSelectBottle(bottle);
                }}
                whileHover={{ scale: 1.08, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bottle-glow" />
                <div className="bottle-cork" />
                <div className="bottle-body">
                  <div className="bottle-parchment-scroll" />
                  <div
                    className="bottle-wax-dot"
                    style={{ backgroundColor: bottle.sealColor || "#8b0000" }}
                  />
                </div>
                <div className="ashore-details">
                  <h4 className="font-serif text-base font-bold text-white">{bottle.title}</h4>
                  <span className="sender-tag font-mono text-[10px] text-[#ffb77b]">From: {bottle.sender}</span>
                  <span className="reply-count font-mono text-[10px] text-[#cec6ad]">
                    Replies: {bottle.replies?.length || 0}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OceanWaves;
