import React, { useState, useEffect } from "react";
import { sounds } from "../audio/soundEngine";

const Navigation = ({
  currentTab,
  setCurrentTab,
  unreadCount,
  persona,
  currentGold = 1000,
  onOpenGoldExchange,
  onOpenAuth,
  onOpenProfile,
  onOpenShare,
  onOpenManual,
  onOpenProducerCredits
}) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (isLocked) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > 110 && currentScrollY > lastScrollY) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setIsHeaderHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    const handleMouseMove = (e) => {
      if (isLocked) return;
      if (e.clientY <= 80) {
        setIsHeaderHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLocked]);

  const tabs = [
    { id: "archive", label: "The Archive", desc: "Vault No. 1894", icon: "🏛️" },
    { id: "scriptorium", label: "The Scriptorium", desc: "Write Codice", icon: "✍️" },
    { id: "fleet", label: "The Fleet", desc: "Logistics & Ships", icon: "⛵" },
    { id: "ledger", label: "My Ledger", desc: "Senior Dispatcher", icon: "📜" },
    { id: "secret", label: "Secret Library", desc: "Occult Encrypted", icon: "🔐" },
    { id: "ocean", label: "Ocean Shore", desc: "Sea Bottles", icon: "🌊" }
  ];

  return (
    <>
      {/* Top Edge Hover Trigger for full-view retrieval */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-[60] bg-transparent"
        onMouseEnter={() => setIsHeaderHidden(false)}
      />

      {/* Slide-Out Left Realm Navigator Drawer (Hover/Click Activated) */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-80 sm:w-96 bg-[#1f1c0b] text-[#ffdcc2] border-r-4 border-[#8c4f10] shadow-[25px_0_90px_rgba(0,0,0,0.98)] z-[70] p-6 overflow-y-auto transition-transform duration-500 ease-in-out ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setIsNavOpen(false)}
      >
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#8c4f10]/40">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold block">
              GUILD REALMS
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">Select Chamber</h3>
          </div>
          <button
            onClick={() => {
              sounds.playCorkPop();
              setIsNavOpen(false);
            }}
            className="p-2 bg-[#610000] hover:bg-[#8b0000] text-white rounded-full font-bold text-sm w-8 h-8 flex items-center justify-center shadow"
            title="Close Realms Menu"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  sounds.playParchmentUnroll();
                  setCurrentTab(tab.id);
                  setIsNavOpen(false);
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  isActive
                    ? "bg-[#302c1a] border-[#ffb77b] shadow text-white scale-105"
                    : "bg-[#2b2716] border-[#8c4f10]/40 hover:bg-[#3d3822] text-[#ffdcc2]"
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-serif text-base font-bold">{tab.label}</p>
                    {tab.id === "archive" && unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-red-700 text-white rounded-full text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-[#cec6ad]">{tab.desc}</p>
                </div>
                {isActive && <span className="text-[#ffb77b] font-bold text-lg">→</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-[#8c4f10]/30 text-center">
          <p className="font-mono text-xs text-[#8c4f10] uppercase font-bold">THE ALCHEMIST'S COURIER</p>
          <p className="font-serif text-xs text-[#cec6ad] italic mt-1">© 1894–2026 Prakhar Rai • Lead Producer</p>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#f0eded]/95 backdrop-blur-md shadow-[0_6px_25px_rgba(0,0,0,0.5)] border-b border-[#8e706b]/40 transition-transform duration-500 ease-in-out ${
          isHeaderHidden && !isLocked ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* TIER 1: TOP GUILD HEADER ROW (Spacious, Zero Tab Squishing, Zero Profile Cut-offs!) */}
        <div className="h-16 w-full max-w-full px-3 sm:px-6 md:px-8 flex items-center justify-between gap-3 border-b border-[#8c4f10]/20">
          {/* Brand & Left Navigation Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={() => {
                sounds.playCorkPop();
                setIsNavOpen(true);
              }}
              title="Open Guild Realms Drawer (Switch Chamber)"
              className="flex items-center gap-1.5 bg-[#610000] hover:bg-[#8b0000] text-white px-3 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow transition-transform hover:scale-105 flex-shrink-0"
            >
              <span>🧭 Realms</span>
            </button>

            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              onClick={() => {
                sounds.playParchmentUnroll();
                setCurrentTab("archive");
              }}
            >
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[#8c4f10] shadow overflow-hidden bg-[#610000] p-0.5 flex-shrink-0">
                <img
                  alt="The Courier Wax Seal Logo"
                  className="h-full w-full object-cover rounded-full filter contrast-125"
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                />
              </div>
              <span className="font-serif text-lg sm:text-xl md:text-2xl text-[#610000] font-bold tracking-tight hidden sm:inline whitespace-nowrap">
                The Alchemist's Courier
              </span>
            </div>
          </div>

          {/* TIER 1 RIGHT CONTROLS: Placed with ample space & margin-right padding so Profile NEVER overflows */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto pr-1 sm:pr-4">
            {/* Sovereign Bullion Pill */}
            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenGoldExchange) onOpenGoldExchange();
              }}
              title="Sovereign Exchequer: Acquire Gold Bullion via ₹ INR"
              className="flex items-center gap-1.5 bg-[#1f1c0b] hover:bg-[#302c1a] text-[#ffdcc2] px-2.5 sm:px-3 py-1.5 rounded-full border border-[#8c4f10] shadow transition-all group flex-shrink-0 whitespace-nowrap"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-[#8c4f10] to-[#ffdcc2] p-0.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  alt="Gold Coin"
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm text-[#ffb77b]">£ {currentGold}</span>
              <span className="font-mono text-[9px] sm:text-[10px] bg-[#610000] text-white px-1.5 py-0.5 rounded group-hover:bg-[#8b0000] font-bold">
                + BUY
              </span>
            </button>

            {/* Search Button */}
            <button
              className="p-1.5 sm:p-2 rounded-full hover:bg-[#eae7e7] text-[#5a403c] hover:text-[#1b1c1c] transition-colors flex-shrink-0"
              onClick={() => {
                sounds.playQuillWrite();
                alert("Alchemical Registry Search: Indexing 4,800 historical guild volumes across London and Spitalfields.");
              }}
              title="Search Archives"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Add People / Share Button */}
            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenShare) onOpenShare();
              }}
              title="Add Wayfarers & Share Referral Code (+200 Gold Reward)"
              className="hidden lg:flex items-center gap-1 bg-[#610000]/10 hover:bg-[#610000] text-[#610000] hover:text-white px-2.5 py-1 rounded-full border border-[#610000]/40 font-mono text-[11px] font-bold uppercase transition-all flex-shrink-0 whitespace-nowrap shadow-sm"
            >
              <span>+ Add People</span>
            </button>

            {/* Help & Manual Button */}
            <button
              onClick={() => {
                sounds.playParchmentUnroll();
                if (onOpenManual) onOpenManual();
              }}
              title="The Grand Manual & Guide — How Everything Works"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eae7e7] hover:bg-[#8c4f10] text-[#8c4f10] hover:text-white border border-[#8c4f10]/40 font-bold text-sm transition-all flex-shrink-0 shadow-sm"
            >
              ❓
            </button>

            {/* Producer Credits Button */}
            <button
              onClick={() => {
                sounds.playWaxSeal();
                if (onOpenProducerCredits) onOpenProducerCredits();
              }}
              title="Producer Credits & Rights Reserved — Prakhar Rai"
              className="hidden xl:flex items-center gap-1 bg-[#302c1a] hover:bg-[#610000] text-[#ffdcc2] px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all flex-shrink-0 whitespace-nowrap shadow"
            >
              <span>🏛️ Producer</span>
            </button>

            {/* Lock / Auto-Hide Toggle */}
            <button
              onClick={() => {
                sounds.playCorkPop();
                setIsLocked(!isLocked);
              }}
              title={isLocked ? "Top & Bottom Bars Pinned (Click to enable Auto-Hide slide)" : "Auto-Hide Active (Click to Pin bars in place)"}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold transition-all flex-shrink-0 whitespace-nowrap border ${
                isLocked
                  ? "bg-[#610000] text-white border-white shadow"
                  : "bg-white/80 text-[#5a403c] border-[#8c4f10]/30 hover:bg-[#eae7e7]"
              }`}
            >
              <span>{isLocked ? "🔒 Pinned" : "👁️ Auto-Hide"}</span>
            </button>

            {/* Profile & Auth Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  sounds.playParchmentUnroll();
                  if (onOpenProfile) onOpenProfile();
                }}
                title="Customize Guild Member Profile"
                className="flex items-center gap-2 bg-[#eae7e7]/90 hover:bg-[#eae7e7] px-2.5 sm:px-3.5 py-1 rounded-full border border-[#8c4f10]/40 transition-all shadow-sm flex-shrink-0 whitespace-nowrap"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8c4f10] p-0.5 overflow-hidden bg-white flex-shrink-0">
                  <img
                    alt="Profile Portrait"
                    className="w-full h-full rounded-full object-cover"
                    src={persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                  />
                </div>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#1b1c1c] max-w-[80px] sm:max-w-none truncate">
                  {persona?.name?.split(" ")[0] || "Prakhar"}
                </span>
              </button>

              <button
                onClick={() => {
                  sounds.playCorkPop();
                  if (onOpenAuth) onOpenAuth();
                }}
                title="Guild Ledger Login & Membership Registry"
                className="px-3 sm:px-4 py-1.5 bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider rounded-full shadow font-bold transition-all flex-shrink-0 whitespace-nowrap"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* TIER 2: DEDICATED REALM SWITCHER BAR (Full visibility across ALL 6 tabs without squishing!) */}
        <nav className="h-11 bg-[#1f1c0b] text-[#ffdcc2] border-t border-[#8c4f10]/30 flex items-center justify-start sm:justify-center gap-2 sm:gap-6 md:gap-8 px-4 sm:px-8 overflow-x-auto no-scrollbar w-full shadow-inner">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playCorkPop();
                  setCurrentTab(tab.id);
                }}
                className={`font-mono text-xs sm:text-sm uppercase tracking-widest px-3 py-1 flex items-center gap-2 flex-shrink-0 transition-all relative whitespace-nowrap ${
                  isActive
                    ? "text-[#ffb77b] font-bold underline decoration-[#ffb77b] decoration-2 underline-offset-8 scale-105"
                    : "text-[#cec6ad] hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === "archive" && unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-600 text-white rounded-full text-[9px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>
    </>
  );
};

export default Navigation;
