import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar.js";
import Dashboard from "./components/Dashboard.js";
import Home from "./components/Home.js";
import UserGroup from "./components/UserGroup.js";
import SignUp from "./components/SignUp.js";
import Login from "./components/login.js";
import Projects from "./components/Projects.js";
// import ResponsiveAppBar from ",/navbar.js";

function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-group" element={<UserGroup />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
