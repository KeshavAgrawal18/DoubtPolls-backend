export const APP_NAME = "Online Voting System";
export const MAX_INVITES = 50; // Maximum number of invites per poll
export const MAX_VOTES_PER_USER = 1; // Maximum votes allowed per user per poll

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: "Operation completed successfully.",
  INVALID_INPUT: "Invalid input provided.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access is forbidden.",
  NOT_FOUND: "Requested resource not found.",
  SERVER_ERROR: "An unexpected error occurred. Please try again later.",
};
