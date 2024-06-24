import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export function Charts({ selectedChart, chartData, selectedCategory, xAxis, data }) {
  const [state, setState] = useState({
    options: {
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1, 2, 3],
      },
    },
    series: [],
  });
  const [chartType, setChartType] = useState('bar');
  // Use reduce to calculate the count for each study level
  const dataNeeded = {
    studyLevel: 'studyLevel',
    department_id: 'departmentName',
    faculty_id: 'facultyName',
  };
  useEffect(() => {
    console.log({ selectedCategory, selectedChart });
    const countByStudyLevel = data.reduce((result, obj) => {
      const studyLevel = obj[dataNeeded[xAxis]];
      result[studyLevel] = (result[studyLevel] || 0) + 1;
      return result;
    }, {});
    console.log({ countByStudyLevel });

    // Create a new array with studyLevel and count
    const newArray = Object.entries(countByStudyLevel).map(([studyLevel, count]) => ({
      studyLevel,
      count,
    }));

    const seriesData = Object.keys(chartData).map((data, index) => chartData[data].length);

    setState({
      options: {
        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: Object.keys(chartData),
        },
      },
      series: [{ name: '', data: seriesData }],
    });
    console.log(getChartType(selectedChart));
    setChartType(getChartType(selectedChart));
  }, [selectedCategory, selectedChart, xAxis]);

  const getChartType = (selectedChart) => {
    switch (selectedChart) {
      case 'bar':
        return 'bar';
      case 'area':
        return 'area';
      case 'line':
        return 'line';
      case 'radar':
        return 'radar';
      case 'scatter':
        return 'scatter';
      case 'heatmap':
        return 'heatmap';
      default:
        return 'bar';
    }
  };

  return (
    <div>
      <div>
        <Chart options={state.options} series={state.series} type={selectedChart} width="450" />
      </div>
    </div>
  );
}
