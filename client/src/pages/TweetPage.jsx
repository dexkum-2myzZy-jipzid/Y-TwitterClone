import { Form, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Avatar, Divider, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RetweetCard from '../components/RetweetCard';
import DateManager from '../utils/dateManager';
import Interactions from '../components/Interactions';

const Wrapper = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 1rem;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    span {
      font-size: larger;
      font-weight: bold;
    }
  }

  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;

    .name {
      display: flex;
      flex-direction: column;
      .displayname {
        grid-area: displayname;
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
        margin-left: 1rem;
        margin-top: 4px;
      }
      .username {
        grid-area: username;
        color: #657786;
        font-size: 14px;
        text-align: left;
        margin-left: 1rem;
      }
    }
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

  .timestamp {
    margin: 1rem 0;
    text-align: left;
    font-size: 16px;
    color: var(--grey-500);
  }

  .reply-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0 0 0;

    .reply-section-input {
      width: 100%;
      margin: 0 1rem;
    }

    .reply-button {
      font-size: 14px;
      color: white;
      background-color: #9ad0f5;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin: 0.5rem 0;
    }
  }
`;

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/tweets/${params.id}`);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

export const action = async ({ params }) => {
  console.log(params);
  return '';

  // try {
  //   const response = await customFetch.get(`/tweets/${params.id}`);
  //   return response.data;
  // } catch (error) {
  //   toast.error('You are not authorized to view this page');
  // }
};

const TweetPage = () => {
  // const params = useParams();
  const tweet = useLoaderData();
  console.log(tweet);
  const user = tweet.createdBy;
  const retweet = tweet.retweet;
  const retweetUser = retweet.createdBy;

  const navigate = useNavigate();

  const handleRetweetClick = (event) => {
    event.stopPropagation();
    navigate(`/home/tweet/${retweet._id}`);
  };

  // navigation
  // header
  // text
  // media
  // retweet
  // date
  // interaction
  // reply
  // comments

  return (
    <Wrapper>
      <Form method="post">
        <div className="navigation">
          <ArrowBackIcon />
          <span>Post</span>
        </div>
        <div className="user-info">
          <Avatar
            className="avatar"
            src={user.avatar}
            alt="avatar"
            sx={{ width: 48, height: 48 }}
          />
          <div className="name">
            <div className="displayname">{user.displayname}</div>
            <div className="username">{user.username}</div>
          </div>
        </div>
        <div className="tweet-content">
          <p>{tweet.content}</p>
        </div>
        {tweet.media && <img className="tweet-image" src={tweet.media} />}
        {retweet && (
          <RetweetCard
            retweetUser={retweetUser}
            retweet={retweet}
            handleRetweetClick={handleRetweetClick}
          />
        )}
        <div className="timestamp">
          {DateManager.formatDate(tweet.createdAt)}
        </div>
        <Divider />
        <Interactions
          isBottom={false}
          replies={tweet.replies}
          retweets={tweet.retweets}
          likes={tweet.likes}
          views={tweet.views}
        />
        <Divider />
        <div className="reply-section">
          <Avatar
            className="avatar"
            src={user.avatar}
            alt="avatar"
            sx={{ width: 48, height: 48 }}
          />
          <TextField
            className="reply-section-input"
            id="standard-textarea"
            // label="Multiline Placeholder"
            placeholder="Post you reply"
            multiline
            variant="standard"
            rows={2}
          />
          <button className="reply-button" type="submit">
            Reply
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default TweetPage;
