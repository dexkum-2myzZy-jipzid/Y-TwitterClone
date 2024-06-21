import { useHomeContext } from './Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Outlet, useNavigate } from 'react-router-dom';
import DateManager from '../utils/dateManager';
import { Tab, Tabs, Box } from '@mui/material';
import { useState } from 'react';
import Banner from '../assets/images/profile-banner.jpg';
import Wrapper from '../assets/wrappers/Profile';

const Profile = () => {
  const { user } = useHomeContext();

  const [value, setValue] = useState(0);
  const tabLabels = ['Posts', 'Replies', 'Likes'];
  const navigate = useNavigate();

  const valueToRoute = {
    0: '',
    1: '/home/profile/replies',
    2: '/home/profile/likes',
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const route = valueToRoute[newValue];
    if (route !== undefined) {
      navigate(route);
    }
  };

  return (
    <Wrapper>
      <div className="profile-app-bar">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <strong className="profile-app-bar-name">{user.displayname}</strong>
      </div>
      <div className="profile-header">
        <img src={Banner} className="banner"></img>
        <img
          src={user.avatar}
          alt="Profile Avatar"
          className="profile-avatar"
        />
        <strong className="profile-displayname">{user.displayname}</strong>
        <span className="profile-username">{user.username}</span>
        <div className="profile-joined-date">
          <CalendarMonthIcon className="calendar-month-icon" />
          <span className="join-date">
            {DateManager.formatJoinDate(user.createdAt)}
          </span>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>
      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Profile;
