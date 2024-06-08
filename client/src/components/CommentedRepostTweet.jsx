import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/CommentedRepostTweet';

const CommentedRepostTweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const repostTweet = tweet.repostTweet;
  const repostTweetUser = repostTweet.createdBy;

  return (
    <Wrapper>
      <Avatar src={user.avatar} alt="profile" sx={{ width: 48, height: 48 }} />
      <div className="tweet-info">
        <UserInfo
          name={user.displayname}
          username={user.username}
          date={tweet.createdAt}
        />
        <div className="tweet-content">
          <p>{tweet.content}</p>
        </div>
        {tweet.media && <img className="tweet-image" src={tweet.media} />}
        <div className="repost-tweet">
          <div className="repost-tweet-header">
            <Avatar
              src={repostTweetUser.avatar}
              alt="profile"
              sx={{ width: 32, height: 32 }}
            />
            <UserInfo
              name={repostTweetUser.displayname}
              username={repostTweetUser.username}
              date={repostTweet.createdAt}
            />
          </div>
          <p className="repost-tweet-content">{repostTweet.content}</p>
        </div>
        <Interactions
          replies={tweet.replies}
          retweets={tweet.retweets}
          likes={tweet.likes}
          views={tweet.views}
        />
      </div>
    </Wrapper>
  );
};

export default CommentedRepostTweet;
