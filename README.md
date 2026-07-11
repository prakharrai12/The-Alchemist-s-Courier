# The Alchemist's Courier (Victorian Correspondence & Occult Scriptorium)

An immersive, full-stack Victorian-era messaging and dispatch platform built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, powered by a robust **Node.js / Express** and **Socket.io** backend with **Supabase / SQL** ledger support.

![The Alchemist's Courier](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop)

---

## 🌟 Key Architectural Features & Enhancements

### 1. ⚜️ Strict Zero-Emoji Victorian Design System
Every UI element across the **Archive Vault**, **Scriptorium**, **Fleet Logistics**, **Secret Library**, and **Sovereign Exchange** has been crafted using curated **Victorian typography (`font-serif` Playfair/Georgia & `font-mono` Courier)**, **sepia/parchment textures**, **leaded wax seal iconography (`canvas-confetti`)**, and **rich atmospheric gradients (`#1f1c0b`, `#610000`, `#8c4f10`, `#ffdcc2`)**. No juvenile emojis — every icon is either a custom SVG seal or a high-fidelity historical portrait from Unsplash.

### 2. 🔐 Interactive Occult Secret Library & Caesar Codebreaker (`SecretLibrary.jsx`)
- **Live Caesar Rot-Scramble Decryption**: Watch letters unscramble in real-time right on your parchment as you break the lead signets!
- **Active Cipher Catalog**:
  - `VOL. 1894-A` — *The Serpent's Hand Ledger* (Key: `ALCHEMIST`) -> **+50 Gold**
  - `VOL. 1894-C` — *Clockwork Correspondence* (Key: `EQUINOX`) -> **+75 Gold**
  - `MEMOIR-04` — *Ministry of Whispers* (Key: `WHISPERS`) -> **+100 Gold**
  - `CODEX-88` — *The Obsidian Transmutation* (Key: `MERCURY`) -> **+150 Gold**
  - `VOL. 1895-Z` — *The Copper Alembic* (Key: `ALEMBIC`) -> **+200 Gold**
  - `VOL. 1896-X` — *High Scriptorium Seal* (Key: `SOVEREIGN`) -> **+250 Gold**
- **Encrypt New Ciphers**: Create custom encrypted letters with automatic Caesar cipher shifting and store them directly inside your personal guild volume.

### 3. 🪙 Sovereign Exchequer & Payment Gateway (`SovereignExchangeModal.jsx`)
- **Dual Sovereign Currencies**: Track your bullion in **`£ Gold Sovereigns`** alongside Indian Rupee exchange rates (**`₹ INR`**).
- **Express Minting & Tiered Packgages**:
  - **Apprentice Pouch**: £ 100 Gold (`₹ 49 INR`)
  - **Courier's Brass Chest**: £ 550 Gold (`₹ 245 INR`) — *+10% Bonus*
  - **Alchemist's Crucible**: £ 1,400 Gold (`₹ 499 INR`) — *Most Popular (+16% Bonus)*
  - **Imperial Treasury Vault**: £ 4,200 Gold (`₹ 1,499 INR`) — *+20% Royal Bonus*
- **Instant Checkout Verification**: Complete with UPI (`elias@okaxis`), Visa/MasterCard (`4532 •••• •••• 8891`), or NetBanking, featuring real-time progress bars, gold coin drop audio, and celebratory wax seal confetti.

### 4. 🪶 Scriptorium Calligraphy Studio & Word Statistics (`Scriptorium.jsx`)
- Draft letters across **Hand-Pressed Deckle**, **Woven Linen**, and **Aged Vellum** paper stocks.
- Live **Word & Character Statistics** with automatic **Dispatch Gold Fare** calculation (`£ Math.ceil(words / 20) * 10 Gold`).
- Custom calligraphy signatures with rotating lead wax imprint animations (`Crimson #610000`, `Amber #8c4f10`, `Emerald #30422f`).

### 5. 🚢 Fleet Logistics & Vessel Commission Roster (`FleetLogistics.jsx`)
- Commission **No. 001 Homing Pigeon Wings** (`3 Leagues/Hour`), **No. 002 Ironbound Clipper Ships** (`18 Knots`), and **No. 003 Midnight Courier Riders** (`6 Leagues/Relay`).
- Customize vessels with **Silk Ribbons / Waxed Covers (`+£ 2 Gold`)**, **Signet Crest Pennants (`+£ 5 Gold`)**, **Emerald Lanterns (`+£ 3 Gold`)**, and **Royal Exchequer Cargo Insurance (`+£ 10 Gold`)**.

### 6. 🏛️ Archive Vault & Dynamic Wax Seal Filtering (`ArchiveVault.jsx`)
- Filter decantations by wax color: **Crimson Seals**, **Amber Gold**, **Forest Emerald**, and **Royal Sapphire**.
- Interactive floating glass jar missives with instant parchment unroll sound effects.

### 7. 🛡️ Guild Signet Authentication & Persona Switcher (`GuildAuthModal.jsx` & `ProfileCustomizerModal.jsx`)
- Enlist or login with email & signet passcodes (`member@courierguild.org`).
- Switch or customize your Victorian portrait, guild rank (**High Alchemist**, **Senior Dispatcher**, **Master Wayfarer**), and personal wax stamp color.
- New member enlistments automatically receive an **Endowment Grant of 1,000 Gold Sovereigns** (`₹ INR` exchange value verified).

### 8. ⌨️ Global Keyboard Navigation (`App.jsx`)
- `Alt + 1` -> Navigate to **Archive Vault**
- `Alt + 2` -> Open **Scriptorium Calligraphy Studio**
- `Alt + 3` -> Unlock **Secret Library Ciphers**
- `Alt + G` -> Access **Sovereign Exchequer (`[+ BUY]` Gold)**
- `Alt + M` -> Toggle **Sound Engine Mute / Unmute**

---

## 🛠️ Installation & Launch Guide

### 1. Start the Frontend Scriptorium (Port `5173`)
```bash
cd ancient-letters
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser to enter the guild hall.

### 2. Start the Backend Relay Server (Port `5000`)
```bash
cd backend
npm install
npm start
```

---

## 📜 Repository Structure & Commit History
This project adheres to rigorous modular architecture, with distinct components for audio engines (`audio/soundEngine.js`), modal dialogs, and interactive views:
```
├── ancient-letters/          # React 18 + Vite + Tailwind Frontend
│   ├── src/
│   │   ├── audio/            # Web Audio API Sound Engine (quill, cork, wax, parchment)
│   │   ├── components/       # Navigation, ArchiveVault, Scriptorium, FleetLogistics, SecretLibrary...
│   │   └── App.jsx           # Global state, WebSocket listeners, & keyboard controls
├── backend/                  # Express API + Socket.io Server + Supabase SQL integration
└── README.md                 # Project documentation
```

*Built with precision for the Arch-Alchemist's Guild.*
