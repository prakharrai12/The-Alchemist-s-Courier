import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { sounds } from "../audio/soundEngine";

const SovereignExchangeModal = ({ onClose, onPurchaseSuccess, currentGold = 1000, persona }) => {
  const [step, setStep] = useState("select_package"); // 'select_package', 'checkout_gateway', 'processing_mint', 'success_receipt'
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState("7982421223@fam");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8891");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("482");
  const [mintProgress, setMintProgress] = useState(0);

  const packages = [
    {
      id: "pkg_12",
      title: "Apprentice Leather Pouch",
      gold: 12,
      bonus: 0,
      inr: 39,
      desc: "Perfect entry bullion pack. Commission swift homing pigeons and local dispatch relays.",
      iconUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
      tag: "ACCESSIBLE ENTRY"
    },
    {
      id: "pkg_60",
      title: "Courier's Brass Chest",
      gold: 60,
      bonus: 10,
      inr: 149,
      desc: "For ironbound clipper ships and custom royal signet adornments on sea voyages.",
      iconUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=300&auto=format&fit=crop",
      tag: "+10 BONUS SOVEREIGNS"
    },
    {
      id: "pkg_200",
      title: "Alchemist's Crucible",
      gold: 200,
      bonus: 50,
      inr: 399,
      desc: "Most Popular — Ample bullion to unlock occult ciphers and maintain priority dispatch routes.",
      iconUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=300&auto=format&fit=crop",
      tag: "MOST POPULAR (+25% BONUS)"
    },
    {
      id: "pkg_600",
      title: "Imperial Treasury Vault",
      gold: 600,
      bonus: 200,
      inr: 999,
      desc: "Ultimate Guild Prestige endowment. Never run dry of alchemical ink or sovereign gold.",
      iconUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=300&auto=format&fit=crop",
      tag: "GRAND ARCHIVIST (+33% BONUS)"
    }
  ];

  const handleSelectPackage = (pkg) => {
    sounds.playCorkPop();
    setSelectedPkg(pkg);
    setStep("checkout_gateway");
  };

  const handleExpressMint = (pkg) => {
    sounds.playWaxSeal();
    setSelectedPkg(pkg);
    setStep("processing_mint");
    setMintProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      sounds.playQuillWrite();
      setMintProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        sounds.playCorkPop();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#ffdcc2", "#8c4f10"]
        });
        setStep("success_receipt");
        if (onPurchaseSuccess && pkg) {
          onPurchaseSuccess(pkg.gold + pkg.bonus, pkg.inr);
        }
      }
    }, 350);
  };

  const handleProcessMint = (e) => {
    if (e) e.preventDefault();
    sounds.playWaxSeal();
    setStep("processing_mint");
    setMintProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      sounds.playQuillWrite();
      setMintProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        sounds.playCorkPop();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#ffdcc2", "#8c4f10"]
        });
        setStep("success_receipt");
        if (onPurchaseSuccess && selectedPkg) {
          onPurchaseSuccess(selectedPkg.gold + selectedPkg.bonus, selectedPkg.inr);
        }
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        className="relative w-full max-w-4xl bg-[#fcf9f8] text-[#1b1c1c] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-4 border-[#8c4f10] overflow-hidden my-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        {/* Top Sovereign Banner */}
        <div className="relative bg-[#1f1c0b] text-[#ffdcc2] p-8 text-center border-b-2 border-[#8c4f10] overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')" }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8c4f10] to-[#ffdcc2] p-0.5 shadow-xl overflow-hidden">
                <img
                  alt="Gold Sovereign"
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffb77b] font-bold block">
                  THE SOVEREIGN EXCHEQUER & MINT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Acquire Guild Gold Bullion
                </h2>
              </div>
            </div>

            <div className="bg-[#302c1a] border border-[#8c4f10] px-5 py-3 rounded-xl text-right shadow-inner">
              <span className="font-mono text-[10px] uppercase text-[#cec6ad] block">CURRENT EXCHEQUER BALANCE</span>
              <span className="font-serif text-2xl font-bold text-[#ffb77b]">£ {currentGold} Gold</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#cec6ad] hover:text-white text-2xl font-bold p-2"
          >
            ✕
          </button>
        </div>

        {/* STEP 1: SELECT PACKAGE */}
        {step === "select_package" && (
          <div className="p-6 md:p-10">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl text-[#1b1c1c] font-bold">Select Your Sovereign Bullion Tier</h3>
              <p className="font-serif text-sm text-[#5a403c] italic mt-1">
                Official Exchange Rate: 100 Gold Sovereigns ≈ ₹49 Indian Rupees. Minted under Royal Alchemical Warrant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg)}
                  className="bg-white hover:bg-[#fcfaf5] border-2 border-[#e3beb8] hover:border-[#8c4f10] rounded-xl p-6 shadow-md hover:shadow-xl cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-[#ebe2c8] text-[#610000] font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg border-l border-b border-[#8c4f10]/30">
                    {pkg.tag}
                  </div>

                  <div className="flex items-center gap-5 mb-4 mt-2">
                    <img
                      alt={pkg.title}
                      src={pkg.iconUrl}
                      className="w-20 h-20 rounded-lg object-cover border border-[#8c4f10]/40 shadow group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-[#1b1c1c] group-hover:text-[#610000]">
                        {pkg.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-[#8c4f10]">{pkg.gold}</span>
                        {pkg.bonus > 0 && (
                          <span className="font-mono text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                            +{pkg.bonus} BONUS
                          </span>
                        )}
                        <span className="font-mono text-xs text-[#5a403c] uppercase font-bold">Gold</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-serif text-xs text-[#5a403c] leading-relaxed mb-6 border-t pt-3">
                    {pkg.desc}
                  </p>

                  <div className="flex justify-between items-center pt-3 border-t border-[#8c4f10]/20">
                    <span className="font-mono text-xs text-[#5a403c] uppercase font-bold">Total Bullion: {pkg.gold + pkg.bonus} Gold</span>
                    <button className="px-6 py-2.5 bg-[#610000] group-hover:bg-[#8b0000] text-white font-serif text-base font-bold tracking-wider rounded-lg shadow transition-colors">
                      Pay ₹{pkg.inr} INR →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CHECKOUT GATEWAY (`₹ INR`) */}
        {step === "checkout_gateway" && selectedPkg && (
          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: PAYMENT METHOD */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-[#e3beb8] shadow-lg">
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#610000]">Select Payment Method</h3>
                <button
                  type="button"
                  onClick={() => setStep("select_package")}
                  className="font-mono text-xs text-[#8c4f10] underline hover:text-[#610000]"
                >
                  ← Change Package
                </button>
              </div>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => { sounds.playCorkPop(); setPaymentMethod("upi"); }}
                  className={`py-3 px-2 rounded-lg border-2 font-bold text-center transition-all ${paymentMethod === "upi" ? "bg-[#ebe2c8] border-[#8c4f10] text-[#610000] shadow" : "border-[#e3beb8] text-[#5a403c] hover:bg-[#f6f3f2]"}`}
                >
                  ⚡ UPI (GPay / PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => { sounds.playCorkPop(); setPaymentMethod("card"); }}
                  className={`py-3 px-2 rounded-lg border-2 font-bold text-center transition-all ${paymentMethod === "card" ? "bg-[#ebe2c8] border-[#8c4f10] text-[#610000] shadow" : "border-[#e3beb8] text-[#5a403c] hover:bg-[#f6f3f2]"}`}
                >
                  💳 Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => { sounds.playCorkPop(); setPaymentMethod("netbanking"); }}
                  className={`py-3 px-2 rounded-lg border-2 font-bold text-center transition-all ${paymentMethod === "netbanking" ? "bg-[#ebe2c8] border-[#8c4f10] text-[#610000] shadow" : "border-[#e3beb8] text-[#5a403c] hover:bg-[#f6f3f2]"}`}
                >
                  🏛️ Net Banking
                </button>
              </div>

              {/* UPI Form */}
              {paymentMethod === "upi" && (
                <form onSubmit={handleProcessMint} className="space-y-4">
                  <div className="bg-[#fdfaf5] p-4 rounded-lg border border-[#8c4f10]/40 shadow-inner flex flex-col md:flex-row items-center gap-6 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-[#8c4f10]/30 shadow flex-shrink-0">
                      <img
                        alt="UPI QR Code for Prakhar Rai"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3D7982421223%40fam%26pn%3DPrakhar%2520Rai%2520%28Lead%2520Dev%29%26am%3D${selectedPkg.inr}%26cu%3DINR`}
                        className="w-40 h-40 object-contain mx-auto"
                      />
                      <span className="block text-center font-mono text-[10px] text-[#8c4f10] font-bold mt-2">
                        SCAN TO PAY ₹{selectedPkg.inr} INR
                      </span>
                    </div>

                    <div className="flex-grow text-center md:text-left">
                      <div className="inline-block bg-[#610000]/10 text-[#610000] font-mono text-[10px] font-bold px-2.5 py-1 rounded mb-2 border border-[#610000]/30">
                        🔒 FIREBASE SECURE GATEWAY CONNECTED
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#1b1c1c]">Sovereign Merchant Deposit</h4>
                      <p className="font-mono text-xs text-[#8c4f10] uppercase tracking-wider font-bold mt-1">
                        PRODUCER & DEV: PRAKHAR RAI
                      </p>
                      
                      <div className="mt-3 p-2.5 bg-white rounded border border-[#8c4f10]/30 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#610000] tracking-wide">
                          7982421223@fam
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("7982421223@fam");
                            sounds.playCorkPop();
                            alert("Merchant UPI ID (7982421223@fam) copied to clipboard!");
                          }}
                          className="px-2 py-1 bg-[#8c4f10] hover:bg-[#a65d13] text-white font-mono text-[10px] uppercase rounded"
                        >
                          COPY ID
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-[#5a403c] mt-2 italic">
                        Scan QR code with GPay, PhonePe, Paytm, or FamPay for instant Gold verification.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-2">
                      YOUR PAYING UPI ID OR REFERENCE NUMBER (VPA)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7982421223@fam or 12-digit UTR transaction ref..."
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      onFocus={() => sounds.playQuillWrite()}
                      className="w-full p-3.5 bg-[#fcf9f8] border-2 border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#610000]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold uppercase tracking-widest rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span>VERIFY & MINT {selectedPkg.gold + selectedPkg.bonus} SOVEREIGNS (₹{selectedPkg.inr})</span>
                  </button>
                </form>
              )}

              {/* Card Form */}
              {paymentMethod === "card" && (
                <form onSubmit={handleProcessMint} className="space-y-4">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">
                      CARD NUMBER (VISA / MASTERCARD / RUPAY)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      onFocus={() => sounds.playQuillWrite()}
                      className="w-full p-3 bg-[#fcf9f8] border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">EXPIRY DATE</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-3 bg-[#fcf9f8] border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-widest text-[#8c4f10] font-bold block mb-1">SECURITY CVV</label>
                      <input
                        type="password"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-3 bg-[#fcf9f8] border border-[#8c4f10] rounded-lg font-mono text-sm text-[#1b1c1c]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold uppercase tracking-widest rounded-xl shadow-xl transition-transform hover:scale-[1.02]"
                  >
                    AUTHORIZE & PAY ₹{selectedPkg.inr} INR
                  </button>
                </form>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div className="space-y-4 text-center py-6">
                  <p className="font-serif text-base text-[#5a403c]">
                    Connected with 45 major Indian Banks (HDFC, SBI, ICICI, Axis, Kotak).
                  </p>
                  <button
                    onClick={handleProcessMint}
                    className="w-full py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold uppercase tracking-widest rounded-xl shadow-xl"
                  >
                    PROCEED TO BANK PORTAL (₹{selectedPkg.inr} INR)
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: INVOICE BREAKDOWN */}
            <div className="lg:col-span-5 bg-[#ebe2c8]/60 p-6 md:p-8 rounded-xl border-2 border-[#8c4f10] shadow-xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8c4f10] font-bold block mb-4 border-b pb-2">
                  ROYAL MINT INVOICE
                </span>

                <div className="space-y-4 font-mono text-xs text-[#5a403c] mb-6">
                  <div className="flex justify-between">
                    <span>Selected Tier:</span>
                    <span className="font-bold text-[#1b1c1c] font-serif text-sm">{selectedPkg.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bullion Allocation:</span>
                    <span className="font-bold text-[#8c4f10]">{selectedPkg.gold} Gold Sovereigns</span>
                  </div>
                  {selectedPkg.bonus > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Royal Bonus Grant:</span>
                      <span className="font-bold">+{selectedPkg.bonus} Gold Sovereigns</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span>Guild Processing Fee:</span>
                    <span className="font-bold text-green-700">₹0.00 INR (Waived)</span>
                  </div>
                </div>

                <div className="bg-[#1f1c0b] text-white p-5 rounded-xl shadow-inner mb-6 text-center">
                  <span className="font-mono text-[10px] text-[#cec6ad] uppercase block mb-1">TOTAL PAYABLE AMOUNT</span>
                  <span className="font-serif text-4xl font-bold text-[#ffb77b]">₹ {selectedPkg.inr} INR</span>
                  <span className="font-mono text-[10px] text-[#cec6ad] block mt-1">
                    Recovers: {selectedPkg.gold + selectedPkg.bonus} Gold Sovereigns
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#5a403c] text-center border-t pt-3">
                🛡️ Encrypted by 256-Bit Bank of London SSL • Instant Delivery upon authorization
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESSING MINT ANIMATION */}
        {step === "processing_mint" && (
          <div className="p-16 text-center space-y-8 max-w-xl mx-auto">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-8 border-[#ebe2c8] animate-pulse"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-[#610000] border-t-transparent animate-spin"
                style={{ animationDuration: "1.2s" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-bold text-[#8c4f10]">
                {mintProgress}%
              </div>
            </div>

            <div>
              <h3 className="font-serif text-3xl font-bold text-[#610000]">Minting Your Sovereigns...</h3>
              <p className="font-serif text-base text-[#5a403c] italic mt-2">
                "Melting pure gold bullion in the Alchemist's Crucible and stamping the Royal Signet..."
              </p>
            </div>

            <div className="w-full bg-[#e3beb8] h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#8c4f10] via-[#ffdcc2] to-[#610000] h-full transition-all duration-300"
                style={{ width: `${mintProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS RECEIPT */}
        {step === "success_receipt" && selectedPkg && (
          <div className="p-10 md:p-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-[#610000] text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl ring-8 ring-[#ffdcc2]/50">
              ✓
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8c4f10] font-bold block mb-1">
                EXCHEQUER RECEIPT #ALCH-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="font-serif text-4xl font-bold text-[#1b1c1c]">
                Sovereigns Successfully Deposited!
              </h3>
              <p className="font-serif text-lg text-[#5a403c] italic mt-2">
                Your payment of <strong className="text-[#610000]">₹{selectedPkg.inr} INR</strong> has been verified by the Royal Alchemical Bank.
              </p>
            </div>

            <div className="bg-[#ebe2c8] p-6 rounded-xl border-2 border-[#8c4f10] shadow-inner max-w-md mx-auto">
              <span className="font-mono text-xs text-[#5a403c] uppercase block mb-1">NEW BULLION ENDOWMENT</span>
              <span className="font-serif text-4xl font-bold text-[#610000]">+{selectedPkg.gold + selectedPkg.bonus} Gold Sovereigns</span>
              <div className="mt-2 text-xs font-mono text-[#8c4f10] font-bold">
                Total Updated Balance: £ {currentGold + selectedPkg.gold + selectedPkg.bonus} Gold
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-10 py-4 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-lg font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all hover:scale-105"
              >
                Return to Guild Chambers
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SovereignExchangeModal;
