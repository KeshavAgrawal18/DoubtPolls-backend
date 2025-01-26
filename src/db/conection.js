import { Sequelize } from "sequelize";
import logger from "../config/logger.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Sequelize instance using DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // Default to "postgres" since DATABASE_URL is commonly used with PostgreSQL
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Enable SSL if specified
  },
  logging: false, // Change to `msg => logger.info(msg)` for SQL query logging
});
/**
 * Connect to the database and ensure it's ready to use.
 */
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection successful.");

    // Synchronize the database (sync models with the DB)
    await sequelize.sync({ force: false }); // Set `force: true` for dropping and recreating the tables
    logger.info("Database synchronized successfully.");
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    logger.debug(error.stack); // Optional: Log stack trace for debugging
    process.exit(1); // Exit the process if the connection fails
  }
};

/**
 * Graceful shutdown: Close DB connection on application exit.
 */
const closeDatabaseConnection = async () => {
  try {
    await sequelize.close();
    logger.info("Database connection closed.");
  } catch (error) {
    logger.error(`Error closing the database connection: ${error.message}`);
  }
};

process.on("SIGINT", closeDatabaseConnection);
process.on("SIGTERM", closeDatabaseConnection);

export { sequelize };
export default connectToDatabase;
