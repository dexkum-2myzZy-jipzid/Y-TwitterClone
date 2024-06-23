import React, { useState } from 'react';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/SideMenu';
import { useHomeContext } from '../pages/Home';
import { redirect, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const initialMenuItems = [
  { name: 'Home', icon: <HomeIcon style={{ fontSize: 36 }} />, active: true },
  {
    name: 'Profile',
    icon: <PersonIcon style={{ fontSize: 36 }} />,
    active: false,
  },
];

const SideMenu = ({ togglePopover }) => {
  const { user } = useHomeContext();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const handleItemClick = (itemName) => {
    // Update the active state of menu items
    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      active: item.name === itemName,
    }));
    setMenuItems(updatedMenuItems);

    if (itemName == 'Profile') {
      navigate(`/home/profile/${user._id}`);
    } else {
      navigate('/home');
    }
  };

  // handle menu events
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await customFetch.delete('/session');
      toast.success('Logout successful');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Logo />
      <div className="side-menu-content">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`side-menu-item ${item.active ? 'active' : ''}`}
            onClick={() => handleItemClick(item.name)}>
            <div className="icon">{item.icon}</div>
            <span className="name">{item.name}</span>
          </div>
        ))}
      </div>
      <button className="tweet-btn" onClick={togglePopover}>
        Tweet
      </button>
      <IconButton
        aria-label="tweet"
        className="tweet-icon-btn"
        onClick={togglePopover}>
        <CreateIcon style={{ fontSize: 24 }} />
      </IconButton>
      <div id="basic-button" className="author-info" onClick={handleClick}>
        <Avatar
          className="author-avatar"
          src={user.avatar}
          alt="avatar"
          sx={{ width: 48, height: 48 }}
        />
        <div className="author-details">
          <div className="author-display-name">{user.displayname}</div>
          <div className="author-username">{user.username}</div>
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default SideMenu;
