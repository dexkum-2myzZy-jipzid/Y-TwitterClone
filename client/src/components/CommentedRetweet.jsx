import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/CommentedRetweet';

const CommentedRetweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const retweet = tweet.retweet;
  const retweetUser = retweet.createdBy;

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
              src={retweetUser.avatar}
              alt="profile"
              sx={{ width: 32, height: 32 }}
            />
            <UserInfo
              name={retweetUser.displayname}
              username={retweetUser.username}
              date={retweet.createdAt}
            />
          </div>
          <p className="retweet-content">{retweet.content}</p>
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

export default CommentedRetweet;
