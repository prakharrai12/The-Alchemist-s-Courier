import { LetterRepository } from "../repositories/letterRepository.js";

export class LetterService {
  static getAllLetters() {
    return LetterRepository.findAllLetters();
  }

  static createLetter(data) {
    if (!data.title || !data.content) {
      throw { status: 400, message: "Title and content are required" };
    }
    return LetterRepository.createLetter(data);
  }

  static replyToLetter(letterId, replyData) {
    const letter = LetterRepository.addLetterReply(letterId, replyData);
    if (!letter) {
      throw { status: 404, message: "Letter not found" };
    }
    return letter;
  }

  static likeLetter(letterId) {
    return LetterRepository.likeLetter(letterId);
  }

  static getAllBottles() {
    return LetterRepository.findAllBottles();
  }

  static createBottle(data) {
    if (!data.content) {
      throw { status: 400, message: "Content is required for ocean bottles" };
    }
    return LetterRepository.createBottle(data);
  }

  static replyToBottle(bottleId, replyData) {
    const bottle = LetterRepository.addBottleReply(bottleId, replyData);
    if (!bottle) {
      throw { status: 404, message: "Bottle not found" };
    }
    return bottle;
  }
}
