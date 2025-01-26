import { sequelize } from "../db/conection.js";
import Poll from "../models/pollModel.js";
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
 * Groups the votes by choice and includes the poll title and options.
 *
 * @param {string} pollId - The unique identifier of the poll.
 * @returns {Promise<Object>} A promise that resolves to an object containing the poll title, options,
 *                            and an array of vote counts for each option.
 */
export const getPollResults = async (pollId) => {
  const poll = await Poll.findOne({
    where: { id: pollId },
    attributes: ["title", "options"],
  });

  if (!poll) {
    throw new Error("Poll not found");
  }

  const voteCounts = await Vote.findAll({
    where: { pollId },
    attributes: [
      "optionId",
      [sequelize.fn("COUNT", sequelize.col("optionId")), "votes"],
    ],
    group: ["optionId"],
    raw: true,
  });

  const enrichedOptions = poll.options.map((option) => {
    const voteData = voteCounts.find((vote) => vote.optionId === option.id);
    return {
      id: option.id,
      label: option.label,
      votes: voteData ? parseInt(voteData.votes, 10) : 0,
    };
  });

  return {
    pollId,
    title: poll.title,
    options: enrichedOptions,
  };
};

/**
 * Fetch votes cast by a specific user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} List of votes cast by the user.
 */
export const getVotesByUserId = async (userId) => {
  return await Vote.findAll({
    where: { userId },
    include: [
      {
        model: Poll,
        as: "poll",
        attributes: ["title", "options"],
      },
    ],
  });
};
