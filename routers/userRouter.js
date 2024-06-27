import { Router } from 'express';
import { hashPassword } from '../utils/passwordUtils.js';
import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/tokenUtils.js';

const router = Router();

// get current user
router.get('/', async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'No token, authorization denied' });
  }

  // get current user id
  let userId = '';
  try {
    // Verify the token
    const decoded = verifyJWT(req.cookies.token, process.env.JWT_SECRET);
    // If token is verified, send a positive response
    userId = decoded.userId;
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token is not valid' });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error' });
  }
});

// register a user (Post)
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    // add prefix '@' to username
    if (req.body.username && !req.body.username.startsWith('@')) {
      req.body.username = `@${req.body.username}`;
    }

    const user = await userModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Username already exists' });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  }
});

// get user posts
router.get('/:id/posts', async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
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

    // Return posts
    res.json(user.posts);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

// get user replies
router.get('/:id/replies', async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
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

    // Return posts
    res.json(user.replies);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

// get user likes
router.get('/:id/likes', async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
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

    // Return posts
    res.json(user.likes);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

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

//Follow
router.post('/:id/follow', authenticateUser, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You can't follow yourself." });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found.' });
    }

    const currentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: targetUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { followers: currentUserId } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({ success: true });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error.' });
  }
});

// Unfollow
router.delete('/:id/follow', authenticateUser, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId.toString()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You can't unfollow yourself." });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found.' });
    }

    const currentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: targetUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetUserId,
      { $pull: { followers: currentUserId } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({ success: true });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error.' });
  }
});

export default router;
