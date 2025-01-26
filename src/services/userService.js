import * as userRepository from "../dataAccess/userRepository.js";
import { hashPassword, verifyPassword } from "../utils/passwordHelper.js";
import { generateToken } from "../utils/jwtHelper.js";

/**
 * Get user details by ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object>} The user details.
 */
export const getUserDetails = async (userId) => {
  try {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

/**
 * Register a new user.
 * @param {Object} userData - User registration details.
 * @returns {Promise<Object>} The created user.
 */
export const registerUser = async (userData) => {
  // Hash the password using the helper
  userData.password = await hashPassword(userData.password);

  // Save the hashed password and other user data
  return await userRepository.createUser(userData);
};

/**
 * Log in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's plaintext password.
 * @returns {Promise<Object>} The user details if authentication is successful.
 */
export const loginUser = async (email, password) => {
  try {
    // Retrieve the user by email
    const response = await userRepository.getUserByEmail(email);

    if (!response) throw new Error("Invalid email or password");
    const { password: hashedPassword, ...user } = response;
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await verifyPassword(password, hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { token, user };
  } catch (error) {
    throw new Error(error.message || "Authentication failed");
  }
};
