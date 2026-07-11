import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const GuildManualModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "📜 Overview & Mission", title: "The Alchemist's Courier Guild" },
    { id: "archive", label: "🏺 The Archive", title: "Vault No. 1894 & Glass Decantation" },
    { id: "scriptorium", label: "✍️ The Scriptorium", title: "Calligraphy, Pigments & Ciphers" },
    { id: "fleet", label: "🕊️ The Fleet", title: "Pigeons, Clippers & Midnight Riders" },
    { id: "secret", label: "🔐 Secret Library", title: "Occult Caesar Decryption Wheels" },
    { id: "ocean", label: "🌊 Ocean Shore", title: "Sea Bottles & Drifting Whispers" },
    { id: "exchequer", label: "🪙 Bullion & Referrals", title: "Sovereign Gold & Enlistment Rewards" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#1f1c0b] border-2 border-[#8c4f10] rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col md:flex-row min-h-[650px] max-h-[85vh] text-[#ffdcc2] overflow-hidden my-auto"
      >
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-72 bg-[#151307] border-b md:border-b-0 md:border-r border-[#8c4f10]/30 p-5 flex flex-col justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#8c4f10]/30">
              <div className="w-10 h-10 rounded-full border border-[#8c4f10] bg-[#610000] flex items-center justify-center text-lg font-bold shadow">
                📜
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8c4f10] block font-bold">
                  Official Manual
                </span>
                <h3 className="font-serif text-lg text-white font-bold leading-tight">
                  Guild Compendium
                </h3>
              </div>
            </div>

            <nav className="space-y-1.5 overflow-y-auto max-h-[45vh] md:max-h-[55vh] pr-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    sounds.playCorkPop();
                    setActiveSection(sec.id);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
                    activeSection === sec.id
                      ? "bg-[#610000] text-white font-bold shadow-md border border-[#8c4f10]/60 scale-[1.02]"
                      : "text-[#cec6ad] hover:bg-[#302c1a] hover:text-[#ffdcc2]"
                  }`}
                >
                  <span>{sec.label}</span>
                  {activeSection === sec.id && <span className="text-[#ffb77b]">→</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-[#8c4f10]/20 font-mono text-[10px] text-[#cec6ad]/70">
            <span>PRODUCER: PRAKHAR RAI</span>
            <span className="block mt-0.5 text-[#ffb77b]">EDITION 1894 • REVISED 2026</span>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            {/* Section Header */}
            <div className="flex justify-between items-start pb-5 border-b border-[#8c4f10]/30 mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb77b] font-bold block mb-1">
                  Section Guide • Volume {sections.findIndex((s) => s.id === activeSection) + 1} of {sections.length}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
                  {sections.find((s) => s.id === activeSection)?.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  sounds.playCorkPop();
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-[#302c1a] border border-[#8c4f10]/50 hover:bg-[#610000] hover:border-white text-[#ffdcc2] flex items-center justify-center transition-all flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Section Details */}
            <div className="space-y-5 font-serif text-sm sm:text-base text-[#cec6ad] leading-relaxed">
              {activeSection === "overview" && (
                <>
                  <p>
                    Welcome to <strong>The Alchemist's Courier</strong>, an authentic Victorian-era communication compendium produced by <strong>Prakhar Rai</strong>. In an age before instant electronic transmissions, guild members corresponded across London, Spitalfields, and distant colonial ports by sealing their letters in specialized alchemical wax, dispatching carrier pigeons, launching ironbound clipper ships, and casting glass bottles into ocean tides.
                  </p>
                  <div className="bg-[#302c1a]/80 border border-[#8c4f10]/40 p-4 rounded-lg my-4 space-y-2">
                    <h4 className="font-serif text-base text-[#ffb77b] font-bold">🏛️ How the Platform Works:</h4>
                    <ul className="list-disc list-inside space-y-1 font-serif text-xs text-[#cec6ad]">
                      <li><strong>Navigate via Tabs:</strong> Switch between The Archive, The Scriptorium, The Fleet, My Ledger, Secret Library, and Ocean Shore using the top navigation bar.</li>
                      <li><strong>Audio Immersion:</strong> Every action triggers authentic acoustic cues — parchment unrolling, wax seals melting, glass corks popping, and quill pens scratching.</li>
                      <li><strong>Sovereign Gold Bullion (£):</strong> Dispatching letters requires Gold Sovereigns, which can be acquired via verified UPI transfer to Producer Prakhar Rai or earned through referrals.</li>
                    </ul>
                  </div>
                </>
              )}

              {activeSection === "archive" && (
                <>
                  <p>
                    <strong>The Archive (Vault No. 1894)</strong> serves as your central repository of stored historical echoes. The massive alchemical glass jar in the center of the hall vacuum-seals letters to protect them from oxidation and time.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono text-xs">
                    <div className="bg-[#151307] p-4 rounded border border-[#8c4f10]/30">
                      <span className="text-[#ffb77b] font-bold block mb-1">🏺 Interactive Glass Jar</span>
                      <span className="text-[#cec6ad] font-serif">Letters float inside the jar overlay. Click any floating card or the central decant button to extract and unseal a dispatch.</span>
                    </div>
                    <div className="bg-[#151307] p-4 rounded border border-[#8c4f10]/30">
                      <span className="text-[#ffb77b] font-bold block mb-1">🔴 Wax-Seal Filtering</span>
                      <span className="text-[#cec6ad] font-serif">Filter the recent compendium below by wax pigment: Crimson (Royal), Amber (Treaties), Emerald (Safe Passage), or Sapphire.</span>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "scriptorium" && (
                <>
                  <p>
                    <strong>The Scriptorium</strong> is your writing desk. Here you draft new codices and dispatches to other wayfarers.
                  </p>
                  <ul className="space-y-3 font-serif text-sm">
                    <li className="bg-[#302c1a]/60 p-3.5 rounded border border-[#8c4f10]/30">
                      <strong className="text-[#ffb77b] block mb-1 font-mono text-xs">01 / WAX PIGMENTS & ENGRAVING MOTIFS</strong>
                      Select your sealing wax color (`Crimson Red`, `Amber Gold`, `Forest Emerald`) and signet engraving stamp (`Shield`, `Codice`, `Quill`, `Compass`).
                    </li>
                    <li className="bg-[#302c1a]/60 p-3.5 rounded border border-[#8c4f10]/30">
                      <strong className="text-[#ffb77b] block mb-1 font-mono text-xs">02 / CALLIGRAPHY INKS & PAPER GRAIN</strong>
                      Customize the visual texture of your missive using Deep Sepia, Alchemical Gold, or Midnight Indigo inks on Parchment or Velum paper.
                    </li>
                    <li className="bg-[#302c1a]/60 p-3.5 rounded border border-[#8c4f10]/30">
                      <strong className="text-[#ffb77b] block mb-1 font-mono text-xs">03 / DISPATCH FARE CALCULATION</strong>
                      Every letter has a base drafting fee of <strong>£ 30 Gold Sovereigns</strong> plus vessel transport costs calculated in The Fleet tab.
                    </li>
                  </ul>
                </>
              )}

              {activeSection === "fleet" && (
                <>
                  <p>
                    Once your letter is drafted in the Scriptorium, you select your carrier in <strong>The Fleet</strong> tab:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 font-mono text-xs">
                    <div className="bg-[#2b1b14] p-3 rounded border border-[#8c4f10]/40">
                      <span className="text-white font-bold block mb-1">🕊️ Homing Pigeon</span>
                      <span className="text-[#ffb77b] block text-[11px] mb-1">Cost: £ 15 Gold</span>
                      <span className="text-[#cec6ad] font-serif text-xs">Swift aerial delivery across 150 leagues. Best for urgent notes.</span>
                    </div>
                    <div className="bg-[#2b1b14] p-3 rounded border border-[#8c4f10]/40">
                      <span className="text-white font-bold block mb-1">⛵ Ironbound Clipper</span>
                      <span className="text-[#ffb77b] block text-[11px] mb-1">Cost: £ 120 Gold</span>
                      <span className="text-[#cec6ad] font-serif text-xs">Heavy maritime freight capable of carrying bulky codices overseas.</span>
                    </div>
                    <div className="bg-[#2b1b14] p-3 rounded border border-[#8c4f10]/40">
                      <span className="text-white font-bold block mb-1">🐎 Midnight Rider</span>
                      <span className="text-[#ffb77b] block text-[11px] mb-1">Cost: £ 45 Gold</span>
                      <span className="text-[#cec6ad] font-serif text-xs">Armed horseback courier riding through Spitalfields fog and rain.</span>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "secret" && (
                <>
                  <p>
                    <strong>The Secret Library</strong> houses occult, encrypted correspondence that requires alchemical deciphering.
                  </p>
                  <div className="bg-[#302c1a]/80 p-4 rounded border border-[#8c4f10]/40 space-y-2">
                    <h4 className="font-serif font-bold text-[#ffb77b]">🔐 The Caesar Cipher Wheel Mechanism:</h4>
                    <p className="font-serif text-xs text-[#cec6ad]">
                      Many letters in Vault No. 1895 are encrypted by shifting each letter of the alphabet by a secret numerical key (`+1` to `+25`). Use the interactive decryption slider wheel to rotate the characters until the hidden message transforms from jumbled gibberish into clear Victorian English!
                    </p>
                  </div>
                </>
              )}

              {activeSection === "ocean" && (
                <>
                  <p>
                    <strong>The Ocean Shore</strong> allows wayfarers to cast letters into the Atlantic tides inside corked vintage glass bottles (`Bottle Toss`) or fish out bottles thrown by strangers across the globe.
                  </p>
                  <p className="italic text-xs">
                    "Click on any drifting glass bottle along the coast to uncork its message, view the original sender's location, and pen a direct return letter!"
                  </p>
                </>
              )}

              {activeSection === "exchequer" && (
                <>
                  <p>
                    <strong>The Sovereign Exchequer</strong> governs all bullion economy and member enlistment rewards:
                  </p>
                  <div className="space-y-3 font-serif text-xs sm:text-sm">
                    <div className="bg-[#151307] p-4 rounded border border-[#8c4f10]/40">
                      <strong className="text-[#ffb77b] font-mono text-xs block mb-1">🪙 UPI VPA PAYMENT & UTR VERIFICATION</strong>
                      To purchase Gold Sovereigns, select a package and scan Producer Prakhar Rai's UPI QR code (`7982421223@fam`). To prevent fraudulent decantation, <strong>you must enter your valid 12-digit UPI Transaction Reference Number (UTR)</strong> before the gold is unlocked.
                    </div>
                    <div className="bg-[#151307] p-4 rounded border border-[#8c4f10]/40">
                      <strong className="text-[#ffb77b] font-mono text-xs block mb-1">🎁 SHARE & REFERRAL BONUS SYSTEM</strong>
                      Every member possesses a unique shareable invite link (`?ref=YOUR-CODE`). When you invite a colleague via the <strong>Add Wayfarers / Share</strong> button:
                      <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-xs text-white">
                        <li>New Enlistee receives: <span className="text-[#ffb77b]">+200 Bonus Gold</span> upon registration!</li>
                        <li>You (the Inviter) receive: <span className="text-[#ffb77b]">+500 Bonus Gold</span> credited directly to your ledger!</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-8 pt-4 border-t border-[#8c4f10]/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#8c4f10]">
              Need additional guidance? Contact Chief Dispatcher at Spitalfields.
            </span>
            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="px-6 py-2 bg-[#610000] hover:bg-[#8b0000] text-white rounded-full font-bold uppercase tracking-widest transition-all"
            >
              Return to Chamber
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuildManualModal;
