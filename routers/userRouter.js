import { Router } from 'express';
import { hashPassword } from '../utils/passwordUtils.js';
import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post('/', async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await userModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
});

export default router;
