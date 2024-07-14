import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const LineChart = ({ data }) => {
    const chartData = useMemo(() => ({
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Impressions',
                data: data.map(item => item.total_impressions),
                fill: false,
                borderColor: 'blue',
            },
            {
                label: 'Clicks',
                data: data.map(item => item.total_clicks),
                fill: false,
                borderColor: 'red',
            },
        ],
    }), [data]);

    return <Line data={chartData} />;
};

LineChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        total_impressions: PropTypes.number.isRequired,
        total_clicks: PropTypes.number.isRequired,
    })).isRequired,
};

export default LineChart;
