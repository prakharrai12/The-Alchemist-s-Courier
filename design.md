# WYRMVAULT — Canonical Game Design Specification (`design.md`)

## §1. Executive Summary
**WYRMVAULT** is a cooperative browser-based cipher-dungeon game for **4 to 6 players**. Players step into an ancient dragon-guarded vault where historical chambers hold encrypted correspondence ("Evidence"). To survive and claim the vault's secrets, the team must explore chambers, recover encrypted letters, decipher them using specialized cryptographic tools, pin findings to a shared **Evidence Wall**, and deduce the master **Final Key** before the **Wyrm's Breath** tension meter wakes the dragon (`100%`).

---

## §2. Core Gameplay Loop
1. **Chamber Entry**: The team enters an ancient vault chamber containing 1 to 3 sealed encrypted letters/codices.
2. **Evidence Recovery**: Any player can pick up a letter from the chamber and bring it to the **Decryption Bench**.
3. **Cryptographic Analysis**: Players use tier-appropriate interactive tools (`Caesar shift wheel`, `Vigenère keyword matrix`, `Pigpen key grid`, `Transposition rail`) to test decrypting the cipher.
4. **Pin to Evidence Wall**: Once a letter is verified and decrypted (`server-validated`), it is pinned to the real-time shared **Evidence Wall** for all players to read.
5. **Key Assembly & Verdict**: Decrypted letters contain fragments and clues pointing to a single **Master Keyword**. Once ready, the team locks in their single shared **Verdict Attempt** to open the vault doors before the Wyrm's Breath consumes the chamber.

---

## §3. Authentication & User Management
- **Auth Flow**: Registration (`Email, Password, Username`) and Login returning JWT access token and refresh token.
- **No OAuth for MVP**: Strictly email/password + JWT.
- **RBAC & Security**: Reuses server-side JWT authentication (`authMiddleware.js`) and role-based access checks (`rbacMiddleware.js`).

---

## §4. Case Directory & Lobby (`Session Management`)
- **Case Creation**: A player creates a new "Case" (`Dungeon Run`) which generates a unique 6-character alphanumeric `Case ID` (`e.g., WV-8942`).
- **Player Capacity**: **4 to 6 players** per Case.
- **Ready-Check Protocol**: Every player in the lobby must select a distinct Role Card and click **Lock & Ready**. The Case begins only when 100% of connected players (`min 4, max 6`) are ready (`server-enforced via Socket.IO`).

---

## §5. Role Select & Powers (`Six Roles`)
Players choose from **Six Canonical Role Cards** before entering the vault. Each card features an interactive **Flip Animation** between its in-world Lore Portrait (`Front`) and its Technical Power Matrix (`Back`). Every role grants **one real, server-enforced one-time power per Case**:

1. **The Archivist**
   - *Lore*: Veteran keeper of the ancient cipher registries.
   - *Power*: **`Reveal Cipher Type`** — Once per Case, reveals the exact cryptographic algorithm (`Tier I-IV`) of any encrypted letter.
2. **The Cryptanalyst**
   - *Lore*: Mathematician specializing in symbol distribution.
   - *Power*: **`Frequency Scan`** — Once per Case, highlights the most common character frequencies and letter pairs (`bigrams`) across a selected letter.
3. **The Scribe**
   - *Lore*: Master calligrapher familiar with signet shortcuts.
   - *Power*: **`Partial Decipher`** — Once per Case, automatically decrypts and reveals the first 3 characters of any locked letter (`server-verified`).
4. **The Scout**
   - *Lore*: Swift navigator of trapped corridors.
   - *Power*: **`Chamber Ward`** — Once per Case, wards the party during the next chamber transition, preventing the **Wyrm's Breath** meter from ticking upward.
5. **The Alchemist**
   - *Lore*: Expert in chemical reagents and hidden inks.
   - *Power*: **`Solvent Wash`** — Once per Case, applies alchemical solvent to reveal hidden marginalia or secondary transposition clues on complex `Tier III/IV` letters.
6. **The Warden**
   - *Lore*: Iron-clad protector who channels calming warding chants.
   - *Power*: **`Breath Suppression`** — Once per Case, directly purges toxic vapors, reducing the shared **Wyrm's Breath** meter by **15%**.

