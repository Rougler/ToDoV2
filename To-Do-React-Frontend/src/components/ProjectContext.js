import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [managerNames, setManagerNames] = useState({});

  return (
    <ProjectContext.Provider value={{ tabs, setTabs, selectedTab, setSelectedTab, managerNames, setManagerNames }}>
      {children}
    </ProjectContext.Provider>
  );
};
