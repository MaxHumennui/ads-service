import React, { useContext } from 'react';
import { ErrorContext } from '../context/NotificationContext';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
`;

const ErrorContainer = styled.div`
    background: red;
    color: white;
    padding: 10px;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${props => props.isExiting ? fadeOut : fadeIn} 0.5s forwards;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    margin-left: auto;
    cursor: pointer;
    font-size: 1rem;
`;

const ErrorNotification = () => {
    const { error, clearError } = useContext(ErrorContext);

    if (!error) return null;

    return (
        <ErrorContainer>
            {error}
            <CloseButton onClick={clearError}>x</CloseButton>
        </ErrorContainer>
    );
};

export default ErrorNotification;