> [!IMPORTANT]
> **Server-Side Enforcement**: All powers are tracked on the server (`CaseState.usedPowers`). If a player attempts to use their power a second time, the server rejects the action with `403 Power Expended`.

---

## §6. Cipher Tiers (`Four Difficulty Levels`)
- **Tier I: Novice Seal (`Caesar Shift`)**: Simple monoalphabetic shift (`shift 1-25`). Interactive rotary wheel UI.
- **Tier II: Adept Seal (`Vigenère Cipher`)**: Polyalphabetic substitution using a keyword (`e.g., DRAGON`). Interactive tabula recta matrix.
- **Tier III: Master Seal (`Pigpen + Columnar Transposition`)**: Geometric grid symbols or rail-fence/columnar reordering.
- **Tier IV: Arch-Seal (`Multi-Layer Encryption`)**: Compound cipher requiring step-by-step decryption (`e.g., Vigenère followed by Columnar Transposition`).

> [!NOTE]
> For the initial core loop rollout (`Build Step 4`), **Tier I (`Caesar`) and Tier II (`Vigenère`)** are fully active on the Decryption Bench, with the server engine structured to easily accommodate Tier III/IV.

---

## §7. Wyrm's Breath Tension Meter (`Server-Authoritative`)
Instead of an arbitrary timer or currency purchase gimmick, tension is governed by the shared **Wyrm's Breath Meter (`0% to 100%`)**:
- **Server-Authoritative**: Maintained entirely in server memory inside Socket.IO rooms (`sessionID / caseID`). Never trusted from client state.
- **Meter Ticks**:
  - `+2%` every 60 seconds (`Atmospheric Vapors`).
  - `+10%` upon chamber transition (`Disturbing the Dust`).
  - `+15%` upon a failed Key-Assembly or incorrect decryption verification (`Alarming the Dragon`).
  - `-15%` when **The Warden** activates **Breath Suppression**.
- **At 100%**: The Dragon awakens (`Case Failed — Incinerated`).

---

## §8. Verdict Screen & Rank Tracking
- **Single Shared Key-Assembly Attempt**: Unlike individual puzzle guessing, the final vault lock requires **one unified team decision**. When all letters on the Evidence Wall are analyzed, the team discusses and inputs the single master keyword. If correct: **Case Solved (`Victory`)**. If incorrect: **Wyrm's Breath +15%**.
- **Results & Rank Progression**: Upon case completion (`Victory or Defeat`), players view the post-case Debrief Dossier (`Time elapsed, Letters cracked, Powers deployed`).
- **Rank Tracking (`No Currency / No Purchases`)**:
  - `Rank I`: Novice Explorer (`0–2 Cases Solved`)
  - `Rank II`: Adept Vault-Breaker (`3–5 Cases Solved`)
  - `Rank III`: Master Cipher-Slayer (`6–10 Cases Solved`)
  - `Rank IV`: Dragon-Bane (`11+ Cases Solved`)
  - *Cosmetic only (`Title badge and avatar signet border`). No currency (`Sovereigns`), no shops, no unlockable paid items.*

---

## §9. Visual & UI System (`Strict Quality Bar`)
Every screen across **WYRMVAULT** must adhere strictly to these non-negotiable architectural standards:
1. **Zero Overlapping or Clipped Elements**: Responsive layouts verified specifically across `360px (Mobile)`, `768px (Tablet)`, `1024px (Laptop)`, `1440px (Desktop)`, and `1920px (Ultra-Wide)`.
2. **Strict 4px Spacing Grid**: Every margin, padding, gap, and height must be drawn exclusively from the `4px scale` (`4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px`). Zero arbitrary pixel numbers (`e.g., no 13px or 27px`).
3. **Two Typefaces Only**:
   - **`var(--font-display)`**: `Cinzel` (`or MedievalSharp/Playfair Display`) — used exclusively for vault headers, role card titles, chamber banners, and wax seals.
   - **`var(--font-ui)`**: `Outfit` (`or Inter/JetBrains Mono`) — used exclusively for technical decryption inputs, frequency counters, chat logs, and body text.
4. **Tactile Obsidian & Stone Palette (`No Glassmorphism / No Blob Gradients`)**:
   - `Vault Obsidian (`#12110e`)` — Deep stone dungeon background.
   - `Carved Stone (`#1c1a16`)` — Card containers and chamber panels.
   - `Parchment Ink (`#c8b896`)` — High-contrast readable body text.
   - `Crimson Seal / Wyrm Fire (`#8c2020` → `#d93838`)` — Wyrm's Breath warnings and danger states.
   - `Gilded Signet (`#d4af37`)` — Active selection and victory highlights.
