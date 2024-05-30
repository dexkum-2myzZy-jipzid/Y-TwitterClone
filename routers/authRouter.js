import { Router } from 'express';
import User from '../models/userModel.js';
import { createJWT, verifyJWT } from '../utils/tokenUtils.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../utils/passwordUtils.js';

const router = Router();

router.get('/', async (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'No token, authorization denied' });
  }
  try {
    // Verify the token
    const decoded = verifyJWT(req.cookies.token, process.env.JWT_SECRET);
    // If token is verified, send a positive response
    res.json({
      message: 'Token is valid, user is logged in',
      userId: decoded.userId,
    });
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token is not valid' });
  }
});

router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  console.log(req.body.password);
  console.log(user);

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

  const token = createJWT({ userId: user._id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged in' });
});

router.delete('/', (req, res) => {
  res.clearCookie('token');
  res.status(StatusCodes.OK).json({ message: 'User logged out!' });
});

export default router;
