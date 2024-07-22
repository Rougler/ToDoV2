import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import "./DetailedDashboard.css";

const data = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
];

export default function PieActiveArc() {
  return (
    <div className="dashboard">
      <div className="charts">
        <div className="chart pie-chart">
          <div className="chart-content">
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
