import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import TweetBody from './TweetBody';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/Tweet';
import { useNavigate } from 'react-router-dom';

const Tweet = ({ tweet }) => {
  const user = tweet.createdBy;
  console.log(user);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/tweet/w`);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Avatar src={user.avatar} alt="profile" sx={{ width: 48, height: 48 }} />
      <div className="tweet-info">
        <UserInfo
          name={user.displayname}
          username={user.username}
          date={tweet.createdAt}
        />
        <TweetBody tweet={tweet} />
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

export default Tweet;
