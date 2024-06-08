import { Router } from 'express';
import { hashPassword } from '../utils/passwordUtils.js';
import userModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

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

export default router;
