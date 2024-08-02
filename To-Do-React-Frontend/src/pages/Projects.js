import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import "../styles/Projects.css";

const ProjectList = (userInfo) => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [taskStatus, setTaskStatus] = useState("Not-Start");
  const [newProject, setNewProject] = useState({
    name: "",
    deadline: "",
    team: [],
    status: "In Pipeline",
    manager: null,
  });
  const [teamOptions, setTeamOptions] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

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

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/users/");
      const users = response.data;
      console.log("Users:", users);
      const userOptions = users.map((user) => ({
        value: user.username,
        label: user.username,
        designation: user.userprofile.designation,
      }));
      const filteredTeamOptions = userOptions.filter(
        (user) =>
          user.designation === "User" || user.designation === "Team Lead"
      );
      setTeamOptions(filteredTeamOptions);
      const filteredManagerOptions = userOptions.filter(
        (user) => user.designation === "Manager"
      );
      setManagerOptions(filteredManagerOptions);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (selectedOption) => {
    setNewProject((prev) => ({ ...prev, manager: selectedOption }));
  };

  const getStatusOptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/cardname/");
      console.log("Status Options:", response.data);
      const statusOptions = response.data.map((status) => ({
        value: status.card_name,
        label: status.card_name,
      }));
      setStatusOptions(statusOptions);
    } catch (error) {
      console.error("Error fetching task statuses:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    getAllUsers();
    getStatusOptions();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/todo/api/projects/"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        name: newProject.name,
        deadline: newProject.deadline,
        team: newProject.team.map((member) => member.value),
        status: taskStatus,
        manager: newProject.manager ? newProject.manager.value : null,
      };
      console.log("Data to Send:", dataToSend);

      if (editProject) {
        console.log(
          `PUT to http://127.0.0.1:8000/todo/api/projects/${editProject.id}/update/`
        );
        await axios.put(
          `http://127.0.0.1:8000/todo/api/projects/${editProject.id}/update/`,
          dataToSend
        );
        setShowEditModal(false);
      } else {
        console.log("POST to http://127.0.0.1:8000/todo/api/create_project/");
        await axios.post(
          "http://127.0.0.1:8000/todo/api/create_project/",
          dataToSend
        );
        setShowForm(false);
      }

      setNewProject({
        name: "",
        deadline: "",
        team: [],
        status: "In Pipeline",
        manager: null,
      });
      setTaskStatus("In Pipeline");
      fetchProjects();
    } catch (error) {
      console.error("Error saving/updating project:", error);
      console.error("Response data:", error.response.data);
    }
  };

  const handleTeamChange = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions);
    setNewProject((prev) => ({
      ...prev,
      team: selectedOptions || [],
    }));
  };

  const handleEditClick = (project) => {
    setEditProject(project);

    const formattedTeam = convertTeamOptions(
      project.team.map((member) => ({ value: member, label: member }))
    );

    setNewProject({
      name: project.name,
      deadline: project.deadline,
      team: formattedTeam,
      status: project.status,
      manager: project.manager
        ? { value: project.manager, label: project.manager }
        : null,
    });

    setShowEditModal(true);
  };

  const convertTeamOptions = (rawData) => {
    if (
      !Array.isArray(rawData) ||
      rawData.some((item) => !item.value || !item.label)
    ) {
      console.error("Invalid team data format", rawData);
      return [];
    }

    const formattedOptions = rawData.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    return formattedOptions;
  };

  const handleDeleteClick = (id) => {
    setProjectIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/todo/api/projects/${projectIdToDelete}/delete/`
      );
      setProjects(
        projects.filter((project) => project.id !== projectIdToDelete)
      );
      setProjectIdToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const cancelDelete = () => {
    setProjectIdToDelete(null);
    setShowDeleteModal(false);
  };

  const hasPermission = () => {
    return (
      userInfo.userInfo.designation === "Super User" ||
      userInfo.userInfo.designation === "Manager"
    );
  };

  const handleStatusChange = (selectedOption) => {
    setTaskStatus(selectedOption ? selectedOption.value : "");
  };

  const handleClick = () => {
    if (hasPermission()) {
      setShowForm(true);
      setShowFormModal(true);
      setShowMessage(false);
    } else {
      setShowMessage(true);
      setShowMessageModal(true);
    }
  };

  return (
    <div className="project-list">
      <div className="pos-fix">
        <h1>Project List</h1>
        <button onClick={handleClick}>+ Add Project</button>
      </div>
      {showMessageModal && (
        <div className="modal-add-project">
          <div className="modal-content-add-project">
            <p>You do not have permission to add a project.</p>
            <button onClick={() => setShowMessageModal(false)}>Close</button>
          </div>
        </div>
      )}
      <Modal
        isOpen={showForm || showEditModal}
        onRequestClose={() => {
          setShowForm(false);
          setShowEditModal(false);
          setEditProject(null);
        }}
        contentLabel={showEditModal ? "Edit Project" : "Add Project"}
        className="modal"
        overlayClassName="overlay-one"
      >
        <form onSubmit={handleSubmit}>
          <h2>{showEditModal ? "Edit Project" : "Add Project"}</h2>
          <input
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Project Name"
            required
          />
          <h4>Deadline</h4>
          <input
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleInputChange}
            required
          />
          <Select
            name="manager"
            value={newProject.manager}
            options={managerOptions}
            onChange={handleManagerChange}
            placeholder="Select Manager"
            required
          />
          <Select
            isMulti
            className="manager-project"
            name="team"
            value={newProject.team}
            options={teamOptions}
            onChange={handleTeamChange}
            placeholder="Select Team Members"
            required
          />
          <Select
            className="status-project"
            placeholder="Select Project Status"
            options={statusOptions}
            value={statusOptions.find((option) => option.value === taskStatus)}
            onChange={handleStatusChange}
          />
          <div class="update-add-button-project">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setShowEditModal(false);
                setEditProject(null);
              }}
            >
              Cancel
            </button>
            <button type="submit">{showEditModal ? "Update" : "Add"}</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
        className="add-modal"
        overlayClassName="overlay-one"
      >
        <div className="delete_popup">
          <h2>Are you sure you want to delete this project?</h2>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      </Modal>

      <div className="project-wrap">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-info">
              <h2>{project.name}</h2>
              <span
                className={`status ${project.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {project.status}
              </span>
            </div>
            <p>Deadline: {project.deadline}</p>
            {hasPermission() && (
              <div className="action-buttons">
                <button
                  className="project-icon"
                  onClick={() => handleEditClick(project)}
                >
                  <FaEdit />
                </button>
                <button
                  className="project-icon red"
                  onClick={() => handleDeleteClick(project.id)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
