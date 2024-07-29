// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../styles/Modal.css";
// import axios from "axios";

// const Modal = ({ showModal, handleClose, addTask }) => {
//   const [taskName, setTaskName] = useState("");
//   const [taskStatus, setTaskStatus] = useState("Not-Start");
//   const [assignedTo, setAssignedTo] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [techStackOptions, setTechStackOptions] = useState([]);
//   const [techStack, setTechStack] = useState([]);
//   const [autoAssign, setAutoAssign] = useState(false);
//   const [userOptions, setUserOptions] = useState([]);
//   const [deadline, setDeadline] = useState(null);
//   const [priority, setPriority] = useState(false);
//   const [statusOptions, setStatusOptions] = useState([]);

//   const getAllProjects = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/todo/api/projects/"
//       );
//       setProjects(response.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const getAllUsers = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/todo/users/");
//       const userOptions = response.data.map((user) => ({
//         value: user.username,
//         label: user.username,
//       }));
//       setUserOptions(userOptions);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const getTechStackOptions = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/todo/api/get-users/"
//       );

//       const techStackSet = new Set();
//       response.data.forEach((techStack) => {
//         const techStackNames = techStack.tech_stack
//           .split(",")
//           .map((tech) => tech.trim());
//         techStackNames.forEach((name) => techStackSet.add(name));
//       });

//       const uniqueTechStacks = Array.from(techStackSet).map((name) => ({
//         value: name,
//         label: name,
//       }));

//       setTechStackOptions(uniqueTechStacks);
//     } catch (error) {
//       console.error("Error fetching tech stacks:", error);
//     }
//   };

//   const getStatusOptions = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/todo/cardname/");
//       console.log("check", response.data);
//       const statusOptions = response.data.map((status) => ({
//         value: status.card_name,
//         label: status.card_name,
//       }));
//       setStatusOptions(statusOptions);
//     } catch (error) {
//       console.error("Error fetching task statuses:", error);
//     }
//   };

//   useEffect(() => {
//     getAllProjects();
//     getAllUsers();
//     getTechStackOptions();
//     getStatusOptions();
//   }, []);

//   const handleProjectChange = (selectedOption) => {
//     setSelectedProject(selectedOption);
//   };

//   const handleTechStackChange = (selectedOptions) => {
//     setTechStack(selectedOptions || []);
//   };

//   const handleStatusChange = (selectedOption) => {
//     setTaskStatus(selectedOption ? selectedOption.value : "");
//   };

//   const projectOptions = projects.map((project) => ({
//     value: project.name,
//     label: project.name,
//   }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !taskName ||
//       !taskStatus ||
//       (!autoAssign && assignedTo.length === 0) ||
//       !selectedProject ||
//       techStack.length === 0 ||
//       !deadline
//     ) {
//       console.error(
//         "Task Name, Task Status, Assigned To, Project, Tech Stack, and Deadline are required."
//       );
//       return;
//     }

//     const assignedToNames = assignedTo.map((person) => person.label);
//     const projectName = selectedProject.label;
//     const techStackNames = techStack.map((tech) => tech.label);

//     const task = {
//       taskName,
//       taskStatus,
//       assignedTo: assignedToNames,
//       project: projectName,
//       techStack: techStackNames,
//       auto_assign: autoAssign,
//       deadline: deadline.toISOString().split("T")[0],
//       priority: priority ? 1 : 0,
//     };

//     console.log("Submitting task:", task);

//     try {
//       let res = await fetch("http://127.0.0.1:8000/todo/api/create-task/", {
//         method: "POST",
//         body: JSON.stringify(task),
//         headers: {
//           "Content-type": "application/json",
//         },
//       });
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const result = await res.json();
//       console.log("Task added:", result);
//       addTask(result);
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//     }

//     handleClose();
//   };

//   const handleAutoAssign = () => {
//     setAutoAssign(!autoAssign);
//   };

//   if (!showModal) {
//     return null;
//   }

