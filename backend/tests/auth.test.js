import assert from "assert";
import { AuthService } from "../services/authService.js";

console.log("🧪 Running Guild Auth Service Tests...");
const testUser = AuthService.loginOrRegister("test.courier@alchemist.org", "password123");
assert.ok(testUser.token.startsWith("alchemist_token_"), "Token format should match Alchemist signature.");
console.log("✅ Auth tests passed successfully.");
