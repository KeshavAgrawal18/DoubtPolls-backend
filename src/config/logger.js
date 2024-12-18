import winston from "winston";

// Logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Error logs
    new winston.transports.File({ filename: "logs/combined.log" }), // All logs
  ],
});

// Log unhandled exceptions and rejections
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
