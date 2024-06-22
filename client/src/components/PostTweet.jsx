import { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton } from '@mui/material';
import { useHomeContext } from '../pages/Home';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styled from 'styled-components';

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
    padding: 1rem;

    .tweet-input-container {
      width: 100%;
      margin-left: 10px;
      .tweet-textarea {
        width: 100%;
        height: 100px;
        border: none;
        font-size: 16px;
        resize: none;
        outline: none;
      }

      .tweet-preview-media {
        border: 1px solid #e1e8ed;
        border-radius: 5px;
        max-width: 100%;
      }
    }
  }

  .post-tweet-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid #e1e8ed;

    .visually-hidden-input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .post-button {
      background-color: #1da1f2;
      color: white;
      padding: 0.75rem 1.25rem;
      border: none;
      border-radius: 1.25rem;
      cursor: pointer;
      font-weight: bold;
      opacity: 0.6;
    }

    .post-button:enabled {
      opacity: 1;
    }

    .post-button:disabled {
      cursor: not-allowed;
    }
  }
`;

function PostTweet({ togglePopover }) {
  const { user } = useHomeContext();
  const [tweet, setTweet] = useState('');
  const [imageData, setImageData] = useState({ imgUrl: null, publicId: null });
  const fileInputRef = useRef(null);

  const handleTweetChange = (e) => setTweet(e.target.value);

  async function handleSubmit() {
    try {
      const response = await customFetch.post('/tweets', {
        text: tweet,
        imgUrl: imageData.imgUrl,
        publicId: imageData.publicId,
      });
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file && file.size > 500000) {
      toast.error('Image size too large');
      return null;
    }
    // upload to cloud, return url
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await customFetch.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      const { url, public_id } = response.data;
      if (url && public_id) {
        setImageData({ imgUrl: url, publicId: public_id });
      }
    } catch (error) {
      toast.error('upload failed');
    }
  };

  const handleIconClick = () => {
    // Programmatically click the file input
    fileInputRef.current.click();
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
          <div className="tweet-input-container">
            <textarea
              value={tweet}
              onChange={handleTweetChange}
              placeholder="What is happening?!"
              className="tweet-textarea"
            />
            {imageData.imgUrl && (
              <img className="tweet-preview-media" src={imageData.imgUrl} />
            )}
          </div>
        </div>
        <div className="post-tweet-footer">
          <label htmlFor="upload-image">
            <IconButton aria-label="upload image" onClick={handleIconClick}>
              <AddPhotoAlternateIcon />
            </IconButton>
            <input
              ref={fileInputRef}
              id="upload-image"
              className="visually-hidden-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button
            className="post-button"
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
