export class CipherValidator {
  static validateUnlockPayload(req, res, next) {
    const { cipherId, attemptKey } = req.body;
    if (!cipherId || !attemptKey) {
      return res.status(400).json({ error: "Both cipherId and attemptKey are required to test the lead seal." });
    }
    next();
  }
}
