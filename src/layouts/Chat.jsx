import { useState } from 'react';
import Chart from 'react-apexcharts';
// import ChartComponent from "./pages/ChartComponet";
import axios from 'axios';
// import ChartComponent from "./pages/ChartComponet";

function ChartsComponent() {
  const [state, setState] = useState({
    options: {
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },

      {
        name: 'series-2',
        data: [30, 40, 45, 60, 49, 90, 70, 91],
      },
      {
        name: 'series-3',
        data: [30, 50, 45, 90, 49, 40, 70, 91],
      },
    ],
  });

  const [count, setCount] = useState(0);
  const retrieveData = async (columns, tableName) => {
    try {
      const response = await axios.get('https://items-7vpt.onrender.com/api/student/get/table', {
        params: {
          tableName,
          columns,
        },
      });
      console.log({ response });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {/* <ChartComponent/> */}
      <div className="bar-chat">
        <Chart options={state.options} series={state.series} type="bar" width="450" />
      </div>

      <div>
        <Chart options={state.options} series={state.series} type="line" width="450" />
      </div>

      <div>
        <Chart options={state.options} series={state.series} type="area" width="450" />
      </div>

      <div>
        <Chart options={state.options} series={state.series} type="radar" width="450" />
      </div>

      {/* <div>
        <Chart
          options={state.options}
          series={state.series}
          type="histogram"
          width="450"
        />
      </div> */}

      <div>
        <Chart options={state.options} series={state.series} type="scatter" width="450" />
      </div>

      <div>
        <Chart options={state.options} series={state.series} type="heatmap" width="450" />
      </div>

      {/* <ChartComponet/> */}
    </div>
  );
}

export default ChartsComponent;
