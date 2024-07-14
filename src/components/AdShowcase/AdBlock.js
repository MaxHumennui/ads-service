import React from 'react';
import styled from 'styled-components';

const AdBlockContainer = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.5%;
    width: 10%;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: absolute;
    top: 0;
    left: ${props => (props.index % 2 === 0 ? '87.5%' : '2.5%')};
    
    &:hover {
        background-color: #f1f1f1;
    }

    h3 {
        font-size: 0.875rem;
        margin: 0.5rem 0;
    }

    p {
        font-size: 0.75rem;
        color: #666;
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }

    .close-button {
        position: absolute;
        top: 5px;
        right: 5px;
        background: #ff5c5c;
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        width: 20px;
        height: 20px;
        font-size: 0.75rem;
        line-height: 20px;
        text-align: center;
        padding: 0;
    }
`;

const AdBlock = ({ ad, index, handleAdImpression, handleAdClick, closeAd }) => (
    <AdBlockContainer index={index} onMouseEnter={() => handleAdImpression(ad.id)} onClick={() => handleAdClick(ad.id)}>
        <button className="close-button" onClick={(e) => { e.stopPropagation(); closeAd(index); }}>x</button>
        <img src={ad.image} alt={ad.title} />
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
    </AdBlockContainer>
);

export default AdBlock;
