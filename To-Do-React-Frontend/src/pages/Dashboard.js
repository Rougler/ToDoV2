import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import SimpleBarChart from "../components/dashboardcomponent/BarChart.js";
import StraightAnglePieChart from "../components/dashboardcomponent/PieChart.js";
import ProjectContext from "../components/projectcomponent/ProjectContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import CardDetail from "../components/boardcomponent/CardDetail";
import Modal from "../components/dashboardcomponent/Modal"; // Ensure this component is correctly imported

const Dashboard = ({ setSelectedCard }) => {
  const [tasks, setTasks] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskStatus: "",
    assignedTo: [],
    tech_stack: "",
    deadline: "",
    priority: ""
  });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { selectedProject, tabs } = useContext(ProjectContext);

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
        const response = await axios.get("http://127.0.0.1:8000/todo/cardname/");
        const statusOptions = response.data.map((status) => status.card_name);
        setStatusOptions(statusOptions);
      } catch (error) {
        console.error("Error fetching task statuses:", error);
      }
    };

    fetchTasks();
    fetchStatuses();
  }, []);

  const taskStatusCounts = () => {
    const counts = statusOptions.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    const filteredTasks = tasks.filter(
      (task) =>
        task.project === tabs.find((tab) => tab.value === selectedProject)?.label
    );

    filteredTasks.forEach((task) => {
      counts[task.taskStatus] += 1;
    });

    return counts;
  };

  const getFilteredTasks = () => {
    return tasks.filter(
      (task) =>
        task.project === tabs.find((tab) => tab.value === selectedProject)?.label
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

  const handleRowClick = (task) => {
    setSelectedTask(task); // Set the selected task
  };

  const handleCloseCardDetail = () => {
    setSelectedTask(null); // Reset the selected task to close the modal
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/todo/tasks/", newTask);
      setTasks([...tasks, response.data]);
      setShowAddTaskForm(false);
      setNewTask({
        taskName: "",
        taskStatus: "",
        assignedTo: [],
        tech_stack: "",
        deadline: "",
        priority: ""
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="dashboard">
      <h3 className="task-class">Task Pool</h3>
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
        <div className="add-task-container">
          <button className="add-task-button" onClick={() => setShowAddTaskForm(true)}>+</button>
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
              <tr
                key={index}
                className={getPriorityClass(task.priority)}
                onClick={() => handleRowClick(task)}
              >
                <td>{task.taskName}</td>
                <td className={task.taskStatus.toLowerCase().replace(" ", "-")}>
                  {task.taskStatus}
                </td>
                <td>{task.assignedTo.join(", ")}</td>
                <td>{task.tech_stack}</td>
                <td>{task.deadline}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className={`priority-${task.priority}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddTaskForm && (
        <Modal showModal={showAddTaskForm} handleClose={() => setShowAddTaskForm(false)}>
          <div className="add-task-form">
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.taskName}
              onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
            />
            <select
              value={newTask.taskStatus}
              onChange={(e) => setNewTask({ ...newTask, taskStatus: e.target.value })}
            >
              <option value="" disabled>Select Status</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Assigned To"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value.split(",") })}
            />
            <input
              type="text"
              placeholder="Tech Stack"
              value={newTask.tech_stack}
              onChange={(e) => setNewTask({ ...newTask, tech_stack: e.target.value })}
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="" disabled>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleAddTask}>Save Task</button>
              <button onClick={() => setShowAddTaskForm(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
      {selectedTask && (
        <CardDetail
          card={selectedTask}
          lists={[]} // Pass the lists data if needed
          onClose={handleCloseCardDetail}
          onMove={() => {}} // Implement move logic if necessary
          onSaveTitle={() => {}} // Implement save title logic if necessary
          onDelete={() => {}} // Implement delete logic if necessary
          onSaveCoverColor={() => {}} // Implement save cover color logic if necessary
        />
      )}
    </div>
  );
};

export default Dashboard;
