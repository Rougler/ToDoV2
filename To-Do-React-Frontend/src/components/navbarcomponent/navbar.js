// import * as React from "react";
// import { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import "./navbar.css";
// import ProjectDropdown from "./ProjectDropdown";

// const pages = [];
// const settings = ["Profile", "Logout"];

// function ResponsiveAppBar({ onSidebarToggle, handleLogout, userInfo }) {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [openProfile, setOpenProfile] = useState(false);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     role: "",
//     profilePicture: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/todo/users/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched users:", data);
//         setUsers(data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//     // fetchUserProfile();
//   }, []);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleOpenProfile = () => {
//     setOpenProfile(true);
//   };

//   const handleCloseProfile = () => {
//     setOpenProfile(false);
//   };

//   // const fetchUserProfile = async () => {
//   //   try {
//   //     const response = await axios.get("/api/user/profile");
//   //     setUserData(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching user profile:", error);
//   //   }
//   // };

//   const [selectedTab, setSelectedTab] = useState("tab0");
//   const [tabs, setTabs] = useState([]);
//   const [managerNames, setManagerNames] = useState({});

//   const handleProjectChange = (event) => {
//     setSelectedTab(event.target.value);
//   };

//   return (
//     <AppBar position="static">
//       <Container
//         maxWidth="xl"
//         sx={{
//           background: "white",
//           color: "#007BFF",
//           paddingLeft: {
//             xs: "8px",
//             sm: "8px",
//           },
//         }}
//       >
//         <Toolbar disableGutters>
//           <Tooltip>
//             <label className="hamburger">
//               <input type="checkbox" onClick={onSidebarToggle} />
//               <svg viewBox="0 0 32 32">
//                 <path
//                   className="line line-top-bottom"
//                   d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
//                 ></path>
//                 <path className="line" d="M7 16 27 16"></path>
//               </svg>
//             </label>
//           </Tooltip>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#home"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "sans-serif",
//               fontWeight: 700,
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             To-Do-Application
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#Profile"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             To-Do-Application
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "black", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <ProjectDropdown />
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt={userData.username} src={userData.profilePicture} />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem
//                   key={setting}
//                   onClick={() => {
//                     handleCloseUserMenu();
//                     if (setting === "Profile") {
//                       handleOpenProfile();
//                     } else if (setting === "Logout") {
//                       handleLogout();
//                     }
//                   }}
//                 >
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//       <Dialog
//         open={openProfile}
//         onClose={handleCloseProfile}
//         PaperProps={{
//           sx: {
//             width: "500px",
//             maxWidth: "100%",
//           },
//         }}
//       >
//         <DialogTitle>Profile</DialogTitle>
//         <DialogContent>
//           {userInfo ? (
//             <>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 id="name"
//                 label="Username"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.username}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//               <TextField
//                 margin="dense"
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.email}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//               <TextField
//                 margin="dense"
//                 id="role"
//                 label="Role"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.role}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//             </>
//           ) : (
//             <>
//               {/* <TextField
//                 autoFocus
//                 margin="dense"
//                 id="name"
//                 label="Username"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.username}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//               <TextField
//                 margin="dense"
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.email}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//               <TextField
//                 margin="dense"
//                 id="role"
//                 label="Role"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.role}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               /> */}
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

// import React, { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import "../../styles/navbar.css";
// import ProjectDropdown from "../projectcomponent/ProjectDropdown";

// const settings = ["Profile", "Logout"];

// function ResponsiveAppBar({ onSidebarToggle, handleLogout, userInfo }) {
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [openProfile, setOpenProfile] = useState(false);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     role: "",
//     profilePicture: "",
//   });

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleOpenProfile = () => {
//     setOpenProfile(true);
//   };

//   const handleCloseProfile = () => {
//     setOpenProfile(false);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl" sx={{ background: "white", color: "#007BFF" }}>
//         <Toolbar disableGutters>
//           <Tooltip>
//             <label className="hamburger">
//               <input type="checkbox" onClick={onSidebarToggle} />
//               <svg viewBox="0 0 32 32">
//                 <path
//                   className="line line-top-bottom"
//                   d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
//                 ></path>
//                 <path className="line" d="M7 16 27 16"></path>
//               </svg>
//             </label>
//           </Tooltip>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#home"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "sans-serif",
//               fontWeight: 700,
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             To-Do-Application
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {settings.map((setting) => (
//                 <MenuItem
//                   key={setting}
//                   onClick={() => {
//                     handleCloseUserMenu();
//                     if (setting === "Profile") {
//                       handleOpenProfile();
//                     } else if (setting === "Logout") {
//                       handleLogout();
//                     }
//                   }}
//                 >
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#Profile"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             To-Do-Application
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
//           <ProjectDropdown />
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar/>
//                 {/* <Avatar> {userInfo.username[0].toUpperCase()}</Avatar> */}
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{ vertical: "top", horizontal: "right" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem
//                   key={setting}
//                   onClick={() => {
//                     handleCloseUserMenu();
//                     if (setting === "Profile") {
//                       handleOpenProfile();
//                     } else if (setting === "Logout") {
//                       handleLogout();
//                     }
//                   }}
//                 >
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//       <Dialog
//         open={openProfile}
//         onClose={handleCloseProfile}
//         PaperProps={{ sx: { width: "500px", maxWidth: "100%" } }}
//       >
//         <DialogTitle>Profile</DialogTitle>
//         <DialogContent>
//           {userInfo && (
//             <>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 id="name"
//                 label="Username"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.username}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.email}
//                 InputProps={{ readOnly: true }}
//               />
//               <TextField
//                 margin="dense"
//                 id="role"
//                 label="Role"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={userInfo.role}
//                 InputProps={{ readOnly: true }}
//               />
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

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
import axios from "axios";
import "../../styles/navbar.css";
import ProjectDropdown from "../projectcomponent/ProjectDropdown";
import Bourntec from "../../Images/logo_bourntec prabhash.png";

const settings = ["Profile", "Logout"];

function ResponsiveAppBar({ onSidebarToggle, handleLogout, userInfo }) {
  const location = useLocation();
  const hideComponentRoutes = [
    "/projects",
    "/detailed-dashboard",
    "/user-group",
  ];
  const shouldHideComponent = hideComponentRoutes.includes(location.pathname);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
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
              style={{
                height: "60px",
                marginRight: "5px",
                marginLeft: "10px",
              }}
            />
          </Tooltip>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              // mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
            }}
          >
            <p style={{ color: "orangered", marginRight: "5px" }}>||</p>{" "}
            To-Do-Application
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
            <a href="/projects">
              <ProjectDropdown />
            </a>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userData.username} src={userData.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
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
    </AppBar>
  );
}

export default ResponsiveAppBar;
