import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import './Projects.css';

// Utility function to generate initials
const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
};

const ProjectList = () => {
    const [projects, setProjects] = useState([
        {
            name: "Website Redesign",
            deadline: "2023-12-01",
            team: "Alice Bob Charlie",
            status: "In Progress",
            techStack: [{ value: "React", label: "React" }]
        },
        {
            name: "Mobile App Launch",
            deadline: "2024-01-15",
            team: "Dave Eva Frank",
            status: "In Progress",
            techStack: [{ value: "Angular", label: "Angular" }]
        },
        {
            name: "SEO Optimization",
            deadline: "2023-10-30",
            team: "Gina Hank Irene",
            status: "Pending",
            techStack: [{ value: "Vue", label: "Vue" }]
        },
        {
            name: "Backend Upgrade",
            deadline: "2023-11-20",
            team: "Jack Kim Leo",
            status: "Completed",
            techStack: [{ value: "Node.js", label: "Node.js" }]
        }
    ]);

    const techStackOptions = [
        { value: "React", label: "React" },
        { value: "Angular", label: "Angular" },
        { value: "Vue", label: "Vue" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
    ];

    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        deadline: '',
        team: '',
        status: 'Pending',
        techStack: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleTechStackChange = (selectedOptions) => {
        setNewProject(prev => ({ ...prev, techStack: selectedOptions }));
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
        setNewProject({ name: '', deadline: '', team: '', status: 'Pending', techStack: [] });
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setNewProject(projects[index]);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        setProjectToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        const updatedProjects = projects.filter((_, i) => i !== projectToDelete);
        setProjects(updatedProjects);
        setShowDeleteModal(false);
        setProjectToDelete(null);
    };

    return (
        <div className="project-list">
            <div className='pos-fix'>
                <h1>Project List</h1>
                <button onClick={() => setShowForm(true)}>+ Add Project</button>
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
                    <Select
                        isMulti
                        name="techStack"
                        value={newProject.techStack}
                        options={techStackOptions}
                        onChange={handleTechStackChange}
                        placeholder="Select Tech Stack"
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

            <Modal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                contentLabel="Confirm Delete"
                className="add-modal"
                overlayClassName="overlay"
            >
                <div className='delete_popup'>
                    <h2>Are you sure you want to delete this project?</h2>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={() => setShowDeleteModal(false)}>No</button>
                </div>
            </Modal>

            <div className="project-wrap">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-info">
                            <h2>{project.name}</h2>
                            <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                                {project.status}
                            </span>
                        </div>
                        <p>Deadline: {project.deadline}</p>
                        <div className="tech-stack-project">
                            <p>Tech Stack: {project.techStack.map(tech => tech.label).join(", ")}</p>
                        </div>
                        <div className='team-box'>
                            <div className="team-members">
                                {project.team.split(' ').map((member, i) => (
                                    <div key={i} className="team-member-circle">
                                        {getInitials(member)}
                                    </div>
                                ))}
                            </div>
                            <div className="project-actions">
                                <button className='project-icon' onClick={() => handleEdit(index)}><FaEdit /></button>
                                <button className='project-icon red' onClick={() => handleDelete(index)}><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
