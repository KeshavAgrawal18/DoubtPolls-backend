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
 * @returns {Object} The poll results and the winning choices.
 */
export const getPollResults = async (pollId) => {
  try {
    // Fetch raw vote counts from the repository
    const voteCounts = await votingRepository.getPollResults(pollId);

    let maxVotes = 0;
    const results = voteCounts.map((entry) => {
      const votes = parseInt(entry.votes, 10);
      if (votes > maxVotes) {
        maxVotes = votes;
      }
      return { choice: entry.choice, votes };
    });

    // Determine all winning choices (handling ties)
    const winningChoices = results
      .filter((entry) => entry.votes === maxVotes)
      .map((entry) => entry.choice);

    return { results, winningChoices };
  } catch (error) {
    throw new Error(`Failed to fetch poll results: ${error.message}`);
  }
};
