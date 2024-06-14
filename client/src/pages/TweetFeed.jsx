import { CommentedRetweet, Tweet, Retweet } from '../components';
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
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const TweetFeed = () => {
  const { tweets } = useLoaderData();

  const renderTweet = (tweet) => {
    if (tweet.retweet) {
      if (tweet.content || tweet.media) {
        return <CommentedRetweet key={tweet._id} tweet={tweet} />;
      } else {
        return <Retweet key={tweet._id} tweet={tweet} />;
      }
    } else {
      return <Tweet key={tweet._id} tweet={tweet} />;
    }
  };

  return <Wrapper>{tweets.map(renderTweet)}</Wrapper>;
};
export default TweetFeed;
