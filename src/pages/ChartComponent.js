// import Chart from "react-apexcharts";
import { useState } from 'react';
import { Charts } from 'src/layouts/charts/Charts';

export default function ChartComponent({ xAxis, data }) {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedCategory, setSelectedCategory] = useState('faculty');

  const handleChartSelect = (event) => {
    setSelectedChart(event.target.value);
  };

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select id="field" name="field" value={selectedCategory} onChange={handleSelectedCategory} required>
        {/* <option value="">Select Chart</option> */}
        <option value="bar">Faculty</option>
        <option value="area">Department</option>
        <option value="line">Programme</option>
        {/* <option value="radar">Radar Chart</option>
                <option value="scatter">Scatter Chart</option>
                <option value="heatmap">Heatmap Chart</option> */}
      </select>

      <select id="field" name="field" value={selectedChart} onChange={handleChartSelect} required>
        {/* <option value="">Select Chart</option> */}
        <option value="bar">Bar Chart</option>
        <option value="area">Area Chart</option>
        <option value="line">Line Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="scatter">Scatter Chart</option>
        <option value="heatmap">Heatmap Chart</option>
      </select>

      <div>
        <Charts selectedChart={selectedChart} selectedCategory={selectedCategory} xAxis={xAxis} data={data} />
      </div>

      {/* <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="450"
            /> */}
    </div>
  );
}
