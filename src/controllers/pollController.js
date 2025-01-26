import * as pollService from "../services/pollService.js";
import { getPollResults as getPollResultsService } from "../services/votingService.js";

/**
 * Create a new poll.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createPoll = async (req, res) => {
  try {
    const pollData = req.body;
    const userId = req.user.id;
    const newPoll = await pollService.createPoll({
      ...pollData,
      creatorId: userId,
    });
    res.status(201).json({ success: true, data: newPoll });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get poll details by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getPollDetails = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await pollService.getPollDetails(pollId);
    res.status(200).json({ success: true, data: poll });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Update a poll.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const updates = req.body;
    await pollService.updatePoll(pollId, updates);
    res
      .status(200)
      .json({ success: true, message: "Poll updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete a poll.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    await pollService.deletePoll(pollId);
    res
      .status(200)
      .json({ success: true, message: "Poll deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get poll results by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const pollResults = await getPollResultsService(pollId);
    res.status(200).json({ success: true, data: pollResults });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get all polls.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getAllPolls = async (req, res) => {
  try {
    const userId = req.user.id;

    const polls = await pollService.getUserPolls(userId);
    res.status(200).json({ success: true, data: polls });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
