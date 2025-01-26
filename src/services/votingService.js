import * as votingRepository from "../dataAccess/votingRepository.js";

/**
 * Cast a vote.
 * @param {Object} voteData - The voting details.
 * @returns {Promise<Object>} The created vote.
 */
export const castVote = async (voteData) => {
  const { pollId, userId } = voteData;

  // Check if the user has already voted
  const existingVote = await votingRepository.hasUserVoted(pollId, userId);
  if (existingVote) {
    throw new Error("User has already voted in this poll");
  }

  return await votingRepository.castVote(voteData);
};

/**
 * Check if a user has already voted in a poll.
 * @param {string} pollId - The poll ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<boolean>} True if the user has voted, otherwise false.
 */
export const hasUserVoted = async (pollId, userId) => {
  const vote = await votingRepository.hasUserVoted(pollId, userId);
  return !!vote;
};

/**
 * Get poll results by poll ID.
 * @param {string} pollId - The ID of the poll.
 * @returns {Object} The poll results.
 */
export const getPollResults = async (pollId) => {
  try {
    return await votingRepository.getPollResults(pollId);
  } catch (error) {
    throw new Error(`Failed to fetch poll results: ${error.message}`);
  }
};

/**
 * Get all votes cast by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} List of votes cast by the user.
 */
export const getUserVotes = async (userId) => {
  try {
    return await votingRepository.getVotesByUserId(userId);
  } catch (error) {
    throw new Error(`Failed to fetch user votes: ${error.message}`);
  }
};
