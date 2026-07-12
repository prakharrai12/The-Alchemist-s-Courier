/**
 * Abstract base class for all Payment Providers.
 * Ensures strict decoupling from hardcoded payment information.
 */
export class PaymentProvider {
  constructor(name) {
    this.name = name;
  }

  async verifyPayment(txId, amount, metadata = {}) {
    throw new Error(`verifyPayment() not implemented in provider ${this.name}`);
  }

  async generatePaymentTarget(packageConfig, userId) {
    throw new Error(`generatePaymentTarget() not implemented in provider ${this.name}`);
  }
}
