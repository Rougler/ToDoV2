// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "./UserGroup.css";

// const UserGroup = () => {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     email: "",
//     role: "",
//     tech_stack: "",
//     designation: "",
//     password: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/todo/users/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched users:", data);
//         setUsers(data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const generateRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const handleAddUser = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = () => {
//     const payload = {
//       username: newUser.username,
//       password: newUser.password,
//       email: newUser.email,
//       profile: {
//         tech_stack: newUser.tech_stack
//           .split(",")
//           .map((tech) => tech.trim())
//           .join(", "),
//         role: newUser.role,
//         designation: newUser.designation,
//       },
//     };

//     console.log("Payload being sent:", JSON.stringify(payload, null, 2));

//     fetch("http://127.0.0.1:8000/todo/api/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             console.error(`Error Response: ${text}`);
//             throw new Error(
//               `HTTP error! status: ${response.status}, message: ${text}`
//             );
//           });
//         }
//         return response.json();
//       })
//       .then((addedUser) => {
//         setUsers([...users, addedUser]);
//         setIsModalOpen(false);
//         setNewUser({
//           username: "",
//           email: "",
//           role: "",
//           tech_stack: "",
//           designation: "",
//           password: "",
//         });
//       })
//       .catch((error) => console.error("Error adding user:", error));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleRemoveUser = (id) => {
//     fetch(`http://127.0.0.1:8000/todo/userdelete/${id}/`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== id));
//       })
//       .catch((error) => console.error("Error removing user:", error));
//   };

//   return (
//     <div className="user-group">
//       <div className="header">
//         <h2>USERS</h2>
//         <button className="usergrp" onClick={handleAddUser}>
//           + Add Users
//         </button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Persons</th>
//             <th>Tech Stack</th>
//             <th>Designation</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className="person">
//                   <span
//                     className="initials"
//                     style={{ backgroundColor: generateRandomColor() }}
//                   >
//                     {user.username ? user.username[0].toUpperCase() : "?"}
//                   </span>
//                   <div className="info">
//                     <span className="name">{user.username}</span>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div className="tech-stack">
//                   {(user.userprofile?.tech_stack || "")
//                     .split(",")
//                     .map((tech, i) => (
//                       <span key={i} className="tech">
//                         {tech}
//                       </span>
//                     ))}
//                 </div>
//               </td>
//               <td>{user.userprofile?.designation}</td>
//               <td>
//                 <button
//                   className="usergrp"
//                   onClick={() => handleRemoveUser(user.id)}
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add User</h2>
//             <label>
//               Username:
//               <input
//                 type="text"
//                 name="username"
//                 value={newUser.username}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={newUser.email}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={newUser.password}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Role:
//               <select name="role" value={newUser.role} onChange={handleChange}>
//                 <option value="">Select a Role</option>
//                 <option value="UI/UX Designer">UI/UX Designer</option>
//                 <option value="Backend Developer">Backend Developer</option>
//                 <option value="Full Stack Developer">
//                   Full Stack Developer
//                 </option>
//                 <option value="Cloud Developer">Cloud Developer</option>
//               </select>
//             </label>
//             <label>
//               Tech Stack (comma-separated):
//               <input
//                 type="text"
//                 name="tech_stack"
//                 value={newUser.tech_stack}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Designation:
//               <select
//                 name="designation"
//                 value={newUser.designation}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a Designation</option>
//                 <option value="User">User</option>
//                 <option value="Super User">Super User</option>
//                 <option value="Manager">Manager</option>
//                 <option value="Team Lead">Team Lead</option>
//               </select>
//             </label>
//             <div className="modal-actions">
//               <button className="usergrp" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="usergrp" onClick={handleSaveUser}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserGroup;

// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Modal from "react-modal";
// import "../styles/UserGroup.css";

