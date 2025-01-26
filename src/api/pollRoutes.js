import express from "express";
import {
  createPoll,
  getPollDetails,
  updatePoll,
  deletePoll,
  getPollResults,
  getAllPolls,
} from "../controllers/pollController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Create a new poll
router.post("/", authMiddleware, createPoll);

// Get all polls for user
router.get("/all", authMiddleware, getAllPolls);

// Get poll details by ID
router.get("/:pollId", getPollDetails);

// Update an existing poll
router.put("/:pollId", authMiddleware, adminMiddleware, updatePoll);

// Delete a poll
router.delete("/:pollId", authMiddleware, adminMiddleware, deletePoll);

// Get results for a specific poll
router.get("/:pollId/results", authMiddleware, getPollResults);

export default router;
