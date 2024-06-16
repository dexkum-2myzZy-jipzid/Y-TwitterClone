import { Tweet, Retweet } from '../components';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

const Wrapper = styled.div`
  margin-left: 250px;
  overflow-y: auto;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get('/tweets');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const TweetFeed = () => {
  const { tweets } = useLoaderData();

  const renderTweet = (tweet) => {
    if (tweet.retweet && !(tweet.content || tweet.media)) {
      return <Retweet key={tweet._id} tweet={tweet} />;
    }
    return <Tweet key={tweet._id} tweet={tweet} />;
  };

  return <div>{tweets.map(renderTweet)}</div>;
};
export default TweetFeed;
