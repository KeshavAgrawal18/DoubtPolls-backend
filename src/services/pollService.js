import * as pollRepository from "../dataAccess/pollRepository.js";

/**
 * Create a new poll.
 * @param {Object} pollData - Poll details.
 * @returns {Promise<Object>} The created poll.
 */
export const createPoll = async (pollData) => {
  console.log({ pollData });

  return await pollRepository.createPoll(pollData);
};

/**
 * Get poll details by ID.
 * @param {string} pollId - The poll ID.
 * @returns {Promise<Object>} The poll details.
 */
export const getPollDetails = async (pollId) => {
  const poll = await pollRepository.getPollById(pollId);
  if (!poll) {
    throw new Error("Poll not found");
  }
  return poll;
};

/**
 * Update an existing poll.
 * @param {string} pollId - The poll ID.
 * @param {Object} updates - The updates to apply.
 * @returns {Promise<number>} Number of rows updated.
 */
export const updatePoll = async (pollId, updates) => {
  const updatedRows = await pollRepository.updatePoll(pollId, updates);
  if (updatedRows === 0) {
    throw new Error("Failed to update poll");
  }
  return updatedRows;
};

/**
 * Delete a poll.
 * @param {string} pollId - The poll ID.
 * @returns {Promise<number>} Number of rows deleted.
 */
export const deletePoll = async (pollId) => {
  return await pollRepository.deletePoll(pollId);
};

/**
 * Get polls created by a specific user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} List of polls.
 */
export const getUserPolls = async (userId) => {
  return await pollRepository.getPollsByUserId(userId);
};
