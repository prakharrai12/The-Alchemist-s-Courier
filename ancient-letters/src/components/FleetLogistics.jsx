import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { sounds } from "../audio/soundEngine";

const FleetLogistics = ({ onDispatchVessel, persona }) => {
  const [selectedVessel, setSelectedVessel] = useState("homing_pigeon");
  const [customAdornments, setCustomAdornments] = useState({
    silkRibbon: false,
    crestFlag: false,
    waxLantern: false,
    royalInsurance: false
  });
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState("");

  const vessels = [
    {
      id: "homing_pigeon",
      number: "No. 001",
      name: "Homing Pigeon Wing",
      cost: 12,
      speed: "3 Leagues / Hour",
      reliability: "94% Safe Passage",
      desc: "Trained in the lofts above the Old Library. Ideal for swift, lightweight dispatches across domestic counties.",
      imgUrl: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "clipper_ship",
      number: "No. 002",
      name: "Ironbound Clipper Ship",
      cost: 85,
      speed: "18 Knots across Atlantic",
      reliability: "99.2% Sealed Cargo",
      desc: "Heavy oak hull sheathed in copper. Designed to carry heavy ledgers and crystal canisters across turbulent oceans.",
      imgUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "midnight_rider",
      number: "No. 003",
      name: "Midnight Courier Rider",
      cost: 35,
      speed: "6 Leagues / Relay",
      reliability: "97.5% Armed Escort",
      desc: "Seasoned horsemen equipped with flintlock pistols and wax-sealed saddlebags. Night travel guaranteed.",
      imgUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const currentVesselObj = vessels.find(v => v.id === selectedVessel) || vessels[0];

  const calculateTotalCost = () => {
    let base = currentVesselObj.cost;
    if (customAdornments.silkRibbon) base += 2;
    if (customAdornments.crestFlag) base += 5;
    if (customAdornments.waxLantern) base += 3;
    if (customAdornments.royalInsurance) base += 10;
    return base;
  };

  const handleDispatch = () => {
    sounds.playWaxSeal();
    setIsDispatching(true);
    setDispatchStatus("PREPARING VESSEL & STAMPING ROYAL WARPING SEAL...");

    setTimeout(() => {
      sounds.playQuillWrite();
      setDispatchStatus("DEPARTING SPITALFIELDS HARBOR & LAUNCHING ROUTE...");
    }, 1200);

    setTimeout(() => {
      sounds.playCorkPop();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#610000", "#ffdcc2", "#8c4f10"]
      });
      setIsDispatching(false);
      setDispatchStatus("VESSEL SUCCESSFULLY DISPATCHED ACROSS THE REALM!");
      if (onDispatchVessel) {
        onDispatchVessel(currentVesselObj, calculateTotalCost());
      }
    }, 2400);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 text-[#1b1c1c]">
      {/* Header Banner */}
      <div className="bg-[#1f1c0b] text-[#ffdcc2] p-8 md:p-10 rounded-2xl border-4 border-[#8c4f10] shadow-[0_20px_60px_rgba(0,0,0,0.85)] mb-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb77b] font-bold block mb-2">
              GUILD LOGISTICS & DISPATCH COMMAND
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              The Fleet & Vessel Roster
            </h1>
            <p className="font-serif text-sm md:text-base text-[#cec6ad] mt-2 max-w-xl italic">
              "Whether by air above the London towers or by ironclad ship breaking coastal storms, your words will reach safe harbor."
            </p>
          </div>

          <div className="bg-[#302c1a] border border-[#8c4f10] p-5 rounded-xl text-right shadow-inner min-w-[220px]">
            <span className="font-mono text-[10px] uppercase text-[#cec6ad] block">FLEET STATUS INDEX</span>
            <span className="font-serif text-2xl font-bold text-green-400">15 Vessels Ready</span>
            <span className="font-mono text-[10px] text-[#ffb77b] block mt-1">Spitalfields & Whitechapel Docks</span>
          </div>
        </div>
      </div>

      {/* VESSEL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {vessels.map((v) => {
          const isSelected = selectedVessel === v.id;
          return (
            <div
              key={v.id}
              onClick={() => {
                sounds.playCorkPop();
                setSelectedVessel(v.id);
              }}
              className={`rounded-xl border-2 cursor-pointer transition-all overflow-hidden flex flex-col justify-between relative shadow-lg group ${
                isSelected
                  ? "bg-[#ebe2c8] border-[#610000] ring-4 ring-[#8c4f10]/30 scale-[1.02]"
                  : "bg-white border-[#e3beb8] hover:bg-[#fcfaf5] hover:border-[#8c4f10]"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden border-b border-[#8c4f10]/30">
                <img
                  alt={v.name}
                  src={v.imgUrl}
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#ffb77b] font-bold block">{v.number}</span>
                    <h3 className="font-serif text-xl font-bold">{v.name}</h3>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#ffb77b] bg-black/60 px-3 py-1 rounded border border-[#ffb77b]/40">
                    £ {v.cost} Gold
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="font-serif text-xs text-[#5a403c] leading-relaxed mb-4">
                  {v.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#8c4f10]/20 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#5a403c] uppercase">Cruising Speed:</span>
                    <span className="font-bold text-[#1b1c1c]">{v.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5a403c] uppercase">Cargo Security:</span>
                    <span className="font-bold text-green-700">{v.reliability}</span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#8c4f10]/20 text-center">
                  <span className={`font-mono text-xs uppercase font-bold tracking-wider block py-2 rounded ${isSelected ? "bg-[#610000] text-white" : "bg-[#f6f3f2] text-[#8c4f10] group-hover:bg-[#8c4f10] group-hover:text-white"}`}>
                    {isSelected ? "SELECTED FOR DISPATCH" : "COMMISSION VESSEL"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CUSTOMIZATION LEDGER & DISPATCH CONTROL PANEL */}
      <div className="bg-[#fcf9f8] rounded-2xl border-4 border-[#8c4f10] p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Adornments Column */}
        <div className="lg:col-span-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#8c4f10]/30 pb-6 lg:pb-0 lg:pr-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8c4f10] font-bold block mb-1">
            VESSEL CUSTOMIZATION LEDGER
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#610000]">Select Royal Adornments</h3>
          <p className="font-serif text-xs text-[#5a403c] italic mb-4">
            Adornments grant additional Guild Prestige and priority routing across checkpoints.
          </p>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-white border border-[#8c4f10]/40 rounded-lg cursor-pointer hover:bg-[#ebe2c8]/40 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={customAdornments.silkRibbon}
                  onChange={(e) => { sounds.playQuillWrite(); setCustomAdornments({ ...customAdornments, silkRibbon: e.target.checked }); }}
                  className="w-5 h-5 text-[#610000] border-[#8c4f10] rounded focus:ring-0"
                />
                <div>
                  <span className="font-serif text-sm font-bold block text-[#1b1c1c]">Silk Leg-Ribbons / Waxed Covers</span>
                  <span className="font-mono text-[10px] text-[#5a403c]">Protects ink against saltwater splash</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#8c4f10]">+£ 2 Gold</span>
            </label>

            <label className="flex items-center justify-between p-3.5 bg-white border border-[#8c4f10]/40 rounded-lg cursor-pointer hover:bg-[#ebe2c8]/40 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={customAdornments.crestFlag}
                  onChange={(e) => { sounds.playQuillWrite(); setCustomAdornments({ ...customAdornments, crestFlag: e.target.checked }); }}
                  className="w-5 h-5 text-[#610000] border-[#8c4f10] rounded focus:ring-0"
                />
                <div>
                  <span className="font-serif text-sm font-bold block text-[#1b1c1c]">Family Signet Crest Pennants</span>
                  <span className="font-mono text-[10px] text-[#5a403c]">Flown upon mast or saddle for honor</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#8c4f10]">+£ 5 Gold</span>
            </label>

            <label className="flex items-center justify-between p-3.5 bg-white border border-[#8c4f10]/40 rounded-lg cursor-pointer hover:bg-[#ebe2c8]/40 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={customAdornments.waxLantern}
                  onChange={(e) => { sounds.playQuillWrite(); setCustomAdornments({ ...customAdornments, waxLantern: e.target.checked }); }}
                  className="w-5 h-5 text-[#610000] border-[#8c4f10] rounded focus:ring-0"
                />
                <div>
                  <span className="font-serif text-sm font-bold block text-[#1b1c1c]">Wax-Dipped Emerald Lanterns</span>
                  <span className="font-mono text-[10px] text-[#5a403c]">Allows night-time dock signaling</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#8c4f10]">+£ 3 Gold</span>
            </label>

            <label className="flex items-center justify-between p-3.5 bg-white border border-[#8c4f10]/40 rounded-lg cursor-pointer hover:bg-[#ebe2c8]/40 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={customAdornments.royalInsurance}
                  onChange={(e) => { sounds.playQuillWrite(); setCustomAdornments({ ...customAdornments, royalInsurance: e.target.checked }); }}
                  className="w-5 h-5 text-[#610000] border-[#8c4f10] rounded focus:ring-0"
                />
                <div>
                  <span className="font-serif text-sm font-bold block text-[#1b1c1c]">Royal Exchequer Cargo Insurance</span>
                  <span className="font-mono text-[10px] text-[#5a403c]">Full sovereign reimbursement if vessel lost</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#8c4f10]">+£ 10 Gold</span>
            </label>
          </div>
        </div>

        {/* Dispatch Calculation & Action Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#ebe2c8]/60 border-2 border-[#8c4f10] p-6 rounded-xl shadow-inner">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c4f10] font-bold block mb-3 border-b border-[#8c4f10]/30 pb-2">
              COMMISSION INVOICE SUMMARY
            </span>

            <div className="space-y-2 font-mono text-xs text-[#5a403c] mb-4">
              <div className="flex justify-between">
                <span>Base Vessel Fare ({currentVesselObj.name}):</span>
                <span className="font-bold text-[#1b1c1c]">£ {currentVesselObj.cost} Gold</span>
              </div>
              {customAdornments.silkRibbon && (
                <div className="flex justify-between text-[#8c4f10]">
                  <span>Silk Ribbons / Waxed Covers:</span>
                  <span>+£ 2 Gold</span>
                </div>
              )}
              {customAdornments.crestFlag && (
                <div className="flex justify-between text-[#8c4f10]">
                  <span>Signet Crest Pennants:</span>
                  <span>+£ 5 Gold</span>
                </div>
              )}
              {customAdornments.waxLantern && (
                <div className="flex justify-between text-[#8c4f10]">
                  <span>Emerald Lanterns:</span>
                  <span>+£ 3 Gold</span>
                </div>
              )}
              {customAdornments.royalInsurance && (
                <div className="flex justify-between text-[#8c4f10] font-bold">
                  <span>Royal Cargo Insurance:</span>
                  <span>+£ 10 Gold</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline justify-between bg-[#1f1c0b] text-white p-4 rounded-xl shadow">
              <span className="font-serif text-base font-bold">FINAL LEDGER FARE:</span>
              <span className="font-serif text-3xl font-bold text-[#ffb77b]">£ {calculateTotalCost()} Gold</span>
            </div>
          </div>

          {dispatchStatus && (
            <div className="p-3 bg-amber-900/10 border border-amber-800 text-amber-900 rounded-lg font-mono text-xs font-bold text-center animate-pulse">
              {dispatchStatus}
            </div>
          )}

          <button
            type="button"
            disabled={isDispatching}
            onClick={handleDispatch}
            className="w-full py-5 bg-[#610000] hover:bg-[#8b0000] text-white font-serif text-xl font-bold tracking-[0.2em] uppercase rounded-xl shadow-2xl transition-all flex items-center justify-center gap-4 hover:scale-[1.02]"
          >
            <span>DISPATCH VESSEL & DEBIT FARE</span>
            <div className="w-8 h-8 rounded-full bg-red-950 border border-white/40 flex items-center justify-center">
              ✓
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FleetLogistics;
