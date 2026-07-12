import { GUILD_ROLES, GUILD_RANKS } from "../constants/roles.js";

/**
 * Enforces Role-Based Access Control (RBAC) across Guild hierarchy.
 * @param {string[]} allowedRoles - List of allowed roles
 */
export function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Guild Member authentication required." });
    }

    const userRole = req.user.role || GUILD_ROLES.FIRST_CLASS_COURIER;
    if (!allowedRoles.includes(userRole) && userRole !== GUILD_ROLES.ADMIN) {
      return res.status(403).json({
        error: `Rank Insufficient: This archive requires one of the following roles: ${allowedRoles.join(", ")}.`
      });
    }
    next();
  };
}

/**
 * Enforces minimum prestige threshold before accessing classified ciphers or inner vaults.
 */
export function checkPrestige(minPrestige = 100) {
  return (req, res, next) => {
    if (!req.user || (req.user.prestige || 0) < minPrestige) {
      return res.status(403).json({
        error: `Prestige Threshold Required: You need at least ${minPrestige} Prestige to unseal this chamber.`
      });
    }
    next();
  };
}
