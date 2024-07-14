import React, { useState } from 'react';
import './UserGroup.css';

const initialUsers = [
    {
        initials: 'SS',
        name: 'Swatishee Sahoo',
        role: 'UI/UX Designer',
        techStack: ['React', 'HTML', 'CSS', 'JS', 'Figma'],
        assigned: 'Admin',
    },
    {
        initials: 'SU',
        name: 'Sk Sahil Ullah',
        role: 'Cloud Developer',
        techStack: ['AWS', 'OCI', 'HTML', 'CSS'],
        assigned: 'Admin',
    },
    {
        initials: 'NS',
        name: 'Nitesh Saw',
        role: 'Cloud Developer',
        techStack: ['React', 'HTML', 'CSS', 'Figma'],
        assigned: 'User',
    },
    {
        initials: 'SK',
        name: 'Soumya Kanungo',
        role: 'Cloud Developer',
        techStack: ['JS', 'HTML', 'CSS'],
        assigned: 'Admin',
    },
    {
        initials: 'SR',
        name: 'Subrat Rath',
        role: 'Developer',
        techStack: ['Django', 'HTML', 'CSS'],
        assigned: 'User',
    }
];

const UserGroup = () => {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        initials: '',
        name: '',
        role: '',
        techStack: '',
        assigned: '',
        password: '',
    });

    const handleAddUser = () => {
        setIsModalOpen(true);
    };

    const handleSaveUser = () => {
        setUsers([...users, { ...newUser, techStack: newUser.techStack.split(',').map(tech => tech.trim()) }]);
        setIsModalOpen(false);
        setNewUser({
            initials: '',
            name: '',
            role: '',
            techStack: '',
            assigned: '',
            password: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleRemoveUser = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    return (
        <div className="user-group">
            <div className="header">
                <h2>USERS</h2>
                <button className='usergrp' onClick={handleAddUser}>+ Add users</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Persons</th>
                        <th>Tech Stack</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <div className="person">
                                    <span className="initials">{user.initials}</span>
                                    <div className="info">
                                        <span className="name">{user.name}</span>
                                        <span className="role">{user.role}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="tech-stack">
                                    {user.techStack.map((tech, i) => (
                                        <span key={i} className="tech">{tech}</span>
                                    ))}
                                </div>
                            </td>
                            <td>{user.assigned}</td>
                            <td>
                                <button className='usergrp' onClick={() => handleRemoveUser(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add User</h2>
                        <label>
                            Person Name:
                            <input type="text" name="name" value={newUser.name} onChange={handleChange} />
                        </label>
                        <label>
                            Role:
                            <input type="text" name="role" value={newUser.role} onChange={handleChange} />
                        </label>
                        <label>
                            Tech Stack (comma-separated):
                            <input type="text" name="techStack" value={newUser.techStack} onChange={handleChange} />
                        </label>
                        <label>
                            Designation:
                            <input type="text" name="assigned" value={newUser.assigned} onChange={handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" value={newUser.password} onChange={handleChange} />
                        </label>
                        <div className="modal-actions">
                            <button className='usergrp' onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className='usergrp' onClick={handleSaveUser}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserGroup;