5. **In-World State Copy**: No generic spinners or `"Error 404"` text. Every loading, error, and empty state must feature immersive in-world lore:
   - *Loading*: `"Unsealing the heavy iron wards of Chamber III..."`
   - *Empty Wall*: `"No encrypted correspondence recovered yet. Search the chamber shadows."`
   - *Error*: `"The alchemical ward rejected your signet frequency (`Connection Lost`)."`

---

## §10. Screen & Component List
1. **`<AuthChamber />`**: Registration + Email/Password JWT Login (`No OAuth`).
2. **`<CaseLobby />`**: Create/Join Case directory, player slots (`4-6`), Ready-Check lock.
3. **`<RoleSelectChamber />`**: Six flippable Role Cards (`Front: Lore portrait, Back: Power matrix`) with one-time server-enforced activation lock.
4. **`<ChamberHub />` & `<EvidenceWall />`**: Main co-op game board. Left: Chamber exploration (`available letters, room transitions`). Right: Shared Evidence Wall (`pinned decrypted correspondence`). Top: Server-authoritative **Wyrm's Breath Meter**.
5. **`<DecryptionBench />`**: Interactive tier-specific deciphering tool (`Rotary Caesar wheel / Vigenère keyword grid`).
6. **`<VerdictChamber />`**: Final shared Key-assembly mechanism (`Single team lock-in attempt`).
7. **`<DebriefDossier />`**: Results screen (`Victory/Defeat summary, Rank progression badge`).

---

## §11. Socket.IO Real-Time Protocol (`Rooms Keyed by Case ID`)
- **Connection & Room Join**: `socket.emit('JOIN_CASE', { caseId, userId, token })`
- **Room Events Broadcast (`Server → All Room Clients`)**:
  - `CASE_PLAYERS_UPDATED`: List of connected players and their ready status.
  - `ROLE_ASSIGNED`: Confirms a player locked in one of the 6 roles.
  - `CASE_STARTED`: Transitions all players from Lobby/Role Select to `<ChamberHub />`.
  - `WYRMS_BREATH_TICK`: Authoritative update of the tension meter (`{ breathLevel: 35, reason: 'CHAMBER_TRANSITION' }`).
  - `POWER_ACTIVATED`: Broadcasts power usage (`{ role: 'THE_ARCHIVIST', power: 'REVEAL_CIPHER_TYPE', targetLetterId: 'L-1' }`).
  - `LETTER_DECRYPTED`: Notifies room when a letter is successfully deciphered and pinned to the Evidence Wall.
  - `VERDICT_RESOLVED`: Broadcasts final win/loss state when Key assembly is attempted.

---

## §12. Server-Side Seeded Cipher Engine (`cipherEngine.js`)
- All cipher generation (`Caesar shift numbers, Vigenère keywords, Pigpen symbol arrays`) and decryption verification are executed strictly on the backend via deterministic seed or server-side cipher validation.
- The client receives only the **Encrypted Ciphertext** and any **Tier Metadata** (`or clues unlocked by Arch-Alchemist / Archivist powers`). Plaintext is never sent to the client until verified via `POST /api/cipher/verify` or `socket.emit('VERIFY_DECRYPTION')`.

---

## §13. Explicitly Out of Scope (`Killed Features — §13`)
The following legacy items must be **completely removed/deleted** from all frontend and backend codebases (`No lingering dead code or half-removed dependencies`):
1. **Payment Providers**: Remove `PaymentProvider`, Razorpay, Stripe, UPI verification, and `paymentRoutes.js` / `paymentService.js`.
2. **Gold Currency (`Sovereigns`)**: Remove all gold balances, gold exchange modals, sovereign packages, and top-up buttons.
3. **QR Codes & Social Referral Sharing**: Remove `ShareGuildModal`, referral codes (`+200 gold / +500 gold`), and QR generators.
4. **Six-Theme Color Switcher**: Remove multi-theme selectors (`Dark Oak`, `Emerald Guild`, etc.). Replace with one unified, authoritative **WYRMVAULT Obsidian/Stone/Parchment** design system.
