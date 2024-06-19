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
import { useHomeContext } from '../pages/Home';
import AuthorInfo from './AuthorInfo';

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
  const { user } = useHomeContext();

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
      <AuthorInfo user={user} />
    </Wrapper>
  );
};

export default SideMenu;
