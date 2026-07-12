import { LetterRepository } from "../repositories/letterRepository.js";
import { CipherRepository } from "../repositories/cipherRepository.js";

export function initializeSocketEvents(io) {
  io.on("connection", (socket) => {
    console.log("Client connected to Alchemist's Courier:", socket.id);

    socket.emit("initial_data", {
      letters: LetterRepository.findAllLetters(),
      bottles: LetterRepository.findAllBottles(),
      ciphers: CipherRepository.findAll()
    });

    socket.on("toss_bottle", (data) => {
      const newBottle = LetterRepository.createBottle(data);
      io.emit("new_bottle", newBottle);
    });

    socket.on("send_letter", (data) => {
      const newLetter = LetterRepository.createLetter(data);
      io.emit("new_letter", newLetter);
    });

    socket.on("like_letter", (letterId) => {
      const updated = LetterRepository.likeLetter(letterId);
      if (updated) {
        io.emit("letter_updated", updated);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
