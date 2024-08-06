import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../../styles/navbar.css";
import ProjectDropdown from "../projectcomponent/ProjectDropdown";
import Bourntec from "../../Images/logo_bourntec prabhash.png";

const settings = ["Profile", "Logout"];

const notifications = [
  {
    id: 1,
    message: "A new budget request for $25",
    timestamp: "less than a minute ago",
    status: "Unread"
  },
  {
    id: 2,
    message: "A new budget request for $25",
    timestamp: "11 minutes ago",
    status: ""
  },
  {
    id: 3,
    message: "A new budget request for $25",
    timestamp: "30 minutes ago",
    status: ""
  },
];

function ResponsiveAppBar({ onSidebarToggle, handleLogout, userInfo }) {
  const location = useLocation();
  const hideComponentRoutes = ["/projects", "/detailed-dashboard", "/user-group"];
  const shouldHideComponent = hideComponentRoutes.includes(location.pathname);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    profilePicture: "",
  });
  const [storedUserInfo, setStoredUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setStoredUserInfo(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (storedUserInfo && storedUserInfo.email) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/todo/users/");
          const users = response.data;
          console.log("API Response:", response.data);
          const user = users.find((u) => u.email === storedUserInfo.email);
          console.log("User Found:", user);
          if (user) {
            setUserData({
              username: user.username,
              email: user.email,
              role: user.userprofile.role,
              profilePicture: user.userprofile.profile_photo,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [storedUserInfo]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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

  const handleOpenNotifications = () => {
    setOpenNotifications(true);
  };

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ background: "white", color: "#007BFF" }}>
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
            <img
              src={Bourntec}
              alt="Bourntec Logo"
              style={{ width: '120px', marginLeft:'7px', paddingRight:'7px'}}
            />
          </Tooltip>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
            }}
          >
            <p style={{ color: "orangered", marginRight: "5px" }}>|</p>{" "}
            ToDo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {settings.map((setting) => (
                <MenuItem sx={{position:'static !important'}}
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Profile") {
                      handleOpenProfile();
                    } else if (setting === "Logout") {
                      handleLogout();
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
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
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            To-Do-Application
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {!shouldHideComponent && (
            <>
              <IconButton color="inherit" onClick={handleOpenNotifications} sx={{ ml: 2, position: 'relative' }}>
                <NotificationsIcon />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                >
                  1
                </Box>
              </IconButton>
              <a href="/projects">
                <ProjectDropdown />
              </a>
            </>
          )}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={userData.username} src={userData.profilePicture} />
            </IconButton>
            <Box sx={{ ml: 1, mr: 1 }}>
              <Typography variant="subtitle1">
                {userData.username}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'gray' }}>
                {userData.email}
              </Typography>
            </Box>
          

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenUserMenu}
                size="small"
                sx={{ ml: 0.5 }}
                aria-controls={Boolean(anchorElUser) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  if (setting === "Profile") {
                    handleOpenProfile();
                  } else if (setting === "Logout") {
                    handleLogout();
                  }
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog 
        className="profile-manage"
        open={openProfile}
        onClose={handleCloseProfile}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "100%",
            display: "flex",
            position: "static",
            left: "50%",
          },
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          {storedUserInfo && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Avatar
                  alt={storedUserInfo.username}
                  src={userData.profilePicture}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                value={storedUserInfo.username}
                InputProps={{ readOnly: true }}
              />
              <br />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={storedUserInfo.email}
                InputProps={{ readOnly: true }}
              />
              <br />
              <TextField
                margin="dense"
                id="role"
                label="Role"
                type="text"
                fullWidth
                variant="standard"
                value={storedUserInfo.role}
                InputProps={{ readOnly: true }}
              />
              <br />
              <TextField
                margin="dense"
                id="designation"
                label="designation"
                type="text"
                fullWidth
                variant="standard"
                value={storedUserInfo.designation}
                InputProps={{ readOnly: true }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog 
        open={openNotifications} 
        onClose={handleCloseNotifications} 
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "100%",
            display: "flex",
            position: "static",
            left: "50%",
          },
        }}
      >
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications.map((notification) => (
            <Box key={notification.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
              <Typography variant="body1">{notification.message}</Typography>
              <div className="btn-class">
              <Button className="approve-btn" variant="contained" color="primary" sx={{ mr: 1 }}>Approve</Button>
              <Button className="approve-btn"  variant="contained" color="secondary" sx={{ mr: 1 }}>Reject</Button>
              <Button className="view-btn"  variant="outlined">View</Button>
              </div>
              <div className="details">
              <Typography variant="caption" display="block">{notification.timestamp}</Typography>
              <Typography variant="caption" color="primary">{notification.status}</Typography>
              </div>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifications}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default ResponsiveAppBar;