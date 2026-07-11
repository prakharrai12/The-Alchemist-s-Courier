import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const Scriptorium = ({ onSendCodice, persona }) => {
  const [pigment, setPigment] = useState("#610000"); // Crimson Red
  const [motif, setMotif] = useState("shield");
  const [paperStock, setPaperStock] = useState("deckle"); // 'deckle', 'linen', 'vellum'
  
  const [recipient, setRecipient] = useState("Lady Beatrice of Spitalfields");
  const [title, setTitle] = useState("Observations on the Autumnal Equinox");
  const [content, setContent] = useState("My Dearest Beatrice,\n\nThe fog has rolled off the Spitalfields docks once more, thick with the scent of burning coal and saltwater. I write to you from the northern tower, where our instruments confirm the alignment of the stars with the ancient codices.\n\nDo not forget to lock the iron gates before midnight.");

  const [isSealing, setIsSealing] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const pigments = [
    { id: "#610000", label: "Crimson Red #610000", desc: "For urgent matters & royal decrees" },
    { id: "#8c4f10", label: "Amber Gold #8c4f10", desc: "For alchemical records & treaties" },
    { id: "#30422f", label: "Forest Emerald #30422f", desc: "For botanical notes & safe passage" }
  ];

  const motifs = [
    { id: "shield", label: "Shield", imgUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=150&auto=format&fit=crop" },
    { id: "book", label: "Codex", imgUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=150&auto=format&fit=crop" },
    { id: "quill", label: "Quill", imgUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=150&auto=format&fit=crop" },
    { id: "compass", label: "Compass", imgUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=150&auto=format&fit=crop" }
  ];

  const paperStocks = [
    { id: "deckle", name: "Hand-Pressed Deckle", desc: "Raw edges, heavy grain", style: "bg-[#fcf9f8] border-[#8c4f10]/60" },
    { id: "linen", name: "Woven Linen Stock", desc: "Cross-hatched texture", style: "bg-[#f5ebd6] border-[#8c4f10]/80" },
    { id: "vellum", name: "Aged Vellum", desc: "Translucent, smooth, yellowed", style: "bg-[#ebe2c8] border-[#610000]/60" }
  ];

  const handleSealAndSend = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    sounds.playWaxSeal();
    setIsSealing(true);

    setTimeout(() => {
      sounds.playCorkPop();
      onSendCodice({
        title,
        recipient,
        sender: persona?.name ? `${persona.name} (${persona.title})` : "Senior Dispatcher Elias Vance",
        content,
        sealColor: pigment,
        sealCrest: motif,
        paperStock
      });
      setIsSealing(false);
      setIsSent(true);

      setTimeout(() => {
        setIsSent(false);
        setTitle("");
        setContent("");
      }, 2500);
    }, 1400);
  };

  const selectedStockObj = paperStocks.find(p => p.id === paperStock) || paperStocks[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: DESK ACCESSORIES / OPTIONS */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#fcf9f8] p-6 rounded-xl border-2 border-[#8c4f10]/60 shadow-xl text-[#1b1c1c]">
          <h3 className="font-serif text-2xl font-bold text-[#610000] border-b border-[#8c4f10]/30 pb-3 mb-4">
            Alchemical Scriptorium Desk
          </h3>

          {/* Pigment Options */}
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] block mb-2 font-bold">
              01 / Wax Pigment
            </span>
            <div className="space-y-2">
              {pigments.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    sounds.playWaxSeal();
                    setPigment(p.id);
                  }}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3 ${pigment === p.id ? "bg-[#ebe2c8] border-[#610000] shadow" : "bg-white border-[#e3beb8] hover:bg-[#f6f3f2]"}`}
                >
                  <div className="w-6 h-6 rounded-full border border-black/30 shadow-inner flex-shrink-0" style={{ backgroundColor: p.id }} />
                  <div>
                    <p className="font-serif text-sm font-bold text-[#1b1c1c]">{p.label}</p>
                    <p className="font-mono text-[10px] text-[#5a403c]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motif Options (Authentic Images, No Emojis!) */}
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] block mb-2 font-bold">
              02 / Engraving Motif
            </span>
            <div className="grid grid-cols-2 gap-3">
              {motifs.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    sounds.playCorkPop();
                    setMotif(m.id);
                  }}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${motif === m.id ? "bg-[#ebe2c8] border-[#610000] shadow scale-105" : "bg-white border-[#e3beb8] hover:bg-[#f6f3f2]"}`}
                >
                  <img alt={m.label} src={m.imgUrl} className="w-10 h-10 rounded object-cover shadow border border-[#8c4f10]/30" />
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#1b1c1c]">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Paper Stock Selector */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] block mb-2 font-bold">
              03 / Paper Stock
            </span>
            <div className="space-y-2">
              {paperStocks.map((stock) => (
                <div
                  key={stock.id}
                  onClick={() => {
                    sounds.playParchmentUnroll();
                    setPaperStock(stock.id);
                  }}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${paperStock === stock.id ? "border-[#610000] bg-[#ebe2c8] shadow" : "border-[#e3beb8] bg-white hover:bg-[#f6f3f2]"}`}
                >
                  <div>
                    <p className="font-serif text-sm font-bold text-[#1b1c1c]">{stock.name}</p>
                    <p className="font-mono text-[10px] text-[#5a403c]">{stock.desc}</p>
                  </div>
                  {paperStock === stock.id && (
                    <span className="w-3 h-3 rounded-full bg-[#610000]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ink Pot Level Widget */}
        <div className="bg-[#1f1c0b] text-[#ffdcc2] p-6 rounded-xl border border-[#8c4f10] shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs uppercase text-[#8c4f10] font-bold">INK RESERVOIR</span>
            <span className="font-mono text-xs text-[#ffb77b] font-bold">82% FULL</span>
          </div>
          <div className="w-full bg-[#302c1a] h-3 rounded-full overflow-hidden border border-[#8c4f10]/40 mb-3">
            <div className="bg-gradient-to-r from-[#8c4f10] to-[#ffdcc2] h-full w-[82%]" />
          </div>
          <p className="font-serif text-xs text-[#cec6ad] italic">
            "The pen is the tongue of the soul; as the thoughts are, so will the strings be."
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE PARCHMENT CODICE EDITOR */}
      <div className="lg:col-span-8">
        <div className={`relative rounded-xl p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 transition-colors duration-500 ${selectedStockObj.style}`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#8c4f10]/30 pb-6 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8c4f10] font-bold block mb-1">
                MEMORANDUM & CODICE
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1b1c1c]">Drafting Chamber</h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-[#8c4f10] block font-bold">DATE OF ISSUE</span>
              <span className="font-serif text-sm text-[#1b1c1c] italic">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>

          {/* Form Editor */}
          <form onSubmit={handleSealAndSend} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">
                  RECIPIENT (TO)
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  onFocus={() => sounds.playQuillWrite()}
                  placeholder="e.g. Master Josiah, High Tower"
                  className="w-full p-3 bg-white/70 border border-[#8c4f10]/60 rounded font-serif text-lg text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000]"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">
                  TITLE OF CODICE
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => sounds.playQuillWrite()}
                  placeholder="e.g. Treaty of the Northern Sea"
                  className="w-full p-3 bg-white/70 border border-[#8c4f10]/60 rounded font-serif text-lg text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block">
                  MISSIVE CONTENT (QUILL PEN INK)
                </label>
                <div className="font-mono text-xs text-[#8c4f10] font-bold flex gap-3">
                  <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
                  <span>•</span>
                  <span>Chars: {content.length}</span>
                  <span>•</span>
                  <span className="text-[#610000]">Dispatch Fare: £ {Math.max(10, Math.ceil((content.trim() ? content.trim().split(/\s+/).length : 0) / 20) * 10)} Gold</span>
                </div>
              </div>
              <textarea
                required
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                placeholder="Dip your quill and write your message across the centuries..."
                className="w-full p-5 bg-white/70 border border-[#8c4f10]/60 rounded font-serif text-lg leading-relaxed text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000] resize-y shadow-inner"
              />
            </div>

            {/* Signature & Seal Area */}
            <div className="pt-6 border-t border-[#8c4f10]/30 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-left">
                <span className="font-mono text-xs text-[#8c4f10] uppercase font-bold block mb-1">CALLIGRAPHY SIGNATURE</span>
                <p className="font-serif text-2xl text-[#610000] font-bold italic -rotate-2">
                  {persona?.name ? `${persona.name}, S.D.` : "Elias Vance, S.D."}
                </p>
                <span className="font-mono text-[10px] text-[#5a403c] block">Authenticated Guild Member Signet</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Visual Seal Preview Button */}
                <div className="relative">
                  {isSealing && (
                    <motion.div
                      className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 font-serif font-bold text-white uppercase text-xs text-center p-2"
                        style={{ backgroundColor: pigment }}
                        initial={{ scale: 3, opacity: 0, rotate: -30 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        IMPRINTING SEAL...
                      </motion.div>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSealing || isSent}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold tracking-widest uppercase rounded-xl shadow-2xl transition-colors flex items-center gap-3 border-2 border-[#ffdcc2]/30"
                  >
                    <span>{isSent ? "CODICE DISPATCHED" : "SEAL & SEND CODICE"}</span>
                    <div className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center shadow-inner" style={{ backgroundColor: pigment }}>
                      <span className="w-2 h-2 rounded-full bg-white/60"></span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </form>

          {/* Success Banner */}
          {isSent && (
            <motion.div
              className="absolute top-4 right-4 left-4 bg-green-900 text-white p-4 rounded-xl shadow-2xl border-2 border-green-400 flex items-center justify-between z-40"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-3 font-serif font-bold">
                <span className="text-2xl">✓</span>
                <span>Codice successfully stamped in hot wax and broadcast to the central Archive!</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scriptorium;
