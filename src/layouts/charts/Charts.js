import React, {useEffect, useState} from "react"
import Chart from "react-apexcharts";

export function Charts({selectedChart, selectedCategory}){

  const getSeriesData = (category) => {
    switch (category) {
      case "faculty":
        return [
          {
            name: "Series 1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
          {
            name: "Series 2",
            data: [20, 35, 40, 55, 45, 70, 65, 80]
          }
        ];
      case "department":
        return [
          {
            name: "Series 1",
            data: [30, 40, 45, 60, 49, 90, 70, 91]
          },
          {
            name: "Series 2",
            data: [35, 55, 40, 70, 60, 50, 75, 90]
          }
        ];
      case "programme":
        return [
          {
            name: "Series 1",
            data: [30, 40, 45, 55, 60, 65, 70, 75]
          },
          {
            name: "Series 2",
            data: [25, 35, 50, 60, 70, 65, 80, 90]
          }
        ];
      default:
        return [];
    }
  };
    
    const [state,setState] = useState({
        options: {
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series: getSeriesData(selectedCategory)
        // series: [
        //   {
        //     name: "series-1",
        //     data: [30, 40, 45, 50, 49, 60, 70, 91]
        //   },
    
        //   {
        //     name: "series-2",
        //     data: [30, 40, 45, 60, 49, 90, 70, 91]
        //   }
        // ]
      })

      

      const handleSeriesToggle = (seriesIndex) => {
        const updatedSeries = [...state.series];
        updatedSeries[seriesIndex].data = updatedSeries[seriesIndex].data.map((value) => {
          return value === null ? 0 : null;
        });
        setState({ ...state, series: updatedSeries });
      };

      const getChartType = () => {
        switch (selectedChart) {
          case "bar":
            return "bar";
          case "area":
            return "area";
          case "line":
            return "line";
          case "radar":
            return "radar";
          case "scatter":
            return "scatter";
          case "heatmap":
            return "heatmap";
          default:
            return "bar";
        }
      };

    return(
        <div>
            <div>
                <Chart
                    options={state.options}
                    series={state.series}
                    type={getChartType()}
                    width="450"
                />
            </div>

            {/* <div>
                <button onClick={() => handleSeriesToggle(0)}>Toggle Series 1</button>
                <button onClick={() => handleSeriesToggle(1)}>Toggle Series 2</button>
            </div> */}

            {/* <div>
                <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="450"
                />
            </div>

            <div>
                <Chart
                options={state.options}
                series={state.series}
                type="line"
                width="450"
                />
            </div>

            <div>
                <Chart
                options={state.options}
                series={state.series}
                type="radar"
                width="450"
                />
            </div>

            <div>
                <Chart
                options={state.options}
                series={state.series}
                type="scatter"
                width="450"
                />
            </div>

            <div>
                <Chart
                options={state.options}
                series={state.series}
                type="heatmap"
                width="450"
                />
            </div> */}
        </div>
    )
}