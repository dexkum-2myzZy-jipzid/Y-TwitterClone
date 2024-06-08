import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/Tweet';

const Tweet = ({
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
      <Avatar src={profileImage} alt="profile" sx={{ width: 48, height: 48 }} />
      <div className="tweet-info">
        <UserInfo name={name} username={username} date={date} />
        <div className="tweet-content">
          <p>{content}</p>
        </div>
        {imgUrl && <img className="tweet-image" src={imgUrl} alt={imgAlt} />}
        <Interactions
          replies={replies}
          retweets={retweets}
          likes={likes}
          views={views}
        />
      </div>
    </Wrapper>
  );
};

export default Tweet;
