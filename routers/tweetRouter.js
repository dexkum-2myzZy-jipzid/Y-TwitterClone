import { Router } from 'express';
import Tweet from '../models/tweetModel.js';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/tokenUtils.js';

const router = Router();

const authenticateUser = async (req, res, next) => {
  if (!req.cookies.token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = verifyJWT(req.cookies.token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token is not valid' });
  }
};

const validateTweetContent = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Text is required' });
  }

  next();
};

// create a tweet
router.post('/', authenticateUser, validateTweetContent, async (req, res) => {
  const { text } = req.body;
  const tweetObject = {
    content: text,
    createdBy: req.userId,
  };
  const tweet = await Tweet.create(tweetObject);
  console.log(tweet);
  res.status(StatusCodes.CREATED).json({ msg: 'tweet created' });
});

router.get('/', async (req, res) => {
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const tweets = await Tweet.find()
      .skip(skip)
      .limit(limit)
      .populate('createdBy')
      .populate({
        path: 'retweet',
        populate: {
          path: 'createdBy',
        },
      });

    res.status(StatusCodes.OK).json({ tweets });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// get a tweet with id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id)
      .populate('createdBy')
      .populate({
        path: 'retweet',
        populate: {
          path: 'createdBy',
        },
      })
      .populate({
        path: 'comments',
        model: 'Tweet',
        populate: {
          path: 'createdBy',
          model: 'User',
        },
      });

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// Update a tweet
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findByIdAndUpdate(id, req.body, { new: true });

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// Delete a tweet
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json({ msg: 'Tweet deleted' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

router.post(
  '/:id/comments',
  authenticateUser,
  validateTweetContent,
  async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Tweet not found' });
      }
      const commentObject = {
        content: text,
        createdBy: req.userId,
      };
      const comment = await Tweet.create(commentObject);
      tweet.comments.unshift(comment);
      tweet.replies += 1;

      await tweet.save();

      const populatedTweet = await Tweet.findById(id).populate({
        path: 'comments',
        model: 'Tweet',
        populate: {
          path: 'createdBy',
          model: 'User',
        },
      });

      res.json(populatedTweet);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
);

export default router;
