import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Modal.css";
import axios from "axios";

const Modal = ({ showModal, handleClose, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Not-Start");
  const [assignedTo, setAssignedTo] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [techStack, setTechStack] = useState([]);
  const [autoAssign, setAutoAssign] = useState(false);

  const options = [
    { value: "John", label: "John" },
    { value: "Alice", label: "Alice" },
    { value: "Bob", label: "Bob" },
    { value: "admin", label: "admin" },
    { value: "niyaz.noor", label: "niyaz.noor" },
  ];

  const techStackOptions = [
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue", label: "Vue" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
  ];

  const getAllProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/projects/");
      const projects = response.data;
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    if (assignedTo.length === 0) {
      setAutoAssign(false);
    }
  }, [assignedTo]);

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };

  const projectOptions = projects.map((project) => ({
    value: project.projname,
    label: project.projname,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !taskName ||
      !taskStatus ||
      assignedTo.length === 0 ||
      !selectedProject ||
      techStack.length === 0
    ) {
      console.error(
        "Task Name, Task Status, Assigned To, Project, and Tech Stack are required."
      );
      return;
    }

    const assignedToNames = assignedTo.map((person) => person.label);
    const projectName = selectedProject.label;
    const techStackNames = techStack.map((tech) => tech.label);

    const task = {
      taskName,
      taskStatus,
      assignedTo: assignedToNames,
      project: projectName,
      techStack: techStackNames,
    };

    try {
      let res = await fetch("http://127.0.0.1:8000/todo/api/create-task/", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Task added:", result);
      addTask(result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

    handleClose();
  };

  const handleAutoAssign = () => {
    const randomUser = options[Math.floor(Math.random() * options.length)];
    setAssignedTo([randomUser]);
    setAutoAssign(true);
  };

  const handleClearAssignedTo = () => {
    setAssignedTo([]);
    setAutoAssign(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay-card">
      <div className="modal-card">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Task Status:</label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="Not-Start">Not Start</option>
              <option value="On-going">On-going</option>
              <option value="Done">Done</option>
              <option value="Staging">Staging</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assigned To:</label>
            <Select
              isMulti
              options={options}
              value={assignedTo}
              onChange={setAssignedTo}
              isDisabled={autoAssign}
            />
            <button
              type="button"
              className="auto-assign-button"
              onClick={handleAutoAssign}
            >
              Auto-Assign
            </button>
            {autoAssign && (
              <button
                type="button"
                className="clear-assigned-button"
                onClick={handleClearAssignedTo}
              >
                Clear Assigned User
              </button>
            )}
          </div>
          <div className="form-group">
            <label>Projects:</label>
            <Select
              options={projectOptions}
              value={selectedProject}
              onChange={handleProjectChange}
            />
          </div>
          <div className="form-group">
            <label>Tech Stack:</label>
            <Select
              isMulti
              options={techStackOptions}
              value={techStack}
              onChange={setTechStack}
            />
          </div>
          <button type="submit">Add Task</button>
          <button className="cancel" type="button" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
