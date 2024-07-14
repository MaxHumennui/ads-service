import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isExiting, setIsExiting] = useState(false);

    const clearError = () => {
        setIsExiting(true);
        setTimeout(() => {
            setError(null);
            setIsExiting(false);
        }, 500);
    };

    const clearSuccess = () => {
        setIsExiting(true);
        setTimeout(() => {
            setSuccess(null);
            setIsExiting(false);
        }, 500);
    };

    return (
        <ErrorContext.Provider value={{ error, success, setError, setSuccess, clearError, clearSuccess, isExiting }}>
            {children}
        </ErrorContext.Provider>
    );
};
