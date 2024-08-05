import React, { useState } from "react";
import "../../styles/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faUsers,
  faUser,
  faProjectDiagram,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import ResponsiveAppBar from "./navbar";

const Sidebar = ({ children, userInfo, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isUserGroupOpen, setIsUserGroupOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openSidebar = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const toggleUserGroup = () => {
    setIsUserGroupOpen(!isUserGroupOpen);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <>
      <div className="navbar-container">
        <ResponsiveAppBar
          onSidebarToggle={toggleSidebar}
          handleLogout={handleLogout}
          userInfo={userInfo}
        />
      </div>
      <div
        className={`sidebar-left ${isOpen ? "open" : "closed"}`}
        onClick={openSidebar}
      >
        <ul>
          <li className="sidebar-item" onClick={toggleProjects}>
            <div className="icon">
              <FontAwesomeIcon icon={faProjectDiagram} />
            </div>
            {isOpen && (
              <>
                <span className="icon-tag">Projects</span>
                <div className="toggle-icon">
                  <FontAwesomeIcon
                    icon={isProjectsOpen ? faChevronUp : faChevronDown}
                  />
                </div>
              </>
            )}
          </li>
          {isProjectsOpen && (
            <>
              <Link
                to="/projects"
                onClick={handleLinkClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  paddingLeft: "20px",
                }}
              >
                <li className="sidebar-sub-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faProjectDiagram} />
                  </div>
                  {isOpen && <span className="icon-tag">Project Lists</span>}
                </li>
              </Link>
              <Link
                to="/"
                onClick={handleLinkClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  paddingLeft: "20px",
                }}
              >
                <li className="sidebar-sub-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                  {isOpen && <span className="icon-tag">Your Boards</span>}
                </li>
              </Link>
              <Link
                to="/dashboard"
                onClick={handleLinkClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  paddingLeft: "20px",
                }}
              >
                <li className="sidebar-sub-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faChartBar} />
                  </div>
                  {isOpen && <span className="icon-tag">Task Pool</span>}
                </li>
              </Link>
            </>
          )}
          <li className="sidebar-item" onClick={toggleUserGroup}>
            <div className="icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            {isOpen && (
              <>
                <span className="icon-tag">Users</span>
                <div className="toggle-icon">
                  <FontAwesomeIcon
                    icon={isUserGroupOpen ? faChevronUp : faChevronDown}
                  />
                </div>
              </>
            )}
          </li>
          {isUserGroupOpen && (
            <>
              <Link
                to="/detailed-dashboard"
                onClick={handleLinkClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  paddingLeft: "20px",
                }}
              >
                <li className="sidebar-sub-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  {isOpen && <span className="icon-tag">User Dashboard</span>}
                </li>
              </Link>
              <Link
                to="/user-group"
                onClick={handleLinkClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  paddingLeft: "20px",
                }}
              >
                <li className="sidebar-sub-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  {isOpen && <span className="icon-tag">User/Group</span>}
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Sidebar;
