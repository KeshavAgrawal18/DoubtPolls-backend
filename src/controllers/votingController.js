import * as votingService from "../services/votingService.js";

/**
 * Cast a vote.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const castVote = async (req, res) => {
  try {
    const voteData = req.body;
    const userId = req.user.id;
    voteData.userId = userId;
    const vote = await votingService.castVote(voteData);
    res.status(201).json({ success: true, data: vote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Check if a user has voted in a poll.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const hasUserVoted = async (req, res) => {
  try {
    const { pollId, userId } = req.params;
    const hasVoted = await votingService.hasUserVoted(pollId, userId);
    res.status(200).json({ success: true, data: { hasVoted } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get all votes cast by a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getUserVotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const votes = await votingService.getUserVotes(userId);
    res.status(200).json({ success: true, data: votes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
