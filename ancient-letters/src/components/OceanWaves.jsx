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
    <div className="ocean-shore-container relative w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
      {/* Starry Sky & Moon (No Emojis - Using CSS & High-Res Glow) */}
      <div className="ocean-sky">
        <div className="absolute top-6 right-8 sm:right-16 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fcf9f8] shadow-[0_0_80px_#ffdcc2] opacity-90 border border-white/40" />
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
      <div className="shore-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-6 bg-[#1f1c0b]/90 border-2 border-[#8c4f10] rounded-xl shadow-xl z-10 relative mb-6">
        <div className="shore-info">
          <h2 className="font-serif text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] font-bold text-white tracking-tight leading-tight">
            Starlit Ocean Dock & Tide
          </h2>
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#ffb77b] mt-1">
            {driftingBottles.length} bottles drifting at sea • {ashoreBottles.length} washed ashore
          </p>
        </div>
        <motion.button
          className="toss-bottle-btn min-h-[48px] w-full sm:w-auto flex items-center justify-center gap-3 bg-[#610000] hover:bg-[#8b0000] text-white px-6 py-3 rounded-xl font-serif text-sm font-bold uppercase tracking-widest shadow-xl border border-[#ffdcc2]/40 transition-all"
          onClick={() => {
            sounds.playCorkPop();
            onOpenBottleToss();
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 215, 0, 0.6)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Write & Toss Bottle to Sea</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-base">+</div>
        </motion.button>
      </div>

      {/* Floating Ocean Waves & Drifting Bottles */}
      <div className="water-expanse min-h-[360px] sm:min-h-[440px] relative rounded-xl border-2 border-[#8c4f10]/40 overflow-hidden mb-8 shadow-2xl">
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />

        <div className="drifting-area absolute inset-0">
          {driftingBottles.map((bottle, idx) => {
            const leftPos = 12 + (idx * 28) % 75;
            const topPos = 20 + ((idx * 37) % 55);
            return (
              <motion.div
                key={bottle.id}
                className={`sea-bottle drifting ${getBottleTintClass(bottle.bottleColor)} cursor-pointer min-w-[56px] min-h-[80px] p-2 flex flex-col items-center justify-center`}
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
                <span className="bottle-label font-serif text-xs font-bold text-white tracking-wider px-1.5 py-0.5 bg-black/60 rounded border border-white/20 truncate max-w-[110px] mt-1">{bottle.title}</span>
                <span className="bottle-coords font-mono text-[9px] text-[#ffb77b] bg-black/80 px-1 rounded mt-0.5">COORDS: {bottle.coordinates}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Wooden Dock / Washed Ashore Section */}
      <div className="wooden-dock bg-[#2d1f14] border-4 border-[#8c4f10] rounded-xl p-6 sm:p-8 shadow-2xl">
        <h3 className="dock-title font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#ffdcc2] uppercase tracking-wider mb-6 border-b border-[#8c4f10]/40 pb-3">
          Washed Ashore on the Wooden Pier (Click to Pop Cork & Reply)
        </h3>
        <div className="ashore-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {ashoreBottles.length === 0 ? (
            <p className="empty-ashore sm:col-span-2 md:col-span-3 lg:col-span-4 font-serif text-sm sm:text-base italic text-[#cec6ad] text-center py-8">
              No bottles washed ashore yet. Toss one or check drifting bottles!
            </p>
          ) : (
            ashoreBottles.map((bottle) => (
              <motion.div
                key={bottle.id}
                className={`sea-bottle ashore ${getBottleTintClass(bottle.bottleColor)} min-h-[140px] p-4 rounded-xl border border-[#8c4f10]/60 bg-[#1f1c0b]/80 shadow-lg cursor-pointer flex flex-col justify-between`}
                onClick={() => {
                  sounds.playCorkPop();
                  onSelectBottle(bottle);
                }}
                whileHover={{ scale: 1.04, y: -4 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bottle-glow" />
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-16 flex-shrink-0 flex flex-col items-center">
                    <div className="bottle-cork" />
                    <div className="bottle-body w-full h-full flex items-center justify-center">
                      <div className="bottle-parchment-scroll" />
                      <div
                        className="bottle-wax-dot"
                        style={{ backgroundColor: bottle.sealColor || "#8b0000" }}
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-grow">
                    <h4 className="font-serif text-base font-bold text-white truncate">{bottle.title}</h4>
                    <span className="sender-tag font-mono text-[10px] text-[#ffb77b] block truncate mt-0.5">From: {bottle.sender}</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#8c4f10]/30 flex justify-between items-center font-mono text-[10px] text-[#cec6ad]">
                  <span>Replies: {bottle.replies?.length || 0}</span>
                  <span className="text-[#ffb77b] font-bold uppercase">READ SCROLL →</span>
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
