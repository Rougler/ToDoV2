import React from 'react';
import ApexChart from '../components/ApexChart';
import '../styles/Graphs.css'; // import the CSS file

const Graphs = () => {
  return (
    <div>
      <h1>Graphs</h1>
      <div className="chart-container">
        <ApexChart />
      </div>
    </div>
  );
};

export default Graphs;
