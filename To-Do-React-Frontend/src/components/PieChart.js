import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const StraightAnglePieChart = ({ data }) => {
  const chartData = [
    { label: "On-going", value: data["On-going"] },
    { label: "Done", value: data["Done"] },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Project Task Status</h2>
      <PieChart
        series={[
          {
            data: chartData,
            paddingAngle: 5,
            innerRadius: 80,
            outerRadius: 140,
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default StraightAnglePieChart;
