import React from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const ProducerCreditsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-[#1f1c0b] border-2 border-[#8c4f10] rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-10 text-[#ffdcc2] overflow-hidden my-auto"
      >
        {/* Background Ornamental Texture */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#8c4f10]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#610000] via-[#8c4f10] to-[#610000]"></div>

        {/* Header & Close */}
        <div className="flex items-start justify-between pb-6 border-b border-[#8c4f10]/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-[#8c4f10] overflow-hidden bg-[#610000] p-0.5 flex-shrink-0 shadow-lg">
              <img
                alt="Prakhar Rai — Producer & Lead Developer"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffb77b] font-bold block">
                Producer & Lead Architect
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
                Prakhar Rai
              </h2>
              <p className="font-serif text-xs sm:text-sm text-[#cec6ad] italic">
                Master of Digital Alchemical Systems & Guild Founder
              </p>
            </div>
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

        {/* Content Section */}
        <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          {/* Executive Summary Statement */}
          <div className="bg-[#302c1a]/80 border border-[#8c4f10]/40 p-5 rounded-lg">
            <h3 className="font-serif text-lg text-[#ffb77b] font-bold mb-2 flex items-center gap-2">
              <span>🏛️</span> About the Creator & Producer
            </h3>
            <p className="font-serif text-sm text-[#cec6ad] leading-relaxed">
              <strong>The Alchemist's Courier</strong> is conceived, engineered, and produced by <strong>Prakhar Rai</strong> as an immersive, museum-grade 19th-century epistolary simulation. Bridging historical Victorian aesthetics with cutting-edge modern web engineering, every mechanical nuance — from the decantation physics of oceanic glass bottles to cryptographic Caesar ciphers and live UPI Exchequer settlement — is crafted under his direct architectural oversight.
            </p>
          </div>

          {/* Core Technical Architecture & Credits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#151307] border border-[#8c4f10]/30 p-4 rounded-lg">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] block mb-1">
                01 / Engineering Stack
              </span>
              <h4 className="font-serif text-base text-white font-bold mb-1">Full-Stack Craftsmanship</h4>
              <p className="font-serif text-xs text-[#cec6ad]">
                React 19, Tailwind CSS, Framer Motion Physics Engine, Web Audio Synthesizer, and Supabase/Firebase Cryptographic Vaults.
              </p>
            </div>

            <div className="bg-[#151307] border border-[#8c4f10]/30 p-4 rounded-lg">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] block mb-1">
                02 / Sovereign Exchequer
              </span>
              <h4 className="font-serif text-base text-white font-bold mb-1">Live UPI VPA Settlement</h4>
              <p className="font-serif text-xs text-[#cec6ad]">
                Integrated directly with Prakhar Rai's verified merchant payment gateway (<code className="bg-black/50 px-1 py-0.5 rounded text-[#ffb77b]">7982421223@fam</code>) via dynamic QR code generation.
              </p>
            </div>
          </div>

          {/* Official Contact & Direct Dispatch */}
          <div className="bg-[#2b1b14] border-2 border-[#8c4f10]/60 p-5 rounded-lg">
            <h3 className="font-serif text-lg text-white font-bold mb-3 flex items-center gap-2">
              <span>📯</span> Direct Producer Dispatch & Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-black/40 p-3 rounded border border-white/10">
                <span className="text-[#8c4f10] block text-[10px] uppercase font-bold mb-0.5">Primary UPI Merchant VPA</span>
                <span className="text-[#ffb77b] font-bold text-sm">7982421223@fam</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/10">
                <span className="text-[#8c4f10] block text-[10px] uppercase font-bold mb-0.5">Official Repository & Rights</span>
                <span className="text-white font-bold truncate block">github.com/prakharrai12</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/10 sm:col-span-2">
                <span className="text-[#8c4f10] block text-[10px] uppercase font-bold mb-0.5">Producer Direct Dispatch & Inquiries</span>
                <span className="text-[#cec6ad] font-serif italic text-sm">
                  "For custom guild licensing, alchemical consultations, or payment verification inquiries, dispatch directly to the Producer's Spitalfields study."
                </span>
              </div>
            </div>
          </div>

          {/* Legal & Copyright Notice */}
          <div className="pt-4 border-t border-[#8c4f10]/20 text-center font-mono text-[11px] text-[#cec6ad]/80 leading-relaxed">
            <p className="font-bold text-[#ffb77b] tracking-wider mb-1">
              © 1894–2026 PRAKHAR RAI • ALL RIGHTS RESERVED GLOBALLY
            </p>
            <p>
              The Alchemist's Courier name, wax-seal crest motifs, scriptorium deciphering algorithms, and sovereign bullion ledger layouts are proprietary intellectual property produced and copyrighted by Prakhar Rai. Unauthorized reproduction or redistribution without explicit signet approval is strictly prohibited.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-[#8c4f10]/30 flex justify-end">
          <button
            onClick={() => {
              sounds.playWaxSeal();
              onClose();
            }}
            className="px-6 py-2.5 bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg transition-all"
          >
            Affirm Producer Signet & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProducerCreditsModal;
