import User from "../models/userModel.js";

/**
 * Fetch a user by email.
 * @param {string} email - The user's email address.
 * @returns {Promise<Object|null>} Plain user object if found, null otherwise.
 */
export const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ["id", "email", "password", "username"],
  });
  
  // Return plain object if user is found, otherwise null
  return user ? user.get({ plain: true }) : null;
};

/**
 * Create a new user.
 * @param {Object} userData - The user details.
 * @returns {Promise<Object>} Plain created user object.
 */
export const createUser = async (userData) => {
  const user = await User.create(userData);

  // Return plain object for the created user
  return user.get({ plain: true });
};
