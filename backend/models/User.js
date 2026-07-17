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
    this.id = id && typeof id === "string" ? id.trim() : "u_" + Date.now();
    this.email = email && typeof email === "string" ? email.trim().toLowerCase() : "";
    this.password = password || "guild1894";
    this.name = name && typeof name === "string"
      ? name.replace(/<[^>]*>?/gm, "").trim().substring(0, 64)
      : (this.email ? this.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Anonymous Courier");
    this.title = title && typeof title === "string" ? title.replace(/<[^>]*>?/gm, "").substring(0, 64) : "Apprentice Courier";
    this.rank = rank && typeof rank === "string" ? rank.replace(/<[^>]*>?/gm, "").substring(0, 64) : "Third-Class Dispatcher";
    this.prestige = typeof prestige === "number" && !isNaN(prestige) ? prestige : 150;
    this.goldSovereigns = typeof goldSovereigns === "number" && !isNaN(goldSovereigns) ? goldSovereigns : 1000;
    this.avatarUrl = avatarUrl && typeof avatarUrl === "string" ? avatarUrl.substring(0, 256) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";
    this.memberSince = memberSince || new Date().getFullYear().toString();
    this.waxColor = waxColor && typeof waxColor === "string" ? waxColor.substring(0, 16) : "#8c4f10";
    this.crest = crest && typeof crest === "string" ? crest.substring(0, 32) : "shield";
    this.unlockedCiphers = Array.isArray(unlockedCiphers) ? unlockedCiphers : ["1894-A"];
    this.unlockedAchievements = Array.isArray(unlockedAchievements) ? unlockedAchievements : ["loyal_courier"];
  }

  static createFromEmail(email, password) {
    return new User({ email, password });
  }
}
