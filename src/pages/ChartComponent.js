// import Chart from "react-apexcharts";
import { useState } from 'react';
import { Charts } from 'src/layouts/charts/c';

export default function ChartComponent({ xAxis, data, selectedChart, selectedCategory }) {
  console.log({ data });
  return (
    <div>
      <div>
        <Charts selectedChart={selectedChart} selectedCategory={selectedCategory} xAxis={xAxis} data={data} />
      </div>
    </div>
  );
}
