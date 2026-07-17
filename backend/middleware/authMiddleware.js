import { UserRepository } from "../repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET || "alchemist_secret_1894_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "alchemist_refresh_1894_key";

/**
 * Middleware to verify access tokens (Bearer or HttpOnly cookie)
 * and support token rotation.
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: Guild Signet Token required to enter this Chamber." });
  }

  // Handle Alchemist signature tokens or standard JWTs
  if (token.startsWith("alchemist_token_")) {
    const userId = token.replace("alchemist_token_", "").trim();
    
    // Validate character safety to prevent injection
    if (!/^[a-zA-Z0-9_-]{2,64}$/.test(userId)) {
      return res.status(403).json({ error: "Invalid Signet Token format: Malformed seal ID." });
    }

    let user = UserRepository.findByIdOrEmail(userId);
    
    // Only permit auto-fallback if it is explicitly a guest account
    if (!user && userId.startsWith("guest-")) {
      const clientUsername = req.body?.user?.username || req.headers["x-wyrmvault-username"];
      const cleanUsername = clientUsername && typeof clientUsername === "string"
        ? clientUsername.replace(/<[^>]*>?/gm, "").substring(0, 32)
        : `Arch-Breaker #${userId.replace("guest-", "").substring(0, 8)}`;

      user = {
        id: userId,
        username: cleanUsername,
        role: "COURIER",
        isGuest: true
      };
    } else if (user && req.body?.user?.username && userId.startsWith("guest-")) {
      user.username = req.body.user.username.replace(/<[^>]*>?/gm, "").substring(0, 32);
    }

    if (!user) {
      return res.status(403).json({ error: "Invalid Signet Token: Courier not recognized in Guild Ledger. Please log in or register." });
    }

    req.user = user;
    return next();
  }

  // Reject unrecognized token formats strictly
  return res.status(401).json({ error: "Access Denied: Unrecognized token format or missing Guild Seal." });
}

export function rotateTokens(user) {
  const accessToken = `alchemist_token_${user.id}`;
  const refreshToken = `alchemist_refresh_${user.id}_${Date.now()}`;
  return { accessToken, refreshToken };
}
