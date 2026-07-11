import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const ProfileCustomizerModal = ({ onClose, persona, onSavePersona }) => {
  const [name, setName] = useState(persona?.name || "Elias Vance");
  const [title, setTitle] = useState(persona?.title || "Senior Dispatcher");
  const [avatarUrl, setAvatarUrl] = useState(
    persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  );
  const [waxColor, setWaxColor] = useState(persona?.waxColor || "#610000");
  const [crest, setCrest] = useState(persona?.crest || "shield");

  const portraits = [
    {
      id: "p1",
      label: "Senior Dispatcher Elias",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "p2",
      label: "Grand Archivist Aurelia",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "p3",
      label: "Master of Ships Josiah",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "p4",
      label: "Alchemist Aurelius",
      url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "p5",
      label: "Shadow Courier Thorne",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "p6",
      label: "Lady Beatrice of Spitalfields",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const pigments = [
    { id: "#610000", name: "Crimson Red" },
    { id: "#8c4f10", name: "Amber Gold" },
    { id: "#30422f", name: "Forest Emerald" },
    { id: "#1e3a8a", name: "Royal Sapphire" }
  ];

  const crests = [
    { id: "shield", label: "Shield", imgUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=150&auto=format&fit=crop" },
    { id: "book", label: "Codex", imgUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=150&auto=format&fit=crop" },
    { id: "quill", label: "Quill", imgUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=150&auto=format&fit=crop" },
    { id: "compass", label: "Compass", imgUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=150&auto=format&fit=crop" }
  ];

  const titlesList = [
    "Senior Dispatcher",
    "Grand Scriptorium Archivist",
    "Master of Ships",
    "High Alchemist",
    "Shadow Courier",
    "Chief Postal Clerk",
    "Wandering Wayfarer"
  ];

  const handleSave = (e) => {
    if (e) e.preventDefault();
    sounds.playWaxSeal();

    const updated = {
      ...persona,
      name: name.trim(),
      title: title.trim(),
      avatarUrl: avatarUrl.trim(),
      waxColor,
      crest
    };

    if (onSavePersona) onSavePersona(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        className="relative w-full max-w-2xl bg-[#fcf9f8] text-[#1b1c1c] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-4 border-[#8c4f10] overflow-hidden my-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <div className="bg-[#1f1c0b] text-[#ffdcc2] p-6 border-b-2 border-[#8c4f10] flex justify-between items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8c4f10] font-bold block">
              GUILD MEMBERSHIP REGISTRY
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">Customize Member Credentials</h2>
          </div>
          <button onClick={onClose} className="text-[#cec6ad] hover:text-white text-2xl font-bold p-2">
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Live Preview Header Card */}
          <div className="bg-[#ebe2c8]/60 p-5 rounded-xl border border-[#8c4f10]/40 flex items-center gap-5 shadow-inner">
            <div className="relative w-20 h-20 rounded-full border-4 border-[#8c4f10] shadow-md overflow-hidden flex-shrink-0">
              <img
                alt="Portrait Preview"
                src={avatarUrl}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";
                }}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#8c4f10] font-bold">CERTIFIED CREDENTIAL PREVIEW</span>
              <h3 className="font-serif text-2xl font-bold text-[#610000]">{name || "Guild Member"}</h3>
              <p className="font-serif text-sm text-[#5a403c] italic">{title || "Courier"}</p>
              <p className="font-serif text-xl text-[#610000] font-bold -rotate-2 mt-1 italic">
                {name ? `${name.split(" ")[0][0]}. ${name.split(" ").slice(-1)[0]}, S.D.` : "Calligraphy Signature"}
              </p>
            </div>
          </div>

          {/* Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => sounds.playQuillWrite()}
                className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-base text-[#1b1c1c]"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">
                GUILD TITLE
              </label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-base text-[#1b1c1c]"
              >
                {titlesList.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Portrait Gallery */}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-3">
              SELECT PORTRAIT FROM GUILD GALLERY (OR ENTER CUSTOM URL BELOW)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-3">
              {portraits.map((p) => (
                <div
                  key={p.id}
                  onClick={() => { sounds.playCorkPop(); setAvatarUrl(p.url); }}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all p-1 text-center ${avatarUrl === p.url ? "border-[#610000] ring-4 ring-[#8c4f10]/40 scale-105" : "border-transparent opacity-80 hover:opacity-100"}`}
                >
                  <img alt={p.label} src={p.url} className="w-full h-14 object-cover rounded" />
                  <span className="font-mono text-[9px] text-[#5a403c] block truncate mt-1">{p.label.split(" ")[0]}</span>
                </div>
              ))}
            </div>
            <input
              type="url"
              placeholder="Or paste custom picture URL (e.g., https://...)"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#8c4f10] rounded-lg font-mono text-xs text-[#1b1c1c]"
            />
          </div>

          {/* Signet Pigment */}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-2">
              SIGNET WAX PIGMENT
            </label>
            <div className="flex gap-4">
              {pigments.map((pig) => (
                <button
                  key={pig.id}
                  type="button"
                  onClick={() => { sounds.playWaxSeal(); setWaxColor(pig.id); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-serif text-xs font-bold transition-all ${waxColor === pig.id ? "border-[#8c4f10] bg-[#ebe2c8] shadow scale-105" : "border-[#e3beb8] bg-white opacity-80"}`}
                >
                  <span className="w-5 h-5 rounded-full shadow" style={{ backgroundColor: pig.id }}></span>
                  <span>{pig.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Signet Engraving Motif (Authentic Images, No Emojis!) */}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-2">
              SIGNET ENGRAVING MOTIF
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {crests.map((cr) => (
                <button
                  key={cr.id}
                  type="button"
                  onClick={() => { sounds.playCorkPop(); setCrest(cr.id); }}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${crest === cr.id ? "border-[#610000] bg-[#ebe2c8] shadow-md scale-105" : "border-[#e3beb8] bg-white hover:bg-[#f6f3f2]"}`}
                >
                  <img alt={cr.label} src={cr.imgUrl} className="w-12 h-12 rounded object-cover shadow border border-[#8c4f10]/30" />
                  <span className="font-serif text-xs font-bold text-[#1b1c1c] uppercase tracking-wider">{cr.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-stone-300 hover:bg-stone-400 text-[#1b1c1c] font-serif text-sm font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-sm font-bold uppercase tracking-wider rounded-lg shadow-xl transition-transform hover:scale-105"
            >
              Imprint Seal & Save Credentials
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileCustomizerModal;
