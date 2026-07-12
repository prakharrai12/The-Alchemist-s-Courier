import express from "express";
import { AuthController } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.get("/auth/profile/:userId", AuthController.getProfile);
router.put("/auth/profile/:userId", AuthController.updateProfile);
router.post("/gold/transaction", AuthController.goldTransaction);

export default router;