// const UserGroup = () => {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     email: "",
//     role: "",
//     tech_stack: "",
//     designation: "",
//     password: "",
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/todo/users/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched users:", data);
//         setUsers(data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const generateRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const handleAddUser = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = () => {
//     const payload = {
//       username: newUser.username,
//       password: newUser.password,
//       email: newUser.email,
//       profile: {
//         tech_stack: newUser.tech_stack
//           .split(",")
//           .map((tech) => tech.trim())
//           .join(", "),
//         role: newUser.role,
//         designation: newUser.designation,
//       },
//     };

//     console.log("Payload being sent:", JSON.stringify(payload, null, 2));

//     fetch("http://127.0.0.1:8000/todo/api/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             console.error(`Error Response: ${text}`);
//             throw new Error(
//               `HTTP error! status: ${response.status}, message: ${text}`
//             );
//           });
//         }
//         return response.json();
//       })
//       .then((addedUser) => {
//         setUsers([...users, addedUser]);
//         setIsModalOpen(false);
//         setNewUser({
//           username: "",
//           email: "",
//           role: "",
//           tech_stack: "",
//           designation: "",
//           password: "",
//         });
//       })
//       .catch((error) => console.error("Error adding user:", error));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleRemoveUser = (user) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     fetch(`http://127.0.0.1:8000/todo/userdelete/${userToDelete.id}/`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== userToDelete.id));
//         setIsDeleteModalOpen(false);
//         setUserToDelete(null);
//       })
//       .catch((error) => console.error("Error removing user:", error));
//   };

