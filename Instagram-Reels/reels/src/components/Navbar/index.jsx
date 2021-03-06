import React, {useState, useContext} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar } from '@mui/material';
import instagramIcon from '../../Assets/instagram.png';


export default function Navbar({currUser}) {
  const {logout} = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const history = useNavigate();
  const handleProfile = () => {
    history(`/profile/${currUser.id}`);
  }

  const handleLogout = () => {
    logout();
  }

  const handleBannerClick = () => {
      history('/');
  }

  const handleExplore = () => {
      const win = window.open('https://www.google.com');
      win.focus();
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}

    >
      <MenuItem onClick={handleProfile}><AccountCircle /><p>&nbsp; &nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon/><p>&nbsp; &nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu

      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <IconButton
              style={{height: '40px', width:'40px'}}
              aria-label="home of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleExplore}
              color="inherit"
            >
              <ExploreIcon sx={{cursor:'pointer', color:"black"}}/>
            </IconButton>
        <p>&nbsp;&nbsp;Explore</p>
      </MenuItem>
      <MenuItem>
      <IconButton
        style={{height: '40px', width:'40px'}}
        aria-label="home of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleBannerClick}
        color="inherit"
      >
        <HomeIcon sx={{cursor:'pointer', color:'black'}}/>
      </IconButton>
      <p>&nbsp;&nbsp;Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle sx={{color: 'black'}}/>  
        </IconButton>
      <p>&nbsp; &nbsp;Profile</p>  
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background:'white'}}>
        <Toolbar>
            <div className='banner' styles={{maxHeight:'1.2rem'}}>
              <img src={instagramIcon} alt='instagram' onClick = {handleBannerClick} style={{cursor:'pointer'}}/>
            </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              style={{height: '40px', width:'40px', marginTop:'4px'}}
              aria-label="home of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleExplore}
              color="inherit"
            >
              <ExploreIcon sx={{cursor:'pointer', color:"black"}}/>
              
            </IconButton>
            <IconButton
             
              aria-label="home of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleBannerClick}
              color="inherit"
            >
              <HomeIcon sx={{cursor:'pointer', color:'black'}}/>
              
            </IconButton>
            <IconButton
               style={{height: '40px', width:'40px',marginTop:'4px'}}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle sx={{color: 'black'}}/> */}
              <Avatar src={currUser.profileUrl}/>
              
            </IconButton>
           
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              style={{color:'black'}}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
