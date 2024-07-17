import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function ProjectDropdown({ value, onChange, tabs, setTabs, setManagerNames }) {
  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/projects/");
      const projects = response.data;

      const transformedTabs = projects.map((project, index) => ({
        value: `tab${index}`,
        label: project.projname,
      }));

      const transformedManagers = {};
      projects.forEach((project, index) => {
        transformedManagers[`tab${index}`] = project.assignedTo[0];
      });

      setTabs(transformedTabs);
      setManagerNames(transformedManagers);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="project-select-label">Project</InputLabel>
        <Select
          labelId="project-select-label"
          id="project-select"
          value={value}
          label="Project"
          onChange={onChange}
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
}
