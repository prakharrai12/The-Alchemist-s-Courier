import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const ArchiveVault = ({ letters, onSelectLetter, onOpenScriptorium }) => {
  const [filterSeal, setFilterSeal] = useState("all");
  const recentDecantations = [
    {
      id: "dec1",
      roman: "I",
      title: "The Transmutation Protocol",
      sender: "Sent from the High Scriptorium • 4h ago",
      badge: "SEALED IN COPPER",
      badgeColor: "bg-amber-900/40 text-amber-300 border-amber-500/30",
      content: "The mercury levels in the northern sector have finally stabilized and the crystal growth is proceeding precisely as prophesied in the ancient codices."
    },
    {
      id: "dec2",
      roman: "II",
      title: "Observations on Lunar Tides",
      sender: "Anonymous Contributor • 1d ago",
      badge: "SEALED IN SILVER",
      badgeColor: "bg-slate-700/40 text-slate-300 border-slate-400/30",
      content: "When the full moon aligns with the constellation of the Dragon, the coastal waves carry glass bottles three leagues farther inland than usual."
    },
    {
      id: "dec3",
      roman: "III",
      title: "Urgent Dispatch: The Fleet is Ready",
      sender: "Master of Ships • 2d ago",
      badge: "PRIORITY RED SEAL",
      badgeColor: "bg-red-950/60 text-red-300 border-red-500/40",
      content: "All three clipper ships and twelve homing pigeons have been provisioned with alchemical rations. We await only the Grand Courier's signet stamp."
    }
  ];

  return (
    <div className="archive-vault-container">
      {/* Hero Section with Central Jar */}
      <section className="relative w-full flex flex-col items-center justify-center py-6 sm:py-8 overflow-visible">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
          <div className="absolute top-10 left-10 w-32 h-40 bg-amber-950/40 shadow-xl -rotate-12 animate-pulse rounded" />
          <div className="absolute bottom-20 right-10 w-48 h-32 bg-[#2b1b14]/50 shadow-xl rotate-6 rounded" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 bg-amber-600/10 blur-3xl rounded-full" />
        </div>

        {/* The Main Stage */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center px-4 sm:px-6">
          {/* Decorative Label */}
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#ffb77b] mb-3 flex items-center gap-3 font-semibold">
            <span className="h-px w-10 sm:w-14 bg-[#ffb77b]/40"></span>
            Vault No. 1894
            <span className="h-px w-10 sm:w-14 bg-[#ffb77b]/40"></span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-[#ffdcc2] text-center mb-2.5 max-w-3xl font-extrabold tracking-tight leading-[1.15] drop-shadow-md">
            Your Archive of Whispers
          </h1>
          <p className="font-serif text-base sm:text-lg text-[#cec6ad] text-center mb-8 max-w-2xl leading-relaxed italic opacity-90">
            "Where every word is preserved in glass and time."
          </p>

          {/* The Jar (Main Visual with Floating Cards) */}
          <div className="relative group my-4 flex flex-col items-center justify-center">
            {/* Floating Dispatch Note Left */}
            <motion.div
              className="hidden lg:block absolute top-2 -left-60 w-52 p-3.5 bg-[#fcf9f8] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#8c4f10]/40 -rotate-3 cursor-pointer z-20 rounded-lg"
              whileHover={{ y: -4, rotate: 0, scale: 1.03 }}
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter({
                  id: "dispatch_402",
                  title: "Dispatch 402: Northern Mercury Sector",
                  sender: "Arch-Alchemist V.",
                  recipient: "Guild Archive",
                  date: "October 12, 1894",
                  content: "The mercury levels in the northern sector have finally stabilized and the crystal growth is proceeding smoothly. Keep the brass seals airtight.",
                  sealColor: "#8c4f10",
                  sealCrest: "quill"
                });
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] uppercase text-[#8c4f10] font-bold">Unread: Dispatch 402</span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              </div>
              <p className="font-serif text-xs line-clamp-2 text-[#1b1c1c]">The mercury levels in the northern sector have finally stabilized...</p>
              <div className="mt-2 pt-1.5 border-t border-[#8c4f10]/20 flex justify-between font-mono text-[9px] text-[#5a403c]">
                <span>DEV: PRAKHAR RAI</span>
                <span className="underline">OPEN LETTER →</span>
              </div>
            </motion.div>

            {/* Floating Ledger Note Right */}
            <motion.div
              className="hidden lg:block absolute top-1/4 -right-60 w-52 p-3.5 bg-[#fcf9f8] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#8c4f10]/40 rotate-6 cursor-pointer z-20 rounded-lg"
              whileHover={{ y: -4, rotate: 2, scale: 1.03 }}
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter({
                  id: "ledger_note_99",
                  title: "Ledger Note: Second Distilling",
                  sender: "Lead Dev Prakhar Rai",
                  recipient: "High Scriptorium",
                  date: "October 11, 1894",
                  content: "The Alchemist requests a second distilling of the recent correspondence from the western guild. Double the wax thickness on all outbound parcels.",
                  sealColor: "#610000",
                  sealCrest: "crown"
                });
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] uppercase text-[#610000] font-bold">Priority Ledger Note</span>
                <span className="text-[10px]">🏛️</span>
              </div>
              <p className="font-serif text-xs line-clamp-2 text-[#1b1c1c]">The Alchemist requests a second distilling of the recent correspondence...</p>
              <div className="mt-2 pt-1.5 border-t border-[#8c4f10]/20 flex justify-between font-mono text-[9px] text-[#5a403c]">
                <span>PRODUCER: P. RAI</span>
                <span className="underline">READ MORE →</span>
              </div>
            </motion.div>

            {/* Central Archive Jar Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] border border-[#ffdcc2]/40 bg-[#1f1c0b] transition-all duration-700 hover:scale-[1.01] hover:border-[#ffdcc2]/70">
              <img
                alt="The Archive Jar"
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.9]"
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none"></div>

              {/* Live Interactive Letters Floating Inside the Jar Overlay */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2.5 p-8 sm:p-10 overflow-hidden">
                {letters && letters.slice(0, 4).map((letItem, i) => (
                  <motion.div
                    key={letItem.id}
                    className="w-18 h-12 sm:w-20 sm:h-13 bg-[#e8d7b9] border border-[#8c4f10] rounded shadow-md p-1.5 flex flex-col justify-between cursor-pointer"
                    animate={{
                      y: [0, -4, 0],
                      rotate: [-2 + (i * 3), 3 - (i * 2), -2 + (i * 3)]
                    }}
                    transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.15, zIndex: 30, boxShadow: "0 0 20px #ffdcc2" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playParchmentUnroll();
                      onSelectLetter(letItem);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="w-3 h-3 rounded-full flex items-center justify-center border border-black/20" style={{ backgroundColor: letItem.sealColor || "#8b0000" }}>
                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                      </span>
                      <span className="text-[8px] font-mono text-[#4c4733] font-bold">#{i + 1}</span>
                    </div>
                    <span className="text-[9px] font-serif text-[#1b1c1c] font-bold truncate w-full">{letItem.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action: Wax Seal Retrieve Button */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
              <motion.button
                className="relative group flex flex-col items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sounds.playCorkPop();
                  if (letters && letters.length > 0) {
                    onSelectLetter(letters[0]);
                  }
                }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#610000] rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(97,0,0,0.8)] border-2 border-[#ffdad4]/40 overflow-hidden">
                  <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_35%_35%,_transparent_0%,_#000_100%)]"></div>
                  <svg className="w-6 h-6 text-[#ffdcc2] relative z-10 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div className="mt-1 flex flex-col items-center">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#ffb77b] font-bold group-hover:text-[#ffdcc2] transition-colors">
                    Retrieve Letter
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid: Alchemical Stats (8-Point Spacing System & 20-24px Card Padding) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-12 mb-8 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Stat Card 1 */}
        <div className="bg-[#1f1c0b]/90 border border-white/10 p-5 sm:p-6 shadow-md rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#8c4f10] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-mono text-[11px] text-[#8c4f10] block mb-2 uppercase tracking-widest font-bold">01 / Volume</span>
          <h3 className="font-serif text-lg sm:text-xl text-[#ffdcc2] font-semibold mb-1.5">Stored Echoes</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            {letters ? letters.length + 424 : 427} letters sealed in glass, spanning three generations of the Courier Guild's history.
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl text-[#ffb77b] font-bold">{letters ? letters.length + 424 : 427}</span>
            <span className="font-mono text-[11px] text-[#cec6ad]/70 uppercase">Manifested</span>
          </div>
        </div>

        {/* Stat Card 2 - Main Feature */}
        <div className="bg-[#2b1b14] border border-[#ffdcc2]/30 p-5 sm:p-6 shadow-lg rounded-lg relative md:-mt-2 z-10">
          <div className="absolute top-4 right-4">
            <svg className="w-6 h-6 text-[#ffdcc2]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 62v16m8-8H4" />
            </svg>
          </div>
          <span className="font-mono text-[11px] text-[#ffb77b] block mb-2 uppercase tracking-widest font-bold">02 / Integrity</span>
          <h3 className="font-serif text-lg sm:text-xl text-[#ffdcc2] font-semibold mb-1.5">Vacuum Sealed</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            Using proprietary alchemical glass, every ink stroke is protected from the ravages of oxidation and time.
          </p>
          <button
            className="mt-4 group flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider font-bold text-[#ffdcc2] hover:text-white transition-all"
            onClick={() => {
              sounds.playQuillWrite();
              onOpenScriptorium();
            }}
          >
            <span className="border-b border-[#ffdcc2]/40 group-hover:border-white">Write New Codice</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#1f1c0b]/90 border border-white/10 p-5 sm:p-6 shadow-md rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-1 bg-[#8c4f10] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-mono text-[11px] text-[#8c4f10] block mb-2 uppercase tracking-widest font-bold">03 / Delivery</span>
          <h3 className="font-serif text-lg sm:text-xl text-[#ffdcc2] font-semibold mb-1.5">Swift Release</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            The seal breaks only when the correct ledger key is applied. Instant retrieval for authorized guild members.
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl text-[#ffb77b] font-bold">0.4s</span>
            <span className="font-mono text-[11px] text-[#cec6ad]/70 uppercase">Decanting Rate</span>
          </div>
        </div>
      </section>

      {/* Recent Entries List (High-Density Linear/Notion Style Table Rows) */}
      <section className="bg-[#1f1c0b]/95 border border-[#8c4f10]/30 p-5 sm:p-6 md:p-8 rounded-lg shadow-xl max-w-5xl mx-auto mb-10 mx-4 sm:mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 border-b border-[#8c4f10]/30 pb-3 gap-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#ffdcc2] font-bold">Recent Decantations</h2>
            <p className="font-mono text-[11px] text-[#cec6ad] uppercase tracking-wider mt-0.5">The Latest Whispers Pulled from the Glass</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Seals", color: "#8c4f10" },
              { id: "#610000", label: "Crimson", color: "#610000" },
              { id: "#8c4f10", label: "Amber", color: "#8c4f10" },
              { id: "#004d25", label: "Emerald", color: "#004d25" },
              { id: "#002855", label: "Sapphire", color: "#002855" }
            ].map((seal) => (
              <button
                key={seal.id}
                onClick={() => {
                  sounds.playWaxSeal();
                  setFilterSeal(seal.id);
                }}
                className={`px-2.5 py-1 font-mono text-[11px] rounded-md border transition-all flex items-center gap-1.5 ${
                  filterSeal === seal.id
                    ? "bg-[#ffdcc2] text-[#1f1c0b] font-bold border-[#ffdcc2] shadow-sm scale-102"
                    : "bg-black/30 text-[#cec6ad] border-[#8c4f10]/40 hover:border-[#ffdcc2]/60"
                }`}
              >
                <span className="w-2 h-2 rounded-full inline-block border border-white/20" style={{ backgroundColor: seal.color }}></span>
                {seal.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#8c4f10]/20">
          {letters && letters
            .filter((l) => filterSeal === "all" || l.sealColor === filterSeal)
            .map((l, index) => (
            <div
              key={l.id}
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer py-3 sm:py-3.5 hover:bg-[#2b1b14]/60 px-3 sm:px-4 rounded transition-all"
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter(l);
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#fcf9f8] text-[#610000] font-serif text-base sm:text-lg flex items-center justify-center font-bold border border-[#8c4f10]/40 rounded shadow-sm group-hover:border-[#610000] flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-serif text-base sm:text-lg text-[#ffdcc2] font-semibold group-hover:text-white transition-colors truncate">{l.title}</h4>
                <p className="font-serif text-xs sm:text-[13px] text-[#cec6ad] italic mt-0.5 truncate">{l.sender} → {l.recipient || "All Wayfarers"} • {l.date}</p>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <span className="font-mono text-[10px] px-2.5 py-0.5 bg-[#8c4f10]/20 text-[#ffb77b] border border-[#8c4f10]/40 rounded font-bold tracking-wider">
                  SEAL: {l.sealColor ? "CUSTOM WAX" : "IMPERIAL"}
                </span>
              </div>
              <svg className="w-4 h-4 text-[#ffb77b] group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}

          {recentDecantations.map((dec) => (
            <div
              key={dec.id}
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer py-3 sm:py-3.5 hover:bg-[#2b1b14]/60 px-3 sm:px-4 rounded transition-all"
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter({
                  id: dec.id,
                  title: dec.title,
                  sender: dec.sender,
                  recipient: "Archive Vault",
                  date: "October 1894",
                  content: dec.content,
                  sealColor: "#8b0000",
                  sealCrest: "quill"
                });
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#fcf9f8] text-[#8c4f10] font-serif text-base sm:text-lg flex items-center justify-center font-bold border border-[#8c4f10]/30 rounded shadow-sm group-hover:border-[#8c4f10] flex-shrink-0">
                {dec.roman}
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-serif text-base sm:text-lg text-[#ffdcc2] font-semibold group-hover:text-white transition-colors truncate">{dec.title}</h4>
                <p className="font-serif text-xs sm:text-[13px] text-[#cec6ad] italic mt-0.5 truncate">{dec.sender}</p>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <span className={`font-mono text-[10px] px-2.5 py-0.5 border rounded font-bold tracking-wider ${dec.badgeColor}`}>
                  {dec.badge}
                </span>
              </div>
              <svg className="w-4 h-4 text-[#ffb77b] group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArchiveVault;
