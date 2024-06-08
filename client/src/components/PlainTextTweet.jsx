import React from 'react';
import PropTypes from 'prop-types';
import Interactions from './Interactions';
import UserInfo from './UserInfo';
import Wrapper from '../assets/wrappers/PlainTextTweet';
import { Avatar } from '@mui/material';

const PlainTextTweet = ({
  id,
  profileImage,
  name,
  username,
  date,
  content,
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
      <Interactions
        replies={replies}
        retweets={retweets}
        likes={likes}
        views={views}
      />
    </div>
  </Wrapper>
);

export default PlainTextTweet;