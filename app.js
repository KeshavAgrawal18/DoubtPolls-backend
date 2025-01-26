import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./src/api/index.js";
import rateLimiter from "./src/middlewares/rateMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS with descriptive env variable
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev")); // Log HTTP requests
app.use(rateLimiter); // Apply rate limiter globally

// API Routes
app.use("/api", apiRoutes);

export default app;
