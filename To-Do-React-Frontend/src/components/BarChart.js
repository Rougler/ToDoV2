import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const SimpleBarChart = (props) => {
  const { tasks } = props;

  const taskCounts = {};

  tasks.forEach((task) => {
    task.assignedTo.forEach((person) => {
      if (!taskCounts[person]) {
        taskCounts[person] = {
          "Not-Start": 0,
          "On-going": 0,
          Done: 0,
        };
      }
      taskCounts[person][task.taskStatus] += 1;
    });
  });

  const dataLabels = Object.keys(taskCounts);
  const notstartData = dataLabels.map(
    (label) => taskCounts[label]["Not-Start"]
  );
  const ongoingData = dataLabels.map((label) => taskCounts[label]["On-going"]);
  const completedData = dataLabels.map((label) => taskCounts[label]["Done"]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Project Task Status by Assignee</h2>
      <BarChart
        height={300}
        series={[
          { data: notstartData, label: "Not-Start", id: "notstartId" },
          { data: ongoingData, label: "On-going", id: "ongoingId" },
          { data: completedData, label: "Done", id: "completedId" },
        ]}
        xAxis={[{ data: dataLabels, scaleType: "band" }]}
      />
    </div>
  );
};

export default SimpleBarChart;
