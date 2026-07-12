import React from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const MyLedger = ({ persona, onOpenCustomizer }) => {
  const currentPersona = persona || {
    name: "Elias Vance",
    title: "Senior Dispatcher",
    rank: "First-Class Courier",
    prestige: 840,
    goldEarned: 420,
    lettersSent: 1428,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    memberSince: "1889"
  };

  const achievements = [
    {
      id: "storm_rider",
      title: "Storm Rider",
      desc: "Dispatched a clipper ship during an equinox gale.",
      imgUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=200&auto=format&fit=crop",
      unlocked: true,
      date: "Oct 1891"
    },
    {
      id: "world_traveler",
      title: "Arch-Continental Relay",
      desc: "Letters delivered across four distant sovereign continents.",
      imgUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=200&auto=format&fit=crop",
      unlocked: true,
      date: "Jan 1893"
    },
    {
      id: "loyal_courier",
      title: "Loyal Signet Holder",
      desc: "Over 1,000 wax-sealed letters logged in Vault No. 1894.",
      imgUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop",
      unlocked: true,
      date: "Aug 1894"
    },
    {
      id: "alchemist_ally",
      title: "Alchemist's Ally",
      desc: "Decrypted three high-security occult ciphers without error.",
      imgUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200&auto=format&fit=crop",
      unlocked: false,
      date: "Locked"
    },
    {
      id: "night_owl",
      title: "Midnight Saddle",
      desc: "Dispatched 50 night riders between midnight and dawn.",
      imgUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=200&auto=format&fit=crop",
      unlocked: false,
      date: "Locked"
    },
    {
      id: "ghost_rider",
      title: "Ghost of Spitalfields",
      desc: "Sent an anonymous letter with black wax that received 100 replies.",
      imgUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=200&auto=format&fit=crop",
      unlocked: false,
      date: "Locked"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 text-[#1b1c1c]">
      {/* HERO / PROFILE BANNER */}
      <div className="bg-[#fcf9f8] rounded-xl border-2 border-[#8c4f10] p-6 sm:p-8 md:p-10 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            {/* Antique Portrait Frame */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-[#8c4f10] shadow-xl overflow-hidden bg-[#1f1c0b] flex-shrink-0 p-1">
              <img
                alt="Profile Portrait"
                src={currentPersona.avatarUrl}
                className="w-full h-full rounded-full object-cover filter contrast-110"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold">
                  GUILD REGISTERED MEMBER • SINCE {currentPersona.memberSince}
                </span>
                <span className="px-2 py-0.5 bg-[#610000] text-white text-[10px] font-mono font-bold rounded uppercase shadow-sm">
                  VERIFIED SIGNET
                </span>
              </div>
              <h1 className="font-serif text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold text-[#1b1c1c] leading-tight">
                {currentPersona.name}
              </h1>
              <p className="font-serif text-base sm:text-lg text-[#610000] italic mt-0.5 font-semibold">
                {currentPersona.title} — {currentPersona.rank}
              </p>

              {/* Signature Stamp */}
              <div className="mt-2.5 font-serif text-xl sm:text-2xl font-bold text-[#8c4f10] -rotate-1 italic">
                {currentPersona.name.split(" ")[0]}. {currentPersona.name.split(" ").slice(-1)[0]}, S.D.
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenCustomizer) onOpenCustomizer();
              }}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-sm font-bold uppercase tracking-widest rounded-lg shadow-lg transition-all flex items-center justify-center"
            >
              Customize Profile & Portrait
            </button>

            {/* Prestige Level Bar */}
            <div className="w-full sm:w-64 bg-[#ebe2c8] p-3 rounded-lg border border-[#8c4f10]/40 shadow-inner">
              <div className="flex justify-between text-[11px] font-mono font-bold text-[#5a403c] mb-1">
                <span>PRESTIGE RATING</span>
                <span>{currentPersona.prestige} / 1000</span>
              </div>
              <div className="w-full bg-[#d5c7a5] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8c4f10] to-[#610000] h-full"
                  style={{ width: `${Math.min(100, (currentPersona.prestige / 1000) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-[#fcf9f8] p-5 sm:p-6 rounded-xl border border-[#e3beb8] shadow-sm text-center flex flex-col justify-center min-h-[88px]">
          <span className="font-mono text-[11px] uppercase text-[#8c4f10] font-bold">LETTERS LOGGED</span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#610000] mt-1">{currentPersona.lettersSent || 1428}</span>
          <span className="font-mono text-[10px] text-[#5a403c] mt-0.5">Sealed in Glass Jar</span>
        </div>
        <div className="bg-[#fcf9f8] p-5 sm:p-6 rounded-xl border border-[#e3beb8] shadow-sm text-center flex flex-col justify-center min-h-[88px]">
          <span className="font-mono text-[11px] uppercase text-[#8c4f10] font-bold">GOLD SOVEREIGNS</span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8c4f10] mt-1">£ {currentPersona.goldEarned || 420}</span>
          <span className="font-mono text-[10px] text-[#5a403c] mt-0.5">Total Bullion Dispatched</span>
        </div>
        <div className="bg-[#fcf9f8] p-5 sm:p-6 rounded-xl border border-[#e3beb8] shadow-sm text-center flex flex-col justify-center min-h-[88px]">
          <span className="font-mono text-[11px] uppercase text-[#8c4f10] font-bold">CIPHERS BROKEN</span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] mt-1">3 / 4</span>
          <span className="font-mono text-[10px] text-[#5a403c] mt-0.5">Occult Library Access</span>
        </div>
        <div className="bg-[#fcf9f8] p-5 sm:p-6 rounded-xl border border-[#e3beb8] shadow-sm text-center flex flex-col justify-center min-h-[88px]">
          <span className="font-mono text-[11px] uppercase text-[#8c4f10] font-bold">SADDLE HOURS</span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-green-800 mt-1">214 Hrs</span>
          <span className="font-mono text-[10px] text-[#5a403c] mt-0.5">Active Relay Service</span>
        </div>
      </div>

      {/* MEDALLIONS & ACHIEVEMENTS GRID (Authentic Antique Artwork, No Emojis!) */}
      <div className="bg-[#fcf9f8] rounded-xl border-2 border-[#8c4f10] p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="border-b border-[#8c4f10]/30 pb-4 mb-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c4f10] font-bold block mb-0.5">
            ROYAL COMMENDATIONS & BADGES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c]">Guild Medallions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 sm:p-5 min-h-[76px] rounded-xl border transition-all flex items-center gap-4 ${
                ach.unlocked
                  ? "bg-white border-[#8c4f10] shadow hover:shadow-md"
                  : "bg-[#ebe2c8]/40 border-[#e3beb8] opacity-65"
              }`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border shadow ${ach.unlocked ? "border-[#610000]" : "border-stone-400 grayscale"}`}>
                <img alt={ach.title} src={ach.imgUrl} className="w-full h-full object-cover" />
              </div>

              <div className="min-w-0 flex-grow">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1b1c1c] truncate">{ach.title}</h4>
                  <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase ${ach.unlocked ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"}`}>
                    {ach.unlocked ? ach.date : "LOCKED"}
                  </span>
                </div>
                <p className="font-serif text-xs text-[#5a403c] mt-1 leading-relaxed line-clamp-2">
                  {ach.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLedger;
