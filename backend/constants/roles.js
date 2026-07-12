export const GUILD_ROLES = {
  ADMIN: "ADMIN",
  HIGH_ALCHEMIST: "HIGH_ALCHEMIST",
  SENIOR_DISPATCHER: "SENIOR_DISPATCHER",
  FIRST_CLASS_COURIER: "FIRST_CLASS_COURIER",
  APPRENTICE: "APPRENTICE"
};

export const GUILD_RANKS = {
  HIGH_ALCHEMIST: { prestige: 900, title: "Grand Scriptorium Archivist", minGold: 2000 },
  SENIOR_DISPATCHER: { prestige: 700, title: "Senior Dispatcher", minGold: 1000 },
  FIRST_CLASS_COURIER: { prestige: 400, title: "First-Class Courier", minGold: 500 },
  APPRENTICE: { prestige: 0, title: "Apprentice Courier", minGold: 0 }
};
