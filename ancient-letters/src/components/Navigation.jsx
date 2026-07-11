import React from "react";
import { sounds } from "../audio/soundEngine";

const Navigation = ({ currentTab, setCurrentTab, unreadCount, persona, currentGold = 1000, onOpenGoldExchange, onOpenAuth, onOpenProfile }) => {
  const tabs = [
    { id: "archive", label: "The Archive", desc: "Vault No. 1894" },
    { id: "scriptorium", label: "The Scriptorium", desc: "Write Codice" },
    { id: "fleet", label: "The Fleet", desc: "Logistics & Ships" },
    { id: "ledger", label: "My Ledger", desc: "Senior Dispatcher" },
    { id: "secret", label: "Secret Library", desc: "Occult Encrypted" },
    { id: "ocean", label: "Ocean Shore", desc: "Sea Bottles" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f0eded]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-[#8e706b]/30">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Header */}
        <div
          className="flex items-center gap-3.5 cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
          onClick={() => {
            sounds.playParchmentUnroll();
            setCurrentTab("archive");
          }}
        >
          <div className="h-12 w-12 rounded-full border-2 border-[#8c4f10] shadow-md overflow-hidden bg-[#610000] p-0.5 flex-shrink-0">
            <img
              alt="The Courier Wax Seal Logo"
              className="h-full w-full object-cover rounded-full filter contrast-125"
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
            />
          </div>
          <span className="font-serif text-2xl md:text-3xl text-[#610000] font-bold tracking-tight hidden sm:inline">
            The Alchemist's Courier
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-5">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playCorkPop();
                  setCurrentTab(tab.id);
                }}
                className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 transition-all relative ${
                  isActive
                    ? "text-[#610000] font-bold underline decoration-[#8c4f10] decoration-2 underline-offset-8 scale-105"
                    : "text-[#5a403c] hover:text-[#610000]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === "archive" && unreadCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-red-700 text-white rounded-full text-[9px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls & Exchequer Gold Pill */}
        <div className="flex items-center gap-3">
          {/* Mobile Tab SelectorDropdown */}
          <div className="block xl:hidden">
            <select
              value={currentTab}
              onChange={(e) => {
                sounds.playCorkPop();
                setCurrentTab(e.target.value);
              }}
              className="bg-white border border-[#8c4f10] text-[#610000] font-mono text-xs rounded px-2 py-1.5 font-bold"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Sovereign Bullion Pill (Click to open Sovereign Exchange ₹ INR payment page!) */}
          <button
            onClick={() => {
              sounds.playCorkPop();
              if (onOpenGoldExchange) onOpenGoldExchange();
            }}
            title="Sovereign Exchequer: Acquire Gold Bullion via ₹ INR"
            className="flex items-center gap-2 bg-[#1f1c0b] hover:bg-[#302c1a] text-[#ffdcc2] px-3 py-1.5 rounded-full border border-[#8c4f10] shadow transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#8c4f10] to-[#ffdcc2] p-0.5 flex items-center justify-center overflow-hidden">
              <img
                alt="Gold Coin"
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-serif font-bold text-sm text-[#ffb77b]">£ {currentGold}</span>
            <span className="font-mono text-[10px] bg-[#610000] text-white px-1.5 py-0.5 rounded group-hover:bg-[#8b0000] font-bold">
              + BUY
            </span>
          </button>

          {/* Search Button */}
          <button
            className="p-2 rounded-full hover:bg-[#eae7e7] text-[#5a403c] hover:text-[#1b1c1c] transition-colors"
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

          {/* Profile & Auth Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playParchmentUnroll();
                if (onOpenProfile) onOpenProfile();
              }}
              title="Customize Guild Member Profile"
              className="flex items-center gap-2 bg-[#eae7e7]/80 hover:bg-[#eae7e7] px-3 py-1.5 rounded-full border border-[#8c4f10]/30 transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-full border border-[#8c4f10] p-0.5 overflow-hidden bg-white">
                <img
                  alt="Profile Portrait"
                  className="w-full h-full rounded-full object-cover"
                  src={persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                />
              </div>
              <span className="hidden sm:inline font-serif text-sm font-bold text-[#1b1c1c]">
                {persona?.name?.split(" ")[0] || "Elias"}
              </span>
            </button>

            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenAuth) onOpenAuth();
              }}
              title="Guild Ledger Login & Membership Registry"
              className="px-3 py-1.5 bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-[11px] uppercase tracking-wider rounded-full shadow font-bold transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
