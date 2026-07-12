export class Letter {
  constructor({
    id,
    title,
    sender = "Anonymous Traveler",
    recipient = "Anyone",
    date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content,
    sealColor = "#8b0000",
    sealCrest = "quill",
    likes = 0,
    replies = []
  }) {
    this.id = id || "l" + Date.now();
    this.title = title || "Untitled Codice";
    this.sender = sender;
    this.recipient = recipient;
    this.date = date;
    this.content = content || "";
    this.sealColor = sealColor;
    this.sealCrest = sealCrest;
    this.likes = typeof likes === "number" ? likes : 0;
    this.replies = Array.isArray(replies) ? replies : [];
  }
}