//   const cancelDelete = () => {
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   return (
//     <div className="user-group">
//       <div className="header">
//         <h2>USERS</h2>
//         <button className="usergrp" onClick={handleAddUser}>
//           + Add Users
//         </button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Persons</th>
//             <th>Tech Stack</th>
//             <th>Designation</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className="person">
//                   <span
//                     className="initials"
//                     style={{ backgroundColor: generateRandomColor() }}
//                   >
//                     {user.username ? user.username[0].toUpperCase() : "?"}
//                   </span>
//                   <div className="info">
//                     <span className="name">{user.username}</span>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div className="tech-stack">
//                   {(user.userprofile?.tech_stack || "")
//                     .split(",")
//                     .map((tech, i) => (
//                       <span key={i} className="tech">
//                         {tech}
//                       </span>
//                     ))}
//                 </div>
//               </td>
//               <td>{user.userprofile?.designation}</td>
//               <td>
//                 <button
//                   className="usergrp"
//                   onClick={() => handleRemoveUser(user)}
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add User</h2>
//             <label>
//               Username:
//               <input
//                 type="text"
//                 name="username"
//                 value={newUser.username}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={newUser.email}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={newUser.password}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Role:
//               <select name="role" value={newUser.role} onChange={handleChange}>
//                 <option value="">Select a Role</option>
//                 <option value="UI/UX Designer">UI/UX Designer</option>
//                 <option value="Backend Developer">Backend Developer</option>
//                 <option value="Full Stack Developer">
//                   Full Stack Developer
//                 </option>
//                 <option value="Cloud Developer">Cloud Developer</option>
//               </select>
//             </label>
//             <label>
//               Tech Stack (comma-separated):
//               <input
//                 type="text"
//                 name="tech_stack"
//                 value={newUser.tech_stack}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Designation:
//               <select
//                 name="designation"
//                 value={newUser.designation}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a Designation</option>
//                 <option value="User">User</option>
//                 <option value="Super User">Super User</option>
//                 <option value="Manager">Manager</option>
//                 <option value="Team Lead">Team Lead</option>
//               </select>
//             </label>
//             <div className="modal-actions">
//               <button className="usergrp" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="usergrp" onClick={handleSaveUser}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isDeleteModalOpen && (
//         <div className="modal">
//           <div className="modal-content delete_popup">
//             <h2>Are you sure you want to delete this user?</h2>
//             <button onClick={confirmDelete}>Yes</button>
//             <button onClick={cancelDelete}>No</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserGroup;

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import "../styles/UserGroup.css";

const UserGroup = (userInfo) => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    tech_stack: "",
    designation: "",
    password: "",
    profile_photo: null,
  });

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

  const hasPermission = () => {
    return (
      userInfo.userInfo.designation === "Super User" ||
      userInfo.userInfo.designation === "Manager"
    );
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/todo/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddUser = () => {
    if (hasPermission()) {
      setIsModalOpen(true);
    } else {
      setShowMessageModal(true);
    }
  };

  const handleSaveUser = () => {
    const formData = new FormData();
    formData.append("username", newUser.username);
    formData.append("password", newUser.password);
    formData.append("email", newUser.email);
    formData.append("userprofile.profile_photo", newUser.profile_photo);

    const profile = {
      tech_stack: newUser.tech_stack
        .split(",")
        .map((tech) => tech.trim())
        .join(", "),
      role: newUser.role,
      designation: newUser.designation,
    };

    for (const [key, value] of Object.entries(profile)) {
      formData.append(`userprofile.${key}`, value);
    }

    console.log("FormData being sent:", formData);

    fetch("http://127.0.0.1:8000/todo/api/register/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error(`Error Response: ${text}`);
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${text}`
            );
          });
        }
        return response.json();
      })
      .then((addedUser) => {
        setUsers([...users, addedUser]);
        setIsModalOpen(false);
        setNewUser({
          username: "",
          email: "",
          role: "",
          tech_stack: "",
          designation: "",
          password: "",
          profile_photo: null,
        });
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_photo") {
      setNewUser({ ...newUser, profile_photo: files[0] });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleRemoveUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://127.0.0.1:8000/todo/userdelete/${userToDelete.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      })
      .catch((error) => console.error("Error removing user:", error));
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="user-group">
      <div className="header">
        <h1>USERS</h1>
        <button onClick={handleAddUser}>+ Add Users</button>
        {showMessageModal && (
          <div className="modal-add-project">
            <div className="modal-content-add-project">
              <p>You do not have permission to add user.</p>
              <button onClick={() => setShowMessageModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead className="table-user-header">
          <tr>
            <th>Persons</th>
            <th>Tech Stack</th>
            <th>Designation</th>
            {hasPermission() && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="person">
                  <span
                    className="initials"
                    style={{ backgroundColor: "gainsboro" }}
                  >
                    {user.username ? user.username[0].toUpperCase() : "?"}
                  </span>
                  <div className="info">
                    <span className="name">{user.username}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="tech-stack">
                  {(user.userprofile?.tech_stack || "")
                    .split(",")
                    .map((tech, i) => (
                      <span key={i} className="tech">
                        {tech}
                      </span>
                    ))}
                </div>
              </td>
              <td>{user.userprofile?.designation}</td>
              {hasPermission() && (
                <td>
                  <button
                    className="usergrp"
                    onClick={() => handleRemoveUser(user)}
                  >
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="modal-user">
          <div className="modal-content">
            <h2>Add User</h2>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </label>
            <label>
              Role:
              <select name="role" value={newUser.role} onChange={handleChange}>
                <option value="">Select a Role</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="Cloud Developer">Cloud Developer</option>
              </select>
            </label>
            <label>
              Tech Stack (comma-separated):
              <input
                type="text"
                name="tech_stack"
                value={newUser.tech_stack}
                onChange={handleChange}
              />
            </label>
            <label>
              Designation:
              <select
                name="designation"
                value={newUser.designation}
                onChange={handleChange}
              >
                <option value="">Select a Designation</option>
                <option value="User">User</option>
                <option value="Super User">Super User</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
              </select>
            </label>
            <label>
              Profile Photo:
              <input type="file" name="profile_photo" onChange={handleChange} />
            </label>
            <div className="modal-actions">
              <button className="usergrp" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="usergrp" onClick={handleSaveUser}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content delete_popup">
            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGroup;

// import React, { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import Modal from "react-modal";
// import "../styles/UserGroup.css";

// const UserGroup = () => {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     email: "",
//     role: "",
//     tech_stack: "",
//     designation: "",
//     password: "",
//     profile_photo: null,
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/todo/users/")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched users:", data);
//         setUsers(data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const generateRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const handleAddUser = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = () => {
//     const formData = new FormData();
//     formData.append("username", newUser.username);
//     formData.append("password", newUser.password);
//     formData.append("email", newUser.email);
//     formData.append("profile_photo", newUser.profile_photo);

//     formData.append("userprofile.tech_stack", newUser.tech_stack);
//     formData.append("userprofile.role", newUser.role);
//     formData.append("userprofile.designation", newUser.designation);

//     // Log FormData content
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     fetch("http://127.0.0.1:8000/todo/api/register/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             console.error(`Error Response: ${text}`);
//             throw new Error(
//               `HTTP error! status: ${response.status}, message: ${text}`
//             );
//           });
//         }
//         return response.json();
//       })
//       .then((addedUser) => {
//         setUsers([...users, addedUser]);
//         setIsModalOpen(false);
//         setNewUser({
//           username: "",
//           email: "",
//           role: "",
//           tech_stack: "",
//           designation: "",
//           password: "",
//           profile_photo: null,
//         });
//       })
//       .catch((error) => console.error("Error adding user:", error));
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profile_photo") {
//       setNewUser({ ...newUser, profile_photo: files[0] });
//     } else {
//       setNewUser({ ...newUser, [name]: value });
//     }
//   };

//   const handleRemoveUser = (user) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     fetch(`http://127.0.0.1:8000/todo/userdelete/${userToDelete.id}/`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== userToDelete.id));
//         setIsDeleteModalOpen(false);
//         setUserToDelete(null);
//       })
//       .catch((error) => console.error("Error removing user:", error));
//   };

//   const cancelDelete = () => {
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   return (
//     <div className="user-group">
//       <div className="header">
//         <h2>USERS</h2>
//         <button className="usergrp" onClick={handleAddUser}>
//           + Add Users
//         </button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Persons</th>
//             <th>Tech Stack</th>
//             <th>Designation</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className="person">
//                   <span
//                     className="initials"
//                     style={{ backgroundColor: generateRandomColor() }}
//                   >
//                     {user.username ? user.username[0].toUpperCase() : "?"}
//                   </span>
//                   <div className="info">
//                     <span className="name">{user.username}</span>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div className="tech-stack">
//                   {(user.userprofile?.tech_stack || "")
//                     .split(",")
//                     .map((tech, i) => (
//                       <span key={i} className="tech">
//                         {tech}
//                       </span>
//                     ))}
//                 </div>
//               </td>
//               <td>{user.userprofile?.designation}</td>
//               <td>
//                 <button
//                   className="usergrp"
//                   onClick={() => handleRemoveUser(user)}
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && (
//         <div className="modal-user">
//           <div className="modal-content">
//             <h2>Add User</h2>
//             <label>
//               Username:
//               <input
//                 type="text"
//                 name="username"
//                 value={newUser.username}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={newUser.email}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={newUser.password}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Role:
//               <input
//                 type="text"
//                 name="role"
//                 value={newUser.role}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Tech Stack:
//               <input
//                 type="text"
//                 name="tech_stack"
//                 value={newUser.tech_stack}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Designation:
//               <input
//                 type="text"
//                 name="designation"
//                 value={newUser.designation}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Profile Photo:
//               <input
//                 type="file"
//                 name="profile_photo"
//                 accept=".png,.jpg,.jpeg"
//                 onChange={handleChange}
//               />
//             </label>

//             <button className="usergrp" onClick={handleSaveUser}>
//               Save
//             </button>
//             <button
//               className="usergrp cancel"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//       {isDeleteModalOpen && (
//         <div className="modal-user">
//           <div className="modal-content">
//             <h2>Delete User</h2>
//             <p>Are you sure you want to delete this user?</p>
//             <button className="usergrp delete" onClick={confirmDelete}>
//               Yes, Delete
//             </button>
//             <button className="usergrp cancel" onClick={cancelDelete}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserGroup;
