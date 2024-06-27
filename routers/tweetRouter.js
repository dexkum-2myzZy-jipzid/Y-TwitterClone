import { Router } from 'express';
import Tweet from '../models/tweetModel.js';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/tokenUtils.js';
import userModel from '../models/userModel.js';

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
  const { text, imgUrl, publicId } = req.body;
  const tweetObject = {
    content: text,
    createdBy: req.userId,
    media: imgUrl,
    mediaPublicId: publicId,
  };
  const tweet = await Tweet.create(tweetObject);
  await tweet.save();
  console.log(tweet);

  // based on req.userId find user and add tweet to its posts array
  const user = await userModel.findById(req.userId);
  user.posts.unshift(tweet.id);

  // Save the user
  await user.save();

  res.status(StatusCodes.CREATED).json({ msg: 'tweet created' });
});

// get tweets from people I following
router.get('/', authenticateUser, async (req, res) => {
  const {
    cursor = new Date().toISOString(), // Default to current time
    direction = 'next',
    count = 20,
  } = req.query;

  const user = await userModel.findById(req.userId).lean();

  // user.following is an array of user IDs the user is following
  let query = {
    createdBy: { $in: user.following },
    createdAt: {},
  };

  // the query based on the direction
  if (direction === 'next') {
    query.createdAt.$lt = cursor; // Fetch tweets created before the cursor
  } else {
    query.createdAt.$gt = cursor; // Fetch tweets created after the cursor
  }

  try {
    const tweets = await Tweet.find(query)
      .sort({ createdAt: direction === 'next' ? -1 : 1 }) // Sort by createdAt in descending order for 'next', ascending for 'prev'
      .limit(count)
      .populate('createdBy')
      .populate({
        path: 'retweet',
        populate: {
          path: 'createdBy',
        },
      });

    res.status(StatusCodes.OK).json({ tweets });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tweets', error: error.message });
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

      // based on req.userId find user and add tweet to its posts array
      const user = await userModel.findById(req.userId);
      user.replies.unshift(comment.id);

      // Save the user
      await user.save();

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

// retweet a tweet
router.post('/:id/retweets', authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
    }

    const alreadyRetweet = user.replies.includes(id);
    if (alreadyRetweet) {
      user.replies = user.likes.filter((retweetId) => retweetId !== id);
    } else {
      user.replies.unshift(id);
    }
    await user.save(); // Save the changes to the database
    res.json({ success: true }); // Send back a success response
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

// like a tweet
router.post('/:id/likes', authenticateUser, async (req, res) => {
  const { id } = req.params;

  // Check if user.likes contains this tweet ID.
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
    }

    const alreadyLiked = user.likes.includes(id);
    if (alreadyLiked) {
      // Remove the like
      user.likes = user.likes.filter((likeId) => likeId !== id);
    } else {
      // Add the like
      user.likes.unshift(id);
    }

    await user.save(); // Save the changes to the database
    res.json({ success: true }); // Send back a success response
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

export default router;
