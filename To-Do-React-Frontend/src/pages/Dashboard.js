import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import SimpleBarChart from "../components/dashboardcomponent/BarChart.js";
import StraightAnglePieChart from "../components/dashboardcomponent/PieChart.js";
import Modal from "../components/dashboardcomponent/Modal.js";
import ProjectContext from "../components/projectcomponent/ProjectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const {
    selectedProject,
    setSelectedProject,
    tabs,
    setTabs,
    managerNames,
    setManagerNames,
  } = useContext(ProjectContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/todo/cardname/"
        );
        const statusOptions = response.data.map((status) => status.card_name);
        setStatusOptions(statusOptions);
      } catch (error) {
        console.error("Error fetching task statuses:", error);
      }
    };

    fetchTasks();
    fetchStatuses();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const taskStatusCounts = () => {
    const counts = statusOptions.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    const filteredTasks = tasks.filter(
      (task) =>
        task.project ===
        tabs.find((tab) => tab.value === selectedProject)?.label
    );

    filteredTasks.forEach((task) => {
      counts[task.taskStatus] += 1;
    });

    return counts;
  };

  const addTab = (label, managerName) => {
    const newTabValue = label.toLowerCase().replace(/\s/g, "_");
    const newTab = { value: newTabValue, label: label };
    setTabs([...tabs, newTab]);
    setManagerNames({ ...managerNames, [newTabValue]: managerName });
    setSelectedProject(newTab.value);
  };

  const getFilteredTasks = () => {
    return tasks.filter(
      (task) =>
        task.project ===
        tabs.find((tab) => tab.value === selectedProject)?.label
    );
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="dashboard">
        <h1>Detailed Dashboard</h1>
        <div className="charts">
          <div className="chart pie-chart">
            <StraightAnglePieChart
              data={taskStatusCounts()}
              statusOptions={statusOptions}
            />
          </div>
          <div className="chart bar-chart">
            <SimpleBarChart
              tasks={getFilteredTasks()}
              statusOptions={statusOptions}
            />
          </div>
        </div>
        <div className="task-section">
          <div className="add-task">
            <button className="add-task-button" onClick={handleShowModal}>
              +
            </button>
            <span className="text">Add Task</span>
          </div>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Assigned to</th>
                <th>Tech Stack</th>
                <th>Deadline</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTasks().map((task, index) => (
                <tr key={index} className={getPriorityClass(task.priority)}>
                  <td>{task.taskName}</td>
                  <td
                    className={task.taskStatus.toLowerCase().replace(" ", "-")}
                  >
                    {task.taskStatus}
                  </td>
                  <td>{task.assignedTo.join(", ")}</td>
                  <td>{task.tech_stack}</td>
                  <td>{task.deadline}</td>
                  <td>
                    {task.priority === "high" ? (
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="priority-high"
                      />
                    ) : task.priority === "medium" ? (
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="priority-medium"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="priority-low"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        addTask={addTask}
      />
    </>
  );
};

export default Dashboard;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "../styles/dashboard.css";
// import SimpleBarChart from "../components/dashboardcomponent/BarChart.js";
// import StraightAnglePieChart from "../components/dashboardcomponent/PieChart.js";
// import Modal from "../components/dashboardcomponent/Modal.js";
// import ProjectSelection from "../components/projectcomponent/ProjectSelection";
// import ProjectContext from "../components/projectcomponent/ProjectContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faExclamationCircle,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const Dashboard = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [statusOptions, setStatusOptions] = useState([]);

//   const {
//     selectedProject,
//     setSelectedProject,
//     tabs,
//     setTabs,
//     managerNames,
//     setManagerNames,
//   } = useContext(ProjectContext);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/todo/tasks/");
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     const fetchStatuses = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/todo/cardname/"
//         );
//         const statusOptions = response.data.map((status) => status.card_name);
//         setStatusOptions(statusOptions);
//       } catch (error) {
//         console.error("Error fetching task statuses:", error);
//       }
//     };

//     fetchTasks();
//     fetchStatuses();
//   }, []);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const addTask = (task) => {
//     setTasks([...tasks, task]);
//   };

//   const taskStatusCounts = () => {
//     const counts = statusOptions.reduce((acc, status) => {
//       acc[status] = 0;
//       return acc;
//     }, {});

//     const filteredTasks = tasks.filter(
//       (task) =>
//         task.project ===
//         tabs.find((tab) => tab.value === selectedProject)?.label
//     );

//     filteredTasks.forEach((task) => {
//       counts[task.taskStatus] += 1;
//     });

//     return counts;
//   };

//   const addTab = (label, managerName) => {
//     const newTabValue = label.toLowerCase().replace(/\s/g, "_");
//     const newTab = { value: newTabValue, label: label };
//     setTabs([...tabs, newTab]);
//     setManagerNames({ ...managerNames, [newTabValue]: managerName });
//     setSelectedProject(newTab.value);
//   };

//   const getFilteredTasks = () => {
//     return tasks.filter(
//       (task) =>
//         task.project ===
//         tabs.find((tab) => tab.value === selectedProject)?.label
//     );
//   };

//   return (
//     <>
//       <div className="dashboard">
//         <h1>Detailed Dashboard</h1>
//         <div className="charts">
//           <div className="chart pie-chart">
//             <StraightAnglePieChart
//               data={taskStatusCounts()}
//               statusOptions={statusOptions}
//             />
//           </div>
//           <div className="chart bar-chart">
//             <SimpleBarChart
//               tasks={getFilteredTasks()}
//               statusOptions={statusOptions}
//             />
//           </div>
//         </div>
//         <div className="task-section">
//           <div className="add-task">
//             <button className="add-task-button" onClick={handleShowModal}>
//               +
//             </button>
//             <span className="text">Add Task</span>
//           </div>
//           <table className="task-table">
//             <thead>
//               <tr>
//                 <th>Task Name</th>
//                 <th>Task Status</th>
//                 <th>Assigned to</th>
//                 <th>Tech Stack</th>
//                 <th>Deadline</th>
//                 <th>Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {getFilteredTasks().map((task, index) => (
//                 <tr
//                   key={index}
//                   className={task.priority === 1 ? "priority-high" : ""}
//                 >
//                   <td>{task.taskName}</td>
//                   <td
//                     className={task.taskStatus.toLowerCase().replace(" ", "-")}
//                   >
//                     {task.taskStatus}
//                   </td>
//                   <td>{task.assignedTo.join(", ")}</td>
//                   <td>{task.tech_stack}</td>
//                   <td>{task.deadline}</td>
//                   <td>
//                     {task.priority === 1 ? (
//                       <FontAwesomeIcon
//                         icon={faExclamationCircle}
//                         className="priority-high"
//                       />
//                     ) : (
//                       <FontAwesomeIcon
//                         icon={faCheckCircle}
//                         className="priority-low"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Modal
//         showModal={showModal}
//         handleClose={handleCloseModal}
//         addTask={addTask}
//       />
//     </>
//   );
// };

// export default Dashboard;
