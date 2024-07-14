import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const pages = [];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar({ onSidebarToggle }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    profilePicture: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile'); // Adjust the endpoint as needed
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip>
            <label className="hamburger">
              <input type="checkbox" onClick={onSidebarToggle} />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </Tooltip>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            To-Do-Application
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#Profile"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            To-Do-Application
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userData.username} src={userData.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Profile') {
                      handleOpenProfile();
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Dialog open={openProfile} onClose={handleCloseProfile}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            View and edit your profile information here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={userData.username}
            disabled
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={userData.email}
            disabled
          />
          <TextField
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            value={userData.role}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        .hamburger {
          cursor: pointer;
          font-size:12px;
          margin: 5px 39px 0px -22px;
        }

        .hamburger input {
          display: none;
        }

        .hamburger svg {
          font-size: 10px;
          height: 3em;
          transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger-item:hover {
          background-color: #22adff;
        }

        .line {
          fill: none;
          stroke: black;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 3;
          transition: stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1),
          stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .line-top-bottom {
          stroke-dasharray: 12 63;
        }

        .hamburger input:checked + svg {
          transform: rotate(-45deg);
        }
        .hamburger input:checked + svg .line {
          stroke: #103c6e;
        }

        .hamburger input:checked + svg .line-top-bottom {
          stroke-dasharray: 20 300;
          stroke-dashoffset: -32.42;
        }
        .hamburger:hover .line {
          stroke: grey;
        }
      `}</style>
    </AppBar>
  );
}

export default ResponsiveAppBar;
