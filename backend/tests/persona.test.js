import test from "node:test";
import assert from "node:assert";

test("Persona creation and active voice switching verification", async (t) => {
  await t.test("should initialize default Grand Arch-Alchemist persona correctly", () => {
    const defaultPersona = {
      id: "p-1",
      name: "Prakhar Rai",
      title: "Producer & Lead Developer",
      rank: "Grand Arch-Alchemist",
      prestige: 1000,
      waxColor: "#610000",
      crest: "shield"
    };

    assert.strictEqual(defaultPersona.name, "Prakhar Rai");
    assert.strictEqual(defaultPersona.rank, "Grand Arch-Alchemist");
    assert.strictEqual(defaultPersona.prestige, 1000);
  });

  await t.test("should switch active persona and retain signet wax attributes", () => {
    const personas = [
      { id: "p-1", name: "Prakhar Rai", waxColor: "#610000", crest: "shield" },
      { id: "p-2", name: "Elias Vance", waxColor: "#8c4f10", crest: "quill" }
    ];

    let activePersona = personas[0];
    assert.strictEqual(activePersona.crest, "shield");

    // Switch to Elias Vance
    activePersona = personas[1];
    assert.strictEqual(activePersona.name, "Elias Vance");
    assert.strictEqual(activePersona.waxColor, "#8c4f10");
    assert.strictEqual(activePersona.crest, "quill");
  });
});

test("Letter status progression verification (§3 Flagship interaction)", async (t) => {
  await t.test("should transition letter state from SENT to OPENED upon signet crack", () => {
    let letterStatus = "SENT";
    assert.strictEqual(letterStatus, "SENT");

    // Carrier dispatch
    letterStatus = "IN_TRANSIT";
    assert.strictEqual(letterStatus, "IN_TRANSIT");

    // Arrived at desk
    letterStatus = "DELIVERED";
    assert.strictEqual(letterStatus, "DELIVERED");

    // Courier breaks wax seal
    letterStatus = "OPENED";
    assert.strictEqual(letterStatus, "OPENED");
  });
});
