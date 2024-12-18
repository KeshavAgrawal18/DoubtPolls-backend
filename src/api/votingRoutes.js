import express from "express";
import { castVote, hasUserVoted } from "../controllers/votingController.js";

const router = express.Router();

// Cast a vote
router.post("/", castVote);

// Check if a user has voted in a poll
router.get("/:pollId", hasUserVoted);

export default router;
