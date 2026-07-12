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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 md:px-8 relative">
      {/* Left Edge Hover / Click Drawer Trigger */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center cursor-pointer group transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onMouseEnter={() => setIsDrawerOpen(true)}
        onClick={() => {
          sounds.playCorkPop();
          setIsDrawerOpen(true);
        }}
        title="Open Desk Accessories (Wax Pigments, Engravings & Paper Stock)"
      >
        <div className="bg-[#610000] text-white py-5 px-3 rounded-r-lg border-t border-r border-b border-[#ffdcc2]/40 shadow-[0_4px_20px_rgba(0,0,0,0.85)] flex flex-col items-center gap-2 hover:bg-[#8b0000] transition-all group-hover:pl-4 min-w-[44px] min-h-[44px]">
          <span className="text-lg">✍️</span>
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold [writing-mode:vertical-lr] rotate-180">
            Desk Accessories
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ffb77b] animate-ping" />
        </div>
      </div>

      {/* Auto-Sliding Alchemical Options Drawer on Left Sidebar */}
      <div
        className={`fixed left-0 top-16 bottom-12 w-80 sm:w-88 bg-[#1f1c0b] text-[#ffdcc2] border-r-2 border-t border-b border-[#8c4f10] shadow-[25px_0_90px_rgba(0,0,0,0.98)] z-50 p-5 sm:p-6 overflow-y-auto rounded-r-xl transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setIsDrawerOpen(false)}
      >
        <div className="flex justify-between items-center pb-3 mb-5 border-b border-[#8c4f10]/40 sticky top-0 bg-[#1f1c0b] z-10 pt-1">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold block">
              ALCHEMICAL DRAWER
            </span>
            <h3 className="font-serif text-xl font-bold text-white">Desk Accessories</h3>
          </div>
          <button
            onClick={() => {
              sounds.playCorkPop();
              setIsDrawerOpen(false);
            }}
            className="min-w-[44px] min-h-[44px] bg-[#610000] hover:bg-[#8b0000] text-white rounded-lg font-bold text-xs flex items-center justify-center shadow transition-all"
            title="Slide Back Drawer"
          >
            ✕
          </button>
        </div>

        {/* Pigment Options */}
        <div className="mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c4f10] block mb-2 font-bold">
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
                className={`p-3 min-h-[44px] rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
                  pigment === p.id
                    ? "bg-[#302c1a] border-[#ffb77b] shadow text-white font-semibold"
                    : "bg-[#2b2716]/80 border-[#8c4f10]/30 hover:bg-[#3d3822] text-[#ffdcc2]"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-white/40 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: p.id }}
                />
                <div>
                  <p className="font-serif text-sm font-bold">{p.label}</p>
                  <p className="font-mono text-[10px] text-[#cec6ad]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engraving Motif Options */}
        <div className="mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c4f10] block mb-2 font-bold">
            02 / Engraving Motif
          </span>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {motifs.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  sounds.playCorkPop();
                  setMotif(m.id);
                }}
                className={`p-2.5 min-h-[44px] rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  motif === m.id
                    ? "bg-[#302c1a] border-[#ffb77b] shadow scale-[1.02] text-white font-semibold"
                    : "bg-[#2b2716]/80 border-[#8c4f10]/30 hover:bg-[#3d3822] text-[#ffdcc2]"
                }`}
              >
                <img
                  alt={m.label}
                  src={m.imgUrl}
                  className="w-10 h-10 rounded object-cover shadow border border-[#8c4f10]/60"
                />
                <span className="font-serif text-xs font-bold uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paper Stock Selector */}
        <div className="mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c4f10] block mb-2 font-bold">
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
                className={`p-3 min-h-[44px] rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  paperStock === stock.id
                    ? "border-[#ffb77b] bg-[#302c1a] shadow text-white font-semibold"
                    : "border-[#8c4f10]/30 bg-[#2b2716]/80 hover:bg-[#3d3822] text-[#ffdcc2]"
                }`}
              >
                <div>
                  <p className="font-serif text-sm font-bold">{stock.name}</p>
                  <p className="font-mono text-[10px] text-[#cec6ad]">{stock.desc}</p>
                </div>
                {paperStock === stock.id && (
                  <span className="w-3 h-3 rounded-full bg-[#ffb77b] border border-white flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ink Pot Reservoir */}
        <div className="bg-[#12110a] text-[#ffdcc2] p-3.5 rounded-lg border border-[#8c4f10] shadow-inner">
          <div className="flex justify-between items-center mb-1.5 font-mono text-[10px]">
            <span className="uppercase text-[#8c4f10] font-bold">INK RESERVOIR</span>
            <span className="text-[#ffb77b] font-bold">82% FULL</span>
          </div>
          <div className="w-full bg-[#2b2716] h-2 rounded-full overflow-hidden border border-[#8c4f10]/40 mb-1.5">
            <div className="bg-gradient-to-r from-[#8c4f10] to-[#ffdcc2] h-full w-[82%]" />
          </div>
          <p className="font-serif text-[11px] text-[#cec6ad] italic">
            "The pen is the tongue of the soul."
          </p>
        </div>
      </div>

      {/* THE PARCHMENT CODICE EDITOR (HIGH DENSITY & EXACT 8-POINT SPACING) */}
      <div className={`relative rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 transition-colors duration-500 ${selectedStockObj.style}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#8c4f10]/30 pb-4 mb-6 gap-3">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c4f10] font-bold block mb-0.5">
              MEMORANDUM & CODICE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b1c1c]">Drafting Chamber</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sounds.playCorkPop();
                setIsDrawerOpen(true);
              }}
              className="min-h-[44px] px-4 py-2 bg-[#610000] hover:bg-[#8b0000] text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-all"
            >
              <span>✍️ Desk Accessories</span>
            </button>
            <div className="text-right hidden sm:block">
              <span className="font-mono text-[10px] text-[#8c4f10] block font-bold">DATE OF ISSUE</span>
              <span className="font-serif text-xs sm:text-sm text-[#1b1c1c] italic">
                {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Form Editor */}
        <form onSubmit={handleSealAndSend} className="space-y-4 sm:space-y-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-[#8c4f10] font-bold block mb-1">
                RECIPIENT (TO)
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                placeholder="e.g. Lady Beatrice, High Tower"
                className="w-full min-h-[44px] p-3 bg-white/80 border border-[#8c4f10]/60 rounded-lg font-serif text-base text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000] shadow-sm"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-[#8c4f10] font-bold block mb-1">
                TITLE OF CODICE
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                placeholder="e.g. Treaty of the Northern Sea"
                className="w-full min-h-[44px] p-3 bg-white/80 border border-[#8c4f10]/60 rounded-lg font-serif text-base text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000] shadow-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-center mb-1.5 gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-[#8c4f10] font-bold block">
                MISSIVE CONTENT (QUILL PEN INK)
              </label>
              <div className="font-mono text-[11px] text-[#8c4f10] font-bold flex flex-wrap gap-2 sm:gap-3 bg-white/60 px-2.5 py-1 rounded-md border border-[#8c4f10]/30">
                <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
                <span>•</span>
                <span>Chars: {content.length}</span>
                <span>•</span>
                <span className="text-[#610000]">
                  Dispatch Fare: £ {Math.max(10, Math.ceil((content.trim() ? content.trim().split(/\s+/).length : 0) / 20) * 10)} Gold
                </span>
              </div>
            </div>
            <textarea
              required
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => sounds.playQuillWrite()}
              placeholder="Dip your quill and write your message across the centuries..."
              className="w-full p-4 sm:p-5 bg-white/80 border border-[#8c4f10]/60 rounded-xl font-serif text-base leading-relaxed text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000] resize-y shadow-inner"
            />
          </div>

          {/* Signature & Seal Area */}
          <div className="pt-6 border-t border-[#8c4f10]/30 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-left">
              <span className="font-mono text-[11px] text-[#8c4f10] uppercase font-bold block mb-0.5">CALLIGRAPHY SIGNATURE</span>
              <p className="font-serif text-xl sm:text-2xl text-[#610000] font-bold italic -rotate-1">
                {persona?.name ? `${persona.name}, S.D.` : "Prakhar Rai, S.D."}
              </p>
              <span className="font-mono text-[10px] text-[#5a403c] block mt-0.5">Authenticated Guild Member Signet</span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              {/* Visual Seal Preview Button */}
              <div className="relative w-full sm:w-auto">
                {isSealing && (
                  <motion.div
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 rounded-lg backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/40 font-serif font-bold text-white uppercase text-[10px] text-center p-1.5"
                      style={{ backgroundColor: pigment }}
                      initial={{ scale: 3, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      IMPRINTING...
                    </motion.div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSealing || isSent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 sm:px-8 sm:py-3.5 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-base font-bold tracking-widest uppercase rounded-lg shadow-xl transition-colors flex items-center justify-center gap-3 border border-[#ffdcc2]/40"
                >
                  <span>{isSent ? "CODICE DISPATCHED ✓" : "SEAL & SEND CODICE"}</span>
                  <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center shadow-inner flex-shrink-0" style={{ backgroundColor: pigment }}>
                    <span className="w-2 h-2 rounded-full bg-white/70"></span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </form>

        {/* Success Banner */}
        {isSent && (
          <motion.div
            className="absolute top-4 right-4 left-4 bg-green-900 text-white p-4 rounded-xl shadow-2xl border border-green-400 flex items-center justify-between z-40"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2.5 font-serif font-bold text-sm">
              <span className="text-xl">✓</span>
              <span>Codice stamped in hot wax and broadcast to the central Archive!</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scriptorium;
