import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import RetweetCard from './RetweetCard';
import Wrapper from '../assets/wrappers/CommentedRetweet';
import { useNavigate } from 'react-router-dom';

const CommentedRetweet = ({ tweet }) => {
  const user = tweet.createdBy;
  const retweet = tweet.retweet;
  const retweetUser = retweet.createdBy;

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
        <div className="tweet-content">
          <p>{tweet.content}</p>
        </div>
        {tweet.media && <img className="tweet-image" src={tweet.media} />}
        <RetweetCard
          retweetUser={retweetUser}
          retweet={retweet}
          handleRetweetClick={handleRetweetClick}
        />
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
