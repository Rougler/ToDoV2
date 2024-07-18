import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./dashboard.css";
import SimpleBarChart from "../components/BarChart.js";
import StraightAnglePieChart from "../components/PieChart.js";
import Modal from "../components/Modal.js";
import ProjectSelection from "../components/ProjectSelection";
import ProjectContext from "../components/ProjectContext"; // Adjust the import path as needed

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { selectedProject, setSelectedProject, tabs, setTabs, managerNames, setManagerNames } = useContext(ProjectContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo/tasks/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const taskStatusCounts = () => {
    const counts = {
      "On-going": 0,
      Done: 0,
    };

    const filteredTasks = tasks.filter(
      (task) =>
        task.project === tabs.find((tab) => tab.value === selectedProject)?.label
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
        task.project === tabs.find((tab) => tab.value === selectedProject)?.label
    );
  };

  return (
    <>
      <div className="dashboard">
        <h1>Detailed Dashboard</h1>
        <div className="charts">
          <div className="chart pie-chart">
            <StraightAnglePieChart data={taskStatusCounts()} />
          </div>
          <div className="chart bar-chart">
            <SimpleBarChart tasks={getFilteredTasks()} />
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
                <th>Project Name</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.taskName}</td>
                  <td className={task.taskStatus.toLowerCase().replace(" ", "-")}>
                    {task.taskStatus}
                  </td>
                  <td>{task.assignedTo.join(", ")}</td>
                  <td>{task.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal showModal={showModal} handleClose={handleCloseModal} addTask={addTask} />
    </>
  );
};

export default Dashboard;
