import { PaymentService } from "../services/paymentService.js";

export class PaymentController {
  static async getPackages(req, res, next) {
    try {
      const config = PaymentService.getAvailablePackages();
      res.json(config);
    } catch (err) {
      next(err);
    }
  }

  static async generateTarget(req, res, next) {
    try {
      const { packageId, userId, providerName } = req.body;
      const target = await PaymentService.generatePackagePaymentTarget(packageId, userId, providerName);
      res.json(target);
    } catch (err) {
      next(err);
    }
  }

  static async verifyPayment(req, res, next) {
    try {
      const { packageId, txId, userId, providerName } = req.body;
      const result = await PaymentService.verifyAndCreditPayment(packageId, txId, userId, providerName);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
