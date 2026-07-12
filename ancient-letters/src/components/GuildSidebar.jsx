import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const GuildSidebar = ({
  currentTab,
  setCurrentTab,
  unreadCount = 0,
  persona,
  currentGold = 1000,
  onOpenGoldExchange,
  onOpenProfile,
  onOpenShare,
  onOpenManual,
  onOpenProducerCredits,
  onOpenSearch,
  onOpenNotifications,
  onOpenSettings,
  onOpenSupportHub,
  notificationCount = 0,
  isCollapsed,
  setIsCollapsed,
  sidebarWidth,
  setSidebarWidth
}) => {
  const [openSections, setOpenSections] = useState({
    guild: true,
    messages: false,
    dispatches: false,
    fleet: false,
    security: false,
    settings: false,
    support: false
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const sidebarRef = useRef(null);

  // Check mobile screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard shortcuts: Ctrl+B or Ctrl+\ to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B" || e.key === "\\")) {
        e.preventDefault();
        sounds.playCorkPop();
        if (isMobile) {
          setIsMobileOpen((prev) => !prev);
        } else {
          setIsCollapsed((prev) => {
            const nextState = !prev;
            localStorage.setItem("alchemist_sidebar_collapsed", JSON.stringify(nextState));
            return nextState;
          });
        }
      } else if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, isMobileOpen, setIsCollapsed]);

  // Resizable Drag Handle Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = Math.min(Math.max(e.clientX, 200), 340);
      setSidebarWidth(newWidth);
      localStorage.setItem("alchemist_sidebar_width", newWidth.toString());
      if (isCollapsed && newWidth > 120) {
        setIsCollapsed(false);
        localStorage.setItem("alchemist_sidebar_collapsed", "false");
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = "default";
      }
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, isCollapsed, setIsCollapsed, setSidebarWidth]);

  const toggleSection = (sectionKey) => {
    sounds.playCorkPop();
    if (isCollapsed) {
      setIsCollapsed(false);
      localStorage.setItem("alchemist_sidebar_collapsed", "false");
    }
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const primaryTabs = [
    { id: "archive", label: "The Archive", desc: "Vault No. 1894", icon: "🏛️" },
    { id: "scriptorium", label: "The Scriptorium", desc: "Write Codice", icon: "✍️" },
    { id: "fleet", label: "The Fleet", desc: "Logistics & Ships", icon: "⛵" },
    { id: "ledger", label: "My Ledger", desc: "Senior Dispatcher", icon: "📜" },
    { id: "secret", label: "Secret Library", desc: "Occult Encrypted", icon: "🔐" },
    { id: "ocean", label: "Ocean Shore", desc: "Sea Bottles", icon: "🌊" }
  ];

  const toggleSidebarState = () => {
    sounds.playCorkPop();
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed((prev) => {
        const nextState = !prev;
        localStorage.setItem("alchemist_sidebar_collapsed", JSON.stringify(nextState));
        return nextState;
      });
    }
  };

  const currentEffectiveWidth = isMobile ? (isMobileOpen ? 280 : 0) : (isCollapsed ? 72 : sidebarWidth);

  return (
    <>
      {/* Mobile Hamburger Top Header (When on mobile screen) */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#1f1c0b]/95 backdrop-blur-md border-b-2 border-[#8c4f10] z-40 px-4 flex items-center justify-between shadow-xl text-[#ffdcc2]">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebarState}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#610000] text-white hover:bg-[#8b0000] shadow transition-all font-bold text-lg"
              title="Toggle Guild Sidebar (Ctrl+B)"
            >
              ☰
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#610000] border border-[#8c4f10] overflow-hidden flex-shrink-0">
                <img
                  alt="Guild Crest"
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-cover filter contrast-125"
                />
              </div>
              <span className="font-serif text-base font-bold text-white tracking-tight">The Alchemist's Courier</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenNotifications) onOpenNotifications();
              }}
              className="min-h-[38px] w-[38px] bg-[#1f1c0b] border border-[#8c4f10] rounded-full flex items-center justify-center relative shadow-sm text-base"
              title="Guild Notifications"
            >
              <span>🔔</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                sounds.playCorkPop();
                if (onOpenGoldExchange) onOpenGoldExchange();
              }}
              className="min-h-[38px] px-3 py-1 bg-[#1f1c0b] border border-[#8c4f10] rounded-full flex items-center gap-1.5 text-xs font-serif text-[#ffb77b] shadow-sm"
            >
              <span>🪙</span>
              <span className="font-bold">£ {currentGold}</span>
            </button>
            <button
              onClick={() => {
                sounds.playParchmentUnroll();
                if (onOpenProfile) onOpenProfile();
              }}
              className="w-9 h-9 rounded-full border-2 border-[#8c4f10] overflow-hidden bg-white"
            >
              <img
                alt="Avatar"
                src={persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>
      )}

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop / Mobile Slide Sidebar Container */}
      <motion.aside
        ref={sidebarRef}
        animate={{
          width: isMobile ? (isMobileOpen ? 280 : 0) : (isCollapsed ? 72 : sidebarWidth),
          x: isMobile && !isMobileOpen ? -320 : 0
        }}
        transition={{ duration: isResizing ? 0 : 0.3, ease: "easeInOut" }}
        style={{ width: `${currentEffectiveWidth}px` }}
        className={`fixed top-0 bottom-0 left-0 bg-[#1f1c0b] text-[#ffdcc2] border-r-2 border-[#8c4f10] shadow-[20px_0_60px_rgba(0,0,0,0.85)] z-50 flex flex-col overflow-visible select-none ${
          isMobile ? "max-w-[85vw]" : ""
        }`}
      >
        {/* Top Header & Collapse/Expand Toggle */}
        <div className="h-16 px-4 border-b border-[#8c4f10]/40 flex items-center justify-between flex-shrink-0 bg-[#181508]">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <button
              onClick={toggleSidebarState}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#610000] hover:bg-[#8b0000] text-white shadow font-bold text-lg transition-all flex-shrink-0"
              title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
            >
              ☰
            </button>

            {(!isCollapsed || isMobile) && (
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-full bg-[#610000] border border-[#8c4f10] overflow-hidden flex-shrink-0 shadow">
                  <img
                    alt="Logo"
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="font-serif text-sm font-bold text-white tracking-tight truncate leading-tight">
                    The Alchemist's Courier
                  </h1>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8c4f10] font-bold block truncate">
                    Victorian Guild Archives
                  </span>
                </div>
              </div>
            )}
          </div>

          {isMobile && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#ffb77b] hover:text-white font-bold text-lg"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search & Notifications Strip */}
        <div className="p-3 border-b border-[#8c4f10]/30 flex-shrink-0 flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playQuillWrite();
              if (onOpenSearch) onOpenSearch();
            }}
            onMouseEnter={() => isCollapsed && setHoveredTooltip("Omni-Search (Ctrl+K)")}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex-grow min-h-[44px] px-3 py-2 bg-[#2b2716] hover:bg-[#3d3822] text-[#cec6ad] hover:text-white rounded-lg border border-[#8c4f10]/40 flex items-center justify-between transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#ffb77b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {(!isCollapsed || isMobile) && <span className="font-serif text-xs font-bold truncate">Search Archives...</span>}
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="font-mono text-[10px] bg-black/40 text-[#ffb77b] px-1.5 py-0.5 rounded border border-[#8c4f10]/30">
                Ctrl+K
              </span>
            )}
          </button>

          <button
            onClick={() => {
              sounds.playCorkPop();
              if (onOpenNotifications) onOpenNotifications();
            }}
            onMouseEnter={() => isCollapsed && setHoveredTooltip(`Notifications (${notificationCount} unread)`)}
            onMouseLeave={() => setHoveredTooltip(null)}
            className="min-w-[44px] min-h-[44px] bg-[#2b2716] hover:bg-[#3d3822] border border-[#8c4f10]/40 rounded-lg flex items-center justify-center relative flex-shrink-0 text-base"
            title="Guild Notifications (Ctrl+Shift+N)"
          >
            <span>🔔</span>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Main Scrollable Navigation Area */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden p-3 space-y-4 no-scrollbar">
          {/* PRIMARY REALMS NAVIGATION */}
          <div className="space-y-1.5">
            {(!isCollapsed || isMobile) && (
              <div className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold">
                Primary Chambers
              </div>
            )}
            {primaryTabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    sounds.playParchmentUnroll();
                    setCurrentTab(tab.id);
                    if (isMobile) setIsMobileOpen(false);
                  }}
                  onMouseEnter={() => isCollapsed && setHoveredTooltip(tab.label)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className={`min-h-[44px] px-3 py-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 relative ${
                    isActive
                      ? "bg-[#610000] border-[#ffb77b] text-white shadow-lg font-bold scale-[1.01]"
                      : "bg-[#2b2716]/60 border-transparent hover:bg-[#3d3822] hover:border-[#8c4f10]/40 text-[#ffdcc2]"
                  } ${isCollapsed && !isMobile ? "justify-center px-0" : ""}`}
                >
                  <span className="text-xl flex-shrink-0 w-6 text-center">{tab.icon}</span>
                  {(!isCollapsed || isMobile) && (
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm tracking-wide truncate">{tab.label}</span>
                        {tab.id === "archive" && unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-red-600 text-white rounded-full text-[9px] font-mono font-bold flex-shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {isActive && (!isCollapsed || isMobile) && (
                    <span className="text-[#ffb77b] font-bold text-xs flex-shrink-0">→</span>
                  )}

                  {/* Floating Tooltip for Collapsed State */}
                  {isCollapsed && !isMobile && hoveredTooltip === tab.label && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#181508] text-white font-serif text-xs font-bold rounded-md border-2 border-[#8c4f10] shadow-2xl whitespace-nowrap z-[100] flex items-center gap-2 pointer-events-none">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* COLLAPSIBLE ACCORDION SECTIONS */}
          <div className="pt-2 border-t border-[#8c4f10]/30 space-y-2">
            {(!isCollapsed || isMobile) && (
              <div className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold">
                Guild Logistics & Options
              </div>
            )}

            {/* SECTION 1: GUILD */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("guild")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Guild & Exchequer (£ " + currentGold + ")")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">🛡️</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Guild & Exchequer</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.guild ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.guild && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-2 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <div className="flex items-center justify-between py-1 border-b border-[#8c4f10]/20">
                    <span className="text-[#cec6ad]">Exchequer Bullion:</span>
                    <strong className="text-[#ffb77b] font-mono">£ {currentGold} Sovereign</strong>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      if (onOpenGoldExchange) onOpenGoldExchange();
                    }}
                    className="w-full min-h-[40px] py-2 bg-[#8c4f10] hover:bg-[#a65d13] text-white rounded-lg font-mono text-[11px] uppercase font-bold tracking-wider shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>+ Acquire Gold Bullion</span>
                  </button>
                  <div className="flex items-center justify-between text-[11px] text-[#cec6ad] pt-1">
                    <span>Active Alchemists:</span>
                    <span className="font-mono text-green-400 font-bold">14 Online</span>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: MESSAGES */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("messages")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Dispatches & Messages")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">✉️</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Messages & Drafts</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.messages ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.messages && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-1.5 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <button
                    onClick={() => {
                      sounds.playParchmentUnroll();
                      setCurrentTab("archive");
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#cec6ad]"
                  >
                    <span>Unread Letters</span>
                    {unreadCount > 0 && <span className="px-1.5 py-0.5 bg-red-600 text-white rounded-full font-mono text-[9px]">{unreadCount}</span>}
                  </button>
                  <button
                    onClick={() => {
                      sounds.playQuillWrite();
                      setCurrentTab("scriptorium");
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#cec6ad]"
                  >
                    <span>Draft Codices</span>
                    <span className="font-mono text-[10px] text-[#8c4f10]">3 Drafts</span>
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 3: FLEET & LOGISTICS */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("fleet")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Fleet & Carrier Logistics")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">🕊️</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Carrier Fleet</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.fleet ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.fleet && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-1.5 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      setCurrentTab("fleet");
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#cec6ad]"
                  >
                    <span>Homing Pigeons</span>
                    <span className="font-mono text-[10px] text-[#ffb77b]">12 Ready</span>
                  </button>
                  <button
                    onClick={() => {
                      sounds.playBottleSplash();
                      setCurrentTab("ocean");
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#cec6ad]"
                  >
                    <span>Spitalfields Tide</span>
                    <span className="font-mono text-[10px] text-green-400">High Tide</span>
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 4: SECURITY & CIPHERS */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("security")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Security & 256-Bit Lead Signet")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">🔥</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Security & Signet</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.security ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.security && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-1.5 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <div className="py-1 text-[#cec6ad] text-[11px]">
                    <div className="flex items-center gap-1.5 text-green-400 font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>256-Bit Lead Signet</span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#8c4f10]">Biometric Stamp Verified by Clerk</p>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      setCurrentTab("secret");
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#ffb77b] font-bold"
                  >
                    <span>Occult Ciphers →</span>
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 5: SETTINGS */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("settings")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Profile & Chamber Settings")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">⚙️</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Chamber Settings</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.settings ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.settings && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-1.5 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      if (onOpenSettings) onOpenSettings();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-[#ffb77b] font-bold"
                  >
                    <span>⚙️</span> Chamber Settings (10 Realms)
                  </button>
                  <button
                    onClick={() => {
                      sounds.playParchmentUnroll();
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-[#cec6ad]"
                  >
                    <span>👤</span> Profile Customizer
                  </button>
                  <button
                    onClick={() => {
                      sounds.toggleMute();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center justify-between text-[#cec6ad]"
                  >
                    <span className="flex items-center gap-2"><span>🔊</span> Sound Effects</span>
                    <span className="font-mono text-[10px] text-[#ffb77b] font-bold">Toggle</span>
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 6: SUPPORT & CREDITS */}
            <div className="rounded-xl bg-[#252112]/60 border border-[#8c4f10]/30 overflow-hidden">
              <button
                onClick={() => toggleSection("support")}
                onMouseEnter={() => isCollapsed && setHoveredTooltip("Support, Manual & Referrals (+200 Gold)")}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`w-full min-h-[44px] px-3 py-2.5 flex items-center justify-between text-left font-serif text-xs font-bold text-[#ffdcc2] hover:bg-[#302c1a] transition-colors ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">🤝</span>
                  {(!isCollapsed || isMobile) && <span className="uppercase tracking-wider">Support & Credits</span>}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span className="text-[10px] text-[#8c4f10]">{openSections.support ? "▲" : "▼"}</span>
                )}
              </button>
              {openSections.support && (!isCollapsed || isMobile) && (
                <div className="px-3 pb-3 pt-1 space-y-1.5 text-xs font-serif border-t border-[#8c4f10]/20 bg-[#1b180a]/80">
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      if (onOpenSupportHub) onOpenSupportHub("patronage");
                      else if (onOpenProducerCredits) onOpenProducerCredits();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-green-400 font-bold"
                  >
                    <span>🪙</span> Support & UPI Payment Gateway
                  </button>
                  <button
                    onClick={() => {
                      sounds.playCorkPop();
                      if (onOpenShare) onOpenShare();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-[#ffb77b] font-bold"
                  >
                    <span>👥</span> Invite & Share (+200 Gold)
                  </button>
                  <button
                    onClick={() => {
                      sounds.playParchmentUnroll();
                      if (onOpenManual) onOpenManual();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-[#cec6ad]"
                  >
                    <span>📖</span> Help & Manual Guide
                  </button>
                  <button
                    onClick={() => {
                      sounds.playWaxSeal();
                      if (onOpenProducerCredits) onOpenProducerCredits();
                    }}
                    className="w-full min-h-[38px] px-2 py-1.5 text-left rounded hover:bg-[#302c1a] flex items-center gap-2 text-[#cec6ad]"
                  >
                    <span>📜</span> Producer & Rights Reserved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Profile & Logout Bar */}
        <div className="p-3 border-t border-[#8c4f10]/40 flex-shrink-0 bg-[#181508] relative">
          <div className={`flex items-center justify-between gap-2 ${isCollapsed && !isMobile ? "flex-col justify-center gap-3" : ""}`}>
            <button
              onClick={() => {
                sounds.playParchmentUnroll();
                if (onOpenProfile) onOpenProfile();
              }}
              onMouseEnter={() => isCollapsed && setHoveredTooltip(persona?.name || "Prakhar Rai")}
              onMouseLeave={() => setHoveredTooltip(null)}
              className="flex items-center gap-2.5 min-w-0 hover:opacity-90 transition-opacity flex-grow text-left min-h-[44px]"
            >
              <div className="w-9 h-9 rounded-full border-2 border-[#8c4f10] overflow-hidden bg-white flex-shrink-0 shadow">
                <img
                  alt="Portrait"
                  src={persona?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                  className="w-full h-full object-cover"
                />
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="min-w-0 pr-1">
                  <h4 className="font-serif text-xs font-bold text-white truncate leading-tight">
                    {persona?.name || "Prakhar Rai"}
                  </h4>
                  <span className="font-mono text-[9px] text-[#ffb77b] uppercase block truncate">
                    {persona?.rank || "Lead Producer"}
                  </span>
                </div>
              )}
            </button>

            {(!isCollapsed || isMobile) && (
              <button
                onClick={() => {
                  sounds.playCorkPop();
                  if (onOpenProfile) onOpenProfile();
                }}
                className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-[#2b2716] hover:bg-[#3d3822] text-[#ffb77b] font-mono text-[10px] uppercase font-bold border border-[#8c4f10]/40 flex-shrink-0"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* DRAG RESIZE HANDLE (Desktop only, when not collapsed) */}
        {!isCollapsed && !isMobile && (
          <div
            onMouseDown={() => setIsResizing(true)}
            className="absolute right-0 top-0 bottom-0 w-2.5 cursor-col-resize hover:bg-[#ffb77b]/40 active:bg-[#ffb77b] transition-colors z-50 group flex items-center justify-center"
            title="Drag to resize sidebar (72px - 340px)"
          >
            <div className="w-0.5 h-12 bg-[#8c4f10] group-hover:bg-[#ffb77b] rounded-full opacity-60 group-hover:opacity-100" />
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default GuildSidebar;
