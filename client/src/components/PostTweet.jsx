import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { useHomeContext } from '../pages/Home';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Form, useActionData } from 'react-router-dom';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .post-tweet {
    border: 1px solid #e1e8ed;
    border-radius: 16px;
    padding: 12px;
    max-width: 600px;
    margin: 2rem auto;
    background-color: white;
  }

  .post-tweet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #e1e8ed;
  }

  .post-tweet-close {
    cursor: pointer;
  }

  .post-tweet-body {
    display: flex;
    flex: row;
    margin-top: 0.5rem;
    .tweet-textarea {
      width: 100%;
      height: 100px;
      border: none;
      padding: 10px;
      font-size: 16px;
      resize: none;
      outline: none;
    }
  }

  .post-tweet-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid #e1e8ed;
    .post-btn {
      background-color: #1da1f2;
      color: white;
      padding: 0.75rem 1.25rem;
      border: none;
      border-radius: 1.25rem;
      cursor: pointer;
      font-weight: bold;
      opacity: 0.6;
    }

    .post-btn:enabled {
      opacity: 1;
    }

    .post-btn:disabled {
      cursor: not-allowed;
    }
  }
`;

function PostTweet({ togglePopover }) {
  const { user } = useHomeContext();
  const [tweet, setTweet] = useState('');

  const handleTweetChange = (e) => setTweet(e.target.value);

  async function handleSubmit() {
    try {
      const response = await customFetch.post('/tweets', { text: tweet });
      console.log(response);
      setTweet('');
    } catch (error) {
      toast.error(error.error);
    } finally {
      togglePopover();
    }
  }

  const handleClosed = () => {
    togglePopover();
  };

  return (
    <Wrapper>
      <div className="post-tweet">
        <div className="post-tweet-header">
          <CloseIcon className="post-tweet-close" onClick={handleClosed} />
        </div>
        <div className="post-tweet-body">
          <Avatar
            className="avatar"
            src={user.avatar}
            alt="avatar"
            sx={{ width: 48, height: 48 }}
          />
          <textarea
            value={tweet}
            onChange={handleTweetChange}
            placeholder="What is happening?!"
            className="tweet-textarea"
          />
        </div>
        <div className="post-tweet-footer">
          <button
            className="post-btn"
            onClick={handleSubmit}
            disabled={!tweet.trim()}>
            Post
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default PostTweet;
