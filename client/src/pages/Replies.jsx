import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { Retweet, Tweet } from '../components';
import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/users/${params.id}/replies`);
    const { data } = response.data;
    return { tweets: data };
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const Replies = () => {
  const { tweets } = useLoaderData();

  const renderTweet = (tweet) => {
    if (tweet.retweet && !(tweet.content || tweet.media)) {
      return <Retweet key={tweet._id} tweet={tweet} />;
    }
    return <Tweet key={tweet._id} tweet={tweet} />;
  };

  return tweets && tweets.length > 0 ? (
    <div>{tweets.map(renderTweet)}</div>
  ) : (
    <div>No replies available.</div>
  );
};
export default Replies;
