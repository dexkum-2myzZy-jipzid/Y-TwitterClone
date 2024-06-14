import { CommentedRetweet, Tweet, Retweet } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 250px;
  overflow-y: auto;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TweetFeed = ({ tweets = [] }) => {
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
