import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import upload, { formatImage } from '../middleware/multerMiddleware.js';
import { promises as fs } from 'fs';

const router = Router();

router.post('/', upload.single('file'), async (req, res) => {
  // upload to cloudinary
  const image = {};
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    // await fs.unlink(req.file.path);
    image.url = response.secure_url;
    image.public_id = response.public_id;
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'no file' });
  }

  console.log(image);
  res.status(StatusCodes.OK).json(image);
});

export default router;
