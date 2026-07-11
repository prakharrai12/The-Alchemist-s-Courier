import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});

// Ensure database directory exists
const DB_DIR = path.join(__dirname, "database");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DATA_FILE = path.join(DB_DIR, "data.json");

// Initial Seed Data with Users & Ciphers
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

// Load from JSON file if exists
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      db = JSON.parse(raw);
      if (!db.users) db.users = defaultData.users;
      if (!db.ciphers) db.ciphers = defaultData.ciphers;
    } else {
      saveData();
    }
  } catch (err) {
    console.error("Error loading database:", err);
    db = defaultData;
  }
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database:", err);
  }
}

loadData();

// ==========================================
// AUTHENTICATION & PROFILE REST API
// ==========================================

// Login with Email & Password
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required to access the Guild Ledger." });
  }

  // Find user by email
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    // Auto-create new user with 1000 Gold Sovereigns if registering or first login
    user = {
      id: "u_" + Date.now(),
      email: email.toLowerCase(),
      password: password || "guild1894",
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      title: "Apprentice Courier",
      rank: "Third-Class Dispatcher",
      prestige: 150,
      goldSovereigns: 1000,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      memberSince: new Date().getFullYear().toString(),
      waxColor: "#8c4f10",
      crest: "shield",
      unlockedCiphers: ["1894-A"],
      unlockedAchievements: ["loyal_courier"]
    };
    db.users.push(user);
    saveData();
  } else if (password && user.password && user.password !== password) {
    return res.status(401).json({ error: "Invalid password for this Guild credentials." });
  }

  // Ensure goldSovereigns defaults to 1000 if missing
  if (typeof user.goldSovereigns !== "number") user.goldSovereigns = 1000;
  
  res.json({ user, token: "alchemist_token_" + user.id });
});

// Get User Profile
app.get("/api/auth/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const user = db.users.find(u => u.id === userId || u.email === userId);
  if (!user) {
    return res.status(404).json({ error: "Guild member not found in the Ledger." });
  }
  res.json({ user });
});

// Update Profile Customization
app.put("/api/auth/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, title, waxColor, crest, avatarUrl } = req.body;
  
  const userIndex = db.users.findIndex(u => u.id === userId || u.email === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "Guild member not found." });
  }

  if (name) db.users[userIndex].name = name;
  if (title) db.users[userIndex].title = title;
  if (waxColor) db.users[userIndex].waxColor = waxColor;
  if (crest) db.users[userIndex].crest = crest;
  if (avatarUrl) db.users[userIndex].avatarUrl = avatarUrl;

  saveData();
  res.json({ user: db.users[userIndex] });
});

// Spend or Credit Gold Sovereigns
app.post("/api/gold/transaction", (req, res) => {
  const { userId, amount, reason } = req.body; // amount can be positive (purchase/reward) or negative (spend)
  const user = db.users.find(u => u.id === userId || u.email === userId);
  if (!user) {
    return res.status(404).json({ error: "Guild member not found." });
  }

  if (amount < 0 && user.goldSovereigns + amount < 0) {
    return res.status(400).json({ error: "Insufficient Gold Sovereigns in Exchequer." });
  }

  user.goldSovereigns = Math.max(0, user.goldSovereigns + amount);
  if (amount > 0) user.prestige = (user.prestige || 0) + Math.floor(amount / 5);
  
  saveData();
  res.json({ goldSovereigns: user.goldSovereigns, prestige: user.prestige, reason });
});

// ==========================================
// SECRET LIBRARY CIPHERS API
// ==========================================

app.get("/api/ciphers", (req, res) => {
  res.json(db.ciphers);
});

app.post("/api/ciphers/unlock", (req, res) => {
  const { cipherId, attemptKey, userId } = req.body;
  const cipher = db.ciphers.find(c => c.id === cipherId);
  if (!cipher) {
    return res.status(404).json({ error: "Cipher volume not found in Occult Vault." });
  }

  // Validate Key (case-insensitive check)
  if (!attemptKey || attemptKey.trim().toUpperCase() !== cipher.requiredKey.toUpperCase()) {
    return res.status(401).json({ 
      success: false, 
      error: `INCORRECT CIPHER KEY '${attemptKey || ""}'. The lead seal refuses to yield. Hint key length: ${cipher.requiredKey.length} letters.` 
    });
  }

  // Key is exact match!
  let user = db.users.find(u => u.id === userId || u.email === userId);
  let bonusGold = cipher.rewardGold || 50;
  if (user) {
    if (!user.unlockedCiphers) user.unlockedCiphers = [];
    if (!user.unlockedCiphers.includes(cipherId)) {
      user.unlockedCiphers.push(cipherId);
      user.goldSovereigns = (user.goldSovereigns || 1000) + bonusGold;
      saveData();
    }
  }

  res.json({
    success: true,
    cipher,
    rewardGold: bonusGold,
    message: "🔓 Lead Seal Broken! Occult text decrypted successfully."
  });
});

