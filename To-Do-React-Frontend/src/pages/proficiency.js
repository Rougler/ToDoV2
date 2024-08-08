import React from 'react';
import ReactApexCharts from 'react-apexcharts';

class LineChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        // name: '4th Graders at or above Reading Proficiency',
        data: [
          [new Date('1992-01-01').getTime(), 29],
          [new Date('1994-01-01').getTime(), 30],
          [new Date('1998-01-01').getTime(), 31],
          [new Date('1998-07-01').getTime(), 29],
          [new Date('2000-01-01').getTime(), 32],
          [new Date('2000-07-01').getTime(), 29],
          [new Date('2002-01-01').getTime(), 31],
          [new Date('2003-01-01').getTime(), 31],
          [new Date('2005-01-01').getTime(), 31],
          [new Date('2007-01-01').getTime(), 33],
          [new Date('2009-01-01').getTime(), 33],
          [new Date('2011-01-01').getTime(), 34],
          [new Date('2013-01-01').getTime(), 35]
        ]
      }],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Proficiency Graph',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0) + "%";
            },
          },
          title: {
            text: 'Proficiency Percentage'
          },
          min: 0,
          max: 100
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false,
            format: 'dd MMM yyyy'
          }
          
        },
        tooltip: {
          shared: false,
          x: {
            format: 'dd MMM yyyy'
          },
          y: {
            formatter: function (val) {
              return val.toFixed(0) + "%"
            }
          }
        }
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexCharts options={this.state.options} series={this.state.series} type="area" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default LineChartComponent;