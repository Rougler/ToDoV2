import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import SimpleBarChart from "./BarChart.js";
import StraightAnglePieChart from "./PieChart.js";
import Modal from "./Modal.js";
import ColorTabs from "./Tab.js";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tab0");
  const [tabs, setTabs] = useState([]);
  const [managerNames, setManagerNames] = useState({});

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
        task.project === tabs.find((tab) => tab.value === selectedTab)?.label
    );

    filteredTasks.forEach((task) => {
      counts[task.taskStatus] += 1;
    });

    return counts;
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const addTab = (label, managerName) => {
    const newTabValue = label.toLowerCase().replace(/\s/g, "_");
    const newTab = { value: newTabValue, label: label };
    setTabs([...tabs, newTab]);
    setManagerNames({ ...managerNames, [newTabValue]: managerName });

    setSelectedTab(newTab.value);
    console.log("Tab and manager name added", newTab, managerNames);
  };

  const getFilteredTasks = () => {
    return tasks.filter(
      (task) =>
        task.project === tabs.find((tab) => tab.value === selectedTab)?.label
    );
  };

  return (
    <>
      <div className="dashboard">
        <h1>Detailed Dashboard</h1>
        <ColorTabs
          value={selectedTab}
          onChange={handleTabChange}
          tabs={tabs}
          addTab={addTab}
          setTabs={setTabs}
          managerNames={managerNames}
          setManagerNames={setManagerNames}
        />
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
                  <td
                    className={task.taskStatus.toLowerCase().replace(" ", "-")}
                  >
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
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        addTask={addTask}
      />
    </>
  );
};

export default Dashboard;
