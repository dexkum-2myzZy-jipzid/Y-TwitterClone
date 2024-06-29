import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';
import userModel from '../models/userModel.js';

// check session
export const checkSession = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: req.userId,
    message: 'Token is valid, user is logged in',
  });
};

// login
export const login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

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

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged in',
  });
};

// logout
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'user logged out!',
  });
};
