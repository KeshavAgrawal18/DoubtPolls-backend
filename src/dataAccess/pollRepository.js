import Poll from "../models/pollModel.js";

/**
 * Fetch a poll by ID.
 * @param {string} id - The poll ID.
 * @returns {Promise<Object>} Poll object if found, null otherwise.
 */
export const getPollById = async (id) => {
  return await Poll.findByPk(id);
};

/**
 * Fetch all polls created by a specific user.
 * @param {string} userId - The creator's user ID.
 * @returns {Promise<Array>} List of polls.
 */
export const getPollsByUserId = async (userId) => {
  return await Poll.findAll({ where: { creatorId: userId } });
};

/**
 * Create a new poll.
 * @param {Object} pollData - The poll details.
 * @returns {Promise<Object>} The created poll.
 */
export const createPoll = async (pollData) => {
  return await Poll.create(pollData);
};

/**
 * Update a poll.
 * @param {string} id - The poll ID.
 * @param {Object} updates - The updates to apply.
 * @returns {Promise<number>} Number of rows updated.
 */
export const updatePoll = async (id, updates) => {
  const [updatedRows] = await Poll.update(updates, { where: { id } });
  return updatedRows;
};

/**
 * Delete a poll by ID.
 * @param {string} id - The poll ID.
 * @returns {Promise<number>} Number of rows deleted.
 */
export const deletePoll = async (id) => {
  return await Poll.destroy({ where: { id } });
};

/**
 * Get the creator ID of a poll by poll ID.
 * @param {string} pollId - The poll ID.
 * @returns {Promise<string|null>} Creator ID if found, null otherwise.
 */
export const getCreatorId = async (pollId) => {
  const poll = await Poll.findByPk(pollId, { attributes: ["creatorId"] });
  return poll ? poll.creatorId : null;
};
