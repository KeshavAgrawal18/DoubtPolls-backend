import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
    maxRequests: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per window
  },
};

export default config;
