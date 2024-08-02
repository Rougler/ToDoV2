//-----------------------------------------------

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/navbarcomponent/sidebar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserGroup from "./pages/UserGroup";
import Login from "./pages/login";
import Projects from "./pages/Projects";
import DetailedDashboard from "./pages/DetailedDashboard";
// import { UserProfile } from "./pages/UserProfile";

function ProtectedRoute({ element: Element, isAuthenticated, ...rest }) {
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("userInfo") ? true : false
  );

  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsAuthenticated(true);
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, [location, isAuthenticated]);

  const shouldDisplaySidebar = !["/login"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {shouldDisplaySidebar && (
        <Sidebar
          setIsAuthenticated={setIsAuthenticated}
          userInfo={userInfo}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute element={Home} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={Dashboard}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/user-group"
          element={
            <ProtectedRoute
              element={UserGroup}
              userInfo={userInfo}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              element={Projects}
              userInfo={userInfo}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/detailed-dashboard"
          element={
            <ProtectedRoute
              element={DetailedDashboard}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* <Route
          path="/user-profilepage"
          element={
            <ProtectedRoute
              element={UserProfile}
              isAuthenticated={isAuthenticated}
            />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;

//--------------
