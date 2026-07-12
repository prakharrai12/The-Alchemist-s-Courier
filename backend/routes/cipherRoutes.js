import express from "express";
import { CipherController } from "../controllers/cipherController.js";

const router = express.Router();

router.get("/ciphers", CipherController.getCiphers);
router.post("/ciphers/unlock", CipherController.unlockCipher);
router.post("/ciphers", CipherController.createCipher);

export default router;
