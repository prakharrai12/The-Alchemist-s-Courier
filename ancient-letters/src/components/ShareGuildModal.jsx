import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const ShareGuildModal = ({ onClose, persona, onClaimReferral }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputRefCode, setInputRefCode] = useState("");
  const [claimMessage, setClaimMessage] = useState(null);

  // Generate or retrieve user's unique referral code
  const myRefCode = persona?.referralCode || "PRAKHAR-1894";
  const shareableUrl = `${window.location.origin}${window.location.pathname}?ref=${myRefCode}`;

  const handleCopyLink = () => {
    sounds.playCorkPop();
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyCode = () => {
    sounds.playCorkPop();
    navigator.clipboard.writeText(myRefCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleApplyForeignRefCode = () => {
    sounds.playWaxSeal();
    if (!inputRefCode || inputRefCode.trim().length < 4) {
      setClaimMessage({ type: "error", text: "❌ Invalid Code: Please enter an authentic 4+ character Alchemical Signet Referral Code." });
      return;
    }
    if (inputRefCode.trim().toUpperCase() === myRefCode.toUpperCase()) {
      setClaimMessage({ type: "error", text: "⚠️ You cannot claim your own personal referral signet!" });
      return;
    }
    
    // Grant +200 Gold reward!
    if (onClaimReferral) {
      onClaimReferral(200, inputRefCode.trim().toUpperCase());
    }
    setClaimMessage({
      type: "success",
      text: `🎉 Enlistment Verified! You have received +200 Gold Sovereigns (` + `£ 200) from Wayfarer [${inputRefCode.trim().toUpperCase()}]. The inviter has also been granted +500 Gold!`
    });
    setInputRefCode("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#1f1c0b] border-2 border-[#8c4f10] rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 sm:p-9 text-[#ffdcc2] overflow-hidden my-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8c4f10] via-[#ffdcc2] to-[#8c4f10]"></div>

        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#8c4f10]/30">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb77b] font-bold block mb-1">
              Guild Expansion Protocol
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
              Add Wayfarers & Share Signet
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

        <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-1">
          {/* Rewards Banner */}
          <div className="bg-gradient-to-r from-[#610000]/70 via-[#302c1a] to-[#8c4f10]/50 border-2 border-[#ffdcc2]/40 p-4 sm:p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#ffdcc2] text-[#1f1c0b] flex items-center justify-center text-2xl font-bold shadow-inner flex-shrink-0">
              🪙
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg text-white font-bold">
                Alchemical Enlistment Rewards
              </h3>
              <p className="font-serif text-xs text-[#cec6ad] mt-1">
                Share your personal link or referral code with fellow historians and colleagues.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 font-mono text-[11px]">
                <span className="bg-black/40 px-2.5 py-1 rounded border border-[#ffb77b]/30 text-[#ffb77b]">
                  🎁 New Enlistee: <strong className="text-white">+200 Gold</strong>
                </span>
                <span className="bg-black/40 px-2.5 py-1 rounded border-[#ffb77b]/30 text-[#ffb77b]">
                  🪙 Your Reward: <strong className="text-white">+500 Gold</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Your Unique Code Box */}
          <div className="bg-[#151307] border border-[#8c4f10]/40 p-5 rounded-lg space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] block font-bold mb-1.5">
                Your Personal Signet Code
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-grow bg-[#2b1b14] border-2 border-[#8c4f10] rounded-lg px-4 py-3 font-mono text-lg sm:text-xl font-bold text-[#ffb77b] tracking-wider select-all text-center sm:text-left">
                  {myRefCode}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-xs uppercase tracking-widest rounded-lg font-bold transition-all shadow flex-shrink-0"
                >
                  {copiedCode ? "✓ COPIED!" : "COPY CODE"}
                </button>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] block font-bold mb-1.5">
                Shareable Enlistment URL
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="flex-grow bg-black/40 border border-[#8c4f10]/50 rounded-lg px-3 py-2 font-mono text-xs text-[#cec6ad] truncate focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#302c1a] hover:bg-[#8c4f10] text-[#ffdcc2] font-mono text-xs uppercase tracking-widest rounded-lg font-bold transition-all border border-[#8c4f10] flex-shrink-0"
                >
                  {copiedLink ? "✓ LINK COPIED!" : "COPY LINK"}
                </button>
              </div>
            </div>

            {/* Social Quick Share Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-[#cec6ad] mr-2">Quick Share:</span>
              <a
                href={`https://api.whatsapp.com/send?text=Enlist%20in%20The%20Alchemist%27s%20Courier%20Guild%20and%20claim%20%2B200%20Gold%20Sovereigns%20with%20my%20signet%20code%20${myRefCode}%3A%20${encodeURIComponent(shareableUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#1f3b25] hover:bg-[#2e5937] text-[#86efac] font-mono text-xs rounded border border-[#3b82f6]/20 transition-all"
              >
                📱 WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=Enlist%20in%20The%20Alchemist%27s%20Courier%20Guild%20and%20claim%20%2B200%20Gold%20Sovereigns%20with%20signet%20code%20${myRefCode}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#1a3852] hover:bg-[#254f73] text-[#93c5fd] font-mono text-xs rounded border border-[#3b82f6]/20 transition-all"
              >
                ✈️ Telegram
              </a>
              <a
                href={`mailto:?subject=Invitation%20to%20The%20Alchemist%27s%20Courier%20Guild&body=Greetings!%20Join%20me%20in%20The%20Alchemist%27s%20Courier%20to%20send%20encrypted%20letters%20in%20sea-bottles.%20Use%20my%20signet%20code%20${myRefCode}%20for%20an%20instant%20%2B200%20Gold%20bonus:%20${shareableUrl}`}
                className="px-3 py-1.5 bg-[#302c1a] hover:bg-[#4a4327] text-[#ffdcc2] font-mono text-xs rounded border border-[#8c4f10]/40 transition-all"
              >
                ✉️ Email Dispatch
              </a>
            </div>
          </div>

          {/* Claim Someone Else's Code Box */}
          <div className="bg-[#2b1b14] border border-[#8c4f10]/50 p-5 rounded-lg space-y-3">
            <h4 className="font-serif text-base text-white font-bold">
              Have an Invitation Signet Code? Claim +200 Gold Now!
            </h4>
            <p className="font-serif text-xs text-[#cec6ad]">
              If you received a referral signet code from a fellow historical wayfarer, enter it below to immediately credit your Exchequer ledger with +200 Gold Sovereigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                placeholder="Enter 4+ char Signet Code (e.g. PRAKHAR-1894)..."
                value={inputRefCode}
                onChange={(e) => setInputRefCode(e.target.value.toUpperCase())}
                className="flex-grow bg-black/50 border border-[#8c4f10] rounded-lg px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider text-white focus:outline-none focus:border-[#ffdcc2]"
              />
              <button
                onClick={handleApplyForeignRefCode}
                className="px-5 py-2.5 bg-[#ffdcc2] hover:bg-white text-[#1f1c0b] font-mono text-xs uppercase tracking-widest rounded-lg font-bold shadow transition-all flex-shrink-0"
              >
                Verify & Claim +200 Gold
              </button>
            </div>

            <AnimatePresence>
              {claimMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg text-xs font-mono border ${
                    claimMessage.type === "success"
                      ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                      : "bg-red-950/80 border-red-500/50 text-red-300"
                  }`}
                >
                  {claimMessage.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#8c4f10]/30 flex justify-between items-center font-mono text-xs text-[#cec6ad]">
          <span>Guild Expansion Program • Lead Arch-Alchemist Prakhar Rai</span>
          <button
            onClick={() => {
              sounds.playCorkPop();
              onClose();
            }}
            className="px-5 py-2 bg-[#302c1a] hover:bg-[#610000] text-white rounded-full font-bold transition-all"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareGuildModal;
