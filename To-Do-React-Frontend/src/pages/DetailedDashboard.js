import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import ReactApexChart from 'react-apexcharts';  // Ensure this is installed and imported

import "../styles/DetailedDashboard.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Define chart settings
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

// Define value formatter
const valueFormatter = (value) => `${value}%`;

// ApexChart component code
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Bob',
          data: [
            { x: 'Design', y: [new Date('2019-03-05').getTime(), new Date('2019-03-08').getTime()] },
            { x: 'Code', y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()] },
            { x: 'Code', y: [new Date('2019-03-05').getTime(), new Date('2019-03-07').getTime()] },
            { x: 'Test', y: [new Date('2019-03-03').getTime(), new Date('2019-03-09').getTime()] },
            { x: 'Test', y: [new Date('2019-03-08').getTime(), new Date('2019-03-11').getTime()] },
            { x: 'Validation', y: [new Date('2019-03-11').getTime(), new Date('2019-03-16').getTime()] },
            { x: 'Design', y: [new Date('2019-03-01').getTime(), new Date('2019-03-03').getTime()] }
          ]
        },
        {
          name: 'Joe',
          data: [
            { x: 'Design', y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()] },
            { x: 'Test', y: [new Date('2019-03-06').getTime(), new Date('2019-03-16').getTime()], goals: [{ name: 'Break', value: new Date('2019-03-10').getTime(), strokeColor: '#CD2F2A' }] },
            { x: 'Code', y: [new Date('2019-03-03').getTime(), new Date('2019-03-07').getTime()] },
            { x: 'Deployment', y: [new Date('2019-03-20').getTime(), new Date('2019-03-22').getTime()] },
            { x: 'Design', y: [new Date('2019-03-10').getTime(), new Date('2019-03-16').getTime()] }
          ]
        },
        {
          name: 'Dan',
          data: [
            { x: 'Code', y: [new Date('2019-03-10').getTime(), new Date('2019-03-17').getTime()] },
            { x: 'Validation', y: [new Date('2019-03-05').getTime(), new Date('2019-03-09').getTime()], goals: [{ name: 'Break', value: new Date('2019-03-07').getTime(), strokeColor: '#CD2F2A' }] }
          ]
        }
      ],
      options: {
        chart: {
          height: 450,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%'
          }
        },
        xaxis: {
          type: 'datetime'
        },
        stroke: {
          width: 1
        },
        fill: {
          type: 'solid',
          opacity: 0.6
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={450} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

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
      <h1 className="user-dashboard">Users Dashboard</h1>
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
                  valueFormatter, // Use the defined valueFormatter
                },
              ]}
              layout="horizontal"
              grid={{ vertical: true }}
              {...chartSetting} // Use the defined chartSetting
            />
          </div>
        </div>

      </div>
      <div className="eta bar-graph">
        <div className="chart-content" style={{
          display: 'block',
          background: 'white'
        }}>
          <ApexChart />
        </div>
      </div>
    </div>
  );
}
