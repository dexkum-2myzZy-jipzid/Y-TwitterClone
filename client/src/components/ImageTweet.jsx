import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/ImageTweet';

const ImageTweet = ({
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
}) => (
  <Wrapper>
    <Avatar src={profileImage} alt="profile" sx={{ width: 48, height: 48 }} />
    <div className="tweet-info">
      <UserInfo name={name} username={username} date={date} />
      <div className="content">
        <p>{content}</p>
      </div>
      <img className="tweetImage" src={imgUrl} alt={imgAlt} />
      <Interactions
        replies={replies}
        retweets={retweets}
        likes={likes}
        views={views}
      />
    </div>
  </Wrapper>
);

export default ImageTweet;
