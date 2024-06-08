import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import Wrapper from '../assets/wrappers/Tweet';

const Tweet = ({ tweet }) => {
  const user = tweet.createdBy;
  console.log(user);

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
