import React, { useState, useEffect, useContext } from "react";
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
import Button from "@mui/material/Button";
import axios from "axios";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProjectDropdown from "../projectcomponent/ProjectDropdown";
import Bourntec from "../../Images/logo_bourntec prabhash.png";
import ProjectContext from "../projectcomponent/ProjectContext";
import "../../styles/navbar.css";

const settings = ["Profile", "Logout"];

function ResponsiveAppBar({ onSidebarToggle, handleLogout, userInfo }) {
  const location = useLocation();
  const hideComponentRoutes = ["/projects", "/detailed-dashboard", "/user-group"];
  const shouldHideComponent = hideComponentRoutes.includes(location.pathname);

  const { selectedProjectName } = useContext(ProjectContext);

  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
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
          const user = users.find((u) => u.email === storedUserInfo.email);
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskResponse = await axios.get("http://127.0.0.1:8000/todo/tasks/");
        setTasks(taskResponse.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const newNotifications = tasks.map((task) => {
        const assignedTo = task.assignedTo || [];

        return {
          id: task.id,
          message: `${task.taskName} has been assigned to ${assignedTo.join(", ")}.`,
          timestamp: new Date().toLocaleString(),
          status: "Unread",
        };
      });

      setNotifications((prevNotifications) => [
        ...newNotifications,
        ...prevNotifications,
      ]);
    }
  }, [tasks]);

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

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
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
              style={{ width: "120px", marginLeft: "7px", paddingRight: "7px" }}
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
            <p style={{ color: "orangered", marginRight: "5px" }}>|</p> ToDo
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
                <MenuItem
                  sx={{ position: "static !important" }}
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProjectDropdown />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#home"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {selectedProjectName}
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                onClick={handleOpenNotifications}
                sx={{ ml: 2, position: "relative" }}
              >
                <NotificationsIcon />
                {notifications.some(
                  (notification) => notification.status === "Unread"
                ) && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "8px",
                      height: "8px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                    }}
                  ></span>
                )}
              </IconButton>

              <Dialog open={openNotifications} onClose={handleCloseNotifications}>
                <DialogTitle>Notifications</DialogTitle>
                <DialogContent>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications
                        .sort(
                          (a, b) =>
                            new Date(b.timestamp) - new Date(a.timestamp)
                        )
                        .map((notification) => (
                          <li key={notification.id}>
                            <Typography variant="body1">
                              {notification.message}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {notification.timestamp}
                            </Typography>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              onClick={() =>
                                handleDeleteNotification(notification.id)
                              }
                              sx={{ marginTop: 1 }}
                            >
                              Delete
                            </Button>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <Typography variant="body1">
                      No new notifications.
                    </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseNotifications}>Close</Button>
                </DialogActions>
              </Dialog>

              <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, display: "flex", alignItems: "center" }}
                  >
                    <Avatar
                      alt={userData.username}
                      src={userData.profilePicture}
                      sx={{ width: 40, height: 40 }}
                    />
                    <ArrowDropDownIcon />
                  </IconButton>
                </Tooltip>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="body1" color="textPrimary">
                    {userData.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {userData.email}
                  </Typography>
                </Box>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
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
              <Dialog open={openProfile} onClose={handleCloseProfile}>
                <DialogTitle>User Profile</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">
                    <strong>Name:</strong> {userData.username}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {userData.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Role:</strong> {userData.role}
                  </Typography>
                  <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Avatar
                      alt={userData.username}
                      src={userData.profilePicture}
                      sx={{ width: 80, height: 80, margin: "auto" }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseProfile}>Close</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          {shouldHideComponent && (
            <>
              <ProjectDropdown />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#home"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {selectedProjectName} {/* Display selected project name */}
              </Typography>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
