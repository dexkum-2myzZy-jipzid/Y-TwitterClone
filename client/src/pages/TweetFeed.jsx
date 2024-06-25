import { Tweet, Retweet, EndMessage, Loader } from '../components';
import { useLoaderData } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { fetchTweets } from '../services.js';

export const loader = async () => {
  return fetchTweets();
};

// TODO: add pull down feature
const TweetFeed = () => {
  const initialTweets = useLoaderData();
  const [tweets, setTweets] = useState(initialTweets);
  const [hasMore, setHasMore] = useState(true);
  const [latestTweet, setLatestTweet] = useState(null);
  const limit = 20;

  const fetchMoreTweets = async (direction) => {
    try {
      const cursor =
        direction === 'next'
          ? tweets[tweets.length - 1]?.createdAt
          : latestTweet?.createdAt;

      const newTweets = await fetchTweets(cursor, direction, limit);

      if (direction === 'next') {
        setTweets((prevTweets) => [...prevTweets, ...newTweets]);
        if ((newTweets?.length || 0) < limit) {
          setHasMore(false);
        }
      }

      if (direction === 'prev' && newTweets.length) {
        setLatestTweet(newTweets[0]);
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const renderTweet = (tweet) => {
    if (tweet.retweet && !(tweet.content || tweet.media)) {
      return <Retweet key={tweet._id} tweet={tweet} />;
    }
    return <Tweet key={tweet._id} tweet={tweet} />;
  };

  return (
    <InfiniteScroll
      dataLength={tweets.length}
      next={() => fetchMoreTweets('next')}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMessage />}
      style={{ overflow: 'hidden' }}>
      <ul>
        {tweets.map((tweet, index) => (
          <li key={index}>{renderTweet(tweet)}</li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default TweetFeed;
