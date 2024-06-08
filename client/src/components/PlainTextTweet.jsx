import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Interactions from './Interactions';
import UserInfo from './UserInfo';
import Avatar from './Avatar';

const TweetContainer = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 1rem;
  margin: 8px 0;
  max-width: 600px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  p {
    margin: 0.5rem 0;
    font-size: 16px;
    text-align: start;
    line-height: 1.5;
  }
`;

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
  <TweetContainer>
    <Avatar src={profileImage} alt="profile" />
    <Info>
      <UserInfo name={name} username={username} date={date} />
      <Content>
        <p>{content}</p>
      </Content>
      <Interactions
        replies={replies}
        retweets={retweets}
        likes={likes}
        views={views}
      />
    </Info>
  </TweetContainer>
);

PlainTextTweet.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  replies: PropTypes.number.isRequired,
  retweets: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
};

export default PlainTextTweet;
