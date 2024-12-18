import express from "express";
import userRoutes from "./userRoutes.js";
import pollRoutes from "./pollRoutes.js";
import votingRoutes from "./votingRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// User-related routes
router.use("/users", userRoutes);

// Poll-related routes
router.use("/polls", pollRoutes);

router.use("/voting", authMiddleware, votingRoutes);

export default router;
