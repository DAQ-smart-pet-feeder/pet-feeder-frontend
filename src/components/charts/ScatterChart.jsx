import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

const ScatterChart = ({ data, options }) => {
    return <Scatter data={data} options={options} />;
};

export default ScatterChart;
