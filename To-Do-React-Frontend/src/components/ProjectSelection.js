// components/ProjectSelection.js
import React from "react";
import ProjectDropdown from "../components/ProjectDropdown";

const ProjectSelection = ({
  selectedTab,
  handleProjectChange,
  tabs,
  addTab,
  setTabs,
  setManagerNames,
}) => {
  return (
    <div className="MuiBox-root">
      <ProjectDropdown
        value={selectedTab}
        onChange={handleProjectChange}
        tabs={tabs}
        addTab={addTab}
        setTabs={setTabs}
        setManagerNames={setManagerNames}
      />
    </div>
  );
};

export default ProjectSelection;
