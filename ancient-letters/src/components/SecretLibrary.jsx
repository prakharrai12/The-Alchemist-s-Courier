import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { sounds } from "../audio/soundEngine";

const SecretLibrary = ({ onUnlockReward, unlockedCiphers = ["1894-A"], persona }) => {
  const [activeCipherId, setActiveCipherId] = useState("1894-A");
  const [cipherKeyInput, setCipherKeyInput] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Cipher Form State
  const [newTitle, setNewTitle] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newSecretText, setNewSecretText] = useState("");

  const [ciphersList, setCiphersList] = useState([
    {
      id: "1894-A",
      vol: "VOL. 1894-A",
      title: "The Serpent's Hand Ledger",
      status: "UNREAD - SEALED WITH LEAD",
      requiredKey: "ALCHEMIST",
      cipherMain: "Xzq lvyv dlyv hss zvmaly ohukz, iba doha dl dlyv dpzo pun mvy dlyv hss lscv.",
      cipherSub: "Kshm qpzm d lmsz... lmsz pzm d kshm...",
      plainMain: "Our gold lies deep beneath the ancient stone, guarded by the silent sentinels of the Alchemist's Tower.",
      plainSub: "Trust only in wax... wax seals the truth forever...",
      rewardGold: 50
    },
    {
      id: "1894-C",
      vol: "VOL. 1894-C",
      title: "Clockwork Correspondence",
      status: "LOCKED UNTIL EQUINOX",
      requiredKey: "EQUINOX",
      cipherMain: "Uif hfbst of the grebu bshmpncps dmpdlt sfpvjsf uif zfmmpx nfsdvsz up uvso cj-npoa.",
      cipherSub: "Eboz jta kpzt uif nppomjhau...",
      plainMain: "The gears of the great archimedes clock require the yellow mercury to turn bi-monthly.",
      plainSub: "Wait for the full moonlight before pouring the elixir into the brass vessel...",
      rewardGold: 75
    },
    {
      id: "MEMOIR-04",
      vol: "MEMOIR-04",
      title: "Ministry of Whispers",
      status: "DECRYPTION IN PROGRESS",
      requiredKey: "WHISPERS",
      cipherMain: "Qeb clnd lk qeb xlroqe fq fz alxka rk... colj qeb hfkn p blia mxbk.",
      cipherSub: "Cllz pebd dlmz... xilc pebd mlh...",
      plainMain: "The fog off the harbor hides twelve clipper ships laden with alchemical copper.",
      plainSub: "Signal them with two emerald lanterns at midnight near the Whitechapel dock...",
      rewardGold: 100
    },
    {
      id: "CODEX-88",
      vol: "CODEX-88",
      title: "The Obsidian Transmutation",
      status: "IRONBOUND & OCCULT",
      requiredKey: "MERCURY",
      cipherMain: "Sjw twz xnhru ts xhm wzyy... btl ufsy rts rfhy xzy qfqqw ytzh.",
      cipherSub: "Qzwx pnr qf xmnw txyw...",
      plainMain: "When sulfur meets liquid quicksilver beneath candlelight, lead turns into pure Sovereign Gold.",
      plainSub: "Keep the crucible at exact boiling point until the violet smoke clears...",
      rewardGold: 150
    },
    {
      id: "1895-Z",
      vol: "VOL. 1895-Z",
      title: "The Copper Alembic",
      status: "LOCKED BY HIGH TOWER",
      requiredKey: "ALEMBIC",
      cipherMain: "Hshf the dlmkw uful to qz yzmn klq... ztlx fsh lpsb mzy wqlm.",
      cipherSub: "Snhy vps kl vps...",
      plainMain: "Heat the copper alembic to its highest point... then cool with spring water.",
      plainSub: "Distill drop by drop until the clear spirit emerges...",
      rewardGold: 200
    },
    {
      id: "1896-X",
      vol: "VOL. 1896-X",
      title: "High Scriptorium Seal",
      status: "ROYAL DECREE ONLY",
      requiredKey: "SOVEREIGN",
      cipherMain: "Ztlx yzmn yb tsl qz yzmn lpsb mzy... uful klq fsh lpsb.",
      cipherSub: "Klmz vps kl...",
      plainMain: "By Royal Decree of the Arch-Alchemist, all couriers must carry dual lead signets.",
      plainSub: "Failure to stamp in red wax will result in immediate loss of guild rank...",
      rewardGold: 250
    }
  ]);

  const currentCipher = ciphersList.find((c) => c.id === activeCipherId) || ciphersList[0];
  const isAlreadyUnlocked = unlockedCiphers.includes(activeCipherId);

  const [displayedText, setDisplayedText] = useState(currentCipher.cipherMain);
  const [displayedSub, setDisplayedSub] = useState(currentCipher.cipherSub);

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
    setCipherKeyInput("");
    setIsDecrypting(false);

    if (isAlreadyUnlocked) {
      setIsDecrypted(true);
      setDisplayedText(currentCipher.plainMain);
      setDisplayedSub(currentCipher.plainSub);
    } else {
      setIsDecrypted(false);
      setDisplayedText(currentCipher.cipherMain);
      setDisplayedSub(currentCipher.cipherSub);
    }
  }, [activeCipherId, currentCipher, isAlreadyUnlocked]);

  const handleBreakSeal = async () => {
    if (isAlreadyUnlocked || isDecrypted) {
      sounds.playCorkPop();
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    // Check if key matches
    const inputKeyClean = cipherKeyInput.trim().toUpperCase();
    if (!inputKeyClean) {
      setErrorMessage("Please insert a cipher key before breaking the lead seal.");
      sounds.playCorkPop();
      return;
    }

    if (inputKeyClean !== currentCipher.requiredKey.toUpperCase()) {
      sounds.playCorkPop();
      setErrorMessage(
        `INCORRECT CIPHER KEY [ ${inputKeyClean} ]. The lead seal refuses to yield. Required key has ${currentCipher.requiredKey.length} letters.`
      );
      return;
    }

    // Key matches! Run decryption scramble animation
    setIsDecrypting(true);
    sounds.playWaxSeal();

    let step = 0;
    const interval = setInterval(() => {
      step++;
      sounds.playQuillWrite();
      if (step < 8) {
        setDisplayedText((prev) =>
          prev
            .split("")
            .map((ch) => (Math.random() > 0.4 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : ch))
            .join("")
        );
      } else {
        clearInterval(interval);
        setDisplayedText(currentCipher.plainMain);
        setDisplayedSub(currentCipher.plainSub);
        setIsDecrypting(false);
        setIsDecrypted(true);
        sounds.playCorkPop();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#ffdcc2", "#610000", "#8c4f10"]
        });

        const reward = currentCipher.rewardGold || 50;
        setSuccessMessage(`LEAD SEAL BROKEN! Cipher revealed. You have been awarded +${reward} Gold Sovereigns.`);
        if (onUnlockReward) {
          onUnlockReward(currentCipher.id, reward);
        }
      }
    }, 110);
  };

  const handleQuickKeyHint = () => {
    sounds.playQuillWrite();
    setCipherKeyInput(currentCipher.requiredKey);
    setErrorMessage("");
  };

  const handleCreateCipherSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!newTitle.trim() || !newKey.trim() || !newSecretText.trim()) return;

    sounds.playWaxSeal();
    const shift = 7;
    const encrypt = (str) =>
      str
        .split("")
        .map((char) => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          return char;
        })
        .join("");

    const newId = "VOL-" + Math.floor(1000 + Math.random() * 9000);
    const newCipherObj = {
      id: newId,
      vol: "VOL. 1894-S",
      title: newTitle.trim(),
      status: "MEMBER ENCRYPTED SEAL",
      requiredKey: newKey.trim().toUpperCase(),
      cipherMain: encrypt(newSecretText.trim()),
      cipherSub: "Encrypted by Signet of " + (persona?.name || "Member"),
      plainMain: newSecretText.trim(),
      plainSub: "Personal confidential guild record.",
      rewardGold: 80
    };

    try {
      await fetch("http://localhost:5000/api/ciphers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCipherObj)
      });
    } catch (err) {}

    setCiphersList((prev) => [newCipherObj, ...prev]);
    setActiveCipherId(newId);
    setShowCreateModal(false);
    setNewTitle("");
    setNewKey("");
    setNewSecretText("");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 text-[#e4e2e1]">
      {/* TOP SECURITY ATMOSPHERE BAR (No Emojis - Using SVG & Antique Styling) */}
      <div className="bg-[#1f1c0b]/95 border-b-2 border-[#610000] p-4 sm:p-5 rounded-t-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] block">SECURITY LEVEL</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wider">OCCULT ENCRYPTED</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] block">GUARD PRESENCE</span>
            <span className="font-serif text-xs sm:text-sm text-[#cec6ad] italic flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#8c4f10] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Ironbound Sentinels Active</span>
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] block">ATMOSPHERE</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs text-[#cec6ad]">Candlelit Visibility</span>
              <div className="w-20 sm:w-24 bg-[#47422f] h-2 rounded-full overflow-hidden border border-black/30">
                <div className="bg-[#fdad67] w-3/4 h-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playCorkPop();
              setShowCreateModal(true);
            }}
            className="min-h-[44px] bg-[#8c4f10] hover:bg-[#a65d13] text-white font-mono text-xs uppercase font-bold px-4 py-2.5 rounded shadow transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>ENCRYPT NEW CIPHER</span>
          </button>

          <button
            className="min-h-[44px] bg-[#610000] hover:bg-red-800 text-white font-mono text-xs uppercase font-bold px-4 py-2.5 rounded shadow flex items-center justify-center gap-2 transition-transform hover:scale-105 w-full sm:w-auto"
            onClick={() => {
              sounds.playCorkPop();
              alert("SELF-DESTRUCT PROTOCOL INITIATED — All lead seals are warming to melting temperature!");
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.345-1.484-.319-.436-.595-.916-.786-1.438a14.28 14.28 0 01-.424-1.575zm-1.802 12.015a3 3 0 11-4.242-4.243 4.965 4.965 0 013.535-.707 3 3 0 012.828 2.828 4.965 4.965 0 01-.707 3.535 3 3 0 01-1.414-1.413z" clipRule="evenodd" />
            </svg>
            <span>BURN AFTER READING</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-[#1a1410] border-x-2 border-b-2 border-[#8c4f10]/40 rounded-b-xl p-5 sm:p-6 md:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop')" }}
        />

        {/* LEFT COLUMN: ACTIVE CIPHERS */}
        <div className="lg:col-span-4 bg-[#fcf9f8] text-[#1b1c1c] p-5 sm:p-6 rounded-xl shadow-xl border border-[#e3beb8] z-10">
          <h3 className="font-serif text-[11px] sm:text-xs uppercase tracking-widest text-[#610000] font-bold mb-5 border-b pb-3 flex items-center justify-between">
            <span>ACTIVE CIPHERS</span>
            <span className="text-[#8c4f10]">{ciphersList.length} Volumes</span>
          </h3>

          <div className="space-y-2.5 mb-5 max-h-[480px] overflow-y-auto pr-1">
            {ciphersList.map((c) => {
              const isUnlocked = unlockedCiphers.includes(c.id) || (activeCipherId === c.id && isDecrypted);
              return (
                <div
                  key={c.id}
                  className={`min-h-[64px] p-3.5 sm:p-4 rounded-lg border cursor-pointer transition-all flex items-start justify-between ${activeCipherId === c.id ? "bg-[#ebe2c8] border-[#610000] shadow-md border-l-4 border-l-[#610000]" : "bg-white border-[#e3beb8] hover:bg-[#f6f3f2]"}`}
                  onClick={() => {
                    sounds.playParchmentUnroll();
                    setActiveCipherId(c.id);
                  }}
                >
                  <div className="flex-grow pr-2 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${isUnlocked ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
                        {isUnlocked ? "DECIPHERED" : "SEALED"}
                      </span>
                      <span className="font-mono text-[10px] text-[#8c4f10] font-bold uppercase truncate">{c.vol}</span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#1b1c1c] mb-0.5 truncate">{c.title}</h4>
                    <p className="font-mono text-[9px] text-[#610000] font-bold uppercase truncate">{c.status}</p>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1f1c0b] border border-[#8c4f10]/40 flex items-center justify-center text-[#ffdcc2] flex-shrink-0 mt-0.5">
                    {isUnlocked ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#ffdcc2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="w-full min-h-[44px] py-3 bg-[#e4e2e1] hover:bg-[#cec6ad] text-[#4c4733] font-mono text-xs uppercase font-bold tracking-widest rounded border border-[#8e706b] transition-colors flex items-center justify-center"
            onClick={() => {
              sounds.playQuillWrite();
              alert("Browsing 4,800 sealed historical volumes from the Spitalfields Guild Vault...");
            }}
          >
            BROWSE ARCHIVES & RECORDS
          </button>
        </div>

        {/* CENTER COLUMN: ENCRYPTED DISPATCH SCROLL */}
        <div className="lg:col-span-8 z-10">
          <div className="bg-[#fcf9f8] text-[#1b1c1c] rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-[#8c4f10] relative">
            {/* Header with Antique Seal Icon */}
            <div className="text-center mb-6 sm:mb-8 border-b border-[#e3beb8] pb-5 sm:pb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#610000] border-2 border-[#8c4f10] shadow-xl flex items-center justify-center mx-auto mb-3 overflow-hidden p-1.5">
                <img
                  alt="Signet Emblem"
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-cover rounded-full filter contrast-125"
                />
              </div>
              <h2 className="font-serif text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] text-[#1b1c1c] font-bold tracking-tight leading-tight">
                {currentCipher.title}
              </h2>
              <p className="font-mono text-[11px] sm:text-xs text-[#8c4f10] uppercase tracking-widest font-bold mt-1">
                ORIGIN: THE HIGH ALCHEMIST'S TOWER • REWARD: +{currentCipher.rewardGold || 50} GOLD SOVEREIGNS
              </p>
            </div>

            {/* Error & Success Feedback Alerts */}
            {errorMessage && (
              <div className="mb-5 p-4 bg-red-900/10 border border-red-800/40 rounded-xl text-red-900 font-serif text-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-red-800 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-bold">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-4 bg-green-900/10 border border-green-800/40 rounded-xl text-green-900 font-serif text-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-green-800 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-bold">{successMessage}</span>
              </div>
            )}

            {/* Cipher/Decrypted Text Area */}
            <div className="my-5 p-6 sm:p-8 bg-[#ebe2c8]/40 border border-[#e3beb8] rounded-xl min-h-[160px] flex flex-col justify-center text-center relative shadow-inner">
              <p className={`font-serif text-lg sm:text-xl md:text-2xl leading-relaxed mb-3 sm:mb-4 transition-all duration-300 ${isDecrypted ? "text-[#610000] font-bold" : "text-[#4c4733] font-mono tracking-wider italic"}`}>
                "{displayedText}"
              </p>
              <p className={`font-serif text-sm sm:text-base opacity-80 ${isDecrypted ? "text-[#1b1c1c]" : "text-[#8c4f10] font-mono"}`}>
                "{displayedSub}"
              </p>

              {isDecrypting && (
                <div className="my-4 p-3 bg-[#610000]/10 border border-[#610000] rounded-lg text-[#610000] font-mono text-xs animate-pulse">
                  <div className="flex justify-between font-bold mb-1">
                    <span>ALCHEMICAL CAESAR SCRAMBLE ACTIVE...</span>
                    <span>DECIPHERING ROT-7 WHEEL</span>
                  </div>
                  <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#610000] h-full animate-[pulse_0.5s_ease-in-out_infinite] w-full" />
                  </div>
                </div>
              )}

              {/* Status Ribbon inside text area */}
              <div className="mt-5 pt-3.5 border-t border-[#8c4f10]/20 flex flex-wrap justify-between items-center text-xs font-mono text-[#8c4f10] uppercase font-bold gap-2">
                <span>STATUS: {isDecrypted ? "PLAIN TEXT REVEALED" : "SEALED BY LEAD SIGNET"}</span>
                <span>KEY LENGTH: {currentCipher.requiredKey.length} CHARACTERS</span>
              </div>
            </div>

            {/* Cipher Key Input & Break Seal Action */}
            <div className="mt-6 sm:mt-8 max-w-lg mx-auto">
              {isDecrypted ? (
                <div className="p-4 bg-[#ebe2c8] border border-[#8c4f10] rounded-xl text-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#610000] font-bold block mb-1">
                    THIS VOLUME IS DECIPHERED
                  </span>
                  <p className="font-serif text-sm text-[#1b1c1c]">
                    You have successfully broken the seal using key: <strong className="font-mono text-[#610000]">{currentCipher.requiredKey}</strong>. The knowledge is now recorded in your ledger.
                  </p>
                </div>
              ) : (
                <>
                  <label className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-2">
                    INSERT CIPHER KEY TO BREAK SEAL (E.G., '{currentCipher.requiredKey}')
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
                    <div className="relative flex-grow">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:text-lg text-[#8c4f10] font-mono font-bold">KEY:</span>
                      <input
                        type="text"
                        placeholder={`Enter ${currentCipher.requiredKey.length}-letter secret key...`}
                        value={cipherKeyInput}
                        onChange={(e) => setCipherKeyInput(e.target.value)}
                        onFocus={() => sounds.playQuillWrite()}
                        className="w-full min-h-[44px] pl-14 pr-4 py-3 bg-white border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000] uppercase font-bold tracking-wider"
                      />
                    </div>
                    <button
                      type="button"
                      className="min-h-[44px] px-5 py-3 bg-[#ebe2c8] border border-[#8c4f10] rounded-lg font-mono text-xs text-[#610000] font-bold uppercase hover:bg-[#cec6ad] transition-colors flex-shrink-0 shadow-sm flex items-center justify-center"
                      onClick={handleQuickKeyHint}
                      title="Use Alchemical Analyzer to autofill correct key"
                    >
                      Quick Key Hint
                    </button>
                  </div>

                  {/* Giant Crimson Break Seal Button (No Emojis!) */}
                  <motion.button
                    type="button"
                    className="w-full min-h-[52px] py-4 rounded-xl font-serif text-lg sm:text-xl font-bold tracking-widest uppercase text-white shadow-xl flex items-center justify-center gap-3.5 transition-all bg-[#610000] hover:bg-[#8b0000] hover:scale-[1.01]"
                    disabled={isDecrypting}
                    onClick={handleBreakSeal}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>BREAK LEAD SEAL & DECRYPT</span>
                    <div className="w-8 h-8 rounded-full bg-red-950 border border-white/40 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Footer Notice */}
      <div className="mt-5 flex flex-wrap items-center justify-between text-xs font-mono text-[#cec6ad] px-2 sm:px-4 gap-3">
        <span>SECURITY PROMPT: 256-Bit Lead Signet Verification</span>
        <span>EXCHEQUER STATUS: +50 Gold Reward Active</span>
        <span className="text-[#ffdcc2]">BIOMETRIC STAMP: VERIFIED BY ARCHIVE CLERK</span>
      </div>

      {/* CREATE NEW CIPHER MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              className="relative w-full max-w-xl bg-[#fcf9f8] text-[#1b1c1c] rounded-xl p-6 sm:p-8 border-2 border-[#8c4f10] shadow-2xl my-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-center mb-5 border-b pb-3.5">
                <div>
                  <span className="font-mono text-[11px] uppercase text-[#8c4f10] font-bold block">ALCHEMICAL ENCRYPTION UNIT</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#610000]">Write & Encrypt New Cipher Volume</h3>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xl font-bold text-[#5a403c] hover:text-[#1b1c1c]">✕</button>
              </div>

              <form onSubmit={handleCreateCipherSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs uppercase text-[#8c4f10] font-bold block mb-1">Title of Secret Volume</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., The Eastern Gargoyle Vault"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full min-h-[44px] p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-sm sm:text-base text-[#1b1c1c]"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase text-[#8c4f10] font-bold block mb-1">Secret Decryption Key (Single Word or Passcode)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., GARGOYLE"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value.toUpperCase())}
                    className="w-full min-h-[44px] p-3 bg-white border border-[#8c4f10] rounded-lg font-mono text-sm uppercase font-bold tracking-wider text-[#610000]"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase text-[#8c4f10] font-bold block mb-1">Confidential Secret Text to Encrypt</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write the true knowledge here. It will be encrypted via Caesar shift until a Guild Member enters your secret key above..."
                    value={newSecretText}
                    onChange={(e) => setNewSecretText(e.target.value)}
                    className="w-full p-3 bg-white border border-[#8c4f10] rounded-lg font-serif text-sm sm:text-base text-[#1b1c1c] resize-none"
                  />
                </div>

                <div className="pt-4 border-t flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="min-h-[44px] px-6 py-2.5 bg-stone-300 text-[#1b1c1c] font-serif text-sm font-bold uppercase rounded-lg flex items-center justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-8 py-2.5 bg-[#8c4f10] hover:bg-[#610000] text-white font-serif text-sm font-bold uppercase rounded-lg shadow transition-colors flex items-center justify-center"
                  >
                    Imprint Lead Seal & Deposit Volume
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretLibrary;
