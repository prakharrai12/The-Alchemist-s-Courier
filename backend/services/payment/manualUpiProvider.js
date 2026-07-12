import { PaymentProvider } from "./paymentProvider.js";

export class ManualUPIProvider extends PaymentProvider {
  constructor(upiId = process.env.PAYMENT_UPI_ID || "7982421223@fam") {
    super("MANUAL_UPI");
    this.upiId = upiId;
  }

  async verifyPayment(txId, amount, metadata = {}) {
    // Manual UPI verification checks txId length and formatting
    if (!txId || txId.length < 8) {
      throw { status: 400, message: "Invalid UPI Transaction Reference ID. Please enter a valid 12-digit UTR or Reference Number." };
    }
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
    const upiLink = `upi://pay?pa=${this.upiId}&pn=Prakhar%20Rai%20(Producer)&am=${packageConfig.priceInINR}&cu=INR&tn=Alchemist%20Courier%20${packageConfig.goldAmount}%20Gold`;
    return {
      provider: this.name,
      targetType: "UPI_QR_LINK",
      upiId: this.upiId,
      upiLink,
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`,
      packageConfig
    };
  }
}
