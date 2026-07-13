import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("====================================================================");
console.log("🏛️  THE ALCHEMIST'S COURIER — AUTOMATED TEST SUITE ORCHESTRATOR");
console.log("====================================================================");

const testFiles = [
  "auth.test.js",
  "wyrmvault.test.js",
  "ops.test.js",
  "persona.test.js"
];

let passCount = 0;
let failCount = 0;

for (const file of testFiles) {
  const filePath = path.join(__dirname, file);
  console.log(`\n▶️ Executing: ${file}...`);
  try {
    const output = execSync(`node "${filePath}"`, { encoding: "utf-8", stdio: "pipe" });
    console.log(output.trim());
    passCount++;
  } catch (err) {
    console.error(`❌ Test Suite Failed: ${file}`);
    console.error(err.stdout || err.message);
    failCount++;
  }
}

console.log("\n====================================================================");
console.log(`📊 TEST SUITE SUMMARY: ${passCount} Passed | ${failCount} Failed`);
console.log("====================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("🏆 All Guild backend systems verified & operational.");
  process.exit(0);
}
