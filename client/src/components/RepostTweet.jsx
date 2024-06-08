import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import { RepeatOutlined as Repost } from '@mui/icons-material';
import Wrapper from '../assets/wrappers/RepostTweet';

const RepostTweet = ({
  id,
  profileImage,
  name,
  username,
  date,
  content,
  imgUrl,
  imgAlt,
  replies,
  retweets,
  likes,
  views,
}) => {
  return (
    <Wrapper>
      <div className="repost-header">
        <Repost className="icon" fontSize="small" />
        <span>Visual Studio Code reposted</span>
      </div>
      <div className="repost-tweet-content">
        <Avatar
          src={profileImage}
          alt="profile"
          sx={{ width: 48, height: 48 }}
        />
        <div className="repost-user-info">
          <UserInfo name={name} username={username} date={date} />
          <div className="repost-text-content">
            <p>{content}</p>
          </div>
          <img className="repost-tweet-image" src={imgUrl} alt={imgAlt} />
          <Interactions
            replies={replies}
            retweets={retweets}
            likes={likes}
            views={views}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default RepostTweet;