//   return (
//     <div className="modal-overlay-card">
//       <div className="modal-card">
//         <h2>Add New Task</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Task Name:</label>
//             <input
//               type="text"
//               value={taskName}
//               onChange={(e) => setTaskName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Projects:</label>
//             <Select
//               options={projectOptions}
//               value={selectedProject}
//               onChange={handleProjectChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Tech Stack:</label>
//             <Select
//               isMulti
//               options={techStackOptions}
//               value={techStack}
//               onChange={handleTechStackChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Task Status:</label>
//             <Select
//               options={statusOptions}
//               value={statusOptions.find(
//                 (option) => option.value === taskStatus
//               )}
//               onChange={handleStatusChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Assigned To:</label>
//             <div className="form-group assigned_to_flex">
//               <Select
//                 isMulti
//                 className="select_assign"
//                 options={userOptions}
//                 value={assignedTo}
//                 onChange={setAssignedTo}
//                 isDisabled={autoAssign}
//               />
//               <button
//                 type="button"
//                 className={`auto-assign-button ${autoAssign ? "active" : ""}`}
//                 onClick={handleAutoAssign}
//               >
//                 Auto
//               </button>
//             </div>
//           </div>
//           <div className="form-group deadline_priority">
//             <div className="">
//               <label>Priority:</label>
//               <input
//                 type="checkbox"
//                 checked={priority}
//                 onChange={(e) => setPriority(e.target.checked)}
//               />
//             </div>
//             <div className="">
//               <label>Deadline:</label>
//               <DatePicker
//                 selected={deadline}
//                 onChange={(date) => setDeadline(date)}
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="Select deadline"
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-group deadline_priority">
//             <button className="cancel" type="button" onClick={handleClose}>
//               Cancel
//             </button>
//             <button type="submit">Add Task</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;

///////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Modal.css";
import axios from "axios";

const Modal = ({ showModal, handleClose, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Not-Start");
  const [assignedTo, setAssignedTo] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [techStackOptions, setTechStackOptions] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [autoAssign, setAutoAssign] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/todo/api/projects/"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/users/");
      const userOptions = response.data.map((user) => ({
        value: user.username,
        label: user.username,
      }));
      setUserOptions(userOptions);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getTechStackOptions = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/todo/api/get-users/"
      );

      const techStackSet = new Set();
      response.data.forEach((techStack) => {
        const techStackNames = techStack.tech_stack
          .split(",")
          .map((tech) => tech.trim());
        techStackNames.forEach((name) => techStackSet.add(name));
      });

      const uniqueTechStacks = Array.from(techStackSet).map((name) => ({
        value: name,
        label: name,
      }));

      setTechStackOptions(uniqueTechStacks);
    } catch (error) {
      console.error("Error fetching tech stacks:", error);
    }
  };

  const getStatusOptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/cardname/");
      console.log("check", response.data);
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
    getAllProjects();
    getAllUsers();
    getTechStackOptions();
    getStatusOptions();
  }, []);

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };

  const handleTechStackChange = (selectedOptions) => {
    setTechStack(selectedOptions || []);
  };

  const handleStatusChange = (selectedOption) => {
    setTaskStatus(selectedOption ? selectedOption.value : "");
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const projectOptions = projects.map((project) => ({
    value: project.name,
    label: project.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !taskName ||
      !taskStatus ||
      (!autoAssign && assignedTo.length === 0) ||
      !selectedProject ||
      techStack.length === 0 ||
      !deadline
    ) {
      console.error(
        "Task Name, Task Status, Assigned To, Project, Tech Stack, and Deadline are required."
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
      auto_assign: autoAssign,
      deadline: deadline.toISOString().split("T")[0],
      priority,
    };

    console.log("Submitting task:", task);

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
    setAutoAssign(!autoAssign);
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
              onChange={handleTechStackChange}
            />
          </div>
          <div className="form-group">
            <label>Task Status:</label>
            <Select
              options={statusOptions}
              value={statusOptions.find(
                (option) => option.value === taskStatus
              )}
              onChange={handleStatusChange}
            />
          </div>
          <div className="form-group">
            <label>Assigned To:</label>
            <div className="form-group assigned_to_flex">
              <Select
                isMulti
                className="select_assign"
                options={userOptions}
                value={assignedTo}
                onChange={setAssignedTo}
                isDisabled={autoAssign}
              />
              <button
                type="button"
                className={`auto-assign-button ${autoAssign ? "active" : ""}`}
                onClick={handleAutoAssign}
              >
                Auto
              </button>
            </div>
          </div>
          <div className="form-group deadline_priority">
            <div className="">
              <label>Priority:</label>
              <div className="priority-options" style={{ display: "flex" }}>
                <label>
                  <input
                    type="radio"
                    value="high"
                    checked={priority === "high"}
                    onChange={handlePriorityChange}
                  />
                  High
                </label>
                <label>
                  <input
                    type="radio"
                    value="medium"
                    checked={priority === "medium"}
                    onChange={handlePriorityChange}
                  />
                  Medium
                </label>
                <label>
                  <input
                    type="radio"
                    value="low"
                    checked={priority === "low"}
                    onChange={handlePriorityChange}
                  />
                  Low
                </label>
              </div>
            </div>
            <div className="">
              <label>Deadline:</label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select deadline"
                required
              />
            </div>
          </div>
          <div className="form-group deadline_priority">
            <button className="cancel" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
