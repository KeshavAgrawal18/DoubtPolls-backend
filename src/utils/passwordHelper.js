import bcrypt from "bcrypt";

/**
 * Hash a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @param {number} saltRounds - The number of salt rounds to use (default: 10).
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = async (password, saltRounds = 10) => {
  if (!password) {
    throw new Error("Password is required for hashing.");
  }
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verify user password.
 * @param {string} password - Plain text password.
 * @param {string} hashedPassword - Hashed password from the database.
 * @returns {Promise<boolean>} True if the password matches, otherwise false.
 */
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
