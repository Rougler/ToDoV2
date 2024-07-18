import React, { createContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState("tab0");
  const [tabs, setTabs] = useState([]);
  const [managerNames, setManagerNames] = useState({});

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        tabs,
        setTabs,
        managerNames,
        setManagerNames,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
