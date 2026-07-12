import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const SupportGuild = ({
  isOpen,
  onClose,
  initialTab = "guide",
  persona,
  onClaimReferral
}) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'guide', 'patronage', 'referral', 'credits'
  const [referralCode] = useState("PRAKHAR-GUILD-1894");
  const [copied, setCopied] = useState(false);

  // Dynamic configuration loaded cleanly instead of hardcoding random strings in code logic
  const [paymentConfig] = useState({
    provider: "UPI / FamPay Guild Gateway",
    upiId: "7982421223@fam",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=7982421223@fam&pn=Prakhar+Rai+Guild&cu=INR",
    packages: [
      { id: "p1", name: "Apprentice Pouch", gold: 12, priceINR: 39, desc: "A modest handful of 12 Gold Sovereigns for carrier pigeon stamps." },
      { id: "p2", name: "Alchemist Chest", gold: 60, priceINR: 149, desc: "A sealed brass chest containing 60 Gold Sovereigns + 1 Occult Cipher." },
      { id: "p3", name: "Grand Treasury Vault", gold: 250, priceINR: 499, desc: "An entire vault of 250 Gold Sovereigns + Arch-Alchemist Signet stamp." }
    ]
  });

  if (!isOpen) return null;

  const copyReferral = () => {
    sounds.playCorkPop();
    navigator.clipboard.writeText(`https://alchemistscourier.guild/join?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tabs = [
    { id: "guide", label: "Help & Chamber Guide", icon: "📖" },
    { id: "patronage", label: "Support & Payment Gateway", icon: "🪙" },
    { id: "referral", label: "Referral & Invite Rewards", icon: "🎁" },
    { id: "credits", label: "Producer & Rights Reserved", icon: "📜" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl bg-[#1f1c0b] text-[#ffdcc2] rounded-2xl border-2 border-[#8c4f10] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* HEADER */}
          <div className="p-4 sm:p-6 border-b border-[#8c4f10]/40 flex items-center justify-between bg-[#181508] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#610000] border border-[#ffb77b] flex items-center justify-center text-2xl shadow">
                🛡️
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  Support & Guild Assistance Center
                </h2>
                <span className="font-mono text-[10px] text-[#8c4f10] uppercase tracking-wider font-bold block">
                  Patronage, Walkthroughs, Referrals & Producer Credits
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#302c1a] hover:bg-[#610000] text-white transition-colors text-base font-bold"
              title="Close Support Hub (Esc)"
            >
              ✕
            </button>
          </div>

          {/* TAB BAR */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#2b2716]/80 border-b border-[#8c4f10]/30 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sounds.playParchmentUnroll();
                  setActiveTab(t.id);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === t.id
                    ? "bg-[#610000] text-white border border-[#ffb77b] shadow"
                    : "bg-[#1f1c0b] text-[#cec6ad] hover:text-white border border-[#8c4f10]/30"
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* MAIN TAB CONTENT */}
          <div className="p-5 sm:p-8 overflow-y-auto max-h-[65vh] space-y-6 no-scrollbar bg-[#1f1c0b] flex-grow">
            {/* TAB 1: HELP & CHAMBER GUIDE */}
            {activeTab === "guide" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">Welcome to The Alchemist's Courier</h3>
                  <p className="font-mono text-xs text-[#cec6ad] leading-relaxed">
                    Inspired by Victorian correspondence, alchemical laboratories, and maritime pigeon carriers, this platform turns every message into a tangible artifact sealed in lead and wax.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "🏛 The Archive Vault", desc: "Browse, filter, and read historical letters sealed by grand alchemists and navigators across centuries." },
                    { title: "✍ The Scriptorium", desc: "Imprint your own letters and codices onto antique parchment. Choose your wax color and signet crest before dispatching." },
                    { title: "⛵ Fleet Logistics", desc: "Inspect carrier pigeons and deepwater clipper ships carrying messages across continents and stormy tides." },
                    { title: "📜 My Ledger", desc: "Track your Sovereign Exchequer balance (£ Gold), review rewards for active correspondence, and audit your dispatches." },
                    { title: "🔐 Secret Library", desc: "Unlock Caesar-shift rot ciphers and read occult encrypted scrolls using your 256-Bit Lead Signet stamp." },
                    { title: "🌊 Ocean Shore", desc: "Toss glass sea bottles into the Spitalfields tide with random coordinates or reply to messages washed ashore by the waves." }
                  ].map((item, idx) => (
                    <div key={idx} className="min-h-[72px] p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 flex flex-col justify-between">
                      <h4 className="font-serif text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="font-mono text-xs text-[#cec6ad] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: PATRONAGE & PAYMENT GATEWAY */}
            {activeTab === "patronage" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#252112] border-2 border-[#8c4f10] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="px-2.5 py-0.5 rounded bg-[#610000] text-[#ffb77b] font-mono text-[10px] uppercase font-bold tracking-wider">
                      Verified Guild Payment Gateway
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      Patronage of Producer Prakhar Rai
                    </h3>
                    <p className="font-mono text-xs text-[#cec6ad] max-w-md leading-relaxed">
                      To sustain our Spitalfields servers, carrier pigeon nests, and alchemical mercury furnaces, you may grant direct patronage via our secure gateway.
                    </p>
                    <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-xs font-mono">
                      <span className="text-[#8c4f10]">Provider UPI ID:</span>
                      <strong className="px-2 py-1 bg-[#181508] rounded border border-[#8c4f10]/60 text-green-400 font-bold select-all">
                        {paymentConfig.upiId}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl shadow-2xl flex flex-col items-center flex-shrink-0">
                    <img
                      alt="UPI Payment QR Code"
                      src={paymentConfig.qrUrl}
                      className="w-44 h-44 object-contain"
                    />
                    <span className="mt-2 font-mono text-[10px] text-black font-bold uppercase tracking-wider">
                      Scan to Pay via UPI / FamPay
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-white mb-3">Or Acquire Configured Gold Bullion Packages</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {paymentConfig.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => {
                          sounds.playWaxSeal();
                          alert(`Initiating verified payment for "${pkg.name}" (£ ${pkg.gold} Gold at ₹ ${pkg.priceINR}) via ${paymentConfig.provider} (${paymentConfig.upiId}).`);
                        }}
                        className="min-h-[140px] p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/50 hover:border-[#ffb77b] cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden shadow-lg"
                      >
                        <div>
                          <span className="font-mono text-[10px] uppercase text-[#ffb77b] font-bold">
                            {pkg.gold} Sovereign Gold
                          </span>
                          <h5 className="font-serif text-base font-bold text-white mt-1 group-hover:text-[#ffb77b] transition-colors">
                            {pkg.name}
                          </h5>
                          <p className="font-mono text-[11px] text-[#cec6ad] mt-1 line-clamp-2">
                            {pkg.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#8c4f10]/30 flex items-center justify-between">
                          <strong className="font-mono text-base font-bold text-green-400">₹ {pkg.priceINR}</strong>
                          <span className="px-2.5 py-1 bg-[#610000] text-white rounded text-[10px] font-mono uppercase font-bold group-hover:bg-[#8b0000]">
                            Acquire →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REFERRAL & INVITES */}
            {activeTab === "referral" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#252112] border-2 border-[#8c4f10] space-y-4 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">Guild Ambassador Program</h3>
                      <p className="font-mono text-xs text-[#cec6ad] mt-1 max-w-lg">
                        Invite fellow scholars, developers, and historians to join <strong className="text-white">The Alchemist's Courier</strong>. When they enter via your unique link, both of your Exchequers are enriched!
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-[#610000] rounded-xl border border-[#ffb77b] text-center flex-shrink-0">
                      <span className="font-mono text-[10px] uppercase block text-[#ffb77b]">Your Reward</span>
                      <strong className="font-mono text-xl font-bold text-white">+500 Gold</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#181508] border border-[#8c4f10]/60 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-grow min-w-0 font-mono text-xs text-white truncate px-2 select-all">
                      https://alchemistscourier.guild/join?ref={referralCode}
                    </div>
                    <button
                      onClick={copyReferral}
                      className="min-h-[44px] px-5 py-2 rounded-lg bg-[#8c4f10] hover:bg-[#a65d13] text-white font-mono text-xs font-bold uppercase whitespace-nowrap transition-colors shadow"
                    >
                      {copied ? "✓ Copied Link" : "Copy Invite Link"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-mono text-[#cec6ad]">
                    <span>Newcomers receive <strong className="text-[#ffb77b]">+200 Gold Sovereigns</strong> immediately upon signet registration.</span>
                    {onClaimReferral && (
                      <button
                        onClick={() => {
                          sounds.playCorkPop();
                          onClaimReferral(200, referralCode);
                          alert("Congratulations! +200 Gold Sovereigns claimed from guild ambassador reward pool.");
                        }}
                        className="text-green-400 underline font-bold hover:text-green-300"
                      >
                        [Test Claim +200 Gold]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRODUCER CREDITS & RIGHTS */}
            {activeTab === "credits" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#252112] border-2 border-[#8c4f10] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl border-2 border-[#ffb77b] overflow-hidden flex-shrink-0 shadow-xl bg-white">
                      <img
                        alt="Prakhar Rai"
                        src={persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-[#610000] text-[#ffb77b] font-mono text-[10px] uppercase font-bold tracking-widest">
                        Master Architect & Lead Producer
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white mt-1">
                        Prakhar Rai
                      </h3>
                      <p className="font-mono text-xs text-[#cec6ad] mt-1 max-w-xl">
                        Lead Developer and Creator of <strong className="text-white">The Alchemist's Courier</strong>. Engineered with React, Framer Motion, 8-point spatial grid architecture, and authentic Victorian sensory feedback.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#8c4f10]/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-[#181508] border border-[#8c4f10]/40">
                      <span className="text-[#8c4f10] uppercase block text-[10px] font-bold">Patronage & UPI Gateway</span>
                      <strong className="text-white select-all mt-0.5 block">7982421223@fam</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#181508] border border-[#8c4f10]/40">
                      <span className="text-[#8c4f10] uppercase block text-[10px] font-bold">Intellectual Property</span>
                      <strong className="text-white mt-0.5 block">All Rights Reserved © 1894-2026 Prakhar Rai</strong>
                    </div>
                  </div>

                  <div className="pt-2 text-center font-mono text-xs text-[#8c4f10]">
                    "Where ancient parchment meets modern real-time architecture."
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-4 sm:p-5 bg-[#181508] border-t border-[#8c4f10]/40 flex items-center justify-between flex-shrink-0">
            <span className="font-mono text-[11px] text-[#cec6ad]">
              Producer & Dev: <strong className="text-[#ffb77b]">Prakhar Rai</strong> | <strong className="text-white">7982421223@fam</strong>
            </span>
            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="min-h-[44px] px-5 py-2 rounded-lg bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-xs font-bold uppercase tracking-wider shadow transition-colors"
            >
              Return to Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SupportGuild;