app.post("/api/ciphers", (req, res) => {
  const { title, securityLevel, requiredKey, plainMain, plainSub, author } = req.body;
  if (!title || !requiredKey || !plainMain) {
    return res.status(400).json({ error: "Title, Key, and Secret Text required." });
  }

  // Simple Caesar shift generator to encrypt user's plaintext
  const shift = 7;
  const encrypt = (str) => str.split("").map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    return char;
  }).join("");

  const newCipher = {
    id: "VOL-" + Math.floor(1000 + Math.random() * 9000),
    vol: "VOL. " + new Date().getFullYear() + "-" + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    title,
    securityLevel: securityLevel || "MEMBER ENCRYPTED SEAL",
    requiredKey: requiredKey.toUpperCase().trim(),
    cipherMain: encrypt(plainMain),
    cipherSub: plainSub ? encrypt(plainSub) : "Eboz kpzt uif nppomjhau...",
    plainMain,
    plainSub: plainSub || "Sealed by personal signet ring.",
    rewardGold: 75,
    author: author || "Unknown Guild Member"
  };

  db.ciphers.push(newCipher);
  saveData();

  io.emit("new_cipher", newCipher);
  res.status(201).json(newCipher);
});

// ==========================================
// LETTERS & BOTTLES REST API
// ==========================================

app.get("/api/letters", (req, res) => {
  res.json(db.letters);
});

app.post("/api/letters", (req, res) => {
  const { title, sender, recipient, content, sealColor, sealCrest } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newLetter = {
    id: "l" + Date.now(),
    title,
    sender: sender || "Anonymous Traveler",
    recipient: recipient || "Anyone",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content,
    sealColor: sealColor || "#8b0000",
    sealCrest: sealCrest || "quill",
    likes: 0,
    replies: []
  };

  db.letters.unshift(newLetter);
  saveData();

  io.emit("new_letter", newLetter);
  res.status(201).json(newLetter);
});

app.post("/api/letters/:id/reply", (req, res) => {
  const { id } = req.params;
  const { sender, content } = req.body;
  
  const letter = db.letters.find(l => l.id === id);
  if (!letter) {
    return res.status(404).json({ error: "Letter not found" });
  }

  const newReply = {
    id: "r" + Date.now(),
    sender: sender || "Anonymous Traveler",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content
  };

  letter.replies.push(newReply);
  saveData();

  io.emit("letter_updated", letter);
  res.json(letter);
});

app.get("/api/bottles", (req, res) => {
  res.json(db.bottles);
});

app.post("/api/bottles", (req, res) => {
  const { title, sender, content, bottleColor, sealColor } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required for ocean bottles" });
  }

  const lat = (Math.random() * 160 - 80).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "N" : "S");
  const lon = (Math.random() * 360 - 180).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "E" : "W");

  const newBottle = {
    id: "b" + Date.now(),
    title: title || "Message in a Bottle",
    sender: sender || "Mysterious Seafarer",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content,
    bottleColor: bottleColor || "emerald",
    sealColor: sealColor || "#8b0000",
    coordinates: `${lat}, ${lon}`,
    status: "drifting",
    replies: []
  };

  db.bottles.unshift(newBottle);
  saveData();

  io.emit("new_bottle", newBottle);
  res.status(201).json(newBottle);
});

app.post("/api/bottles/:id/reply", (req, res) => {
  const { id } = req.params;
  const { sender, content } = req.body;

  const bottle = db.bottles.find(b => b.id === id);
  if (!bottle) {
    return res.status(404).json({ error: "Bottle not found" });
  }

  const newReply = {
    id: "br" + Date.now(),
    sender: sender || "Beachcomber",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content
  };

  bottle.replies.push(newReply);
  bottle.status = "washed_ashore";
  saveData();

  io.emit("bottle_updated", bottle);
  res.json(bottle);
});

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("Client connected to Alchemist's Courier:", socket.id);

  socket.emit("initial_data", {
    letters: db.letters,
    bottles: db.bottles,
    ciphers: db.ciphers
  });

  socket.on("toss_bottle", (data) => {
    const lat = (Math.random() * 160 - 80).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "N" : "S");
    const lon = (Math.random() * 360 - 180).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "E" : "W");

    const newBottle = {
      id: "b" + Date.now(),
      title: data.title || "Sea Message",
      sender: data.sender || "Unknown Voyager",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      content: data.content,
      bottleColor: data.bottleColor || "emerald",
      sealColor: data.sealColor || "#8b0000",
      coordinates: `${lat}, ${lon}`,
      status: "drifting",
      replies: []
    };

    db.bottles.unshift(newBottle);
    saveData();

    io.emit("new_bottle", newBottle);
  });

  socket.on("send_letter", (data) => {
    const newLetter = {
      id: "l" + Date.now(),
      title: data.title,
      sender: data.sender || "Anonymous Wanderer",
      recipient: data.recipient || "All Wanderers",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      content: data.content,
      sealColor: data.sealColor || "#8b0000",
      sealCrest: data.sealCrest || "quill",
      likes: 0,
      replies: []
    };

    db.letters.unshift(newLetter);
    saveData();

    io.emit("new_letter", newLetter);
  });

  socket.on("like_letter", (letterId) => {
    const letter = db.letters.find(l => l.id === letterId);
    if (letter) {
      letter.likes = (letter.likes || 0) + 1;
      saveData();
      io.emit("letter_updated", letter);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`📜 The Alchemist's Courier backend server running on port ${PORT}`);
});
