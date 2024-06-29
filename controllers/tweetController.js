import { StatusCodes } from 'http-status-codes';
import tweetModel from '../models/tweetModel.js';
import userModel from '../models/userModel.js';

export const createTweet = async (req, res) => {
  const { text, imgUrl, publicId } = req.body;
  const tweetObject = {
    content: text,
    createdBy: req.userId,
    media: imgUrl,
    mediaPublicId: publicId,
  };
  const tweet = await tweetModel.create(tweetObject);
  await tweet.save();

  // based on req.userId find user and add tweet to its posts array
  const user = await userModel.findById(req.userId);
  user.posts.unshift(tweet.id);

  // Save the user
  await user.save();

  res.status(StatusCodes.CREATED).json({ message: 'tweet created' });
};

export const fetchTweetFeed = async (req, res) => {
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
    const tweets = await tweetModel
      .find(query)
      .sort({ createdAt: direction === 'next' ? -1 : 1 }) // Sort by createdAt in descending order for 'next', ascending for 'prev'
      .limit(count)
      .populate('createdBy')
      .populate({
        path: 'retweet',
        populate: {
          path: 'createdBy',
        },
      });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: tweets,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching tweets', error: error.message });
  }
};

// get a tweet with id
export const fetchTweetById = async (req, res) => {
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: tweet,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching a tweet', error: error.message });
  }
};

export const updateTweet = async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await tweetModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!tweet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: tweet,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching a tweet', error: error.message });
  }
};

export const deleteTweet = async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await tweetModel.findByIdAndDelete(id);

    if (!tweet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' });
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Tweet deleted',
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error updating a tweet', error: error.message });
  }
};

export const postComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const tweet = await tweetModel.findById(id);
    if (!tweet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Tweet not found' });
    }
    const commentObject = {
      content: text,
      createdBy: req.userId,
    };
    const comment = await tweetModel.create(commentObject);
    tweet.comments.unshift(comment);
    tweet.replies += 1;

    await tweet.save();

    // based on req.userId find user and add tweet to its posts array
    const user = await userModel.findById(req.userId);
    user.replies.unshift(comment.id);

    // Save the user
    await user.save();

    const populatedTweet = await tweetModel.findById(id).populate({
      path: 'comments',
      model: 'Tweet',
      populate: {
        path: 'createdBy',
        model: 'User',
      },
    });

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: populatedTweet,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error posting a comment', error: error.message });
  }
};

export const retweet = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const alreadyRetweet = user.replies.includes(id);
    if (alreadyRetweet) {
      user.replies = user.likes.filter((retweetId) => retweetId !== id);
    } else {
      user.replies.unshift(id);
    }
    await user.save();
    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error retweeting a comment', error: error.message });
  }
};

export const likeTweet = async (req, res) => {
  const { id } = req.params;

  // Check if user.likes contains this tweet ID.
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const alreadyLiked = user.likes.includes(id);
    if (alreadyLiked) {
      // Remove the like
      user.likes = user.likes.filter((likeId) => likeId !== id);
    } else {
      // Add the like
      user.likes.unshift(id);
    }

    await user.save();
    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error liking a comment', error: error.message });
  }
};
