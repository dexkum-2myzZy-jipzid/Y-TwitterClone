import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import TweetBody from './TweetBody';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/Tweet';
import { useNavigate } from 'react-router-dom';
import RetweetCard from './RetweetCard';

const Tweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const retweet = tweet.retweet;
  const retweetUser = retweet ? retweet.createdBy : null;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/tweet/${tweet._id}`);
  };

  const handleRetweetClick = (event) => {
    event.stopPropagation();
    navigate(`/home/tweet/${retweet._id}`);
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
        {retweet && retweetUser && (
          <RetweetCard
            retweetUser={retweetUser}
            retweet={retweet}
            handleRetweetClick={handleRetweetClick}
          />
        )}
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
