import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import { RepeatOutlined as Repost } from '@mui/icons-material';
import Wrapper from '../assets/wrappers/RepostTweet';

const RepostTweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const repostTweet = tweet.repostTweet;
  const repostTweetUser = repostTweet.createdBy;

  return (
    <Wrapper>
      <div className="repost-header">
        <Repost className="icon" fontSize="small" />
        <span>{user.displayname} reposted</span>
      </div>
      <div className="repost-tweet-content">
        <Avatar
          src={repostTweetUser.avatar}
          alt="profile"
          sx={{ width: 48, height: 48 }}
        />
        <div className="repost-user-info">
          <UserInfo
            name={repostTweetUser.displayname}
            username={repostTweetUser.username}
            date={repostTweet.createdAt}
          />
          <div className="repost-text-content">
            <p>{repostTweet.content}</p>
          </div>
          {repostTweet.media && (
            <img className="repost-tweet-image" src={repostTweet.media} />
          )}
          <Interactions
            replies={repostTweetUser.replies}
            retweets={repostTweetUser.retweets}
            likes={repostTweetUser.likes}
            views={repostTweetUser.views}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default RepostTweet;
