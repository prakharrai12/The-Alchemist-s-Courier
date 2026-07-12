import assert from "assert";
import { PaymentService } from "../services/paymentService.js";

console.log("🧪 Running Guild Payment & Abstract Provider Tests...");

const packagesConfig = PaymentService.getAvailablePackages();
assert.ok(packagesConfig.packages.length > 0, "Packages should be dynamically loaded from backend config.");
assert.strictEqual(packagesConfig.startingGoldLimit, 1599, "Starting gold limit must be 1599 as per user specifications.");

const firstPkg = packagesConfig.packages[0];
assert.strictEqual(firstPkg.priceInINR, 39, "First package price should be around 39 INR.");
assert.strictEqual(firstPkg.goldAmount, 12, "First package gold amount should be 12 Gold.");

const target = await PaymentService.generatePackagePaymentTarget("pkg_12", "u_elias", "MANUAL_UPI");
assert.strictEqual(target.provider, "MANUAL_UPI");
assert.ok(target.upiLink.includes("7982421223@fam"), "UPI QR target should contain verified fam address.");

console.log("✅ All Payment Provider abstraction & package configuration tests passed!");
