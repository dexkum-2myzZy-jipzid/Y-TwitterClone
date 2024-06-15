import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Wrapper from '../assets/wrappers/RetweetCard';

const RetweetCard = ({ retweetUser, retweet, handleRetweetClick }) => {
  return (
    <Wrapper onClick={handleRetweetClick}>
      <div className="retweet-header">
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
    </Wrapper>
  );
};

export default RetweetCard;
