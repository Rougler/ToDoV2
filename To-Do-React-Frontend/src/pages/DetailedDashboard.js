import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ApexChart from "../components/ApexChart";
import LineChartComponent from "./proficiency"; // Adjust the import path if necessary
import "../styles/DetailedDashboard.css";

const chartSetting = {
  xAxis: [
    {
      label: "Project Percentage (%)",
      min: 0,
      max: 100,
      ticks: [0, 20, 40, 60, 80, 100],
    },
  ],
  width: 500,
  height: 400,
};

const sampleData = [
  { value: 20 },
  { value: 50 },
  { value: 80 },
  { value: 40 },
  { value: 60 },
  { value: 30 },
];

const valueFormatter = (value) => `${value}%`;

export default function PieActiveArc() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/todo/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data));

    fetch("http://127.0.0.1:8000/todo/projectper/")
      .then((response) => response.json())
      .then((data) => {
        const formattedBarData = data.map((project) => ({
          projectName: project.name,
          progress: project.completion_percentage,
        }));
        setBarData(formattedBarData);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`http://127.0.0.1:8000/todo/user/tasks/${selectedUser}/`)
        .then((response) => response.json())
        .then((data) => {
          const projectTaskCount = data.reduce((acc, task) => {
            if (acc[task.project_name]) {
              acc[task.project_name]++;
            } else {
              acc[task.project_name] = 1;
            }
            return acc;
          }, {});

          const formattedPieData = Object.entries(projectTaskCount).map(
            ([projectName, count], index) => ({
              id: index,
              value: count,
              label: projectName,
            })
          );
          setPieData(formattedPieData);
        });
    }
  }, [selectedUser]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="dashboard">
      <h3 className="user-dashboard-h3">Users Dashboard</h3>
      <div className="charts">
        <div className="chart pie-chart">
          <FormControl fullWidth>
            <InputLabel id="user-select-label">Select User</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              value={selectedUser}
              label="Select User"
              onChange={handleChange}
            >
              {users.map((user, index) => (
                <MenuItem key={index} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="chart-content">
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </div>
        </div>
        
        <div className="chart bar-chart">
          <div className="chart-content">
            <BarChart
              dataset={barData}
              yAxis={[{ scaleType: "band", dataKey: "projectName" }]}
              series={[
                {
                  dataKey: "progress",
                  label: "Project Progress",
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              grid={{ vertical: true }}
              {...chartSetting}
            />
          </div>
        </div>


      </div>
      <div className="chart line-chart">
          <LineChartComponent data={sampleData} />
        </div>
    </div>
  );
}
