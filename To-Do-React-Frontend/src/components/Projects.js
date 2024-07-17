import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './Projects.css';

<<<<<<< HEAD
Modal.setAppElement('#root');
=======
// Utility function to generate initials
const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
};
>>>>>>> 4c4029492afc360c310d67b95a606e6e7a690d7c

const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      name: "Website Redesign",
      deadline: "2023-12-01",
      team: "Alice Bob Charlie",
      status: "In Progress"
    },
    {
      name: "Mobile App Launch",
      deadline: "2024-01-15",
      team: "Dave Eva Frank",
      status: "In Progress"
    },
    {
      name: "SEO Optimization",
      deadline: "2023-10-30",
      team: "Gina Hank Irene",
      status: "Pending"
    },
    {
      name: "Backend Upgrade",
      deadline: "2023-11-20",
      team: "Jack Kim Leo",
      status: "Completed"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    deadline: '',
    team: '',
    status: 'Pending'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedProjects = projects.map((project, index) =>
        index === currentIndex ? newProject : project
      );
      setProjects(updatedProjects);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setProjects(prev => [...prev, newProject]);
    }
    setNewProject({ name: '', deadline: '', team: '', status: 'Pending' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setNewProject(projects[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <div className="project-list">
      <div className='pos-fix'>
        <h1>Project List</h1>
        <button onClick={() => setShowForm(true)}>Add Project</button>
      </div>

      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        contentLabel="Add/Edit Project"
        className="modal"
        overlayClassName="overlay"
      >
        <form onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit Project' : 'Add Project'}</h2>
          <input
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Project Name"
            required
          />
          <input
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleInputChange}
            required
          />
          <input
            name="team"
            value={newProject.team}
            onChange={handleInputChange}
            placeholder="Team Members"
            required
          />
          <select
            name="status"
            value={newProject.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      </Modal>

      <div className="project-wrap">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-info">
              <h2>{project.name}</h2>
              <p>Deadline: {project.deadline}</p>
            </div>
              <div className="team-members">
                {project.team.split(' ').map((member, i) => (
                  <div key={i} className="team-member-circle">
                    {getInitials(member)}
                  </div>
                ))}
              </div>
            <div className="project-actions">
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
              <button className='project-icon' onClick={() => handleEdit(index)}><FaEdit /></button>
              <button className='project-icon' onClick={() => handleDelete(index)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
