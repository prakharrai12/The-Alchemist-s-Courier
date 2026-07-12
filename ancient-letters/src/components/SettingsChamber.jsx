import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const SettingsChamber = ({
  isOpen,
  onClose,
  persona,
  onSavePersona
}) => {
  const [activeTab, setActiveTab] = useState("appearance");

  // Settings states with localStorage persistence
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("alchemist_chamber_settings");
    return saved ? JSON.parse(saved) : {
      theme: "alchemist",
      fontScale: "normal",
      highContrast: false,
      reduceMotion: false,
      dyslexicFont: false,
      soundEnabled: true,
      masterVolume: 80,
      quillSound: true,
      corkSound: true,
      notificationsEnabled: true,
      pigeonAlerts: true,
      exchequerAlerts: true,
      language: "victorian",
      anonymousBottles: false,
      hidePrestige: false,
      signet2FA: true,
      dustParticles: "24",
      animationSpeed: "normal"
    };
  });

  const handleUpdateSetting = (key, val) => {
    sounds.playCorkPop();
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    localStorage.setItem("alchemist_chamber_settings", JSON.stringify(updated));
  };

  if (!isOpen) return null;

  const tabs = [
    { id: "appearance", label: "Appearance", icon: "🎨" },
    { id: "accessibility", label: "Accessibility", icon: "👁️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "language", label: "Language & Dialect", icon: "🗣️" },
    { id: "privacy", label: "Privacy & Cloaking", icon: "🛡️" },
    { id: "security", label: "Security & Signet", icon: "🔐" },
    { id: "shortcuts", label: "Keyboard Shortcuts", icon: "⌨️" },
    { id: "storage", label: "Parchment Storage", icon: "💾" },
    { id: "audio", label: "Audio Engine", icon: "🔊" },
    { id: "animations", label: "Animations & Dust", icon: "✨" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-5xl bg-[#1f1c0b] text-[#ffdcc2] rounded-2xl border-2 border-[#8c4f10] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* HEADER */}
          <div className="p-4 sm:p-6 border-b border-[#8c4f10]/40 flex items-center justify-between bg-[#181508] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#610000] border border-[#ffb77b] flex items-center justify-center text-2xl shadow">
                ⚙️
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  Chamber Settings (10 Realms)
                </h2>
                <span className="font-mono text-[10px] text-[#8c4f10] uppercase tracking-wider font-bold block">
                  Customize your Alchemical Environment & Apparatus
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#302c1a] hover:bg-[#610000] text-white transition-colors text-base font-bold"
              title="Close Settings (Esc)"
            >
              ✕
            </button>
          </div>

          {/* MAIN MODAL BODY - 12-COLUMN RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-grow overflow-hidden">
            {/* SIDEBAR TABS (4 cols on desktop) */}
            <div className="md:col-span-4 lg:col-span-3 bg-[#181508]/80 border-b md:border-b-0 md:border-r border-[#8c4f10]/40 p-3 overflow-y-auto space-y-1 no-scrollbar max-h-[40vh] md:max-h-none">
              <div className="px-2 py-1.5 font-mono text-[10px] uppercase text-[#8c4f10] font-bold tracking-widest">
                Chamber Realms
              </div>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sounds.playParchmentUnroll();
                    setActiveTab(t.id);
                  }}
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl font-serif text-xs sm:text-sm tracking-wide text-left flex items-center gap-3 transition-all ${
                    activeTab === t.id
                      ? "bg-[#610000] text-white font-bold border border-[#ffb77b] shadow"
                      : "text-[#cec6ad] hover:bg-[#2b2716] hover:text-white"
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{t.icon}</span>
                  <span className="truncate">{t.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT PANEL (8 cols on desktop) */}
            <div className="md:col-span-8 lg:col-span-9 p-5 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-none space-y-6 no-scrollbar bg-[#1f1c0b]">
              {/* TAB 1: APPEARANCE */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Chamber Color Palette</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Select the visual atmosphere for your guild correspondence.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      { id: "alchemist", name: "Classic Victorian", desc: "Warm parchment & brass gold", color: "bg-[#8c4f10]" },
                      { id: "oak", name: "Dark Oak Library", desc: "Deep mahogany & amber", color: "bg-[#3e2723]" },
                      { id: "crimson", name: "Royal Crimson Vault", desc: "Signet wax red & velvet dark", color: "bg-[#610000]" },
                      { id: "emerald", name: "Emerald Guild", desc: "Alchemical copper green", color: "bg-[#064e3b]" },
                      { id: "midnight", name: "Midnight Library", desc: "Obsidian ink & starlit blue", color: "bg-[#1e3a8a]" },
                      { id: "ivory", name: "Ivory Parchment", desc: "High contrast illuminated script", color: "bg-[#d4a373]" }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => handleUpdateSetting("theme", theme.id)}
                        className={`min-h-[64px] p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                          settings.theme === theme.id
                            ? "bg-[#302c1a] border-[#ffb77b] text-white shadow-lg scale-[1.01]"
                            : "bg-[#252112]/60 border-[#8c4f10]/30 hover:border-[#8c4f10] text-[#ffdcc2]"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${theme.color} border-2 border-white flex-shrink-0 shadow`} />
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm font-bold truncate">{theme.name}</h4>
                          <span className="font-mono text-[10px] text-[#cec6ad] block truncate">{theme.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#8c4f10]/30 space-y-3">
                    <label className="font-serif text-sm font-bold text-white block">Typography Scale Clamp</label>
                    <div className="flex gap-3">
                      {["compact", "normal", "spacious"].map((scale) => (
                        <button
                          key={scale}
                          onClick={() => handleUpdateSetting("fontScale", scale)}
                          className={`min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all ${
                            settings.fontScale === scale
                              ? "bg-[#610000] text-white border border-[#ffb77b]"
                              : "bg-[#252112] text-[#cec6ad] hover:text-white border border-[#8c4f10]/40"
                          }`}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ACCESSIBILITY */}
              {activeTab === "accessibility" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Accessibility & Ergonomics</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Adjust contrast, motion, and font legibility for comfortable reading.</p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { key: "highContrast", label: "High Contrast Borders & Text", desc: "Enhances edge separation across all modal chambers and cards." },
                      { key: "reduceMotion", label: "Reduce Alchemical Animations", desc: "Disables dust particles, floating bottles, and rapid parallax transitions." },
                      { key: "dyslexicFont", label: "Dyslexic-Friendly Typography", desc: "Switches complex serif headers to high-legibility proportional sans font." }
                    ].map((item) => (
                      <div
                        key={item.key}
                        onClick={() => handleUpdateSetting(item.key, !settings[item.key])}
                        className="min-h-[64px] p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 hover:border-[#ffb77b] cursor-pointer transition-all flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white">{item.label}</h4>
                          <p className="font-mono text-xs text-[#cec6ad] mt-0.5">{item.desc}</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center flex-shrink-0 ${settings[item.key] ? "bg-green-600 justify-end" : "bg-[#181508] justify-start"}`}>
                          <div className="w-4 h-4 rounded-full bg-white shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Chamber Alerts & Dispatches</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Control how carrier pigeons and exchequer updates notify your study.</p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { key: "notificationsEnabled", label: "Enable Master Chamber Alerts", desc: "Allow toast badges and audio chimes when new dispatches arrive." },
                      { key: "pigeonAlerts", label: "Carrier Pigeon Homing Sound", desc: "Play flutter and coo chime when an urgent letter washes ashore." },
                      { key: "exchequerAlerts", label: "Sovereign Exchequer Endowments", desc: "Notify when gold coin bullion rewards (+25 to +500 Gold) are granted." }
                    ].map((item) => (
                      <div
                        key={item.key}
                        onClick={() => handleUpdateSetting(item.key, !settings[item.key])}
                        className="min-h-[64px] p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 hover:border-[#ffb77b] cursor-pointer transition-all flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white">{item.label}</h4>
                          <p className="font-mono text-xs text-[#cec6ad] mt-0.5">{item.desc}</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center flex-shrink-0 ${settings[item.key] ? "bg-green-600 justify-end" : "bg-[#181508] justify-start"}`}>
                          <div className="w-4 h-4 rounded-full bg-white shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LANGUAGE */}
              {activeTab === "language" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Language & Archival Dialect</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Select the vocabulary register used across all guild correspondence prompts.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { id: "victorian", name: "Victorian English (1894)", desc: "Formal prose, 'Exchequer', 'Codices', and 'Arch-Alchemist'." },
                      { id: "modern", name: "Modern Clear English", desc: "Straightforward technical terms and streamlined labels." },
                      { id: "latin", name: "Latin Occult Register", desc: "Classical academic terminology ('Codex Transmutatio')." },
                      { id: "french", name: "French Scriptorium", desc: "Spitalfields Huguenot master dialect ('Le Courrier Alchimique')." }
                    ].map((lang) => (
                      <div
                        key={lang.id}
                        onClick={() => handleUpdateSetting("language", lang.id)}
                        className={`min-h-[64px] p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          settings.language === lang.id
                            ? "bg-[#302c1a] border-[#ffb77b] text-white shadow"
                            : "bg-[#252112]/60 border-[#8c4f10]/30 text-[#ffdcc2]"
                        }`}
                      >
                        <h4 className="font-serif text-sm font-bold">{lang.name}</h4>
                        <p className="font-mono text-xs text-[#cec6ad] mt-1">{lang.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PRIVACY */}
              {activeTab === "privacy" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Privacy & Cloaking Protocols</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Manage how your persona rank and wax signet appear on public logs.</p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { key: "anonymousBottles", label: "Toss Sea Bottles Anonymously", desc: "Conceals your persona name as 'Traveler of the Deep' when tossing bottles." },
                      { key: "hidePrestige", label: "Cloak Exchequer & Prestige Score", desc: "Hides your £ Gold balance from other alchemists on public leaderboards." }
                    ].map((item) => (
                      <div
                        key={item.key}
                        onClick={() => handleUpdateSetting(item.key, !settings[item.key])}
                        className="min-h-[64px] p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 cursor-pointer transition-all flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white">{item.label}</h4>
                          <p className="font-mono text-xs text-[#cec6ad] mt-0.5">{item.desc}</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center flex-shrink-0 ${settings[item.key] ? "bg-green-600 justify-end" : "bg-[#181508] justify-start"}`}>
                          <div className="w-4 h-4 rounded-full bg-white shadow" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Security & 256-Bit Lead Signet</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Verify encryption protocols and biometric wax stamp security.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#252112] border-2 border-green-700/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white">256-Bit Lead Seal 2FA Status</h4>
                        <p className="font-mono text-xs text-green-400">Authenticated by Spitalfields Biometric Signet</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-900/60 text-green-300 font-mono text-xs font-bold rounded border border-green-500">
                      ACTIVE
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 7: SHORTCUTS */}
              {activeTab === "shortcuts" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Master Keyboard Shortcuts</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Quick keybindings to navigate the 6 chambers without touching your mouse.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { keys: "Ctrl + K", action: "Open Omni-Search Archives" },
                      { keys: "Ctrl + B / \\", action: "Toggle Sidebar Expand/Collapse" },
                      { keys: "Ctrl + Shift + N", action: "Open Notification Center" },
                      { keys: "Alt + 1", action: "Jump to Archive Vault" },
                      { keys: "Alt + 2", action: "Open Scriptorium Chamber" },
                      { keys: "Alt + 3", action: "Open Secret Occult Library" },
                      { keys: "Alt + G", action: "Acquire Gold Sovereign Bullion" },
                      { keys: "Alt + M", action: "Toggle Master Sound Mute" }
                    ].map((sc, idx) => (
                      <div key={idx} className="min-h-[44px] p-3 rounded-lg bg-[#252112]/80 border border-[#8c4f10]/40 flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-white">{sc.action}</span>
                        <kbd className="px-2 py-1 bg-[#181508] text-[#ffb77b] rounded border border-[#8c4f10] font-mono text-xs font-bold shadow">
                          {sc.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: STORAGE */}
              {activeTab === "storage" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Local Parchment Storage & Cache</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Manage cached dispatches and offline draft scrolls.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#cec6ad]">Local Storage Consumption:</span>
                      <strong className="text-[#ffb77b]">1.42 MB / 10.0 MB</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#181508] overflow-hidden border border-[#8c4f10]/40">
                      <div className="w-[14%] h-full bg-[#8c4f10]" />
                    </div>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          sounds.playCorkPop();
                          alert("Parchment cache refreshed cleanly.");
                        }}
                        className="min-h-[40px] px-3.5 py-2 rounded-lg bg-[#302c1a] hover:bg-[#610000] text-white font-mono text-xs font-bold uppercase transition-colors"
                      >
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: AUDIO */}
              {activeTab === "audio" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Audio & Sound Effect Engine</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Fine-tune quill scratch, cork pop, and parchment unroll audio feedback.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#252112]/80 border border-[#8c4f10]/40 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white">Master Sound Engine</h4>
                        <p className="font-mono text-xs text-[#cec6ad]">Toggle all tactile Victorian sound effects globally.</p>
                      </div>
                      <button
                        onClick={() => {
                          sounds.toggleMute();
                          handleUpdateSetting("soundEnabled", !settings.soundEnabled);
                        }}
                        className={`min-h-[40px] px-4 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-colors ${
                          settings.soundEnabled ? "bg-green-700 text-white" : "bg-red-800 text-white"
                        }`}
                      >
                        {settings.soundEnabled ? "ENABLED" : "MUTED"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: ANIMATIONS */}
              {activeTab === "animations" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">Atmospheric Dust Particles & Parallax</h3>
                    <p className="font-mono text-xs text-[#cec6ad]">Set the intensity of floating specks of golden dust across chambers.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="font-serif text-sm font-bold text-white block">Floating Dust Specks Density</label>
                    <div className="flex flex-wrap gap-3">
                      {["0", "12", "24", "48"].map((count) => (
                        <button
                          key={count}
                          onClick={() => handleUpdateSetting("dustParticles", count)}
                          className={`min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs uppercase font-bold transition-all ${
                            settings.dustParticles === count
                              ? "bg-[#610000] text-white border border-[#ffb77b] shadow"
                              : "bg-[#252112] text-[#cec6ad] hover:text-white border border-[#8c4f10]/40"
                          }`}
                        >
                          {count === "0" ? "Off (0 Specks)" : `${count} Specks`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 sm:p-5 bg-[#181508] border-t border-[#8c4f10]/40 flex items-center justify-between flex-shrink-0">
            <span className="font-mono text-[11px] text-[#cec6ad]">
              Chamber Environment: <strong className="text-green-400">Synchronized & Saved locally</strong>
            </span>
            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="min-h-[44px] px-5 py-2 rounded-lg bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-xs font-bold uppercase tracking-wider shadow transition-colors"
            >
              Return to Chamber
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsChamber;
