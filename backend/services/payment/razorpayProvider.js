import { PaymentProvider } from "./paymentProvider.js";

export class RazorpayProvider extends PaymentProvider {
  constructor(keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_mock") {
    super("RAZORPAY");
    this.keyId = keyId;
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
      targetType: "RAZORPAY_ORDER",
      orderId: `order_${Date.now()}_${packageConfig.id}`,
      packageConfig
    };
  }
}
