import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/soundEngine";

const NotificationCenter = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllRead,
  onClearAll,
  onSelectNotification
}) => {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'dispatch', 'exchequer', 'security'

  if (!isOpen) return null;

  const filtered = activeTab === "all"
    ? notifications
    : notifications.filter((n) => n.category === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[95] flex items-start justify-end p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm overflow-hidden">
        {/* Backdrop click outside to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, x: 120, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-md bg-[#1f1c0b] text-[#ffdcc2] rounded-2xl border-2 border-[#8c4f10] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[85vh] overflow-hidden z-10"
        >
          {/* HEADER */}
          <div className="p-4 sm:p-6 border-b border-[#8c4f10]/40 flex items-center justify-between bg-[#181508]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#610000] border border-[#ffb77b] flex items-center justify-center text-xl shadow">
                🔔
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-bold text-white tracking-tight">Guild Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-[10px] font-bold rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#8c4f10] uppercase tracking-wider font-bold">
                  Spitalfields & Royal Society Alerts
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playCorkPop();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#302c1a] hover:bg-[#610000] text-white transition-colors text-base font-bold"
              title="Close Notification Center"
            >
              ✕
            </button>
          </div>

          {/* FILTER TABS & QUICK ACTIONS */}
          <div className="px-4 py-2.5 bg-[#2b2716]/80 border-b border-[#8c4f10]/30 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "dispatch", label: "Dispatches" },
                { id: "exchequer", label: "Exchequer" },
                { id: "security", label: "Signet" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playCorkPop();
                    setActiveTab(tab.id);
                  }}
                  className={`min-h-[38px] px-3 py-1 rounded-lg font-mono text-[11px] uppercase tracking-wider font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#610000] text-white border border-[#ffb77b]"
                      : "bg-[#181508] text-[#cec6ad] hover:text-white border border-[#8c4f10]/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sounds.playParchmentUnroll();
                if (onMarkAllRead) onMarkAllRead();
              }}
              className="min-h-[38px] px-2.5 py-1 bg-[#181508] hover:bg-[#302c1a] text-[#ffb77b] border border-[#8c4f10]/40 rounded-lg font-mono text-[10px] uppercase font-bold whitespace-nowrap"
              title="Mark all notifications read"
            >
              Read All
            </button>
          </div>

          {/* NOTIFICATIONS SCROLLABLE LIST */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-3 no-scrollbar">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#302c1a] border border-[#8c4f10]/40 flex items-center justify-center mx-auto mb-3 text-2xl opacity-60">
                  🔕
                </div>
                <h4 className="font-serif text-base font-bold text-white mb-1">All Clear in the Chamber</h4>
                <p className="font-mono text-xs text-[#cec6ad]">
                  No unread guild alerts or incoming carrier pigeons right now.
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    sounds.playCorkPop();
                    if (onSelectNotification) onSelectNotification(item);
                  }}
                  className={`min-h-[64px] p-4 rounded-xl border cursor-pointer transition-all relative ${
                    item.read
                      ? "bg-[#252112]/60 border-[#8c4f10]/20 opacity-80 hover:opacity-100 hover:bg-[#302c1a]"
                      : "bg-[#302c1a] border-[#ffb77b] text-white shadow-md border-l-4 border-l-[#610000]"
                  }`}
                >
                  {!item.read && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#ffb77b] animate-ping" />
                  )}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#181508] border border-[#8c4f10]/40 flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                      {item.category === "dispatch" && "🕊️"}
                      {item.category === "exchequer" && "🪙"}
                      {item.category === "security" && "🔥"}
                      {item.category === "general" && "📜"}
                    </div>
                    <div className="flex-grow min-w-0 pr-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[9px] uppercase font-bold text-[#ffb77b] tracking-wider">
                          {item.category}
                        </span>
                        <span className="font-mono text-[10px] text-[#cec6ad]">{item.time || "Just now"}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs text-[#cec6ad] leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-4 sm:p-5 bg-[#181508] border-t border-[#8c4f10]/40 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#cec6ad]">
              Showing <strong className="text-white">{filtered.length}</strong> Alerts
            </span>
            {notifications.length > 0 && (
              <button
                onClick={() => {
                  sounds.playCorkPop();
                  if (onClearAll) onClearAll();
                }}
                className="min-h-[44px] px-4 py-2 rounded-lg bg-[#610000] hover:bg-[#8b0000] text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow"
              >
                Clear All Alerts
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationCenter;
