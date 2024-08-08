// import React, { useContext, useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";
// import ProjectDropdown from "../components/projectcomponent/ProjectDropdown";
// import ProjectContext from "../components/projectcomponent/ProjectContext";

// const ApexChart = () => {
//   const { selectedProject, tabs } = useContext(ProjectContext);
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({
//     chart: {
//       height: 450,
//       type: "rangeBar",
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         barHeight: "80%",
//       },
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     stroke: {
//       width: 1,
//     },
//     fill: {
//       type: "solid",
//       opacity: 0.6,
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "left",
//     },
//   });

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const selectedProjectName = tabs.find(
//           (tab) => tab.value === selectedProject
//         )?.label;

//         if (selectedProjectName) {
//           const response = await axios.get(
//             `http://127.0.0.1:8000/todo/project/tasks/${selectedProjectName}/`
//           );
//           const tasks = response.data;

//           const userTasksMap = tasks.reduce((acc, task) => {
//             const assignedUser = task.assignedTo;
//             const taskName = task.taskName;
//             const startTime = new Date(task.startdate).getTime();
//             // const endTime = new Date(task.deadline).getTime();
//             const endTime = new Date().getTime();

//             if (!acc[assignedUser]) {
//               acc[assignedUser] = [];
//             }

//             const etaGoals = task.ETA.map((eta) => ({
//               name: "ETA",
//               value: new Date(eta).getTime(),
//               strokeColor: "#CD2F2A",
//               strokeWidth: 7,
//             }));

//             acc[assignedUser].push({
//               x: taskName,
//               y: [startTime, endTime],
//               goals: [
//                 ...etaGoals,
//                 ...(task.goals
//                   ? task.goals.map((goal) => ({
//                       name: goal.taskName,
//                       value: new Date(goal.date).getTime(),
//                       strokeColor: goal.color || "#CD2F2A",
//                       strokeWidth: 1,
//                     }))
//                   : []),
//               ],
//             });

//             return acc;
//           }, {});

//           const seriesData = Object.keys(userTasksMap).map((user) => ({
//             name: user,
//             data: userTasksMap[user],
//           }));

//           setSeries(seriesData);
//         }
//       } catch (error) {
//         console.error("Error fetching tasks", error);
//       }
//     };

//     fetchTasks();
//   }, [selectedProject, tabs]);

//   return (
//     <div>
//       <div style={{ marginBottom: "13px", marginLeft:"83%" }}>
//         <ProjectDropdown />
//       </div>
//       <div id="chart">
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="rangeBar"
//           height={450}
//         />
//       </div>
//     </div>
//   );
// };

// export default ApexChart;
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import ProjectDropdown from "../components/projectcomponent/ProjectDropdown";
import ProjectContext from "../components/projectcomponent/ProjectContext";

const ApexChart = () => {
  const { selectedProject, tabs } = useContext(ProjectContext);
  const [series, setSeries] = useState([]);
  const [options] = useState({
    chart: {
      height: 450,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    xaxis: {
      type: "datetime",
    },
    stroke: {
      width: 1,
    },
    fill: {
      type: "solid",
      opacity: 0.6,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    tooltip: {
      custom: function ({seriesIndex, dataPointIndex, w }) {
        const dataPoint = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const startDate = new Date(dataPoint.y[0]);
        const endDate = new Date(dataPoint.y[1]);
        
        // Format dates as "DD MMM"
        const formatDate = (date) => {
          const options = { day: '2-digit', month: 'short' };
          return date.toLocaleDateString('en-US', options);
        };
        
        const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        
        return `
          <div style="background-color: #fff; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <div style="font-weight: bold; color: #007bff; margin-bottom: 5px;">${dataPoint.x}</div>
            <div style="font-size: 14px; color: #333;">${dateRange}</div>
            <div style="font-size: 14px; color: #666;">${dataPoint.assignedTo}</div>
          </div>
        `;
      },
    },   
    
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const selectedProjectName = tabs.find(
          (tab) => tab.value === selectedProject
        )?.label;

        if (selectedProjectName) {
          const response = await axios.get(
            `http://127.0.0.1:8000/todo/project/tasks/${selectedProjectName}/`
          );
          const tasks = response.data;

          const userTasksMap = tasks.reduce((acc, task) => {
            const taskName = task.taskName;
            const startTime = new Date(task.startdate).getTime();
            const endTime = new Date().getTime();

            if (!acc[taskName]) {
              acc[taskName] = [];
            }

            const etaGoals = task.ETA.map((eta) => ({
              name: "ETA",
              value: new Date(eta).getTime(),
              strokeColor: "#CD2F2A",
              strokeWidth: 7,
            }));

            acc[taskName].push({
              x: taskName,
              y: [startTime, endTime],
              goals: [
                ...etaGoals,
                ...(task.goals
                  ? task.goals.map((goal) => ({
                      name: goal.taskName,
                      value: new Date(goal.date).getTime(),
                      strokeColor: goal.color || "#CD2F2A",
                      strokeWidth: 1,
                    }))
                  : []),
              ],
              assignedTo: task.assignedTo, // Add assignedTo property
            });

            return acc;
          }, {});

          const seriesData = Object.keys(userTasksMap).map((taskName) => ({
            name: taskName,
            data: userTasksMap[taskName].map((dataPoint) => ({
              x: dataPoint.x,
              y: dataPoint.y,
              goals: dataPoint.goals,
              assignedTo: dataPoint.assignedTo, // Add assignedTo property
              startDate: new Date(dataPoint.y[0]).toLocaleDateString(), // Add startDate property
              endDate: new Date(dataPoint.y[1]).toLocaleDateString(), // Add endDate property
            })),
          }));
          

          setSeries(seriesData);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, [selectedProject, tabs]);

  return (
    <div>
      <div style={{ marginBottom: "13px", marginLeft:"83%" }}>
        <ProjectDropdown />
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="rangeBar"
          height={450}
        />
      </div>
    </div>
  );
};

export default ApexChart;
