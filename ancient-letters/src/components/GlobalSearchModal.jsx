import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const GlobalSearchModal = ({
  isOpen,
  onClose,
  letters = [],
  bottles = [],
  onNavigateTab,
  onSelectLetter,
  onSelectBottle
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all"); // 'all', 'realms', 'letters', 'bottles', 'archives'
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        sounds.playQuillWrite();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Historical London & Spitalfields Simulated Archive Records
  const historicalRecords = [
    { id: "h1", title: "Spitalfields Silk Weaver Royal Charter (1689)", desc: "Charter granting alchemical dye privileges to immigrant master weavers.", realm: "archive", tag: "Historical Record" },
    { id: "h2", title: "Royal Society Alchemical Mercury Ledger (1704)", desc: "Recorded by Sir Isaac Newton regarding transmutation of lead ingots.", realm: "secret", tag: "Classified Tome" },
    { id: "h3", title: "East India Company Dispatch Clipper #44 Log", desc: "Logbook detailing spice route maritime ciphers and carrier pigeon nests.", realm: "fleet", tag: "Maritime Log" },
    { id: "h4", title: "Gargoyle Crypt Passcode Entry (Spitalfields 1812)", desc: "Secret rot-7 cipher keys stored in the underground brick catacombs.", realm: "secret", tag: "Cipher Key" },
    { id: "h5", title: "Victorian Postmaster General Sovereign Tariff (1891)", desc: "Exchequer fee schedule for intercontinental pneumatic tube letters.", realm: "ledger", tag: "Tariff Document" },
    { id: "h6", title: "Azores Galleon Deepwater Wreckage Coordinates", desc: "Drifting sea bottle charts cataloged between 1712 and 1850.", realm: "ocean", tag: "Ocean Chart" }
  ];

  const realms = [
    { id: "archive", title: "The Archive Vault", desc: "Browse all 4,800 historical correspondences and letters.", icon: "🏛️" },
    { id: "scriptorium", title: "The Scriptorium", desc: "Imprint fresh parchment codices and dispatch letters.", icon: "✍️" },
    { id: "fleet", title: "Fleet & Carrier Logistics", desc: "Manage 12 homing pigeons and 3 deepwater clipper ships.", icon: "⛵" },
    { id: "ledger", title: "Senior Dispatcher Ledger", desc: "Review Exchequer balance, rewards, and transit manifests.", icon: "📜" },
    { id: "secret", title: "Secret Occult Library", desc: "Break lead signet seals and decrypt Caesar-shift ciphers.", icon: "🔐" },
    { id: "ocean", title: "Starlit Ocean Shore", desc: "Toss glass bottles to the waves or reply to washed ashore scrolls.", icon: "🌊" }
  ];

  // Filter items
  const qClean = query.toLowerCase().trim();

  const filteredRealms = realms.filter((r) =>
    r.title.toLowerCase().includes(qClean) || r.desc.toLowerCase().includes(qClean)
  );

  const filteredLetters = letters.filter((l) =>
    l.title.toLowerCase().includes(qClean) ||
    l.sender.toLowerCase().includes(qClean) ||
    l.content.toLowerCase().includes(qClean)
  );

  const filteredBottles = bottles.filter((b) =>
    b.title.toLowerCase().includes(qClean) ||
    b.sender.toLowerCase().includes(qClean) ||
    b.content.toLowerCase().includes(qClean)
  );

  const filteredArchives = historicalRecords.filter((h) =>
    h.title.toLowerCase().includes(qClean) ||
    h.desc.toLowerCase().includes(qClean) ||
    h.tag.toLowerCase().includes(qClean)
  );

  // Build unified result list based on category
  const results = [];
  if (activeCategory === "all" || activeCategory === "realms") {
    filteredRealms.forEach((item) => results.push({ type: "realm", data: item }));
  }
  if (activeCategory === "all" || activeCategory === "letters") {
    filteredLetters.forEach((item) => results.push({ type: "letter", data: item }));
  }
  if (activeCategory === "all" || activeCategory === "bottles") {
    filteredBottles.forEach((item) => results.push({ type: "bottle", data: item }));
  }
  if (activeCategory === "all" || activeCategory === "archives") {
    filteredArchives.forEach((item) => results.push({ type: "archive", data: item }));
  }

  const handleSelectResult = (item) => {
    sounds.playCorkPop();
    if (item.type === "realm") {
      if (onNavigateTab) onNavigateTab(item.data.id);
    } else if (item.type === "letter") {
      if (onNavigateTab) onNavigateTab("archive");
      if (onSelectLetter) onSelectLetter(item.data);
    } else if (item.type === "bottle") {
      if (onNavigateTab) onNavigateTab("ocean");
      if (onSelectBottle) onSelectBottle(item.data);
    } else if (item.type === "archive") {
      if (onNavigateTab) onNavigateTab(item.data.realm);
      alert(`Accessing Historical Record: "${item.data.title}" from the Spitalfields Guild Vault.`);
    }
    onClose();
  };

  // Keyboard Up/Down/Enter navigation
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      sounds.playQuillWrite();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
      sounds.playQuillWrite();
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl bg-[#1f1c0b] text-[#ffdcc2] rounded-2xl border-2 border-[#8c4f10] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        >
          {/* SEARCH INPUT BAR */}
          <div className="p-4 sm:p-6 border-b border-[#8c4f10]/40 flex items-center gap-4 bg-[#181508]">
            <svg className="w-6 h-6 text-[#ffb77b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search letters, codices, dispatches, ciphers, or 4,800 historical records... (Press Esc to exit)"
              className="w-full bg-transparent border-none font-serif text-base sm:text-lg text-white placeholder-[#8c4f10] focus:outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#302c1a] text-xs font-mono text-[#cec6ad] uppercase"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#302c1a] hover:bg-[#610000] text-white text-sm font-mono transition-colors"
              title="Close Omni-Search (Esc)"
            >
              ESC
            </button>
          </div>

          {/* CATEGORY FILTER CHIPS */}
          <div className="px-4 py-3 bg-[#2b2716]/60 border-b border-[#8c4f10]/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "All Results", count: results.length },
              { id: "realms", label: "Chambers", count: filteredRealms.length },
              { id: "letters", label: "Correspondence", count: filteredLetters.length },
              { id: "bottles", label: "Sea Bottles", count: filteredBottles.length },
              { id: "archives", label: "Historical Records", count: filteredArchives.length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playCorkPop();
                  setActiveCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#610000] text-white border border-[#ffb77b] shadow"
                    : "bg-[#1f1c0b] text-[#cec6ad] hover:text-white border border-[#8c4f10]/30"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] ${activeCategory === cat.id ? "bg-black/40 text-[#ffb77b]" : "bg-[#302c1a] text-[#8c4f10]"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* RESULTS LIST AREA */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#302c1a] border border-[#8c4f10] flex items-center justify-center mx-auto mb-3 text-2xl">
                  🔍
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">No Alchemical Records Found</h4>
                <p className="font-mono text-xs text-[#cec6ad]">
                  No correspondence or guild codices match "{query}". Try searching for 'Transmutation', 'Gargoyle', or 'Spitalfields'.
                </p>
              </div>
            ) : (
              results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.data.id || idx}`}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`min-h-[56px] p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#302c1a] border-[#ffb77b] text-white shadow-lg scale-[1.01] border-l-4 border-l-[#610000]"
                        : "bg-[#252112]/80 border-[#8c4f10]/30 hover:bg-[#2b2716] text-[#ffdcc2]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#181508] border border-[#8c4f10]/50 flex items-center justify-center text-xl flex-shrink-0">
                        {item.type === "realm" && item.data.icon}
                        {item.type === "letter" && "📜"}
                        {item.type === "bottle" && "🍾"}
                        {item.type === "archive" && "🏛️"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#610000]/40 border border-[#610000] font-mono text-[9px] uppercase font-bold text-[#ffb77b]">
                            {item.type === "realm" && "CHAMBER"}
                            {item.type === "letter" && "DISPATCH"}
                            {item.type === "bottle" && "SEA BOTTLE"}
                            {item.type === "archive" && item.data.tag}
                          </span>
                          {item.data.date && <span className="font-mono text-[9px] text-[#cec6ad] truncate">{item.data.date}</span>}
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-white truncate">
                          {item.data.title}
                        </h4>
                        <p className="font-mono text-xs text-[#cec6ad] truncate">
                          {item.data.desc || item.data.content || `From: ${item.data.sender}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-[10px] uppercase text-[#8c4f10] hidden sm:inline">
                        {item.type === "realm" ? "Open Realm" : "View Record"}
                      </span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isSelected ? "bg-[#610000] text-white" : "bg-[#181508] text-[#cec6ad]"}`}>
                        ↵
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER SHORTCUT HINTS */}
          <div className="px-4 sm:px-6 py-3 bg-[#181508] border-t border-[#8c4f10]/40 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#cec6ad]">
            <div className="flex items-center gap-4">
              <span><strong className="text-[#ffb77b]">↑↓</strong> Navigate</span>
              <span><strong className="text-[#ffb77b]">↵ Enter</strong> Select</span>
              <span><strong className="text-[#ffb77b]">Esc</strong> Exit</span>
            </div>
            <span>INDEX STATUS: 4,800 Spitalfields & London Guild Records Indexed</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GlobalSearchModal;
