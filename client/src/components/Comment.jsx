import { Avatar } from '@mui/material';
import UserInfo from './UserInfo';
import Interactions from './Interactions';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 1rem;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  cursor: pointer;

  &:hover {
    background-color: var(--grey-100);
  }

  .tweet-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tweet-content {
    p {
      margin: 0.5rem 0;
      font-size: 16px;
      text-align: start;
      line-height: 1.5;
    }
  }

  .tweet-image {
    border: 1px solid #e1e8ed;
    border-radius: 5px;
    max-width: 100%;
  }
`;

const Comment = ({ tweet }) => {
  const user = tweet.createdBy;

  return (
    <Wrapper>
      <Avatar
        className="avatar"
        src={user.avatar}
        alt="avatar"
        sx={{ width: 40, height: 40 }}
      />
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
export default Comment;
