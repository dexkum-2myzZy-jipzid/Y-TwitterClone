import React from 'react';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Bookmark as BookmarkIcon,
  List as ListIcon,
  Person as PersonIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/SideMenu';

const sideMenuItems = [
  { name: 'Home', icon: <HomeIcon style={{ fontSize: 24 }} />, active: true },
  { name: 'Explore', icon: <ExploreIcon style={{ fontSize: 24 }} /> },
  {
    name: 'Notifications',
    icon: <NotificationsIcon style={{ fontSize: 24 }} />,
  },
  { name: 'Messages', icon: <MailIcon style={{ fontSize: 24 }} /> },
  { name: 'Bookmarks', icon: <BookmarkIcon style={{ fontSize: 24 }} /> },
  { name: 'Lists', icon: <ListIcon style={{ fontSize: 24 }} /> },
  { name: 'Profile', icon: <PersonIcon style={{ fontSize: 24 }} /> },
  { name: 'More', icon: <MoreHorizIcon style={{ fontSize: 24 }} /> },
];

const SideMenu = ({ togglePopover }) => {
  return (
    <Wrapper>
      <div className="side-menu-item">
        <div className="logo">
          <Logo />
        </div>
      </div>
      {sideMenuItems.map((item, index) => (
        <div
          key={index}
          className={`side-menu-item ${item.active ? 'active' : ''}`}>
          <div className="icon">{item.icon}</div>
          {item.name}
        </div>
      ))}
      <button className="tweet-btn" onClick={togglePopover}>
        Tweet
      </button>
      <div className="profile">
        <img
          className="avatar"
          src="https://via.placeholder.com/40"
          alt="Profile"
        />
        <div className="username">
          <div className="name">Jerome Bell</div>
          <div className="handle">@afonsoinocente</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SideMenu;
