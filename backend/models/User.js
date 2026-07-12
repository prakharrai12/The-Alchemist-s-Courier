export class User {
  constructor({
    id,
    email,
    password,
    name,
    title = "Apprentice Courier",
    rank = "Third-Class Dispatcher",
    prestige = 150,
    goldSovereigns = 1000,
    avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    memberSince = new Date().getFullYear().toString(),
    waxColor = "#8c4f10",
    crest = "shield",
    unlockedCiphers = ["1894-A"],
    unlockedAchievements = ["loyal_courier"]
  }) {
    this.id = id || "u_" + Date.now();
    this.email = email ? email.toLowerCase() : "";
    this.password = password || "guild1894";
    this.name = name || (email ? email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Anonymous Courier");
    this.title = title;
    this.rank = rank;
    this.prestige = prestige;
    this.goldSovereigns = typeof goldSovereigns === "number" ? goldSovereigns : 1000;
    this.avatarUrl = avatarUrl;
    this.memberSince = memberSince;
    this.waxColor = waxColor;
    this.crest = crest;
    this.unlockedCiphers = Array.isArray(unlockedCiphers) ? unlockedCiphers : [];
    this.unlockedAchievements = Array.isArray(unlockedAchievements) ? unlockedAchievements : [];
  }

  static createFromEmail(email, password) {
    return new User({ email, password });
  }
}
