import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import tweetModel from './models/tweetModel.js';
import userModel from './models/userModel.js';

// find user with email 'y@y.com'
// add all tweets to his account
try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await userModel.findOne({ email: 'y@y.com' });
  const jsonTweet = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const tweets = jsonTweet.map((tweet) => {
    return { ...tweet, createdBy: user._id };
  });
  // await Job.deleteMany({ createdBy: user._id });
  const sortedTweets = await tweetModel.create(tweets);
  sortedTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  sortedTweets.forEach((tweet) => user.posts.push(tweet._id));
  await user.save();
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
