import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    // required: true,
  },
  media: {
    type: String,
  },
  retweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  isReplyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  likes: {
    type: Number,
    default: 0,
  },
  retweets: {
    type: Number,
    default: 0,
  },
  replies: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  hashtags: [
    {
      type: String,
    },
  ],
  mentions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default mongoose.model('Tweet', tweetSchema);
