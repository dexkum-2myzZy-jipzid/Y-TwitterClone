import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
  createTweet,
  deleteTweet,
  fetchTweetById,
  fetchTweetFeed,
  likeTweet,
  postComment,
  retweet,
  updateTweet,
} from '../controllers/tweetController.js';
import { validateTweetContent } from '../middleware/validationMiddleware.js';

const router = Router();

// get tweets from people I following
router.get('/', authenticateUser, fetchTweetFeed);
// create a tweet
router.post('/', authenticateUser, validateTweetContent, createTweet);
// get a tweet with id
router.get('/:id', fetchTweetById);
// Update a tweet
router.put('/:id', updateTweet);
// Delete a tweet
router.delete('/:id', deleteTweet);
// create a comment
router.post(
  '/:id/comments',
  authenticateUser,
  validateTweetContent,
  postComment
);
// retweet a tweet
router.post('/:id/retweets', authenticateUser, retweet);
// like a tweet
router.post('/:id/likes', authenticateUser, likeTweet);

export default router;
