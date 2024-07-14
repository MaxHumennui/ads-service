import React from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
    0% {
        background-color: #e0e0e0;
    }
    50% {
        background-color: #f5f5f5;
    }
    100% {
        background-color: #e0e0e0;
    }
`;

const GrayBlockStyled = styled.div`
    width: 70%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 8px;
    animation: ${glow} 1.5s infinite ease-in-out;
`;

const GrayBlock = () => <GrayBlockStyled />;

export default GrayBlock;
