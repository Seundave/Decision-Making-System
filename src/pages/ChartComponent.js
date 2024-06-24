// import Chart from "react-apexcharts";
import { useState } from 'react';
import { Charts } from 'src/layouts/charts/c';

export default function ChartComponent({ xAxis, data, selectedChart, chartData, selectedCategory }) {
  console.log({ chartData });
  return (
    <div>
      <div>
        <Charts
          selectedChart={selectedChart}
          chartData={chartData}
          selectedCategory={selectedCategory}
          xAxis={xAxis}
          data={data}
        />
      </div>
    </div>
  );
}
