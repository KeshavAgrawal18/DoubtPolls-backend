import jwt from "jsonwebtoken";
import config from "../config/appConfig.js";

/**
 * Generate a JWT token.
 * @param {Object} payload - The data to include in the token.
 * @param {string} expiresIn - Token expiry time (e.g., '1h', '7d').
 * @returns {string} The signed JWT token.
 */
export const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

/**
 * Verify a JWT token.
 * @param {string} token - The token to verify.
 * @returns {Object} Decoded payload if verification succeeds.
 * @throws {Error} If the token is invalid or expired.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
