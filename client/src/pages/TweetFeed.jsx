import { CommentedRepostTweet, Tweet, RepostTweet } from '../components';
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
    if (tweet.repostTweet) {
      if (tweet.content || tweet.media) {
        return <CommentedRepostTweet key={tweet._id} tweet={tweet} />;
      } else {
        return <RepostTweet key={tweet._id} tweet={tweet} />;
      }
    } else {
      return <Tweet key={tweet._id} tweet={tweet} />;
    }
  };

  return <Wrapper>{tweets.map(renderTweet)}</Wrapper>;
};
export default TweetFeed;
