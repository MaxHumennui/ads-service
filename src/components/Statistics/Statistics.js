import React, { useEffect, useState, useContext } from 'react';
import { getAdStatistics } from '../../services/api';
import { ErrorContext } from '../../context/NotificationContext';
import styled from 'styled-components';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatisticsContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ChartWrapper = styled.div`
    margin-bottom: 2rem;
    width: 80%;
    max-width: 600px;
`;

const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchStatistics = async () => {
            const response = await getAdStatistics();
            if (response.success) {
                setStatistics(response.data);
            } else {
                setError(response.message);
            }
        };

        fetchStatistics();
    }, [setError]);

    return (
        <StatisticsContainer>
            <h2>General Statistics</h2>
            {statistics && (
                <>
                    <ChartWrapper>
                        <h3>Impressions and Clicks Over Time</h3>
                        <LineChart data={statistics.ads_stats} />
                    </ChartWrapper>
                    <ChartWrapper>
                        <h3>Impressions and Clicks by Country</h3>
                        <BarChart data={statistics.country_impressions} label="country" />
                    </ChartWrapper>
                    <ChartWrapper>
                        <h3>Impressions and Clicks by Region</h3>
                        <BarChart data={statistics.region_impressions} label="region" />
                    </ChartWrapper>
                    <ChartWrapper>
                        <h3>Impressions and Clicks by City</h3>
                        <BarChart data={statistics.city_impressions} label="city" />
                    </ChartWrapper>
                </>
            )}
        </StatisticsContainer>
    );
};

export default Statistics;
