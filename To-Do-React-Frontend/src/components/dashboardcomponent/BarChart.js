import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const SimpleBarChart = (props) => {
  const { tasks, statusOptions } = props;

  const taskCounts = {};

  tasks.forEach((task) => {
    task.assignedTo.forEach((person) => {
      if (!taskCounts[person]) {
        taskCounts[person] = {};
        statusOptions.forEach((status) => {
          taskCounts[person][status] = 0;
        });
      }
      taskCounts[person][task.taskStatus] += 1;
    });
  });

  const dataLabels = Object.keys(taskCounts);
  const seriesData = statusOptions.map((status) => ({
    data: dataLabels.map((label) => taskCounts[label][status]),
    label: status,
    id: `${status.toLowerCase()}Id`,
  }));

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Project Task Status by Assignee</h2>
      <BarChart
        height={300}
        series={seriesData}
        xAxis={[{ data: dataLabels, scaleType: "band" }]}
      />
    </div>
  );
};

export default SimpleBarChart;
