// WYRMVAULT — §5 Canonical Role Definitions (Single Source of Truth)
// Used by RoleSelectChamber.jsx and GuildLedgerModal.jsx to ensure zero data drift.

export const CANONICAL_ROLES = [
  {
    id: "THE_ARCHIVIST",
    name: "The Archivist",
    icon: "📜",
    title: "Keeper of the Ancient Registries",
    lore: "Having spent decades deciphering imperial correspondences in the Obsidian Library, the Archivist recognizes cryptographic signatures by instinct alone.",
    powerName: "Reveal Cipher Type",
    powerDesc: "Once per Case (§5), reveals the exact cryptographic algorithm and shift parameters of any sealed letter on the chamber bench.",
    cooldown: "Once per Case (Server-Enforced)"
  },
  {
    id: "THE_CRYPTANALYST",
    name: "The Cryptanalyst",
    icon: "🧮",
    title: "Master of Statistical Distribution",
    lore: "Trained in statistical mathematics and frequency analysis, the Cryptanalyst spots recurring bigrams and vowel patterns within chaotic cipher texts.",
    powerName: "Frequency Scan",
    powerDesc: "Once per Case (§5), runs a statistical character frequency scan across the active letter to highlight most common vowels and symbols.",
    cooldown: "Once per Case (Server-Enforced)"
  },
  {
    id: "THE_SCRIBE",
    name: "The Scribe",
    icon: "🖋️",
    title: "Royal Signet Calligrapher",
    lore: "Familiar with every shorthand trick of the royal signet, the Scribe can reconstruct torn parchment edges and deduce initial letter salutations.",
    powerName: "Partial Decipher",
    powerDesc: "Once per Case (§5), automatically decrypts and permanently reveals the first 3 characters of any locked letter (`server-verified`).",
    cooldown: "Once per Case (Server-Enforced)"
  },
  {
    id: "THE_SCOUT",
    name: "The Scout",
    icon: "🧭",
    title: "Vault Corridor Navigator",
    lore: "Swift and silent on stone tiles, the Scout detects tripwires and warding runes before the party stumbles into heavy vapors.",
    powerName: "Chamber Ward",
    powerDesc: "Once per Case (§5), wards the party during the next chamber transition, preventing the Wyrm's Breath meter from increasing (+10% saved).",
    cooldown: "Once per Case (Server-Enforced)"
  },
  {
    id: "THE_ALCHEMIST",
    name: "The Alchemist",
    icon: "⚗️",
    title: "Reagent & Hidden Ink Specialist",
    lore: "Carrying glass vials of sulfurous solvent and silver nitrate, the Alchemist can wash blank parchment margins to make invisible inks fluoresce.",
    powerName: "Solvent Wash",
    powerDesc: "Once per Case (§5), applies alchemical solvent to reveal hidden marginalia and secondary transposition hints on complex letters.",
    cooldown: "Once per Case (Server-Enforced)"
  },
  {
    id: "THE_WARDEN",
    name: "The Warden",
    icon: "🛡️",
    title: "Iron-Clad Warded Bastion",
    lore: "Clad in runic stone mail, the Warden channels ancient calming chants to purge toxic vapors and stabilize the chamber atmosphere.",
    powerName: "Breath Suppression",
    powerDesc: "Once per Case (§5), directly purges toxic dragon vapors, immediately reducing the shared Wyrm's Breath tension meter by 15%.",
    cooldown: "Once per Case (Server-Enforced)"
  }
];
