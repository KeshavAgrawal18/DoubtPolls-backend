import express from "express";
import {
  castVote,
  hasUserVoted,
  getUserVotes,
} from "../controllers/votingController.js";

const router = express.Router();

// Cast a vote
router.post("/", castVote);

// Get all votes cast by the authenticated user
router.get("/user", getUserVotes);

// Check if a user has voted in a poll
router.get("/:pollId", hasUserVoted);

export default router;
