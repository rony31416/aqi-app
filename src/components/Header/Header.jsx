import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineMenuOpen, MdLightMode } from "react-icons/md";
import { TbWorldPin } from "react-icons/tb";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { BiSolidBellRing } from "react-icons/bi";
import Logout from '@mui/icons-material/Logout';
import SearchBox from "../SearchBox";
import '../../index.css';
import { CgProfile } from "react-icons/cg";
import { FaShieldAlt } from "react-icons/fa";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          {/* Logo */}
          <div className="col-sm-1 part1">
            <Link to="/" className="logo d-flex align-items-center">
              <img src={logo} alt="Logo" />
              <span>AQI</span>
            </Link>
          </div>

          {/* Search and Menu Toggle */}
          <div className="col-xs-3 d-flex align-items-center part2 pl-5">
            <Button className="rounded-circle mr-3">
              <MdOutlineMenuOpen />
            </Button>
            <SearchBox />
          </div>

          {/* Right-Side Buttons */}
          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">

           <Tooltip title="Theme Change"> 
           <Button className="rounded-circle mr-3">
              <MdLightMode />
            </Button>
            </Tooltip>           

            <Tooltip title="Current AQI">
            <Button className="rounded-circle mr-3">
              <TbWorldPin />
            </Button>
            </Tooltip>

            <Tooltip title="AI ChatBot">
            <Button className="rounded-circle mr-3">
              <RiChatVoiceAiFill />
            </Button>
            </Tooltip>

            <Tooltip title="Notifications">
            <Button className="rounded-circle mr-3">
              <BiSolidBellRing />
            </Button>
            </Tooltip>
            
            {/* Account Menu */}
            <div className="myAccWrapper">
              <Tooltip title="Account settings">
                <Button className="myAcc d-flex align-items-center" onClick={handleMenuOpen}>
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="User Avatar"
                      />
                    </span>
                  </div>
                  <div className="userInfo">
                    <h4>Unknown</h4>
                    <p className="mb-0">@userID</p>
                  </div>
                </Button>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{
                  mt: 1, // Top margin for the menu
                  "& .MuiMenu-paper": {
                    padding: "10px", // Padding for the entire menu
                  },
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                 
                >
                  <ListItemIcon>
                    <CgProfile fontSize="small" />
                  </ListItemIcon>
                  My profile
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                
                >
                  <ListItemIcon>
                    <FaShieldAlt fontSize="small" />
                  </ListItemIcon>
                  Reset Password
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                 
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
