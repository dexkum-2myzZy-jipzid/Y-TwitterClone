import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {
  fetchCurrentUser,
  fetchUserById,
  fetchUserLikes,
  fetchUserPosts,
  fetchUserReplies,
  follow,
  register,
  unfollow,
} from '../controllers/userController.js';

const router = Router();

// get current user
router.get('/', authenticateUser, fetchCurrentUser);
// get user with id
router.get('/:id', authenticateUser, fetchUserById);
// register a user
router.post('/', register);
// get user posts
router.get('/:id/posts', fetchUserPosts);
// get user replies
router.get('/:id/replies', fetchUserReplies);
// get user likes
router.get('/:id/likes', fetchUserLikes);
//Follow
router.post('/:id/follow', authenticateUser, follow);
// Unfollow
router.delete('/:id/follow', authenticateUser, unfollow);

export default router;
