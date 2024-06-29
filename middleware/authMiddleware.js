import { verifyJWT } from '../utils/tokenUtils.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const decoded = verifyJWT(req.cookies.token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
