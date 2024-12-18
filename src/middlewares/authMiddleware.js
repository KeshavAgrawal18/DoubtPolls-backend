import User from "../models/userModel.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { verifyToken } from "../utils/jwtHelper.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const UNAUTHORIZED = HTTP_STATUS.UNAUTHORIZED;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: "User not found" });
    }

    req.user = user; // Attach user information to request object

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
