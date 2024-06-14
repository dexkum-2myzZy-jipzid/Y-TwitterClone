import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import { RepeatOutlined as Repost } from '@mui/icons-material';
import Wrapper from '../assets/wrappers/Retweet';

const Retweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const retweet = tweet.retweet;
  const retweetUser = retweet.createdBy;

  return (
    <Wrapper>
      <div className="retweet-header">
        <Repost className="icon" fontSize="small" />
        <span>{user.displayname} reposted</span>
      </div>
      <div className="retweet-content">
        <Avatar
          src={retweetUser.avatar}
          alt="profile"
          sx={{ width: 48, height: 48 }}
        />
        <div className="retweet-user-info">
          <UserInfo
            name={retweetUser.displayname}
            username={retweetUser.username}
            date={retweet.createdAt}
          />
          <div className="retweet-text-content">
            <p>{retweet.content}</p>
          </div>
          {retweet.media && (
            <img className="retweet-image" src={retweet.media} />
          )}
          <Interactions
            replies={retweetUser.replies}
            retweets={retweetUser.retweets}
            likes={retweetUser.likes}
            views={retweetUser.views}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Retweet;
