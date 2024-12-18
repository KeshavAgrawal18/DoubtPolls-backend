import { sequelize } from "../db/conection.js";
import Vote from "../models/voteModel.js";

/**
 * Cast a vote.
 * @param {Object} voteData - The voting details.
 * @returns {Promise<Object>} The created vote.
 */
export const castVote = async (voteData) => {
  return await Vote.create(voteData);
};

/**
 * Fetch votes for a specific poll.
 * @param {string} pollId - The poll ID.
 * @returns {Promise<Array>} List of votes.
 */
export const getVotesByPollId = async (pollId) => {
  return await Vote.findAll({ where: { pollId } });
};

/**
 * Fetch the total votes for a specific option in a poll.
 * @param {string} pollId - The poll ID.
 * @param {string} optionId - The poll option ID.
 * @returns {Promise<number>} Total votes.
 */
export const getVotesForOption = async (pollId, optionId) => {
  return await Vote.count({ where: { pollId, optionId } });
};

/**
 * Check if a user has already voted in a poll.
 * @param {string} pollId - The poll ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object>} Vote object if found, null otherwise.
 */
export const hasUserVoted = async (pollId, userId) => {
  return await Vote.findOne({ where: { pollId, userId } });
};

/**
 * Fetches the total vote counts for each choice in a given poll from the database.
 * Groups the votes by choice and returns the results.
 *
 * @param {string} pollId - The unique identifier of the poll.
 * @returns {Promise<Array>} A promise that resolves to an array of objects,
 *                           each containing a choice and its corresponding vote count.
 */
export const getPollResults = async (pollId) => {
  return await Vote.findAll({
    where: { pollId },
    attributes: [
      "choice",
      [sequelize.fn("COUNT", sequelize.col("choice")), "votes"],
    ],
    group: ["choice"],
    raw: true,
  });
};
