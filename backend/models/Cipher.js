export class Cipher {
  constructor({
    id,
    vol,
    title,
    securityLevel = "SEALED WITH LEAD",
    requiredKey,
    cipherMain,
    cipherSub = "Sealed by signet ring...",
    plainMain,
    plainSub = "Sealed by signet ring...",
    rewardGold = 75,
    author = "High Alchemist V."
  }) {
    this.id = id || "VOL-" + Math.floor(1000 + Math.random() * 9000);
    this.vol = vol || "VOL. " + new Date().getFullYear() + "-" + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.title = title;
    this.securityLevel = securityLevel;
    this.requiredKey = (requiredKey || "ALCHEMIST").toUpperCase().trim();
    this.cipherMain = cipherMain || "";
    this.cipherSub = cipherSub;
    this.plainMain = plainMain || "";
    this.plainSub = plainSub;
    this.rewardGold = rewardGold;
    this.author = author;
  }
}
