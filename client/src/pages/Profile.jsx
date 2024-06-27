import { useHomeContext } from './Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import DateManager from '../utils/dateManager';
import { Tab, Tabs, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Banner from '../assets/images/profile-banner.jpg';
import Wrapper from '../assets/wrappers/Profile';
import { NavigationBar } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { follow, unfollow } from '../services';

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/users/${params.id || ''}`);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
  }
};

const FollowStatus = {
  FOLLOW: 'Follow',
  UNFOLLOW: 'Unfollow',
  NOT_DISPLAY: 'NotDisplay', // Changed to uppercase with underscores
};

const Profile = () => {
  // user is current profile user
  const user = useLoaderData();
  // login user is user login
  const { user: loginUser } = useHomeContext();

  const [isFollowing, setIsFollowing] = useState(FollowStatus.NOT_DISPLAY);
  const [value, setValue] = useState(0);
  const tabLabels = ['Posts', 'Replies', 'Likes'];
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id === loginUser._id) {
      setIsFollowing(FollowStatus.NOT_DISPLAY);
    } else if (loginUser.following.includes(user._id)) {
      setIsFollowing(FollowStatus.UNFOLLOW);
    } else {
      setIsFollowing(FollowStatus.FOLLOW);
    }
  }, [user._id, loginUser._id]);

  const valueToRoute = {
    0: '',
    1: `/home/profile/${user._id}/replies`,
    2: `/home/profile/${user._id}/likes`,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const route = valueToRoute[newValue];
    if (route !== undefined) {
      navigate(route);
    }
  };

  const handleBackClick = () => navigate('/home');

  const toggleFollow = async () => {
    if (isFollowing === FollowStatus.FOLLOW) {
      const response = await follow(user._id);
      console.log(response);
      if (response.success) {
        setIsFollowing(FollowStatus.UNFOLLOW);
      }
    } else if (isFollowing === FollowStatus.UNFOLLOW) {
      const response = await unfollow(user._id);
      console.log(response);
      if (response.success) {
        setIsFollowing(FollowStatus.FOLLOW);
      }
    }
  };

  return (
    <Wrapper>
      <NavigationBar
        title={user.displayname}
        handleBackClick={handleBackClick}
      />
      <div className="profile-header">
        <img src={Banner} className="banner"></img>
        <div className="profile-avatar-row">
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="profile-avatar"
          />
          {isFollowing !== FollowStatus.NOT_DISPLAY && (
            <button className="profile-follow-btn" onClick={toggleFollow}>
              {isFollowing === FollowStatus.FOLLOW ? 'Follow' : 'Unfollow'}
            </button>
          )}
        </div>
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
