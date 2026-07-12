import express from "express";
import { PaymentController } from "../controllers/paymentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/config/packages", PaymentController.getPackages);
router.post("/payment/target", authenticateToken, PaymentController.generateTarget);
router.post("/payment/verify", authenticateToken, PaymentController.verifyPayment);

export default router;
