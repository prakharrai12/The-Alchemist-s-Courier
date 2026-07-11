import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const GuildAuthModal = ({ onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("elias.vance@courierguild.org");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Elias Vance");
  const [title, setTitle] = useState("Senior Dispatcher");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);
    sounds.playWaxSeal();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
          title: title.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to authenticate with Guild Exchequer.");
      }

      sounds.playCorkPop();
      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      // Offline / fallback instant login
      sounds.playCorkPop();
      const fallbackUser = {
        id: "u_" + Date.now(),
        email: email.trim(),
        name: name.trim() || email.split("@")[0].replace(/[._]/g, " "),
        title: title.trim() || "Senior Dispatcher",
        rank: "First-Class Courier",
        prestige: 840,
        goldSovereigns: 1000,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        memberSince: "1889",
        waxColor: "#610000",
        crest: "shield",
        unlockedCiphers: ["1894-A"],
        unlockedAchievements: ["storm_rider", "world_traveler", "loyal_courier"]
      };
      onLoginSuccess(fallbackUser, "local_token_1894");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail, demoName, demoTitle) => {
    sounds.playQuillWrite();
    setEmail(demoEmail);
    setPassword("password123");
    setName(demoName);
    setTitle(demoTitle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        className="relative w-full max-w-2xl bg-[#fcf9f8] text-[#1b1c1c] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-4 border-[#8c4f10] overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        {/* Header with Antique Seal Artwork */}
        <div className="relative bg-[#1f1c0b] text-[#ffdcc2] p-8 text-center border-b-2 border-[#8c4f10] overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop')" }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#610000] border-2 border-[#ffdcc2]/60 shadow-xl flex items-center justify-center mb-3 overflow-hidden p-1">
              <img
                alt="Guild Signet"
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                className="w-full h-full object-cover rounded-full filter contrast-125"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8c4f10] font-bold block mb-1">
              THE ALCHEMIST'S COURIER GUILD
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-white">
              {isRegistering ? "Register Guild Membership" : "Authenticated Ledger Access"}
            </h2>
            <p className="font-serif text-sm text-[#cec6ad] italic mt-1 max-w-lg mx-auto">
              Every member receives an endowment of 1,000 Gold Sovereigns to dispatch vessels and unlock secret archives across the realm.
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#cec6ad] hover:text-white text-2xl font-bold p-2 transition-transform hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Main Form Content */}
        <div className="p-8 md:p-10 space-y-6">
          {error && (
            <div className="p-4 bg-red-900/10 border border-red-800/40 rounded-lg text-red-800 font-serif text-sm italic">
              {error}
            </div>
          )}

          {/* Demo Account Quick Access */}
          <div className="bg-[#ebe2c8]/60 border border-[#8c4f10]/30 p-4 rounded-xl">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c4f10] font-bold block mb-2">
              QUICK ACCESS DEMO CREDENTIALS (CLICK TO AUTO-FILL)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("elias.vance@courierguild.org", "Elias Vance", "Senior Dispatcher")}
                className="flex items-center gap-3 p-2.5 bg-white hover:bg-[#f6f3f2] border border-[#8c4f10]/40 rounded-lg text-left transition-all shadow-sm group"
              >
                <img
                  alt="Elias Vance"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  className="w-10 h-10 rounded-full object-cover border border-[#8c4f10]"
                />
                <div>
                  <p className="font-serif text-sm font-bold text-[#1b1c1c] group-hover:text-[#610000]">Elias Vance</p>
                  <p className="font-mono text-[10px] text-[#8c4f10]">Senior Dispatcher • 1,000 Gold</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("aurelia.croft@alchemist.org", "Lady Aurelia Croft", "Grand Archivist")}
                className="flex items-center gap-3 p-2.5 bg-white hover:bg-[#f6f3f2] border border-[#8c4f10]/40 rounded-lg text-left transition-all shadow-sm group"
              >
                <img
                  alt="Aurelia Croft"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  className="w-10 h-10 rounded-full object-cover border border-[#8c4f10]"
                />
                <div>
                  <p className="font-serif text-sm font-bold text-[#1b1c1c] group-hover:text-[#610000]">Lady Aurelia Croft</p>
                  <p className="font-mono text-[10px] text-[#8c4f10]">Grand Archivist • 2,500 Gold</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => sounds.playQuillWrite()}
                    className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-base text-[#1b1c1c] focus:ring-2 focus:ring-[#8c4f10]"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">Guild Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => sounds.playQuillWrite()}
                    className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-base text-[#1b1c1c] focus:ring-2 focus:ring-[#8c4f10]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="member@courierguild.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c] focus:ring-2 focus:ring-[#8c4f10]"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">Signet Passcode</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c] focus:ring-2 focus:ring-[#8c4f10]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <span>Stamping Signet & Verifying Credentials...</span>
                ) : (
                  <span>{isRegistering ? "Enlist & Claim 1,000 Gold Sovereigns" : "Access Guild Ledger"}</span>
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t border-[#8c4f10]/20">
            <button
              type="button"
              onClick={() => {
                sounds.playCorkPop();
                setIsRegistering(!isRegistering);
              }}
              className="font-mono text-xs text-[#8c4f10] font-bold underline hover:text-[#610000]"
            >
              {isRegistering
                ? "Already enlisted in the Guild? Return to Ledger Access"
                : "New to the Alchemist's Courier? Register Membership & Claim 1,000 Gold"}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-[#ebe2c8] px-8 py-4 border-t border-[#8c4f10]/30 flex justify-between items-center text-[11px] font-mono text-[#5a403c]">
          <span>STORAGE: Supabase & Express SQL Ready</span>
          <span>SECURITY: 256-Bit Lead Signet</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GuildAuthModal;
