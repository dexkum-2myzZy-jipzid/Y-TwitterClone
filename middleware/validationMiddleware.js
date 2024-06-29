import { StatusCodes } from 'http-status-codes';

export const validateTweetContent = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Text is required' });
  }

  next();
};
