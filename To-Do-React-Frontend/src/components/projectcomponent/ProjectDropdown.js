import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import ProjectContext from "./ProjectContext";
import "../../styles/ProjectDropdown.css";

const ProjectDropdown = () => {
  const {
    selectedProject,
    setSelectedProject,
    tabs,
    setTabs,
    // setManagerNames,
  } = useContext(ProjectContext);

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/todo/api/projects/"
      );
      const projects = response.data;
      console.log(projects);

      const transformedTabs = projects.map((project, index) => ({
        value: `tab${index}`,
        label: project.name,
      }));

      // const transformedManagers = {};
      // projects.forEach((project, index) => {
      //   transformedManagers[`tab${index}`] = project.assignedTo[0];
      // });

      setTabs(transformedTabs);
      // setManagerNames(transformedManagers);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="project-select-label">Project</InputLabel>
        <Select
          labelId="project-select-label"
          id="project-select"
          value={selectedProject}
          label="Project"
          onChange={handleProjectChange}
        >
          {tabs.map((tab) => (
            <MenuItem key={tab.value} value={tab.value}>
              {tab.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProjectDropdown;
