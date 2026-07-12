export class Bottle {
  constructor({
    id,
    title = "Message in a Bottle",
    sender = "Mysterious Seafarer",
    date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content,
    bottleColor = "emerald",
    sealColor = "#8b0000",
    coordinates,
    status = "drifting",
    replies = []
  }) {
    this.id = id || "b" + Date.now();
    this.title = title;
    this.sender = sender;
    this.date = date;
    this.content = content || "";
    this.bottleColor = bottleColor;
    this.sealColor = sealColor;
    this.coordinates = coordinates || (
      (Math.random() * 160 - 80).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "N" : "S") + ", " +
      (Math.random() * 360 - 180).toFixed(0) + "°" + (Math.random() * 60).toFixed(0) + "' " + (Math.random() > 0.5 ? "E" : "W")
    );
    this.status = status;
    this.replies = Array.isArray(replies) ? replies : [];
  }
}
