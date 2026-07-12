import { ManualUPIProvider } from "./payment/manualUpiProvider.js";
import { StripeProvider } from "./payment/stripeProvider.js";
import { RazorpayProvider } from "./payment/razorpayProvider.js";
import { UserRepository } from "../repositories/userRepository.js";

const DEFAULT_PACKAGES = [
  { id: "pkg_12", goldAmount: 12, priceInINR: 39, label: "Apprentice Pouch", bonusGold: 0, tag: "Budget Starter" },
  { id: "pkg_60", goldAmount: 60, priceInINR: 149, label: "Courier's Satchel", bonusGold: 5, tag: "Most Popular" },
  { id: "pkg_300", goldAmount: 300, priceInINR: 499, label: "Alchemist's Chest", bonusGold: 40, tag: "Best Value" },
  { id: "pkg_1000", goldAmount: 1000, priceInINR: 1499, label: "Grand Sovereign Vault", bonusGold: 200, tag: "Guild Master" }
];

export class PaymentService {
  static getProvider(providerName = process.env.PAYMENT_PROVIDER || "MANUAL_UPI") {
    switch (providerName.toUpperCase()) {
      case "STRIPE":
        return new StripeProvider();
      case "RAZORPAY":
        return new RazorpayProvider();
      case "MANUAL_UPI":
      default:
        return new ManualUPIProvider();
    }
  }

  static getAvailablePackages() {
    return {
      startingGoldLimit: Number(process.env.STARTING_GOLD_LIMIT) || 1599,
      currency: "INR",
      activeProvider: process.env.PAYMENT_PROVIDER || "MANUAL_UPI",
      packages: DEFAULT_PACKAGES
    };
  }

  static async generatePackagePaymentTarget(packageId, userId, providerName) {
    const pkg = DEFAULT_PACKAGES.find(p => p.id === packageId) || DEFAULT_PACKAGES[0];
    const provider = this.getProvider(providerName);
    return provider.generatePaymentTarget(pkg, userId);
  }

  static async verifyAndCreditPayment(packageId, txId, userId, providerName) {
    const pkg = DEFAULT_PACKAGES.find(p => p.id === packageId);
    if (!pkg) {
      throw { status: 404, message: "Selected Gold package not recognized in configuration." };
    }

    const provider = this.getProvider(providerName);
    const verification = await provider.verifyPayment(txId, pkg.priceInINR);

    const user = UserRepository.findByIdOrEmail(userId);
    if (!user) {
      throw { status: 404, message: "Guild member not found in ledger." };
    }

    const totalGoldToAdd = pkg.goldAmount + (pkg.bonusGold || 0);
    const updated = UserRepository.update(user.id, {
      goldSovereigns: (user.goldSovereigns || 1000) + totalGoldToAdd,
      prestige: (user.prestige || 0) + Math.floor(totalGoldToAdd / 4)
    });

    return {
      success: true,
      verification,
      goldAdded: totalGoldToAdd,
      newGoldBalance: updated.goldSovereigns,
      newPrestige: updated.prestige,
      packagePurchased: pkg
    };
  }
}
