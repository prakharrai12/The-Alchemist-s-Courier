import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, "..", "database");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DATA_FILE = path.join(DB_DIR, "data.json");

const defaultData = {
  users: [
    {
      id: "u_elias",
      email: "elias.vance@courierguild.org",
      password: "password123",
      name: "Elias Vance",
      title: "Senior Dispatcher",
      rank: "First-Class Courier",
      prestige: 840,
      goldSovereigns: 1000,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      memberSince: "1889",
      waxColor: "#610000",
      crest: "shield",
      unlockedCiphers: ["1894-A"],
      unlockedAchievements: ["storm_rider", "world_traveler", "loyal_courier"]
    },
    {
      id: "u_aurelia",
      email: "aurelia.croft@alchemist.org",
      password: "alchemist1894",
      name: "Lady Aurelia Croft",
      title: "Grand Scriptorium Archivist",
      rank: "High Alchemist",
      prestige: 980,
      goldSovereigns: 2500,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      memberSince: "1885",
      waxColor: "#fdad67",
      crest: "book",
      unlockedCiphers: ["1894-A", "1894-C", "MEMOIR-04"],
      unlockedAchievements: ["storm_rider", "world_traveler", "loyal_courier", "alchemist_ally"]
    }
  ],
  ciphers: [
    {
      id: "1894-A",
      vol: "VOL. 1894-A",
      title: "The Serpent's Hand Ledger",
      securityLevel: "SEALED WITH LEAD",
      requiredKey: "ALCHEMIST",
      cipherMain: "Xzq lvyv dlyv hss zvmaly ohukz, iba doha dl dlyv dpzo pun mvy dlyv hss lscv.",
      cipherSub: "Kshm qpzm d lmsz... lmsz pzm d kshm...",
      plainMain: "Our gold lies deep beneath the ancient stone, guarded by the silent sentinels of the Alchemist's Tower.",
      plainSub: "Trust only in wax... wax seals the truth forever...",
      rewardGold: 50,
      author: "High Alchemist V."
    },
    {
      id: "1894-C",
      vol: "VOL. 1894-C",
      title: "Clockwork Correspondence",
      securityLevel: "LOCKED UNTIL EQUINOX",
      requiredKey: "EQUINOX",
      cipherMain: "Uif hfbst of the grebu bshmpncps dmpdlt sfpvjsf uif zfmmpx nfsdvsz up uvso cj-npoa.",
      cipherSub: "Eboz jta kpzt uif nppomjhau...",
      plainMain: "The gears of the great archimedes clock require the yellow mercury to turn bi-monthly.",
      plainSub: "Wait for the full moonlight before pouring the elixir into the brass vessel...",
      rewardGold: 75,
      author: "Master Archimedes"
    },
    {
      id: "MEMOIR-04",
      vol: "MEMOIR-04",
      title: "Ministry of Whispers",
      securityLevel: "DECRYPTION IN PROGRESS",
      requiredKey: "WHISPERS",
      cipherMain: "Qeb clnd lk qeb xlroqe fq fz alxka rk... colj qeb hfkn p blia mxbk.",
      cipherSub: "Cllz pebd dlmz... xilc pebd mlh...",
      plainMain: "The fog off the harbor hides twelve clipper ships laden with alchemical copper.",
      plainSub: "Signal them with two emerald lanterns at midnight near the Whitechapel dock...",
      rewardGold: 100,
      author: "Shadow Courier Thorne"
    },
    {
      id: "CODEX-88",
      vol: "CODEX-88",
      title: "The Obsidian Transmutation",
      securityLevel: "IRONBOUND & OCCULT",
      requiredKey: "MERCURY",
      cipherMain: "Sjw twz xnhru ts xhm wzyy... btl ufsy rts rfhy xzy qfqqw ytzh.",
      cipherSub: "Qzwx pnr qf xmnw txyw...",
      plainMain: "When sulfur meets liquid quicksilver beneath candlelight, lead turns into pure Sovereign Gold.",
      plainSub: "Keep the crucible at exact boiling point until the violet smoke clears...",
      rewardGold: 150,
      author: "Arch-Alchemist V."
    }
  ],
  letters: [
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
        { id: "r1", sender: "Elias Vance", date: "October 12, 1894", content: "Understood, High Alchemist. The copper seals have been doubled and our homing pigeons are on standby." }
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
        { id: "r2", sender: "Elias Vance", date: "October 10, 1894", content: "Signet stamp applied at dawn. May the tides favor you across the Atlantic." }
      ]
    }
  ],
  bottles: [
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
  ]
};

let db = defaultData;

export function loadDatabase() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      db = JSON.parse(raw);
      if (!db.users) db.users = defaultData.users;
      if (!db.ciphers) db.ciphers = defaultData.ciphers;
      if (!db.letters) db.letters = defaultData.letters;
      if (!db.bottles) db.bottles = defaultData.bottles;
    } else {
      saveDatabase();
    }
  } catch (err) {
    console.error("Error loading Guild Ledger database:", err);
    db = defaultData;
  }
  return db;
}

export function saveDatabase() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving Guild Ledger database:", err);
  }
}

export function getDatabase() {
  return db;
}

// Initial load on import
loadDatabase();
