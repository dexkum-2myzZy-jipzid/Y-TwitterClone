import { Router } from 'express';
import Tweet from '../models/tweetModel.js';
import { StatusCodes } from 'http-status-codes';

const router = Router();

// create a tweet
router.post('/', async (req, res) => {
  const tweet = await Tweet.create(req.body);
  console.log(tweet);
  res.status(StatusCodes.CREATED).json({ msg: 'tweet created' });
});

router.get('/', async (req, res) => {
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const tweets = await Tweet.find()
      .skip(skip)
      .limit(limit)
      .populate('createdBy')
      .populate({
        path: 'repostTweet',
        populate: {
          path: 'createdBy',
        },
      });

    res.status(StatusCodes.OK).json({ tweets });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// get a tweet with id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id)
      .populate('createdBy')
      .populate('repostTweet');

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// Update a tweet
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findByIdAndUpdate(id, req.body, { new: true });

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

// Delete a tweet
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Tweet not found' });
    }

    res.json({ msg: 'Tweet deleted' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

export default router;
