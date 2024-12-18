import { getCreatorId } from "../dataAccess/pollRepository.js";
import { HTTP_STATUS } from "../utils/constants.js";

const adminMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const pollId = req.params.pollId;
  const creatorId = await getCreatorId(pollId);

  if (creatorId !== userId) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Access denied" });
  }

  next();
};

export default adminMiddleware;
