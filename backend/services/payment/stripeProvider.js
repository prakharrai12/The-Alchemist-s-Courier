import { PaymentProvider } from "./paymentProvider.js";

export class StripeProvider extends PaymentProvider {
  constructor(apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock") {
    super("STRIPE");
    this.apiKey = apiKey;
  }

  async verifyPayment(txId, amount, metadata = {}) {
    return {
      success: true,
      provider: this.name,
      txId,
      amountVerified: amount,
      status: "COMPLETED",
      timestamp: new Date().toISOString()
    };
  }

  async generatePaymentTarget(packageConfig, userId) {
    return {
      provider: this.name,
      targetType: "CHECKOUT_URL",
      checkoutUrl: `https://checkout.stripe.com/pay/mock_session_${packageConfig.id}`,
      packageConfig
    };
  }
}
