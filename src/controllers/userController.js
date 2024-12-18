import * as userService from "../services/userService.js";

/**
 * Get user details by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserDetails(userId);
    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Failed to retrieve user details",
    });
  }
};

/**
 * Register a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
};

/**
 * Update user profile.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    await userService.updateUserProfile(userId, updates);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Failed to update user profile",
    });
  }
};

/**
 * Delete user account.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const deleteUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.deleteUserAccount(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
};

/**
 * User login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const loginResponse = await userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: loginResponse,
    });
  } catch (error) {
    res.status(error.statusCode || 401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
