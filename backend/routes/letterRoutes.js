import express from "express";
import { LetterController } from "../controllers/letterController.js";

const router = express.Router();

router.get("/letters", LetterController.getLetters);
router.post("/letters", LetterController.createLetter);
router.post("/letters/:id/reply", LetterController.replyLetter);

router.get("/bottles", LetterController.getBottles);
router.post("/bottles", LetterController.createBottle);
router.post("/bottles/:id/reply", LetterController.replyBottle);

export default router;
