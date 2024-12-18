import User from "../models/userModel.js";

/**
 * Fetch a user by email.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object>} User object if found, null otherwise.
 */
export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: ["id", "email", "password"],
  });
};

/**
 * Create a new user.
 * @param {Object} userData - The user details.
 * @returns {Promise<Object>} The created user.
 */
export const createUser = async (userData) => {
  return await User.create(userData);
};
