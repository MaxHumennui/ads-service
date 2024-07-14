import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { getAds, trackClick, trackImpression } from '../../services/api';
import { ErrorContext } from '../../context/NotificationContext';
import AdBlock from './AdBlock';
import GrayBlock from './GrayBlock';

const ShowcaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    position: relative;
`;

const AdContainer = styled.div`
    width: 100%;
    position: absolute;
    height: 250px;
`;

const AdShowcase = () => {
    const [ads, setAds] = useState([]);
    const [visibleAds, setVisibleAds] = useState([true, true]);
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const fetchAds = async () => {
            const response = await getAds();
            if (response.success && Array.isArray(response.data)) {
                const selectedAds = getRandomAds(response.data, 2);
                setAds(selectedAds);
            } else {
                setError(response.message || 'Unexpected error');
            }
        };

        fetchAds();
    }, [setError]);

    const getRandomAds = (ads, count) => {
        const shuffled = [...ads].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleAdImpression = async (adId) => {
        const response = await trackImpression(adId);
        if (!response.success) {
            setError(response.message || 'Failed to track impression');
        }
    };

    const handleAdClick = async (adId) => {
        const response = await trackClick(adId);
        if (!response.success) {
            setError(response.message || 'Failed to track click');
        }
    };

    const closeAd = (index) => {
        const updatedVisibleAds = [...visibleAds];
        updatedVisibleAds[index] = false;
        setVisibleAds(updatedVisibleAds);
    };

    return (
        <ShowcaseContainer>
            <AdContainer>
                {ads.map((ad, index) => (
                    visibleAds[index] && (
                        <AdBlock
                            key={ad.id}
                            ad={ad}
                            index={index}
                            handleAdImpression={handleAdImpression}
                            handleAdClick={handleAdClick}
                            closeAd={closeAd}
                        />
                    )
                ))}
            </AdContainer>
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
            <GrayBlock />
        </ShowcaseContainer>
    );
};

export default AdShowcase;
