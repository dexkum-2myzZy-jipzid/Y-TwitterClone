import { StatusCodes } from 'http-status-codes';
import userModel from '../models/userModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const fetchCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching current user', error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'userId is not missing' });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching a user',
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    // add prefix '@' to username
    if (req.body.username && !req.body.username.startsWith('@')) {
      req.body.username = `@${req.body.username}`;
    }

    const user = await userModel.create(req.body);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: user,
      message: 'user created',
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Username already exists',
        error: error.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error registering a user',
        error: error.message,
      });
    }
  }
};

export const fetchUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    // populate posts from user
    await user.populate({
      path: 'posts',
      model: 'Tweet',
      populate: [
        {
          path: 'createdBy',
          model: 'User',
        },
        {
          path: 'retweet',
          model: 'Tweet',
          populate: {
            path: 'createdBy',
            model: 'User',
          },
        },
      ],
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user.posts,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching user posts',
      error: error.message,
    });
  }
};

export const fetchUserReplies = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    // populate posts from user
    await user.populate({
      path: 'replies',
      model: 'Tweet',
      populate: [
        {
          path: 'createdBy',
          model: 'User',
        },
        {
          path: 'retweet',
          model: 'Tweet',
          populate: {
            path: 'createdBy',
            model: 'User',
          },
        },
      ],
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user.replies,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching user posts',
      error: error.message,
    });
  }
};

export const fetchUserLikes = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    // populate posts from user
    await user.populate({
      path: 'likes',
      model: 'Tweet',
      populate: [
        {
          path: 'createdBy',
          model: 'User',
        },
        {
          path: 'retweet',
          model: 'Tweet',
          populate: {
            path: 'createdBy',
            model: 'User',
          },
        },
      ],
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: user.likes,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching user posts',
      error: error.message,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You can't follow yourself." });
    }

    const targetUser = await userModel.findById(targetUserId);
    if (!targetUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found.' });
    }

    await userModel.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: targetUserId } },
      { new: true }
    );
    await userModel.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { followers: currentUserId } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error.' });
  }
};

export const unfollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You can't unfollow yourself." });
    }

    const targetUser = await userModel.findById(targetUserId);
    if (!targetUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found.' });
    }

    await userModel.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: targetUserId } },
      { new: true }
    );
    await userModel.findByIdAndUpdate(
      targetUserId,
      { $pull: { followers: currentUserId } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error.' });
  }
};
