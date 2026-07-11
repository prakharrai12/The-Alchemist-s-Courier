import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const ArchiveVault = ({ letters, onSelectLetter, onOpenScriptorium }) => {
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
      <section className="relative w-full flex flex-col items-center justify-center py-10 overflow-visible">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
          <div className="absolute top-10 left-10 w-32 h-40 bg-amber-950/40 shadow-xl -rotate-12 animate-pulse rounded" />
          <div className="absolute bottom-20 right-10 w-48 h-32 bg-[#2b1b14]/50 shadow-xl rotate-6 rounded" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 bg-amber-600/10 blur-3xl rounded-full" />
        </div>

        {/* The Main Stage */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          {/* Decorative Label */}
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb77b] mb-4 flex items-center gap-4">
            <span className="h-px w-12 bg-[#ffb77b]/30"></span>
            Vault No. 1894
            <span className="h-px w-12 bg-[#ffb77b]/30"></span>
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#ffdcc2] text-center mb-4 max-w-2xl font-bold tracking-wide drop-shadow-lg">
            Your Archive of Whispers
          </h1>
          <p className="font-serif text-lg text-[#cec6ad] text-center mb-12 max-w-xl italic">
            "Where every word is preserved in glass and time."
          </p>

          {/* The Jar (Main Visual with Floating Cards) */}
          <div className="relative group my-4">
            {/* Floating Dispatch Note Left */}
            <motion.div
              className="absolute -top-12 -left-24 w-52 p-4 bg-[#fcf9f8] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-amber-900/30 -rotate-6 cursor-pointer z-20 rounded"
              whileHover={{ y: -8, rotate: 0, scale: 1.05 }}
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
              <p className="font-mono text-[10px] uppercase text-[#8c4f10] font-bold mb-1">Unread: Dispatch 402</p>
              <p className="font-serif text-xs line-clamp-3 text-[#1b1c1c]">The mercury levels in the northern sector have finally stabilized and the crystal growth is proceeding...</p>
              <div className="mt-2 h-px w-full bg-[#8c4f10]/20"></div>
            </motion.div>

            {/* Floating Ledger Note Right */}
            <motion.div
              className="absolute top-1/3 -right-28 w-56 p-4 bg-[#fcf9f8] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-amber-900/30 rotate-12 cursor-pointer z-20 rounded"
              whileHover={{ y: -8, rotate: 3, scale: 1.05 }}
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter({
                  id: "ledger_note_99",
                  title: "Ledger Note: Second Distilling",
                  sender: "Senior Clerk Elias Vance",
                  recipient: "High Scriptorium",
                  date: "October 11, 1894",
                  content: "The Alchemist requests a second distilling of the recent correspondence from the western guild. Double the wax thickness on all outbound parcels.",
                  sealColor: "#610000",
                  sealCrest: "crown"
                });
              }}
            >
              <p className="font-mono text-[10px] uppercase text-[#8c4f10] font-bold mb-1">Unread: Ledger Note</p>
              <p className="font-serif text-xs line-clamp-3 text-[#1b1c1c]">The Alchemist requests a second distilling of the recent correspondence from the western guild...</p>
              <div className="mt-2 h-px w-full bg-[#8c4f10]/20"></div>
            </motion.div>

            {/* Central Archive Jar Container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border-4 border-[#ffdcc2]/30 bg-[#1f1c0b] transition-all duration-700 hover:scale-[1.02] hover:border-[#ffdcc2]/50">
              <img
                alt="The Archive Jar"
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.9]"
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none"></div>

              {/* Live Interactive Letters Floating Inside the Jar Overlay */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-12 overflow-hidden">
                {letters && letters.slice(0, 4).map((letItem, i) => (
                  <motion.div
                    key={letItem.id}
                    className="w-20 h-14 bg-[#e8d7b9] border border-[#8c4f10] rounded shadow-lg p-1.5 flex flex-col justify-between cursor-pointer"
                    animate={{
                      y: [0, -6, 0],
                      rotate: [-2 + (i * 3), 3 - (i * 2), -2 + (i * 3)]
                    }}
                    transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, zIndex: 30, boxShadow: "0 0 20px #ffdcc2" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playParchmentUnroll();
                      onSelectLetter(letItem);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center border border-black/20" style={{ backgroundColor: letItem.sealColor || "#8b0000" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                      </span>
                      <span className="text-[8px] font-mono text-[#4c4733] font-bold">#{i + 1}</span>
                    </div>
                    <span className="text-[9px] font-serif text-[#1b1c1c] font-bold truncate w-full">{letItem.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action: Wax Seal Retrieve Button (No Emojis!) */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30">
              <motion.button
                className="relative group flex flex-col items-center cursor-pointer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sounds.playCorkPop();
                  if (letters && letters.length > 0) {
                    onSelectLetter(letters[0]);
                  }
                }}
              >
                <div className="w-20 h-20 bg-[#610000] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(97,0,0,0.8)] border-2 border-[#ffdad4]/40 overflow-hidden">
                  <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_35%_35%,_transparent_0%,_#000_100%)]"></div>
                  <svg className="w-8 h-8 text-[#ffdcc2] relative z-10 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb77b] font-bold group-hover:text-[#ffdcc2] transition-colors">
                    Retrieve a Letter
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid: Alchemical Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-14 max-w-5xl mx-auto">
        {/* Stat Card 1 */}
        <div className="bg-[#1f1c0b]/90 border border-white/10 p-7 shadow-xl rounded relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#8c4f10] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-mono text-xs text-[#8c4f10] block mb-3 uppercase tracking-widest font-bold">01 / Volume</span>
          <h3 className="font-serif text-2xl text-[#ffdcc2] font-semibold mb-2">Stored Echoes</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            {letters ? letters.length + 424 : 427} letters sealed in glass, spanning three generations of the Courier Guild's history.
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#ffb77b] font-bold">{letters ? letters.length + 424 : 427}</span>
            <span className="font-mono text-xs text-[#cec6ad]/70 uppercase">Manifested</span>
          </div>
        </div>

        {/* Stat Card 2 - Main Feature */}
        <div className="bg-[#2b1b14] border-2 border-[#ffdcc2]/30 p-7 shadow-2xl rounded relative md:-mt-4 z-10">
          <div className="absolute top-4 right-4">
            <svg className="w-8 h-8 text-[#ffdcc2]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 62v16m8-8H4" />
            </svg>
          </div>
          <span className="font-mono text-xs text-[#ffb77b] block mb-3 uppercase tracking-widest font-bold">02 / Integrity</span>
          <h3 className="font-serif text-2xl text-[#ffdcc2] font-semibold mb-2">Vacuum Sealed</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            Using proprietary alchemical glass, every ink stroke is protected from the ravages of oxidation and time.
          </p>
          <button
            className="mt-6 group flex items-center gap-2 text-xs uppercase font-mono tracking-wider font-bold text-[#ffdcc2] hover:text-white transition-all"
            onClick={() => {
              sounds.playQuillWrite();
              onOpenScriptorium();
            }}
          >
            <span className="border-b border-[#ffdcc2]/40 group-hover:border-white">Write New Codice</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#1f1c0b]/90 border border-white/10 p-7 shadow-xl rounded relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-1 bg-[#8c4f10] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-mono text-xs text-[#8c4f10] block mb-3 uppercase tracking-widest font-bold">03 / Delivery</span>
          <h3 className="font-serif text-2xl text-[#ffdcc2] font-semibold mb-2">Swift Release</h3>
          <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
            The seal breaks only when the correct ledger key is applied. Instant retrieval for authorized guild members.
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#ffb77b] font-bold">0.4s</span>
            <span className="font-mono text-xs text-[#cec6ad]/70 uppercase">Decanting Rate</span>
          </div>
        </div>
      </section>

      {/* Recent Entries List (The Desktop Ledger) */}
      <section className="bg-[#1f1c0b]/95 border border-[#8c4f10]/30 p-8 md:p-10 rounded shadow-2xl max-w-5xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 border-b border-[#8c4f10]/30 pb-5 gap-4">
          <div>
            <h2 className="font-serif text-3xl text-[#ffdcc2] font-bold">Recent Decantations</h2>
            <p className="font-mono text-xs text-[#cec6ad] uppercase tracking-widest mt-1">The Latest Whispers Pulled from the Glass</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-[#ffb77b] font-bold block">CURRENT DATE</span>
            <span className="font-mono text-xs text-[#cec6ad]">Guild Relay Active</span>
          </div>
        </div>

        <div className="divide-y divide-[#8c4f10]/20">
          {letters && letters.map((l, index) => (
            <div
              key={l.id}
              className="flex items-center gap-6 group cursor-pointer py-6 hover:bg-[#2b1b14]/60 px-4 rounded transition-all"
              onClick={() => {
                sounds.playParchmentUnroll();
                onSelectLetter(l);
              }}
            >
              <div className="w-14 h-14 bg-[#fcf9f8] text-[#610000] font-serif text-xl flex items-center justify-center font-bold border-2 border-[#8c4f10]/40 rounded shadow-sm group-hover:border-[#610000]">
                {index + 1}
              </div>
              <div className="flex-grow">
                <h4 className="font-serif text-xl text-[#ffdcc2] font-semibold group-hover:text-white transition-colors">{l.title}</h4>
                <p className="font-serif text-sm text-[#cec6ad] italic mt-1">{l.sender} → {l.recipient || "All Wayfarers"} • {l.date}</p>
              </div>
              <div className="hidden sm:block">
                <span className="font-mono text-[10px] px-3 py-1 bg-[#8c4f10]/20 text-[#ffb77b] border border-[#8c4f10]/40 rounded-full font-bold tracking-wider">
                  SEAL: {l.sealColor ? "CUSTOM WAX" : "IMPERIAL"}
                </span>
              </div>
              <svg className="w-5 h-5 text-[#ffb77b] group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}

          {recentDecantations.map((dec) => (
            <div
              key={dec.id}
              className="flex items-center gap-6 group cursor-pointer py-6 hover:bg-[#2b1b14]/60 px-4 rounded transition-all"
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
              <div className="w-14 h-14 bg-[#fcf9f8] text-[#8c4f10] font-serif text-2xl flex items-center justify-center font-bold border-2 border-[#8c4f10]/30 rounded shadow-sm group-hover:border-[#8c4f10]">
                {dec.roman}
              </div>
              <div className="flex-grow">
                <h4 className="font-serif text-xl text-[#ffdcc2] font-semibold group-hover:text-white transition-colors">{dec.title}</h4>
                <p className="font-serif text-sm text-[#cec6ad] italic mt-1">{dec.sender}</p>
              </div>
              <div className="hidden sm:block">
                <span className={`font-mono text-[10px] px-3 py-1 border rounded-full font-bold tracking-wider ${dec.badgeColor}`}>
                  {dec.badge}
                </span>
              </div>
              <svg className="w-5 h-5 text-[#ffb77b] group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
