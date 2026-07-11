import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import ArchiveVault from "./components/ArchiveVault";
import Scriptorium from "./components/Scriptorium";
import FleetLogistics from "./components/FleetLogistics";
import MyLedger from "./components/MyLedger";
import SecretLibrary from "./components/SecretLibrary";
import OceanWaves from "./components/OceanWaves";
import DustParticles from "./components/DustParticles";
import LetterViewModal from "./components/LetterViewModal";
import BottleTossModal from "./components/BottleTossModal";
import BottleViewModal from "./components/BottleViewModal";
import SovereignExchangeModal from "./components/SovereignExchangeModal";
import GuildAuthModal from "./components/GuildAuthModal";
import ProfileCustomizerModal from "./components/ProfileCustomizerModal";
import { sounds } from "./audio/soundEngine";

const SOCKET_URL = "http://localhost:5000";

function App() {
  const [currentTab, setCurrentTab] = useState("archive"); // 'archive', 'scriptorium', 'fleet', 'ledger', 'secret', 'ocean'
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentGold, setCurrentGold] = useState(() => {
    const saved = localStorage.getItem("alchemist_courier_gold");
    return saved ? parseInt(saved, 10) : 1000; // Starting endowment: 1,000 Gold Sovereigns
  });
  const [unreadCount, setUnreadCount] = useState(1);
  const [unlockedCiphers, setUnlockedCiphers] = useState(["1894-A"]);

  // Traveler / Clerk Persona State
  const [persona, setPersona] = useState(() => {
    const saved = localStorage.getItem("alchemist_courier_persona");
    return saved ? JSON.parse(saved) : {
      name: "Elias Vance",
      title: "Senior Dispatcher",
      rank: "First-Class Courier",
      prestige: 840,
      waxColor: "#610000",
      crest: "shield",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      memberSince: "1889"
    };
  });

  // Letters & Bottles State
  const [letters, setLetters] = useState([
    {
      id: "l1",
      title: "The Transmutation Protocol",
      sender: "Arch-Alchemist V. (High Scriptorium)",
      recipient: "Senior Dispatcher Elias Vance",
      date: "October 12, 1894",
      content: "The mercury levels in the northern sector have finally stabilized and the crystal growth is proceeding precisely as prophesied in the ancient codices. Ensure all outbound brass canisters are sealed in triple wax.",
      sealColor: "#8c4f10",
      sealCrest: "quill",
      likes: 28,
      replies: [
        { id: "r1", sender: "Elias Vance", date: "October 12, 1894", content: "Understood, High Alchemist. The copper seals have been doubled." }
      ]
    },
    {
      id: "l2",
      title: "Observations on Lunar Tides",
      sender: "Master of Ships Josiah",
      recipient: "All Guild Brethren",
      date: "October 11, 1894",
      content: "When the full moon aligns with the constellation of the Dragon, the coastal waves carry glass bottles three leagues farther inland than usual. Watch the Spitalfields dock closely tonight.",
      sealColor: "#30422f",
      sealCrest: "compass",
      likes: 19,
      replies: []
    },
    {
      id: "l3",
      title: "Urgent Dispatch: The Fleet is Ready",
      sender: "Captain Thorne",
      recipient: "The Alchemist Council",
      date: "October 10, 1894",
      content: "All three clipper ships and twelve homing pigeons have been provisioned with alchemical rations. We await only the Grand Courier's signet stamp.",
      sealColor: "#610000",
      sealCrest: "crown",
      likes: 34,
      replies: [
        { id: "r2", sender: "Elias Vance", date: "October 10, 1894", content: "Signet stamp applied at dawn. May the tides favor you." }
      ]
    }
  ]);

  const [bottles, setBottles] = useState([
    {
      id: "b1",
      title: "Message From the Lost Galleon",
      sender: "Mateo of Cadiz",
      date: "September 8, 1712",
      content: "We have drifted three weeks past the Azores under skies filled with emerald auroras. Whoever pulls this cork from the glass, drink a toast to the boundless sea!",
      bottleColor: "emerald",
      sealColor: "#610000",
      coordinates: "38°42' N, 28°15' W",
      status: "washed_ashore",
      replies: [
        { id: "br1", sender: "Seafarer John", date: "July 14, 1884", content: "Your bottle survived the centuries, Mateo! I raise my glass of spiced rum to you." }
      ]
    },
    {
      id: "b2",
      title: "A Melody Across the Waves",
      sender: "Seraphina of the Coast",
      date: "August 30, 1899",
      content: "Does anyone else hear the siren songs right before dawn? If you find this note on your beach, write me what your favorite song sounds like.",
      bottleColor: "sapphire",
      sealColor: "#1e3a8a",
      coordinates: "41°10' N, 70°05' W",
      status: "drifting",
      replies: []
    }
  ]);

  // Modal States
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [showBottleToss, setShowBottleToss] = useState(false);
  const [showGoldExchange, setShowGoldExchange] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileCustomizer, setShowProfileCustomizer] = useState(false);

  // Save Persona & Gold
  useEffect(() => {
    localStorage.setItem("alchemist_courier_persona", JSON.stringify(persona));
  }, [persona]);

  useEffect(() => {
    localStorage.setItem("alchemist_courier_gold", currentGold.toString());
  }, [currentGold]);

  // Connect to Socket.IO Server
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 3000
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("initial_data", (data) => {
      if (data.letters && data.letters.length > 0) setLetters(data.letters);
      if (data.bottles && data.bottles.length > 0) setBottles(data.bottles);
    });

    newSocket.on("new_letter", (newLetter) => {
      setLetters((prev) => [newLetter, ...prev]);
      setUnreadCount((c) => c + 1);
      sounds.playQuillWrite();
    });

    newSocket.on("letter_updated", (updated) => {
      setLetters((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      if (selectedLetter && selectedLetter.id === updated.id) {
        setSelectedLetter(updated);
      }
    });

    newSocket.on("new_bottle", (newBottle) => {
      setBottles((prev) => [newBottle, ...prev]);
      sounds.playBottleSplash();
    });

    newSocket.on("bottle_updated", (updated) => {
      setBottles((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      if (selectedBottle && selectedBottle.id === updated.id) {
        setSelectedBottle(updated);
      }
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Handlers
  const handleSendCodice = (letterData) => {
    if (socket && isConnected) {
      socket.emit("send_letter", letterData);
    } else {
      const newLetter = {
        ...letterData,
        id: "l" + Date.now(),
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        likes: 0,
        replies: []
      };
      setLetters([newLetter, ...letters]);
    }
    setCurrentGold((g) => g + 25); // Reward for writing codice
    setCurrentTab("archive");
  };

  const handleDispatchVessel = (vesselObj, totalCost) => {
    if (currentGold < totalCost) {
      alert(`Notice: Your Exchequer balance (£ ${currentGold} Gold) is below the required £ ${totalCost} Gold fare. Opening Sovereign Exchange...`);
      setShowGoldExchange(true);
      return;
    }
    setCurrentGold((g) => Math.max(0, g - totalCost));
    setCurrentTab("ledger");
  };

  const handleUnlockCipherReward = (cipherId, rewardGold) => {
    if (!unlockedCiphers.includes(cipherId)) {
      setUnlockedCiphers((prev) => [...prev, cipherId]);
      setCurrentGold((g) => g + (rewardGold || 50));
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("alchemist_auth_token");
  });

  const handleLoginSuccess = (user, token) => {
    if (token) {
      localStorage.setItem("alchemist_auth_token", token);
    } else {
      localStorage.setItem("alchemist_auth_token", "verified_token_1894");
    }
    setIsLoggedIn(true);

    setPersona({
      name: user.name || "Elias Vance",
      title: user.title || "Senior Dispatcher",
      rank: user.rank || "First-Class Courier",
      prestige: user.prestige || 840,
      waxColor: user.waxColor || "#610000",
      crest: user.crest || "shield",
      avatarUrl: user.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      memberSince: user.memberSince || "1889"
    });
    if (user.goldSovereigns !== undefined) {
      setCurrentGold(user.goldSovereigns);
    }
    if (user.unlockedCiphers) {
      setUnlockedCiphers(user.unlockedCiphers);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("alchemist_auth_token");
    setIsLoggedIn(false);
    sounds.playCorkPop();
  };

  const handleReplyLetter = (letterId, replyData) => {
    if (socket && isConnected) {
      fetch(`${SOCKET_URL}/api/letters/${letterId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replyData)
      })
        .then((res) => res.json())
        .then((updated) => {
          setLetters((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
          setSelectedLetter(updated);
        })
        .catch(() => {});
    } else {
      const updatedLetters = letters.map((l) => {
        if (l.id === letterId) {
          const newReply = {
            id: "r" + Date.now(),
            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            ...replyData
          };
          return { ...l, replies: [...(l.replies || []), newReply] };
        }
        return l;
      });
      setLetters(updatedLetters);
      setSelectedLetter(updatedLetters.find((l) => l.id === letterId));
    }
  };

  const handleLikeLetter = (letterId) => {
    if (socket && isConnected) {
      socket.emit("like_letter", letterId);
    } else {
      setLetters((prev) =>
        prev.map((l) => (l.id === letterId ? { ...l, likes: (l.likes || 0) + 1 } : l))
      );
      if (selectedLetter && selectedLetter.id === letterId) {
        setSelectedLetter({ ...selectedLetter, likes: (selectedLetter.likes || 0) + 1 });
      }
    }
  };

  const handleTossBottle = (bottleData) => {
    if (socket && isConnected) {
      socket.emit("toss_bottle", bottleData);
    } else {
      const lat = (Math.random() * 160 - 80).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' N";
      const lon = (Math.random() * 360 - 180).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' W";
      const newBottle = {
        ...bottleData,
        id: "b" + Date.now(),
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        coordinates: `${lat}, ${lon}`,
        status: "drifting",
        replies: []
      };
      setBottles([newBottle, ...bottles]);
    }
    setShowBottleToss(false);
  };

  const handleReplyBottle = (bottleId, replyData) => {
    if (socket && isConnected) {
      fetch(`${SOCKET_URL}/api/bottles/${bottleId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(replyData)
      })
        .then((res) => res.json())
        .then((updated) => {
          setBottles((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
          setSelectedBottle(updated);
        })
        .catch(() => {});
    } else {
      const updatedBottles = bottles.map((b) => {
        if (b.id === bottleId) {
          const newReply = {
            id: "br" + Date.now(),
            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            ...replyData
          };
          return { ...b, status: "washed_ashore", replies: [...(b.replies || []), newReply] };
        }
        return b;
      });
      setBottles(updatedBottles);
      setSelectedBottle(updatedBottles.find((b) => b.id === bottleId));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "1") {
        e.preventDefault();
        sounds.playCorkPop();
        setCurrentTab("archive");
      } else if (e.altKey && e.key === "2") {
        e.preventDefault();
        sounds.playQuillWrite();
        setCurrentTab("scriptorium");
      } else if (e.altKey && e.key === "3") {
        e.preventDefault();
        sounds.playWaxSeal();
        setCurrentTab("secret");
      } else if (e.altKey && (e.key === "g" || e.key === "G")) {
        e.preventDefault();
        sounds.playCorkPop();
        setShowGoldExchange(true);
      } else if (e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        sounds.playCorkPop();
        sounds.toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`app-root ${currentTab === "ocean" ? "theme-ocean" : "theme-alchemist"}`}>
      {/* Navigation Bar */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === "archive") setUnreadCount(0);
        }}
        unreadCount={unreadCount}
        persona={persona}
        currentGold={currentGold}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenGoldExchange={() => setShowGoldExchange(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => setShowProfileCustomizer(true)}
      />

      {/* Main Content Area */}
      <main className="main-stage pt-24 pb-16">
        <DustParticles count={28} />

        <AnimatePresence mode="wait">
          {/* TAB 1: THE ARCHIVE */}
          {currentTab === "archive" && (
            <motion.div
              key="archive-view"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ArchiveVault
                letters={letters}
                onSelectLetter={(letObj) => setSelectedLetter(letObj)}
                onOpenScriptorium={() => setCurrentTab("scriptorium")}
              />
            </motion.div>
          )}

          {/* TAB 2: THE SCRIPTORIUM */}
          {currentTab === "scriptorium" && (
            <motion.div
              key="scriptorium-view"
              className="w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <Scriptorium
                onSendCodice={handleSendCodice}
                persona={persona}
              />
            </motion.div>
          )}

          {/* TAB 3: THE FLEET */}
          {currentTab === "fleet" && (
            <motion.div
              key="fleet-view"
              className="w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <FleetLogistics
                onDispatchVessel={handleDispatchVessel}
                persona={persona}
              />
            </motion.div>
          )}

          {/* TAB 4: MY LEDGER */}
          {currentTab === "ledger" && (
            <motion.div
              key="ledger-view"
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <MyLedger
                persona={{ ...persona, goldEarned: currentGold, prestige: persona.prestige || 840 }}
                onOpenCustomizer={() => setShowProfileCustomizer(true)}
              />
            </motion.div>
          )}

          {/* TAB 5: SECRET LIBRARY */}
          {currentTab === "secret" && (
            <motion.div
              key="secret-view"
              className="w-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <SecretLibrary
                onUnlockReward={handleUnlockCipherReward}
                unlockedCiphers={unlockedCiphers}
                persona={persona}
              />
            </motion.div>
          )}

          {/* TAB 6: OCEAN SHORE */}
          {currentTab === "ocean" && (
            <motion.div
              key="ocean-view"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <OceanWaves
                bottles={bottles}
                onSelectBottle={(bottle) => setSelectedBottle(bottle)}
                onOpenBottleToss={() => setShowBottleToss(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Calligraphy (No Emojis!) */}
      <footer className="w-full py-12 bg-[#302c1a] text-[#ebe2c8] border-t-4 border-[#8c4f10] shadow-[inner_0_4px_20px_rgba(0,0,0,0.6)] z-40 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#8c4f10] overflow-hidden flex-shrink-0">
              <img
                alt="Footer Seal"
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=150&auto=format&fit=crop"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold">
              © 1894 The Alchemist's Courier Guild • {isConnected ? "Live Alchemical Relay Connected" : "Local Chamber Mode"}
            </p>
          </div>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-[#cec6ad]">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Dispatch Support: Contact Chief Clerk Elias Vance."); }} className="hover:text-[#ffdcc2]">Dispatch Support</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Postal Terms: All wax seals must be unbroken upon delivery."); }} className="hover:text-[#ffdcc2]">Postal Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Guild Bylaws: Article IV - The pen is the tongue of the soul."); }} className="hover:text-[#ffdcc2]">Guild Bylaws</a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {selectedLetter && (
          <LetterViewModal
            letter={selectedLetter}
            persona={persona}
            onClose={() => setSelectedLetter(null)}
            onReply={handleReplyLetter}
            onLike={handleLikeLetter}
          />
        )}

        {showBottleToss && (
          <BottleTossModal
            persona={persona}
            onClose={() => setShowBottleToss(false)}
            onTossBottle={handleTossBottle}
          />
        )}

        {selectedBottle && (
          <BottleViewModal
            bottle={selectedBottle}
            persona={persona}
            onClose={() => setSelectedBottle(null)}
            onReplyBottle={handleReplyBottle}
          />
        )}

        {showGoldExchange && (
          <SovereignExchangeModal
            currentGold={currentGold}
            persona={persona}
            onClose={() => setShowGoldExchange(false)}
            onPurchaseSuccess={(addedGold, inrPaid) => {
              setCurrentGold((prev) => prev + addedGold);
            }}
          />
        )}

        {showAuthModal && (
          <GuildAuthModal
            isLoggedIn={isLoggedIn}
            persona={persona}
            onLogout={handleLogout}
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {showProfileCustomizer && (
          <ProfileCustomizerModal
            persona={persona}
            onClose={() => setShowProfileCustomizer(false)}
            onSavePersona={(updated) => setPersona(updated)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;