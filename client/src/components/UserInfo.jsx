import React from 'react';
import Wrapper from '../assets/wrappers/UserInfo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const UserInfo = ({ name, username, date }) => {
  const now = dayjs();
  const tweetDate = dayjs(date);
  const diffDays = now.diff(tweetDate, 'day');
  const displayDate =
    diffDays > 7 ? tweetDate.format('MMM D') : tweetDate.fromNow();

  return (
    <Wrapper>
      <div className="name">{name}</div>
      <div className="username">
        {username} · {displayDate}
      </div>
    </Wrapper>
  );
};

export default UserInfo;
