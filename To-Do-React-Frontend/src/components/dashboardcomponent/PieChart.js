import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const StraightAnglePieChart = ({ data, statusOptions }) => {
  const chartData = statusOptions.map((status) => ({
    label: status,
    value: data[status],
  }));

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Project Task Status</h2>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 80,
            outerRadius: 140,
            paddingAngle: 1,
            cornerRadius: 5,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default StraightAnglePieChart;
