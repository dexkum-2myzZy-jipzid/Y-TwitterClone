import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { Retweet, Tweet } from '../components';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/users/${params.id}/likes`);
    return { tweets: response.data };
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const Likes = () => {
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
    <div>No likes available.</div>
  );
};
export default Likes;
