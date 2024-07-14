import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const BarChart = ({ data, label }) => {
    const chartData = useMemo(() => ({
        labels: data.map(item => item[label]),
        datasets: [
            {
                label: 'Impressions',
                data: data.map(item => item.total_impressions),
                backgroundColor: 'blue',
            },
            {
                label: 'Clicks',
                data: data.map(item => item.total_clicks),
                backgroundColor: 'red',
            },
        ],
    }), [data, label]);

    return <Bar data={chartData} />;
};

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        total_impressions: PropTypes.number.isRequired,
        total_clicks: PropTypes.number.isRequired,
    })).isRequired,
    label: PropTypes.string.isRequired,
};

export default BarChart;
