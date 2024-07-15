import React, { useState } from 'react';
import './UserGroup.css';

const initialUsers = [
    {
        initials: 'SS',
        name: 'Swatishee Sahoo',
        role: 'UI/UX Designer',
        techStack: ['React', 'HTML', 'CSS', 'JS', 'Figma'],
        assigned: 'user',
    },
    {
        initials: 'SU',
        name: 'Sk Sahil Ullah',
        role: 'Cloud Developer',
        techStack: ['AWS', 'OCI', 'HTML', 'CSS'],
        assigned: 'user',
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
        assigned: 'user',
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
        const initials = newUser.name
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('');
        setUsers([...users, { ...newUser, initials, techStack: newUser.techStack.split(',').map(tech => tech.trim()) }]);
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
                            <select name="role" value={newUser.role} onChange={handleChange}>
                                <option value="">Select a Role</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Backend developer">Backend Developer</option>
                                <option value="Full Stack developer">Full Stack Developer</option>
                                <option value="Cloud Engineer">Cloud Engineer</option>
                            </select>
                        </label>

                        <label>
                            Tech Stack (comma-separated):
                            <input type="text" name="techStack" value={newUser.techStack} onChange={handleChange} />
                        </label>
                        <label>
  Designation:
  <select name="assigned" value={newUser.assigned} onChange={handleChange}>
    <option value="">Select a designation</option>
    <option value="User">User</option>
    <option value="Project Manager">Project Manager</option>
  </select>
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


// import React, { useState } from 'react';
// import './UserGroup.css';
// import axios from 'axios';

// const UserGroup = () => {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newUser, setNewUser] = useState({
//     initials: '',
//     name: '',
//     role: '',
//     techStack: '',
//     assigned: '',
//     password: '',
//   });

//   const handleAddUser = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = async () => {
//     const initials = newUser.name
//       .split(' ')
//       .map(word => word[0].toUpperCase())
//       .join('');
//     const techStack = newUser.techStack.split(',').map(tech => tech.trim());

//     const newUserData = {
//       initials,
//       name: newUser.name,
//       role: newUser.role,
//       techStack,
//       assigned: newUser.assigned,
//       password: newUser.password,
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/api/users', newUserData);
//       setUsers([...users, response.data]);
//       setIsModalOpen(false);
//       setNewUser({
//         initials: '',
//         name: '',
//         role: '',
//         techStack: '',
//         assigned: '',
//         password: '',
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleRemoveUser = async (index) => {
//     const userId = users[index]._id;
//     try {
//       await axios.delete(`http://localhost:8000/api/users/${userId}`);
//       setUsers(users.filter((_, i) => i !== index));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="user-group">
//         <div className="header">
//             <h2>USERS</h2>
//             <button className='usergrp' onClick={handleAddUser}>+ Add users</button>
//         </div>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Persons</th>
//                     <th>Tech Stack</th>
//                     <th>Designation</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map((user, index) => (
//                     <tr key={index}>
//                         <td>
//                             <div className="person">
//                                 <span className="initials">{user.initials}</span>
//                                 <div className="info">
//                                     <span className="name">{user.name}</span>
//                                     <span className="role">{user.role}</span>
//                                 </div>
//                             </div>
//                         </td>
//                         <td>
//                             <div className="tech-stack">
//                                 {user.techStack.map((tech, i) => (
//                                     <span key={i} className="tech">{tech}</span>
//                                 ))}
//                             </div>
//                         </td>
//                         <td>{user.assigned}</td>
//                         <td>
//                             <button className='usergrp' onClick={() => handleRemoveUser(index)}>Remove</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//         {isModalOpen && (
//             <div className="modal">
//                 <div className="modal-content">
//                     <h2>Add User</h2>
//                     <label>
//                         Person Name:
//                         <input type="text" name="name" value={newUser.name} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Role:
//                         <select name="role" value={newUser.role} onChange={handleChange}>
//                             <option value="">Select a Role</option>
//                             <option value="UI/UX">UI/UX</option>
//                             <option value="Backend developer">Backend Developer</option>
//                             <option value="Full Stack developer">Full Stack Developer</option>
//                             <option value="Cloud Engineer">Cloud Engineer</option>
//                         </select>
//                     </label>

//                     <label>
//                         Tech Stack (comma-separated):
//                         <input type="text" name="techStack" value={newUser.techStack} onChange={handleChange} />
//                     </label>
//                     <label>
//                         Designation:
//                         <select name="assigned" value={newUser.assigned} onChange={handleChange}>
//                             <option value="">Select a designation</option>
//                             <option value="User">User</option>
//                             <option value="Project Manager">Project Manager</option>
//                         </select>
//                     </label>


//                     <label>
//                         Password:
//                         <input type="password" name="password" value={newUser.password} onChange={handleChange} />
//                     </label>
//                     <div className="modal-actions">
//                         <button className='usergrp' onClick={() => setIsModalOpen(false)}>Cancel</button>
//                         <button className='usergrp' onClick={handleSaveUser}>Save</button>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </div>
// );
// };

// export default UserGroup;
